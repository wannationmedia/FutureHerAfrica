/**
 * Safe EP001 import — registers only metadata and files that already exist
 * under launch/EP001. Does not copy media into PostgreSQL.
 * Idempotent via ON CONFLICT / upserts on natural keys.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createPool, ROOT } from "./lib/pg.mjs";

const EP_DIR = path.join(ROOT, "launch", "EP001");

/** Existing production files only — never invent paths. */
const ASSET_SPECS = [
  {
    asset_type: "SCRIPT",
    name: "EP001 Final Script",
    relative_path: "launch/EP001/PUBLISH/01_FINAL_SCRIPT.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "VOICEOVER",
    name: "EP001 Voiceover Script (EN)",
    relative_path: "launch/EP001/PUBLISH/02_VOICEOVER_SCRIPT.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "VOICEOVER",
    name: "EP001 VO Script Root (EN)",
    relative_path: "launch/EP001/SCRIPT_VO.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "VOICEOVER",
    name: "EP001 VO Script (ZU)",
    relative_path: "launch/EP001/SCRIPT_VO_ZU.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "SUBTITLE",
    name: "EP001 Subtitles EN",
    relative_path: "launch/EP001/PUBLISH/07_SUBTITLES_EN.srt",
    mime_type: "application/x-subrip",
  },
  {
    asset_type: "THUMBNAIL",
    name: "EP001 Publish Thumbnail",
    relative_path: "launch/EP001/PUBLISH/08_THUMBNAIL.png",
    mime_type: "image/png",
  },
  {
    asset_type: "THUMBNAIL",
    name: "EP001 Thumbnail Root Mirror",
    relative_path: "launch/EP001/FH_EP001_Thumbnail.png",
    mime_type: "image/png",
  },
  {
    asset_type: "ACTION_CARD",
    name: "EP001 Action Card",
    relative_path: "launch/EP001/PUBLISH/AC01_ACTION_CARD.png",
    mime_type: "image/png",
  },
  {
    asset_type: "DESCRIPTION",
    name: "EP001 YouTube Description",
    relative_path: "launch/EP001/PUBLISH/09_DESCRIPTION.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "SEO",
    name: "EP001 SEO Pack",
    relative_path: "launch/EP001/PUBLISH/11_SEO.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "COMMUNITY_POST",
    name: "EP001 Community Posts",
    relative_path: "launch/EP001/PUBLISH/13_COMMUNITY_POST.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "PUBLISHING_ASSET",
    name: "EP001 Upload Pack",
    relative_path: "launch/EP001/UPLOAD_PACK.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "PUBLISHING_ASSET",
    name: "EP001 Pre-Publish Gate",
    relative_path: "launch/EP001/PUBLISH/16_PRE_PUBLISH_GATE.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "OTHER",
    name: "EP001 Storyboard",
    relative_path: "launch/EP001/PUBLISH/03_STORYBOARD.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "OTHER",
    name: "EP001 CapCut Project JSON",
    relative_path: "launch/EP001/PUBLISH/06_CAPCUT_PROJECT/PROJECT.json",
    mime_type: "application/json",
  },
  {
    asset_type: "OTHER",
    name: "EP001 CapCut Edit Bible",
    relative_path: "launch/EP001/PUBLISH/06_CAPCUT_PROJECT/EDIT_BIBLE.txt",
    mime_type: "text/plain",
  },
  {
    asset_type: "OTHER",
    name: "EP001 Production Runbook",
    relative_path: "launch/EP001/PRODUCTION/EP001_PRODUCTION_RUNBOOK.md",
    mime_type: "text/markdown",
  },
  {
    asset_type: "VIDEO",
    name: "EP001 FutureHerAfrica Final Video",
    relative_path: "launch/EP001/PUBLISH/EP001_FutureHerAfrica_FINAL.mp4",
    mime_type: "video/mp4",
    notes: "Confirmed GitHub production asset — path must not move.",
  },
];

