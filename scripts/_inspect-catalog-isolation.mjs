/**
 * Read-only catalog inspect from the `postgres` maintenance database.
 * Never connects to wannation_os. Never prints passwords.
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

const u = new URL(loadUrl().replace(/^postgresql:/, "http:"));
const client = new pg.Client({
  user: decodeURIComponent(u.username || ""),
  password: decodeURIComponent(u.password || ""),
  host: u.hostname,
  port: Number(u.port || 5432),
  database: "postgres",
  connectionTimeoutMillis: 8000,
});

await client.connect();
try {
  const sess = (await client.query("SELECT current_database() AS d, current_user AS u")).rows[0];
  if (sess.d !== "postgres") throw new Error("not on postgres");
  console.log(`session_user=${sess.u}`);
  console.log("session_database=postgres");
  console.log("wannation_os_connected=NO");

  const dbs = await client.query(`
    SELECT d.datname,
           pg_get_userbyid(d.datdba) AS owner,
           d.datacl::text AS acl
    FROM pg_database d
    WHERE d.datname IN ('futureher', 'wannation_os', 'postgres')
    ORDER BY 1
  `);
  for (const r of dbs.rows) {
    console.log(`db=${r.datname} owner=${r.owner} acl=${r.acl || "<null>"}`);
  }

  const roles = await client.query(`
    SELECT rolname, rolsuper, rolcreatedb, rolcreaterole, rolcanlogin
    FROM pg_roles
    WHERE rolname IN ('futureher_app', 'futureher', 'postgres')
       OR rolname ILIKE '%wannation%'
    ORDER BY 1
  `);
  for (const r of roles.rows) {
    console.log(
      `role=${r.rolname} super=${r.rolsuper} createdb=${r.rolcreatedb} createrole=${r.rolcreaterole} login=${r.rolcanlogin}`
    );
  }
} finally {
  await client.end();
}
