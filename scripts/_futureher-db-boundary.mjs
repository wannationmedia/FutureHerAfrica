/**
 * FutureHer database boundary helper.
 * Connects ONLY to the local `postgres` maintenance database.
 * Never connects to wannation_os. Never prints passwords or URLs.
 */
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env");
const MODE = process.argv[2] || "inspect";

function loadEnvUrl() {
  const text = fs.readFileSync(ENV_PATH, "utf8");
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
    return { rawFile: text, url: value };
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

function maintenanceConfig(parsed) {
  return {
    user: parsed.user,
    password: parsed.password,
    host: parsed.host,
    port: parsed.port,
    database: "postgres",
    connectionTimeoutMillis: 8000,
  };
}

async function inspect() {
  const { url } = loadEnvUrl();
  const parsed = parseUrl(url);
  if (parsed.database === "wannation_os" || /wannation/i.test(parsed.database)) {
    console.log("env_database_target=wannation_os (will not connect to it)");
  }
  console.log(`env_user=${parsed.user}`);
  console.log(`env_host=${parsed.host}`);
  console.log(`env_port=${parsed.port}`);
  console.log("connecting_to_maintenance_db=postgres");

  const client = new pg.Client(maintenanceConfig(parsed));
  await client.connect();
  try {
    const identity = await client.query(
      "SELECT current_user AS user, current_database() AS database, inet_server_port() AS port, version() AS version"
    );
    const row = identity.rows[0];
    console.log(`session_user=${row.user}`);
    console.log(`session_database=${row.database}`);
    console.log(`session_port=${row.port}`);
    console.log(`session_version=${String(row.version).split(",")[0]}`);

    if (row.database !== "postgres") {
      throw new Error("Refusing to continue: session is not on the postgres maintenance database.");
    }

    const priv = await client.query(
      `SELECT rolname, rolsuper, rolcreatedb, rolcanlogin
       FROM pg_roles
       WHERE rolname = current_user`
    );
    const me = priv.rows[0];
    console.log(`role_super=${me.rolsuper}`);
    console.log(`role_createdb=${me.rolcreatedb}`);
    console.log(`role_canlogin=${me.rolcanlogin}`);

    const fhRole = await client.query(
      `SELECT rolname, rolcanlogin, rolcreatedb
       FROM pg_roles
       WHERE rolname = 'futureher'`
    );
    console.log(`futureher_role_exists=${fhRole.rowCount > 0 ? "YES" : "NO"}`);

    const fhDb = await client.query(
      `SELECT datname FROM pg_database WHERE datname = 'futureher'`
    );
    console.log(`futureher_database_exists=${fhDb.rowCount > 0 ? "YES" : "NO"}`);

    const wanDb = await client.query(
      `SELECT datname FROM pg_database WHERE datname = 'wannation_os'`
    );
    console.log(`wannation_os_name_visible=${wanDb.rowCount > 0 ? "YES" : "NO"}`);
    console.log("wannation_os_connected=NO");
  } finally {
    await client.end();
  }
}

async function createFutureherDatabase() {
  const { url } = loadEnvUrl();
  const parsed = parseUrl(url);
  const client = new pg.Client(maintenanceConfig(parsed));
  await client.connect();
  try {
    const dbCheck = await client.query(
      `SELECT current_database() AS database`
    );
    if (dbCheck.rows[0].database !== "postgres") {
      throw new Error("Refusing CREATE DATABASE: not on postgres maintenance database.");
    }

    const exists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = 'futureher'`
    );
    if (exists.rowCount > 0) {
      console.log("create_futureher=already_exists");
      return;
    }

    const priv = await client.query(
      `SELECT rolsuper, rolcreatedb FROM pg_roles WHERE rolname = current_user`
    );
    const me = priv.rows[0];
    if (!me.rolsuper && !me.rolcreatedb) {
      throw new Error("Current role cannot create databases.");
    }

    await client.query("CREATE DATABASE futureher");
    console.log("create_futureher=created");
  } finally {
    await client.end();
  }
}

function retargetEnvToFutureher() {
  const { rawFile, url } = loadEnvUrl();
  const parsed = parseUrl(url);
  if (parsed.database === "futureher") {
    console.log("env_retarget=already_futureher");
    return;
  }
  if (parsed.database !== "wannation_os") {
    throw new Error(
      `Refusing to rewrite .env: current database is '${parsed.database}', expected wannation_os or futureher.`
    );
  }

  const next = rawFile.replace(
    /(DATABASE_URL\s*=\s*["']?postgresql:\/\/[^/]+)\/wannation_os/,
    "$1/futureher"
  );
  if (next === rawFile) {
    throw new Error("Failed to retarget DATABASE_URL in .env without touching other values.");
  }

  const verify = parseUrl(
    parseEnvDatabaseUrl(next)
  );
  if (verify.database !== "futureher") {
    throw new Error("Retarget verification failed.");
  }
  if (verify.user !== parsed.user || verify.host !== parsed.host || verify.port !== parsed.port) {
    throw new Error("Retarget changed more than the database name.");
  }

  fs.writeFileSync(ENV_PATH, next, "utf8");
  console.log("env_retarget=wannation_os_to_futureher");
}

function parseEnvDatabaseUrl(text) {
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
  throw new Error("DATABASE_URL missing after rewrite");
}

async function verifyFutureher() {
  const { url } = loadEnvUrl();
  const parsed = parseUrl(url);
  if (parsed.database !== "futureher") {
    throw new Error("DATABASE_URL does not target futureher.");
  }
  const client = new pg.Client({
    user: parsed.user,
    password: parsed.password,
    host: parsed.host,
    port: parsed.port,
    database: "futureher",
    connectionTimeoutMillis: 8000,
  });
  await client.connect();
  try {
    const row = (
      await client.query("SELECT current_database() AS database, current_user AS user")
    ).rows[0];
    if (row.database !== "futureher") {
      throw new Error("Connected database is not futureher.");
    }
    console.log(`verify_database=${row.database}`);
    console.log(`verify_user=${row.user}`);
    console.log("wannation_os_connected=NO");
  } finally {
    await client.end();
  }
}

async function main() {
  if (MODE === "inspect") return inspect();
  if (MODE === "create") return createFutureherDatabase();
  if (MODE === "retarget-env") return retargetEnvToFutureher();
  if (MODE === "verify") return verifyFutureher();
  throw new Error(`Unknown mode: ${MODE}`);
}

main().catch((error) => {
  console.error(String(error.message || error));
  process.exit(1);
});