const TASK_SPECS = [
  { task_type: "RESEARCH", title: "Research", status: "DONE", notes: "Pack research complete (SOP 01)." },
  { task_type: "SCRIPT", title: "Script writing", status: "DONE", notes: "PUBLISH/01_FINAL_SCRIPT.txt present." },
  { task_type: "FACT_CHECKING", title: "Fact checking", status: "DONE", notes: "Claims softened per pack / gate." },
  {
    task_type: "VOICEOVER",
    title: "Voiceover production",
    status: "IN_PROGRESS",
    notes: "VO scripts exist; audio/VOICE_MANIFEST.json reports audioGenerated=false — no WAV registered.",
  },
  {
    task_type: "VISUAL_GENERATION",
    title: "AI visual generation",
    status: "IN_PROGRESS",
    notes: "Prompts exist; optional AI stills under assets/ not present as files.",
  },
  {
    task_type: "STOCK_FOOTAGE",
    title: "Stock / B-roll selection",
    status: "IN_PROGRESS",
    notes: "CAPTURE_MANIFEST present; capture checkboxes remain open in pack docs.",
  },
  {
    task_type: "EDITING",
    title: "CapCut editing / master export",
    status: "DONE",
    notes: "Final master: PUBLISH/EP001_FutureHerAfrica_FINAL.mp4",
  },
  { task_type: "THUMBNAIL", title: "Thumbnail", status: "DONE", notes: "PUBLISH/08_THUMBNAIL.png (1280×720)." },
  { task_type: "SEO", title: "SEO optimisation", status: "DONE", notes: "PUBLISH/11_SEO.txt + UPLOAD_PACK." },
  {
    task_type: "UPLOAD",
    title: "Upload workflow",
    status: "NOT_STARTED",
    notes: "Channel @FutureHerAfrica not confirmed live in pack docs.",
  },
  { task_type: "COMMUNITY", title: "Community posts", status: "DONE", notes: "PUBLISH/13_COMMUNITY_POST.txt ready." },
  { task_type: "ANALYTICS", title: "Analytics review", status: "NOT_STARTED", notes: null },
  { task_type: "AFFILIATE", title: "Affiliate integration", status: "NOT_STARTED", notes: null },
  { task_type: "SPONSORSHIP", title: "Sponsorship workflow", status: "NOT_STARTED", notes: null },
  {
    task_type: "QC",
    title: "Pre-publish QC",
    status: "IN_PROGRESS",
    notes: "Pack PASS; gate still has human export / audio / copyright checks open.",
  },
];

function fileMeta(relativePath) {
  const abs = path.join(ROOT, ...relativePath.split("/"));
  if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
    return null;
  }
  const buf = fs.readFileSync(abs);
  const stat = fs.statSync(abs);
  return {
    filename: path.basename(abs),
    file_size_bytes: stat.size,
    checksum: `sha256:${crypto.createHash("sha256").update(buf).digest("hex")}`,
  };
}

async function upsertShow(client) {
  const { rows } = await client.query(
    `
    INSERT INTO shows (slug, name, description, primary_language)
    VALUES (
      'futureherafrica',
      'FutureHerAfrica',
      'FutureHerAfrica — calm AI readiness education for African women.',
      'en'
    )
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = now()
    RETURNING id;
    `
  );
  return rows[0].id;
}

async function upsertSeason(client, showId) {
  const { rows } = await client.query(
    `
    INSERT INTO seasons (show_id, season_number, title, slug, description)
    VALUES (
      $1,
      1,
      'Season 1 — FutureHerAfrica · AI',
      'season-1-ai',
      'Series framing from EP001 pack: FutureHerAfrica · AI · T001 · The Task Layer'
    )
    ON CONFLICT (show_id, season_number) DO UPDATE SET
      title = EXCLUDED.title,
      slug = EXCLUDED.slug,
      updated_at = now()
    RETURNING id;
    `,
    [showId]
  );
  return rows[0].id;
}

async function upsertEpisode(client, showId, seasonId) {
  // Metadata from UPLOAD_PACK / 00_INDEX / EP001_READY_FOR_PUBLISH — not invented.
  const title = "AI won't replace you — but ignoring this will";
  const slug = "ep001-ai-wont-replace-you-task-layer";
  const description =
    "FutureHerAfrica · AI · T001 · The Task Layer. Pack status PASS (EP001_READY_FOR_PUBLISH.md). Final video present at PUBLISH/EP001_FutureHerAfrica_FINAL.mp4.";

  const { rows } = await client.query(
    `
    INSERT INTO episodes (
      show_id, season_id, episode_number, code, title, slug, description,
      primary_language, status,
      production_status, script_status, voiceover_status, edit_status, qc_status, publish_status
    ) VALUES (
      $1, $2, 1, 'EP001', $3, $4, $5,
      'en', 'PACKAGED',
      'COMPLETE', 'COMPLETE', 'IN_PROGRESS', 'COMPLETE', 'IN_PROGRESS', 'READY'
    )
    ON CONFLICT (show_id, code) DO UPDATE SET
      title = EXCLUDED.title,
      slug = EXCLUDED.slug,
      description = EXCLUDED.description,
      status = EXCLUDED.status,
      production_status = EXCLUDED.production_status,
      script_status = EXCLUDED.script_status,
      voiceover_status = EXCLUDED.voiceover_status,
      edit_status = EXCLUDED.edit_status,
      qc_status = EXCLUDED.qc_status,
      publish_status = EXCLUDED.publish_status,
      season_id = EXCLUDED.season_id,
      episode_number = EXCLUDED.episode_number,
      updated_at = now()
    RETURNING id;
    `,
    [showId, seasonId, title, slug, description]
  );
  return rows[0].id;
}

