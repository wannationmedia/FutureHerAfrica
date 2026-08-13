/**
 * Apply FutureHerAfrica SQL migrations in order (non-destructive).
 * Tracks applied migrations in schema_migrations.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createPool, ROOT } from "./lib/pg.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, "migrations");

async function ensureMigrationsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id          TEXT PRIMARY KEY,
      applied_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

function listMigrations() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];
  return fs
    .readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .filter((name) =>
      fs.existsSync(path.join(MIGRATIONS_DIR, name, "up.sql"))
    );
}

async function main() {
  const pool = createPool();
  const client = await pool.connect();
  try {
    await ensureMigrationsTable(client);
    const migrations = listMigrations();
    if (migrations.length === 0) {
      console.log("No migrations found.");
      return;
    }

    for (const id of migrations) {
      const { rows } = await client.query(
        "SELECT 1 FROM schema_migrations WHERE id = $1",
        [id]
      );
      if (rows.length) {
        console.log(`skip  ${id}`);
        continue;
      }

      const sqlPath = path.join(MIGRATIONS_DIR, id, "up.sql");
      const sql = fs.readFileSync(sqlPath, "utf8");
      console.log(`apply ${id}`);
      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query(
          "INSERT INTO schema_migrations (id) VALUES ($1)",
          [id]
        );
        await client.query("COMMIT");
        console.log(`ok    ${id}`);
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
    }

    console.log(`Migrations complete. Repo root: ${ROOT}`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
