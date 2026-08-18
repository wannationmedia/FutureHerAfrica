/**
 * Read-only env/database-boundary inspector.
 * Prints structure only. Never prints passwords or raw DATABASE_URL values.
 */
import fs from "node:fs";
import path from "node:path";

function parseEnv(text) {
  const map = new Map();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    let k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    map.set(k, v);
  }
  return map;
}

function summarizeUrl(url) {
  if (!url) return { present: false };
  const placeholder = url.includes("<PASSWORD>");
  let user = null;
  let host = null;
  let port = null;
  let database = null;
  let hasPassword = false;
  try {
    const u = new URL(url.replace(/^postgresql:/, "http:"));
    user = decodeURIComponent(u.username || "") || null;
    hasPassword = Boolean(u.password);
    host = u.hostname || null;
    port = u.port || "5432";
    database = decodeURIComponent((u.pathname || "").replace(/^\//, "").split("/")[0]) || null;
  } catch {
    return { present: true, parseError: true, placeholder };
  }
  return {
    present: true,
    placeholder,
    user,
    host,
    port,
    database,
    hasPassword,
    password: hasPassword ? "<redacted>" : placeholder ? "<PASSWORD>" : "none",
    targetsWannationOs: database === "wannation_os" || /wannation/i.test(url),
    userLooksWannation: /wannation/i.test(user || ""),
    targetsFutureher: database === "futureher",
    userLooksFutureher: user === "futureher" || user === "futureher_app",
  };
}

const root = process.cwd();
const examplePath = path.join(root, ".env.example");
const envPath = path.join(root, ".env");
const localPath = path.join(root, ".env.local");

const exampleExists = fs.existsSync(examplePath);
const envExists = fs.existsSync(envPath);
const localExists = fs.existsSync(localPath);

const example = exampleExists ? parseEnv(fs.readFileSync(examplePath, "utf8")) : new Map();
const env = envExists ? parseEnv(fs.readFileSync(envPath, "utf8")) : new Map();

const exampleKeys = [...example.keys()].sort();
const envKeys = [...env.keys()].sort();

const report = {
  files: { ".env.example": exampleExists, ".env": envExists, ".env.local": localExists },
  keys: {
    example: exampleKeys,
    env: envKeys,
    onlyInExample: exampleKeys.filter((k) => !env.has(k)),
    onlyInEnv: envKeys.filter((k) => !example.has(k)),
  },
  sharedValueComparison: exampleKeys
    .filter((k) => env.has(k))
    .map((k) => ({
      key: k,
      identical: example.get(k) === env.get(k),
      exampleEmpty: (example.get(k) || "").length === 0,
      envEmpty: (env.get(k) || "").length === 0,
      examplePlaceholder: (example.get(k) || "").includes("<PASSWORD>"),
      envPlaceholder: (env.get(k) || "").includes("<PASSWORD>"),
    })),
  DATABASE_URL: {
    example: summarizeUrl(example.get("DATABASE_URL")),
    env: summarizeUrl(env.get("DATABASE_URL")),
  },
  FHA_PRODUCTION_DATABASE_URL: {
    examplePresent: example.has("FHA_PRODUCTION_DATABASE_URL"),
    env: summarizeUrl(env.get("FHA_PRODUCTION_DATABASE_URL")),
  },
};

console.log(JSON.stringify(report, null, 2));