async function upsertAsset(client, episodeId, spec) {
  const meta = fileMeta(spec.relative_path);
  if (!meta) {
    console.warn(`skip missing file: ${spec.relative_path}`);
    return null;
  }

  const { rows } = await client.query(
    `
    INSERT INTO production_assets (
      episode_id, asset_type, name, filename, relative_path,
      storage_url, mime_type, file_size_bytes, checksum, version, status
    ) VALUES (
      $1, $2::fha_asset_type, $3, $4, $5,
      NULL, $6, $7, $8, 1, 'CURRENT'
    )
    ON CONFLICT (episode_id, relative_path) DO UPDATE SET
      asset_type = EXCLUDED.asset_type,
      name = EXCLUDED.name,
      filename = EXCLUDED.filename,
      mime_type = EXCLUDED.mime_type,
      file_size_bytes = EXCLUDED.file_size_bytes,
      checksum = EXCLUDED.checksum,
      status = 'CURRENT',
      updated_at = now()
    RETURNING id, version;
    `,
    [
      episodeId,
      spec.asset_type,
      spec.name,
      meta.filename,
      spec.relative_path,
      spec.mime_type,
      meta.file_size_bytes,
      meta.checksum,
    ]
  );

  const assetId = rows[0].id;
  const version = rows[0].version;

  await client.query(
    `
    INSERT INTO asset_versions (
      asset_id, version_number, filename, path, storage_url,
      checksum, file_size_bytes, notes
    ) VALUES ($1, $2, $3, $4, NULL, $5, $6, $7)
    ON CONFLICT (asset_id, version_number) DO UPDATE SET
      filename = EXCLUDED.filename,
      path = EXCLUDED.path,
      checksum = EXCLUDED.checksum,
      file_size_bytes = EXCLUDED.file_size_bytes,
      notes = EXCLUDED.notes;
    `,
    [
      assetId,
      version,
      meta.filename,
      spec.relative_path,
      meta.checksum,
      meta.file_size_bytes,
      spec.notes ?? null,
    ]
  );

  return assetId;
}

async function syncTasks(client, episodeId) {
  for (const t of TASK_SPECS) {
    const existing = await client.query(
      `
      SELECT id FROM production_tasks
      WHERE episode_id = $1 AND task_type = $2::fha_task_type AND title = $3
      LIMIT 1;
      `,
      [episodeId, t.task_type, t.title]
    );

    const completedAt = t.status === "DONE" ? new Date().toISOString() : null;

    if (existing.rows.length) {
      await client.query(
        `
        UPDATE production_tasks SET
          status = $2::fha_task_status,
          notes = $3,
          completed_at = CASE
            WHEN $2::fha_task_status = 'DONE' THEN COALESCE(completed_at, now())
            ELSE NULL
          END,
          updated_at = now()
        WHERE id = $1;
        `,
        [existing.rows[0].id, t.status, t.notes]
      );
    } else {
      await client.query(
        `
        INSERT INTO production_tasks (
          episode_id, task_type, title, status, priority, notes, completed_at
        ) VALUES (
          $1, $2::fha_task_type, $3, $4::fha_task_status, 'NORMAL', $5,
          CASE WHEN $4::fha_task_status = 'DONE' THEN now() ELSE NULL END
        );
        `,
        [episodeId, t.task_type, t.title, t.status, t.notes]
      );
    }
  }
}

