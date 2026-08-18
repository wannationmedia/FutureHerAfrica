import { PrismaClient } from "@prisma/client";
import {
  EPISODES,
  PLAYLISTS,
  SEASON,
  SERIES,
  SHOW,
  YOUTUBE_CHANNEL,
  youtubeWatchUrl,
} from "../lib/catalog";

function assertFutureHerDatabase(url: string) {
  const pathname = url.replace(/^postgresql:/, "http:");
  let database = "";
  try {
    database = new URL(pathname).pathname.replace(/^\//, "").split("?")[0];
  } catch {
    database = url;
  }
  if (/wannation/i.test(url) || database === "wannation_os") {
    throw new Error(
      "Refusing to seed: DATABASE_URL points at a WANNATION database. Use a dedicated `futureher` database."
    );
  }
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes("<PASSWORD>")) {
    throw new Error("Set DATABASE_URL to the dedicated futureher database before seeding.");
  }
  assertFutureHerDatabase(url);

  const prisma = new PrismaClient({ datasources: { db: { url } } });

  try {
    const show = await prisma.show.upsert({
      where: { slug: SHOW.slug },
      update: {
        name: SHOW.name,
        description: SHOW.description,
        primaryLanguage: SHOW.primaryLanguage,
        youtubeHandle: SHOW.youtubeHandle,
      },
      create: {
        slug: SHOW.slug,
        name: SHOW.name,
        description: SHOW.description,
        primaryLanguage: SHOW.primaryLanguage,
        youtubeHandle: SHOW.youtubeHandle,
      },
    });

    const season = await prisma.season.upsert({
      where: {
        showId_seasonNumber: {
          showId: show.id,
          seasonNumber: SEASON.seasonNumber,
        },
      },
      update: {
        title: SEASON.title,
        slug: SEASON.slug,
        description: SEASON.description,
      },
      create: {
        showId: show.id,
        seasonNumber: SEASON.seasonNumber,
        title: SEASON.title,
        slug: SEASON.slug,
        description: SEASON.description,
      },
    });

    for (const episode of EPISODES) {
      const saved = await prisma.episode.upsert({
        where: {
          showId_code: {
            showId: show.id,
            code: episode.code,
          },
        },
        update: {
          seasonId: season.id,
          episodeNumber: episode.episodeNumber,
          title: episode.title,
          slug: episode.slug,
          synopsis: episode.synopsis,
          description: episode.description,
          primaryLanguage: episode.primaryLanguage,
          seriesLockup: SERIES[episode.series].lockup,
          thumbnailPath: episode.thumbnailPath,
          status: episode.status,
          publishStatus: episode.publishStatus,
          youtubeVideoId: episode.youtubeVideoId,
          publishedAt: null,
        },
        create: {
          showId: show.id,
          seasonId: season.id,
          episodeNumber: episode.episodeNumber,
          code: episode.code,
          title: episode.title,
          slug: episode.slug,
          synopsis: episode.synopsis,
          description: episode.description,
          primaryLanguage: episode.primaryLanguage,
          seriesLockup: SERIES[episode.series].lockup,
          thumbnailPath: episode.thumbnailPath,
          status: episode.status,
          publishStatus: episode.publishStatus,
          youtubeVideoId: episode.youtubeVideoId,
          publishedAt: null,
        },
      });

      const publishingRecord = await prisma.publishingRecord.findFirst({
        where: { episodeId: saved.id, platform: "youtube" },
        orderBy: { createdAt: "asc" },
      });

      const publishingData = {
        platformPostId: episode.youtubeVideoId,
        platformAssetUrl: episode.youtubeVideoId
          ? youtubeWatchUrl(episode.youtubeVideoId)
          : null,
        status: episode.publishStatus,
        scheduledAt: null,
        publishedAt: null,
        notes: episode.youtubeVideoId
          ? null
          : `YouTube video identifier not yet recorded. Target channel: @${YOUTUBE_CHANNEL.handle}.`,
      };

      if (publishingRecord) {
        await prisma.publishingRecord.update({
          where: { id: publishingRecord.id },
          data: publishingData,
        });
      } else {
        await prisma.publishingRecord.create({
          data: {
            episodeId: saved.id,
            platform: "youtube",
            ...publishingData,
          },
        });
      }
    }

    for (const [index, playlist] of PLAYLISTS.entries()) {
      const savedPlaylist = await prisma.playlist.upsert({
        where: {
          showId_slug: {
            showId: show.id,
            slug: playlist.slug,
          },
        },
        update: {
          title: playlist.title,
          description: playlist.description,
          seriesLockup: SERIES[playlist.series].lockup,
          youtubePlaylistId: playlist.youtubePlaylistId,
          sortOrder: index,
        },
        create: {
          showId: show.id,
          slug: playlist.slug,
          title: playlist.title,
          description: playlist.description,
          seriesLockup: SERIES[playlist.series].lockup,
          youtubePlaylistId: playlist.youtubePlaylistId,
          sortOrder: index,
        },
      });

      const episodeIds: string[] = [];
      for (const [sortOrder, code] of playlist.episodeCodes.entries()) {
        const episode = await prisma.episode.findUniqueOrThrow({
          where: { showId_code: { showId: show.id, code } },
        });
        episodeIds.push(episode.id);
        await prisma.playlistItem.upsert({
          where: {
            playlistId_episodeId: {
              playlistId: savedPlaylist.id,
              episodeId: episode.id,
            },
          },
          update: { sortOrder },
          create: {
            playlistId: savedPlaylist.id,
            episodeId: episode.id,
            sortOrder,
          },
        });
      }

      await prisma.playlistItem.deleteMany({
        where: {
          playlistId: savedPlaylist.id,
          episodeId: { notIn: episodeIds },
        },
      });
    }

    console.log("FutureHer application seed complete.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
