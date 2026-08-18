-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "EpisodeStatus" AS ENUM ('IDEA', 'BRIEF', 'RESEARCHED', 'CLAIMS_CLEARED', 'SCRIPTED', 'RECORDED', 'VISUALS_READY', 'EDITED', 'PACKAGED', 'SCHEDULED', 'PUBLISHED', 'REVIEWED');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('NOT_STARTED', 'DRAFT', 'SCHEDULED', 'PUBLISHED', 'UNLISTED', 'PRIVATE', 'FAILED', 'REMOVED');

-- CreateTable
CREATE TABLE "shows" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "primary_language" TEXT NOT NULL DEFAULT 'en',
    "youtube_handle" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "shows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" UUID NOT NULL,
    "show_id" UUID NOT NULL,
    "season_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" UUID NOT NULL,
    "show_id" UUID NOT NULL,
    "season_id" UUID NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "synopsis" TEXT,
    "description" TEXT,
    "primary_language" TEXT NOT NULL DEFAULT 'en',
    "series_lockup" TEXT NOT NULL,
    "thumbnail_path" TEXT,
    "status" "EpisodeStatus" NOT NULL DEFAULT 'IDEA',
    "publish_status" "PublishStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "youtube_video_id" TEXT,
    "published_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlists" (
    "id" UUID NOT NULL,
    "show_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "series_lockup" TEXT NOT NULL,
    "youtube_playlist_id" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist_items" (
    "id" UUID NOT NULL,
    "playlist_id" UUID NOT NULL,
    "episode_id" UUID NOT NULL,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "playlist_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishing_records" (
    "id" UUID NOT NULL,
    "episode_id" UUID NOT NULL,
    "platform" TEXT NOT NULL,
    "platform_asset_url" TEXT,
    "platform_post_id" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "scheduled_at" TIMESTAMPTZ(6),
    "published_at" TIMESTAMPTZ(6),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "publishing_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shows_slug_key" ON "shows"("slug");

-- CreateIndex
CREATE INDEX "seasons_show_id_idx" ON "seasons"("show_id");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_show_id_season_number_key" ON "seasons"("show_id", "season_number");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_show_id_slug_key" ON "seasons"("show_id", "slug");

-- CreateIndex
CREATE INDEX "episodes_show_id_idx" ON "episodes"("show_id");

-- CreateIndex
CREATE INDEX "episodes_season_id_idx" ON "episodes"("season_id");

-- CreateIndex
CREATE INDEX "episodes_status_idx" ON "episodes"("status");

-- CreateIndex
CREATE INDEX "episodes_publish_status_idx" ON "episodes"("publish_status");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_show_id_code_key" ON "episodes"("show_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_show_id_slug_key" ON "episodes"("show_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_season_id_episode_number_key" ON "episodes"("season_id", "episode_number");

-- CreateIndex
CREATE INDEX "playlists_show_id_idx" ON "playlists"("show_id");

-- CreateIndex
CREATE UNIQUE INDEX "playlists_show_id_slug_key" ON "playlists"("show_id", "slug");

-- CreateIndex
CREATE INDEX "playlist_items_playlist_id_idx" ON "playlist_items"("playlist_id");

-- CreateIndex
CREATE INDEX "playlist_items_episode_id_idx" ON "playlist_items"("episode_id");

-- CreateIndex
CREATE UNIQUE INDEX "playlist_items_playlist_id_episode_id_key" ON "playlist_items"("playlist_id", "episode_id");

-- CreateIndex
CREATE INDEX "publishing_records_episode_id_idx" ON "publishing_records"("episode_id");

-- CreateIndex
CREATE INDEX "publishing_records_platform_idx" ON "publishing_records"("platform");

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_items" ADD CONSTRAINT "playlist_items_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_items" ADD CONSTRAINT "playlist_items_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publishing_records" ADD CONSTRAINT "publishing_records_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
