/**
 * Application-credential verification against `futureher` only.
 * Does not create objects, run Prisma, or connect to wannation_os.
 * Never prints passwords or raw DATABASE_URL values.
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

const raw = loadUrl();
if (/wannation/i.test(raw)) {
  throw new Error("DATABASE_URL still contains a WANNATION identifier.");
}

const u = new URL(raw.replace(/^postgresql:/, "http:"));
const user = decodeURIComponent(u.username || "");
const database = decodeURIComponent((u.pathname || "").replace(/^\//, "").split("/")[0] || "");
const host = u.hostname;
const port = Number(u.port || 5432);

console.log(`env_user=${user}`);
console.log(`env_database=${database}`);
console.log(`env_host=${host}`);
console.log(`env_port=${port}`);
console.log("env_password=<redacted>");

if (user !== "futureher_app" || database !== "futureher") {
  throw new Error("DATABASE_URL is not futureher_app → futureher.");
}

const client = new pg.Client({
  user,
  password: decodeURIComponent(u.password || ""),
  host,
  port,
  database: "futureher",
  connectionTimeoutMillis: 8000,
});

await client.connect();
try {
  const row = (
    await client.query(
      `SELECT current_user AS u,
              current_database() AS d,
              inet_server_port() AS port,
              split_part(version(), ',', 1) AS version`
    )
  ).rows[0];
  if (row.u !== "futureher_app" || row.d !== "futureher") {
    throw new Error(`Unexpected session identity: ${row.u} → ${row.d}`);
  }
  console.log(`session_user=${row.u}`);
  console.log(`session_database=${row.d}`);
  console.log(`session_port=${row.port}`);
  console.log(`session_version=${row.version}`);

  const attrs = (
    await client.query(
      `SELECT rolsuper, rolcreatedb, rolcreaterole, rolcanlogin, rolreplication, rolbypassrls
       FROM pg_roles WHERE rolname = current_user`
    )
  ).rows[0];
  console.log(`role_super=${attrs.rolsuper}`);
  console.log(`role_createdb=${attrs.rolcreatedb}`);
  console.log(`role_createrole=${attrs.rolcreaterole}`);
  console.log(`role_canlogin=${attrs.rolcanlogin}`);
  console.log(`role_replication=${attrs.rolreplication}`);
  console.log(`role_bypassrls=${attrs.rolbypassrls}`);

  const priv = (
    await client.query(
      `SELECT
         has_database_privilege(current_user, 'futureher', 'CONNECT') AS fh_connect,
         has_database_privilege(current_user, 'futureher', 'CREATE') AS fh_create,
         has_database_privilege(current_user, 'wannation_os', 'CONNECT') AS wan_connect,
         has_database_privilege(current_user, 'wannation_os', 'CREATE') AS wan_create,
         has_database_privilege(current_user, 'wannation_os', 'TEMP') AS wan_temp`
    )
  ).rows[0];
  console.log(`futureher_connect=${priv.fh_connect}`);
  console.log(`futureher_create=${priv.fh_create}`);
  console.log(`wannation_os_create=${priv.wan_create}`);
  console.log(`wannation_os_connect_public_default=${priv.wan_connect}`);
  console.log(`wannation_os_temp_public_default=${priv.wan_temp}`);

  const owner = (
    await client.query(
      `SELECT pg_get_userbyid(datdba) AS owner FROM pg_database WHERE datname = current_database()`
    )
  ).rows[0];
  console.log(`futureher_owner=${owner.owner}`);

  const tables = await client.query(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1`
  );
  const prisma = await client.query(
    `SELECT 1 FROM information_schema.tables
     WHERE table_schema = 'public' AND table_name = '_prisma_migrations'`
  );
  console.log(`public_tables=${tables.rowCount}`);
  console.log(`prisma_migrations_table=${prisma.rowCount > 0 ? "YES" : "NO"}`);
  console.log("objects_created_this_step=NO");
  console.log("wannation_os_connected=NO");
} finally {
  await client.end();
}