async function syncApprovals(client, episodeId, videoAssetId, scriptAssetId) {
  const specs = [
    {
      approval_type: "SCRIPT_APPROVAL",
      status: "APPROVED",
      asset_id: scriptAssetId,
      notes: "Final script present; pack marked PASS.",
      approved_by: "pack-qa",
    },
    {
      approval_type: "VO_APPROVAL",
      status: "PENDING",
      asset_id: null,
      notes: "VO scripts registered; WAV not present on disk.",
      approved_by: null,
    },
    {
      approval_type: "VIDEO_APPROVAL",
      status: "APPROVED",
      asset_id: videoAssetId,
      notes: "EP001_FutureHerAfrica_FINAL.mp4 registered at PUBLISH path.",
      approved_by: "production",
    },
    {
      approval_type: "QC_APPROVAL",
      status: "PENDING",
      asset_id: null,
      notes: "Pre-publish gate still has open human checks.",
      approved_by: null,
    },
    {
      approval_type: "PUBLISH_APPROVAL",
      status: "PENDING",
      asset_id: null,
      notes: "Not published; channel live status unresolved in pack docs.",
      approved_by: null,
    },
  ];

  for (const a of specs) {
    const existing = await client.query(
      `
      SELECT id FROM approvals
      WHERE episode_id = $1 AND approval_type = $2::fha_approval_type
      LIMIT 1;
      `,
      [episodeId, a.approval_type]
    );

    if (existing.rows.length) {
      await client.query(
        `
        UPDATE approvals SET
          asset_id = $2,
          status = $3::fha_approval_status,
          approved_by = $4,
          approved_at = CASE
            WHEN $3::fha_approval_status = 'APPROVED' THEN COALESCE(approved_at, now())
            ELSE NULL
          END,
          notes = $5,
          updated_at = now()
        WHERE id = $1;
        `,
        [existing.rows[0].id, a.asset_id, a.status, a.approved_by, a.notes]
      );
    } else {
      await client.query(
        `
        INSERT INTO approvals (
          episode_id, asset_id, approval_type, status, approved_by, approved_at, notes
        ) VALUES (
          $1, $2, $3::fha_approval_type, $4::fha_approval_status, $5,
          CASE WHEN $4::fha_approval_status = 'APPROVED' THEN now() ELSE NULL END,
          $6
        );
        `,
        [episodeId, a.asset_id, a.approval_type, a.status, a.approved_by, a.notes]
      );
    }
  }
}

async function syncPublishing(client, episodeId) {
  // No fabricated platform URLs or post IDs — pending YouTube only.
  const existing = await client.query(
    `
    SELECT id FROM publishing_records
    WHERE episode_id = $1 AND platform = 'youtube'
    LIMIT 1;
    `,
    [episodeId]
  );

  const notes =
    "Target platform YouTube (@FutureHerAfrica). No platform_post_id yet. Upload pack ready.";

  if (existing.rows.length) {
    await client.query(
      `
      UPDATE publishing_records SET
        status = 'NOT_STARTED',
        notes = $2,
        updated_at = now()
      WHERE id = $1;
      `,
      [existing.rows[0].id, notes]
    );
  } else {
    await client.query(
      `
      INSERT INTO publishing_records (episode_id, platform, status, notes)
      VALUES ($1, 'youtube', 'NOT_STARTED', $2);
      `,
      [episodeId, notes]
    );
  }
}

async function main() {
  if (!fs.existsSync(EP_DIR)) {
    throw new Error(`EP001 directory missing: ${EP_DIR}`);
  }

  const finalRel = "launch/EP001/PUBLISH/EP001_FutureHerAfrica_FINAL.mp4";
  if (!fileMeta(finalRel)) {
    throw new Error(`Required final video missing on disk: ${finalRel}`);
  }

  const pool = createPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const showId = await upsertShow(client);
    const seasonId = await upsertSeason(client, showId);
    const episodeId = await upsertEpisode(client, showId, seasonId);

    let videoAssetId = null;
    let scriptAssetId = null;

    for (const spec of ASSET_SPECS) {
      const id = await upsertAsset(client, episodeId, spec);
      if (spec.relative_path === finalRel) videoAssetId = id;
      if (spec.relative_path === "launch/EP001/PUBLISH/01_FINAL_SCRIPT.txt") {
        scriptAssetId = id;
      }
    }

    await syncTasks(client, episodeId);
    await syncApprovals(client, episodeId, videoAssetId, scriptAssetId);
    await syncPublishing(client, episodeId);

    await client.query("COMMIT");

    const summary = await client.query(
      `
      SELECT
        e.code,
        e.title,
        e.slug,
        e.status,
        (SELECT count(*)::int FROM production_assets a WHERE a.episode_id = e.id) AS assets,
        (SELECT count(*)::int FROM production_tasks t WHERE t.episode_id = e.id) AS tasks,
        (SELECT count(*)::int FROM approvals ap WHERE ap.episode_id = e.id) AS approvals,
        (SELECT count(*)::int FROM publishing_records p WHERE p.episode_id = e.id) AS publishes
      FROM episodes e
      WHERE e.id = $1;
      `,
      [episodeId]
    );

    console.log("EP001 seed complete:");
    console.log(summary.rows[0]);
    console.log(`Final video asset id: ${videoAssetId}`);
    console.log(`Final video path: ${finalRel}`);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
