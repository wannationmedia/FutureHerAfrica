import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

function assertNotWannationDatabase(url) {
  if (/wannation/i.test(url)) {
    throw new Error(
      "Refusing to use a WANNATION database. Set FHA_PRODUCTION_DATABASE_URL to a dedicated FutureHer database (e.g. futureher), not wannation_os."
    );
  }
}

export function loadDatabaseUrl() {
  if (process.env.FHA_PRODUCTION_DATABASE_URL) {
    assertNotWannationDatabase(process.env.FHA_PRODUCTION_DATABASE_URL);
    return process.env.FHA_PRODUCTION_DATABASE_URL;
  }

  if (process.env.DATABASE_URL) {
    assertNotWannationDatabase(process.env.DATABASE_URL);
    return process.env.DATABASE_URL;
  }

  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and set DATABASE_URL for local PostgreSQL."
    );
  }

  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const m = trimmed.match(/^DATABASE_URL\s*=\s*(.*)$/);
    if (!m) continue;
    let value = m[1].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!value || value.includes("<PASSWORD>")) {
      throw new Error(
        "DATABASE_URL in .env still contains a placeholder. Set the real local PostgreSQL password."
      );
    }
    assertNotWannationDatabase(value);
    return value;
  }

  throw new Error("DATABASE_URL not found in .env");
}

export function createPool() {
  const connectionString = loadDatabaseUrl();
  return new pg.Pool({ connectionString });
}

export { ROOT };
