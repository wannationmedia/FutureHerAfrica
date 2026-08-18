/**
 * Read-only post-create verification.
 * Connects to `postgres` (catalog) and `futureher` only. Never wannation_os.
 */
import fs from "node:fs";
import pg from "pg";

function loadUrl() {
  const text = fs.readFileSync(".env", "utf8");
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^DATABASE_URL\s*=\s*(.*)$/);
    if (!m) continue;
    let value = m[1].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    return value;
  }
  throw new Error("DATABASE_URL not found");
}

function creds(url) {
  const u = new URL(url.replace(/^postgresql:/, "http:"));
  return {
    user: decodeURIComponent(u.username || ""),
    password: decodeURIComponent(u.password || ""),
    host: u.hostname,
    port: Number(u.port || 5432),
    envDatabase: decodeURIComponent((u.pathname || "").replace(/^\//, "").split("/")[0] || ""),
    connectionTimeoutMillis: 8000,
  };
}

const parsed = creds(loadUrl());
console.log(`env_still_targets=${parsed.envDatabase}`);
console.log(`host=${parsed.host}`);
console.log(`port=${parsed.port}`);
console.log(`user=${parsed.user}`);

const catalog = new pg.Client({ ...parsed, database: "postgres" });
await catalog.connect();
try {
  const session = await catalog.query("SELECT current_database() AS d");
  if (session.rows[0].d !== "postgres") throw new Error("not on postgres");
  const names = await catalog.query(
    "SELECT datname FROM pg_database WHERE datname = ANY($1) ORDER BY 1",
    [["futureher", "wannation_os"]]
  );
  const present = new Set(names.rows.map((r) => r.datname));
  console.log(`futureher_exists=${present.has("futureher") ? "YES" : "NO"}`);
  console.log(`wannation_os_name_visible=${present.has("wannation_os") ? "YES" : "NO"}`);
} finally {
  await catalog.end();
}

const fh = new pg.Client({ ...parsed, database: "futureher" });
await fh.connect();
try {
  const id = await fh.query("SELECT current_database() AS d, current_user AS u");
  if (id.rows[0].d !== "futureher") throw new Error("not on futureher");
  const publicTables = await fh.query(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1"
  );
  const userObjects = await fh.query(
    `SELECT n.nspname AS schema, c.relname AS name, c.relkind
     FROM pg_class c
     JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
       AND c.relkind IN ('r', 'v', 'm', 'S', 'p')
     ORDER BY 1, 2`
  );
  const prisma = await fh.query(
    `SELECT 1 FROM information_schema.tables
     WHERE table_schema = 'public' AND table_name = '_prisma_migrations'`
  );
  console.log(`connected_database=${id.rows[0].d}`);
  console.log(`connected_user=${id.rows[0].u}`);
  console.log(`public_tables=${publicTables.rowCount}`);
  console.log(`non_system_objects=${userObjects.rowCount}`);
  console.log(`prisma_migrations_table=${prisma.rowCount > 0 ? "YES" : "NO"}`);
  console.log("wannation_os_connected=NO");
} finally {
  await fh.end();
}
