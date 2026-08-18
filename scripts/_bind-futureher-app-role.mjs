/**
 * FutureHer application role binding.
 * Connects ONLY to the local `postgres` maintenance database and `futureher`.
 * Never connects to wannation_os. Never prints passwords or raw DATABASE_URL values.
 *
 * Usage: node scripts/_bind-futureher-app-role.mjs
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env");
const APP_ROLE = "futureher_app";
const APP_DB = "futureher";
const FORBIDDEN_DB = "wannation_os";

function loadEnvFile() {
  return fs.readFileSync(ENV_PATH, "utf8");
}

function parseDatabaseUrlFromEnv(text) {
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
  throw new Error("DATABASE_URL not found in .env");
}

function parseUrl(url) {
  const u = new URL(url.replace(/^postgresql:/, "http:"));
  return {
    user: decodeURIComponent(u.username || ""),
    password: decodeURIComponent(u.password || ""),
    host: u.hostname,
    port: Number(u.port || 5432),
    database: decodeURIComponent((u.pathname || "").replace(/^\//, "").split("/")[0] || ""),
  };
}

function adminConfig(parsed) {
  return {
    user: parsed.user,
    password: parsed.password,
    host: parsed.host,
    port: parsed.port,
    database: "postgres",
    connectionTimeoutMillis: 8000,
  };
}

function futureherConfig(parsed) {
  return {
    user: parsed.user,
    password: parsed.password,
    host: parsed.host,
    port: parsed.port,
    database: APP_DB,
    connectionTimeoutMillis: 8000,
  };
}

function summarize(parsed) {
  return `${parsed.user} → ${parsed.database} @ ${parsed.host}:${parsed.port}`;
}

function generatePassword() {
  return crypto.randomBytes(32).toString("base64url");
}

function rewriteDatabaseUrl(rawFile, nextUrl) {
  const quoted = `DATABASE_URL="${nextUrl}"`;
  let replaced = false;
  const next = rawFile
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*#/.test(line) || !/^\s*DATABASE_URL\s*=/.test(line)) return line;
      replaced = true;
      return quoted;
    })
    .join(rawFile.includes("\r\n") ? "\r\n" : "\n");
  if (!replaced) {
    throw new Error("Failed to locate DATABASE_URL line to rewrite.");
  }
  return next;
}

async function assertMaintenance(client) {
  const row = (await client.query("SELECT current_database() AS d, current_user AS u")).rows[0];
  if (row.d !== "postgres") {
    throw new Error("Refusing to continue: session is not on the postgres maintenance database.");
  }
  console.log(`admin_session_user=${row.u}`);
  console.log("admin_session_database=postgres");
  console.log("wannation_os_connected=NO");
}

async function rolePasswordSql(client, verb, password) {
  const ident = APP_ROLE.replace(/"/g, "");
  const formatted = (
    await client.query("SELECT format($1::text, $2::text) AS sql", [
      `${verb} ROLE "${ident}" WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD %L`,
      password,
    ])
  ).rows[0].sql;
  await client.query(formatted);
}

async function ensureRole(client, password) {
  const existing = await client.query("SELECT 1 FROM pg_roles WHERE rolname = $1", [APP_ROLE]);
  if (existing.rowCount === 0) {
    await rolePasswordSql(client, "CREATE", password);
    console.log("role_action=created");
  } else {
    await rolePasswordSql(client, "ALTER", password);
    console.log("role_action=updated_existing");
  }

  const attrs = (
    await client.query(
      `SELECT rolname, rolsuper, rolcreatedb, rolcreaterole, rolcanlogin, rolreplication, rolbypassrls
       FROM pg_roles WHERE rolname = $1`,
      [APP_ROLE]
    )
  ).rows[0];
  if (attrs.rolsuper || attrs.rolcreatedb || attrs.rolcreaterole || attrs.rolreplication || attrs.rolbypassrls) {
    throw new Error("futureher_app has disallowed role attributes.");
  }
  if (!attrs.rolcanlogin) {
    throw new Error("futureher_app cannot log in.");
  }
  console.log(`role_super=${attrs.rolsuper}`);
  console.log(`role_createdb=${attrs.rolcreatedb}`);
  console.log(`role_createrole=${attrs.rolcreaterole}`);
  console.log(`role_canlogin=${attrs.rolcanlogin}`);
  console.log(`role_replication=${attrs.rolreplication}`);
  console.log(`role_bypassrls=${attrs.rolbypassrls}`);
}

async function configureDatabase(client) {
  const db = (
    await client.query(
      `SELECT datname, pg_get_userbyid(datdba) AS owner
       FROM pg_database WHERE datname = $1`,
      [APP_DB]
    )
  ).rows[0];
  if (!db) throw new Error("futureher database does not exist.");
  console.log(`futureher_owner_before=${db.owner}`);

  if (db.owner !== APP_ROLE) {
    await client.query(`ALTER DATABASE "${APP_DB}" OWNER TO "${APP_ROLE}"`);
    console.log("futureher_owner_action=transferred");
  } else {
    console.log("futureher_owner_action=already_futureher_app");
  }

  await client.query(`GRANT CONNECT, CREATE, TEMP ON DATABASE "${APP_DB}" TO "${APP_ROLE}"`);
  await client.query(`REVOKE CONNECT ON DATABASE "${APP_DB}" FROM PUBLIC`);

  const after = (
    await client.query(
      `SELECT pg_get_userbyid(datdba) AS owner FROM pg_database WHERE datname = $1`,
      [APP_DB]
    )
  ).rows[0];
  console.log(`futureher_owner_after=${after.owner}`);

  const wanAcl = (
    await client.query(
      `SELECT datacl::text AS acl FROM pg_database WHERE datname = $1`,
      [FORBIDDEN_DB]
    )
  ).rows[0];
  if (wanAcl?.acl && wanAcl.acl.includes(APP_ROLE)) {
    throw new Error("futureher_app appears in wannation_os database ACL; aborting without changing it.");
  }
  console.log("wannation_os_acl_contains_futureher_app=NO");
  console.log("wannation_os_modified=NO");
}

async function configureSchema(adminParsed) {
  const client = new pg.Client(futureherConfig(adminParsed));
  await client.connect();
  try {
    const row = (await client.query("SELECT current_database() AS d")).rows[0];
    if (row.d !== APP_DB) throw new Error("Refusing schema grant: not on futureher.");
    await client.query(`GRANT USAGE, CREATE ON SCHEMA public TO "${APP_ROLE}"`);
    await client.query(`GRANT ALL ON SCHEMA public TO "${APP_ROLE}"`);
    const schemaOwner = (
      await client.query(
        `SELECT pg_get_userbyid(nspowner) AS owner FROM pg_namespace WHERE nspname = 'public'`
      )
    ).rows[0];
    console.log(`futureher_public_schema_owner=${schemaOwner.owner}`);
    const tables = await client.query(
      `SELECT count(*)::int AS n FROM pg_tables WHERE schemaname = 'public'`
    );
    console.log(`futureher_public_tables=${tables.rows[0].n}`);
  } finally {
    await client.end();
  }
}

async function verifyAppConnection(host, port, password) {
  const client = new pg.Client({
    user: APP_ROLE,
    password,
    host,
    port,
    database: APP_DB,
    connectionTimeoutMillis: 8000,
  });
  await client.connect();
  try {
    const row = (
      await client.query(
        "SELECT current_user AS u, session_user AS su, current_database() AS d"
      )
    ).rows[0];
    if (row.d !== APP_DB || row.u !== APP_ROLE) {
      throw new Error(`Unexpected identity: ${row.u} → ${row.d}`);
    }
    const attrs = (
      await client.query(
        `SELECT rolsuper, rolcreatedb, rolcreaterole, rolcanlogin
         FROM pg_roles WHERE rolname = current_user`
      )
    ).rows[0];
    const createDb = (
      await client.query(`SELECT has_database_privilege(current_user, current_database(), 'CREATE') AS can_create`)
    ).rows[0];
    console.log(`verify_user=${row.u}`);
    console.log(`verify_database=${row.d}`);
    console.log(`verify_session_user=${row.su}`);
    console.log(`verify_can_create_on_futureher=${createDb.can_create}`);
    console.log(`verify_super=${attrs.rolsuper}`);
    console.log(`verify_createdb=${attrs.rolcreatedb}`);
    console.log(`verify_createrole=${attrs.rolcreaterole}`);
    console.log("verify_wannation_os_connected=NO");
  } finally {
    await client.end();
  }
}

async function main() {
  const rawFile = loadEnvFile();
  const adminParsed = parseUrl(parseDatabaseUrlFromEnv(rawFile));
  console.log(`env_before=${summarize(adminParsed)}`);
  if (/wannation/i.test(adminParsed.user) || adminParsed.user === APP_ROLE) {
    throw new Error("Refusing to use a non-admin FutureHer/WANNATION role to create the app role.");
  }

  const password = generatePassword();
  const catalog = new pg.Client(adminConfig(adminParsed));
  await catalog.connect();
  try {
    await assertMaintenance(catalog);
    const priv = (
      await catalog.query(
        `SELECT rolsuper, rolcreatedb, rolcreaterole FROM pg_roles WHERE rolname = current_user`
      )
    ).rows[0];
    if (!priv.rolsuper && !priv.rolcreaterole) {
      throw new Error("Current maintenance role cannot create roles.");
    }
    await ensureRole(catalog, password);
    await configureDatabase(catalog);
  } finally {
    await catalog.end();
  }

  await configureSchema(adminParsed);

  const nextUrl = `postgresql://${encodeURIComponent(APP_ROLE)}:${encodeURIComponent(password)}@${adminParsed.host}:${adminParsed.port}/${APP_DB}`;
  const nextFile = rewriteDatabaseUrl(rawFile, nextUrl);
  const verifyParsed = parseUrl(parseDatabaseUrlFromEnv(nextFile));
  if (verifyParsed.user !== APP_ROLE || verifyParsed.database !== APP_DB) {
    throw new Error("Env rewrite verification failed.");
  }
  if (verifyParsed.host !== adminParsed.host || verifyParsed.port !== adminParsed.port) {
    throw new Error("Env rewrite changed host/port.");
  }
  fs.writeFileSync(ENV_PATH, nextFile, "utf8");
  console.log(`env_after=${summarize(verifyParsed)}`);
  console.log("password_written_to_env=YES");
  console.log("password_printed=NO");

  await verifyAppConnection(adminParsed.host, adminParsed.port, password);

  const post = new pg.Client(adminConfig(adminParsed));
  await post.connect();
  try {
    await assertMaintenance(post);
    const privs = await post.query(
      `SELECT
         has_database_privilege($1, 'futureher', 'CONNECT') AS fh_connect,
         has_database_privilege($1, 'futureher', 'CREATE') AS fh_create,
         has_database_privilege($1, 'wannation_os', 'CONNECT') AS wan_connect,
         has_database_privilege($1, 'wannation_os', 'CREATE') AS wan_create,
         has_database_privilege($1, 'wannation_os', 'TEMP') AS wan_temp`,
      [APP_ROLE]
    );
    const p = privs.rows[0];
    console.log(`catalog_futureher_connect=${p.fh_connect}`);
    console.log(`catalog_futureher_create=${p.fh_create}`);
    console.log(`catalog_wannation_os_connect=${p.wan_connect}`);
    console.log(`catalog_wannation_os_create=${p.wan_create}`);
    console.log(`catalog_wannation_os_temp=${p.wan_temp}`);
    const members = await post.query(
      `SELECT g.rolname AS group
       FROM pg_auth_members m
       JOIN pg_roles r ON r.oid = m.member
       JOIN pg_roles g ON g.oid = m.roleid
       WHERE r.rolname = $1`,
      [APP_ROLE]
    );
    console.log(`futureher_app_group_memberships=${members.rowCount}`);
  } finally {
    await post.end();
  }
}

main().catch((error) => {
  console.error(String(error.message || error));
  process.exit(1);
});
