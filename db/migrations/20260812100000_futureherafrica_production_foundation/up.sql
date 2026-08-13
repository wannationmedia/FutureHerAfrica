-- FutureHerAfrica production management foundation
-- Metadata / workflow only. Media files stay on disk / GitHub.
-- Non-destructive: CREATE IF NOT EXISTS / ADD only. No DROPs.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- Enums (CREATE TYPE is not IF NOT EXISTS on older patterns; use DO blocks)
-- ---------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE fha_episode_status AS ENUM (
    'IDEA',
    'BRIEF',
    'RESEARCHED',
    'CLAIMS_CLEARED',
    'SCRIPTED',
    'RECORDED',
    'VISUALS_READY',
    'EDITED',
    'PACKAGED',
    'SCHEDULED',
    'PUBLISHED',
    'REVIEWED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_stage_status AS ENUM (
    'NOT_STARTED',
    'IN_PROGRESS',
    'BLOCKED',
    'READY',
    'COMPLETE',
    'N_A'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_asset_type AS ENUM (
    'SCRIPT',
    'VOICEOVER',
    'VIDEO',
    'THUMBNAIL',
    'ACTION_CARD',
    'SUBTITLE',
    'DESCRIPTION',
    'SEO',
    'COMMUNITY_POST',
    'PUBLISHING_ASSET',
    'OTHER'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_asset_status AS ENUM (
    'EXPECTED',
    'DRAFT',
    'CURRENT',
    'SUPERSEDED',
    'ARCHIVED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_task_type AS ENUM (
    'RESEARCH',
    'SCRIPT',
    'FACT_CHECKING',
    'VOICEOVER',
    'VISUAL_GENERATION',
    'STOCK_FOOTAGE',
    'EDITING',
    'THUMBNAIL',
    'SEO',
    'UPLOAD',
    'COMMUNITY',
    'ANALYTICS',
    'AFFILIATE',
    'SPONSORSHIP',
    'QC'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_task_status AS ENUM (
    'NOT_STARTED',
    'IN_PROGRESS',
    'BLOCKED',
    'DONE',
    'CANCELLED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_task_priority AS ENUM (
    'LOW',
    'NORMAL',
    'HIGH',
    'CRITICAL'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_approval_type AS ENUM (
    'SCRIPT_APPROVAL',
    'VO_APPROVAL',
    'VIDEO_APPROVAL',
    'QC_APPROVAL',
    'PUBLISH_APPROVAL'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_approval_status AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'WAIVED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE fha_publish_status AS ENUM (
    'NOT_STARTED',
    'DRAFT',
    'SCHEDULED',
    'PUBLISHED',
    'UNLISTED',
    'PRIVATE',
    'FAILED',
    'REMOVED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS shows (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  description     TEXT,
  primary_language TEXT NOT NULL DEFAULT 'en',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS seasons (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id         UUID NOT NULL REFERENCES shows(id) ON DELETE RESTRICT,
  season_number   INTEGER NOT NULL CHECK (season_number > 0),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL,
  description     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (show_id, season_number),
  UNIQUE (show_id, slug)
);

CREATE TABLE IF NOT EXISTS episodes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id             UUID NOT NULL REFERENCES shows(id) ON DELETE RESTRICT,
  season_id           UUID NOT NULL REFERENCES seasons(id) ON DELETE RESTRICT,
  episode_number      INTEGER NOT NULL CHECK (episode_number > 0),
  code                TEXT NOT NULL,
  title               TEXT NOT NULL,
  slug                TEXT NOT NULL,
  description         TEXT,
  primary_language    TEXT NOT NULL DEFAULT 'en',
  -- Overall pipeline status (VIDEO_PRODUCTION_TRACKER.md)
  status              fha_episode_status NOT NULL DEFAULT 'IDEA',
  -- Stage fields for production desk (not a second pipeline)
  production_status   fha_stage_status NOT NULL DEFAULT 'NOT_STARTED',
  script_status       fha_stage_status NOT NULL DEFAULT 'NOT_STARTED',
  voiceover_status    fha_stage_status NOT NULL DEFAULT 'NOT_STARTED',
  edit_status         fha_stage_status NOT NULL DEFAULT 'NOT_STARTED',
  qc_status           fha_stage_status NOT NULL DEFAULT 'NOT_STARTED',
  publish_status      fha_stage_status NOT NULL DEFAULT 'NOT_STARTED',
  target_publish_date DATE,
  published_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (show_id, code),
  UNIQUE (show_id, slug),
  UNIQUE (season_id, episode_number)
);

CREATE TABLE IF NOT EXISTS production_assets (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id        UUID NOT NULL REFERENCES episodes(id) ON DELETE RESTRICT,
  asset_type        fha_asset_type NOT NULL,
  name              TEXT NOT NULL,
  filename          TEXT NOT NULL,
  relative_path     TEXT NOT NULL,
  storage_url       TEXT,
  mime_type         TEXT,
  file_size_bytes   BIGINT CHECK (file_size_bytes IS NULL OR file_size_bytes >= 0),
  checksum          TEXT,
  version           INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  status            fha_asset_status NOT NULL DEFAULT 'CURRENT',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (episode_id, relative_path)
);

CREATE TABLE IF NOT EXISTS asset_versions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id          UUID NOT NULL REFERENCES production_assets(id) ON DELETE CASCADE,
  version_number    INTEGER NOT NULL CHECK (version_number > 0),
  filename          TEXT NOT NULL,
  path              TEXT NOT NULL,
  storage_url       TEXT,
  checksum          TEXT,
  file_size_bytes   BIGINT CHECK (file_size_bytes IS NULL OR file_size_bytes >= 0),
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (asset_id, version_number)
);

CREATE TABLE IF NOT EXISTS production_tasks (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id        UUID NOT NULL REFERENCES episodes(id) ON DELETE RESTRICT,
  task_type         fha_task_type NOT NULL,
  title             TEXT NOT NULL,
  status            fha_task_status NOT NULL DEFAULT 'NOT_STARTED',
  priority          fha_task_priority NOT NULL DEFAULT 'NORMAL',
  assigned_to       TEXT,
  due_date          DATE,
  completed_at      TIMESTAMPTZ,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS approvals (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id        UUID NOT NULL REFERENCES episodes(id) ON DELETE RESTRICT,
  asset_id          UUID REFERENCES production_assets(id) ON DELETE SET NULL,
  approval_type     fha_approval_type NOT NULL,
  status            fha_approval_status NOT NULL DEFAULT 'PENDING',
  approved_by       TEXT,
  approved_at       TIMESTAMPTZ,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS publishing_records (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id          UUID NOT NULL REFERENCES episodes(id) ON DELETE RESTRICT,
  platform            TEXT NOT NULL,
  platform_asset_url  TEXT,
  platform_post_id    TEXT,
  status              fha_publish_status NOT NULL DEFAULT 'NOT_STARTED',
  scheduled_at        TIMESTAMPTZ,
  published_at        TIMESTAMPTZ,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_seasons_show_id ON seasons(show_id);
CREATE INDEX IF NOT EXISTS idx_episodes_show_id ON episodes(show_id);
CREATE INDEX IF NOT EXISTS idx_episodes_season_id ON episodes(season_id);
CREATE INDEX IF NOT EXISTS idx_episodes_status ON episodes(status);
CREATE INDEX IF NOT EXISTS idx_episodes_publish_status ON episodes(publish_status);
CREATE INDEX IF NOT EXISTS idx_production_assets_episode_id ON production_assets(episode_id);
CREATE INDEX IF NOT EXISTS idx_production_assets_type ON production_assets(asset_type);
CREATE INDEX IF NOT EXISTS idx_asset_versions_asset_id ON asset_versions(asset_id);
CREATE INDEX IF NOT EXISTS idx_production_tasks_episode_id ON production_tasks(episode_id);
CREATE INDEX IF NOT EXISTS idx_production_tasks_status ON production_tasks(status);
CREATE INDEX IF NOT EXISTS idx_approvals_episode_id ON approvals(episode_id);
CREATE INDEX IF NOT EXISTS idx_publishing_records_episode_id ON publishing_records(episode_id);
CREATE INDEX IF NOT EXISTS idx_publishing_records_platform ON publishing_records(platform);
