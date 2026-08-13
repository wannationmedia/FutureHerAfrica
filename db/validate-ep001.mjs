/**
 * Post-seed validation for EP001 production SQL layer.
 */
import fs from "node:fs";
import path from "node:path";
import { createPool, ROOT } from "./lib/pg.mjs";

const FINAL_PATH = "launch/EP001/PUBLISH/EP001_FutureHerAfrica_FINAL.mp4";

async function main() {
  const pool = createPool();
  const client = await pool.connect();
  const results = [];

  try {
    const conn = await client.query(
      "SELECT current_database() AS db, current_user AS usr, version() AS version"
    );
    results.push({
      check: "postgresql_connectivity",
      ok: true,
      detail: `${conn.rows[0].db} as ${conn.rows[0].usr}`,
    });

    const ep = await client.query(
      `
      SELECT e.id, e.code, e.title, e.slug, e.status, s.name AS show_name
      FROM episodes e
      JOIN shows s ON s.id = e.show_id
      WHERE e.code = 'EP001' AND s.slug = 'futureherafrica';
      `
    );
    results.push({
      check: "ep001_exists",
      ok: ep.rows.length === 1,
      detail: ep.rows[0] || null,
    });

    const asset = await client.query(
      `
      SELECT a.id, a.filename, a.relative_path, a.asset_type, a.file_size_bytes, a.checksum,
             v.version_number, v.path AS version_path
      FROM production_assets a
      JOIN episodes e ON e.id = a.episode_id
      JOIN shows s ON s.id = e.show_id
      LEFT JOIN asset_versions v ON v.asset_id = a.id AND v.version_number = a.version
      WHERE e.code = 'EP001'
        AND s.slug = 'futureherafrica'
        AND a.relative_path = $1;
      `,
      [FINAL_PATH]
    );
    results.push({
      check: "final_video_asset",
      ok: asset.rows.length === 1 && asset.rows[0].relative_path === FINAL_PATH,
      detail: asset.rows[0] || null,
    });

    const blobCols = await client.query(
      `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name IN ('production_assets', 'asset_versions')
        AND data_type IN ('bytea');
      `
    );
    results.push({
      check: "no_binary_columns",
      ok: blobCols.rows.length === 0,
      detail: blobCols.rows,
    });

    const onDisk = fs.existsSync(path.join(ROOT, ...FINAL_PATH.split("/")));
    results.push({
      check: "final_video_still_on_disk",
      ok: onDisk,
      detail: FINAL_PATH,
    });

    const counts = await client.query(
      `
      SELECT
        (SELECT count(*)::int FROM production_assets a
           JOIN episodes e ON e.id = a.episode_id
           JOIN shows s ON s.id = e.show_id
          WHERE e.code = 'EP001' AND s.slug = 'futureherafrica') AS assets,
        (SELECT count(*)::int FROM production_tasks t
           JOIN episodes e ON e.id = t.episode_id
           JOIN shows s ON s.id = e.show_id
          WHERE e.code = 'EP001' AND s.slug = 'futureherafrica') AS tasks,
        (SELECT count(*)::int FROM approvals ap
           JOIN episodes e ON e.id = ap.episode_id
           JOIN shows s ON s.id = e.show_id
          WHERE e.code = 'EP001' AND s.slug = 'futureherafrica') AS approvals,
        (SELECT count(*)::int FROM publishing_records p
           JOIN episodes e ON e.id = p.episode_id
           JOIN shows s ON s.id = e.show_id
          WHERE e.code = 'EP001' AND s.slug = 'futureherafrica') AS publishing_records;
      `
    );
    results.push({
      check: "ep001_related_counts",
      ok: true,
      detail: counts.rows[0],
    });

    const migration = await client.query(
      `
      SELECT id, applied_at FROM schema_migrations
      WHERE id = '20260812100000_futureherafrica_production_foundation';
      `
    );
    results.push({
      check: "migration_applied",
      ok: migration.rows.length === 1,
      detail: migration.rows[0] || null,
    });

    let allOk = true;
    for (const r of results) {
      const mark = r.ok ? "PASS" : "FAIL";
      if (!r.ok) allOk = false;
      console.log(`${mark}  ${r.check}`);
      console.log("     ", JSON.stringify(r.detail, null, 0));
    }

    if (!allOk) process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
