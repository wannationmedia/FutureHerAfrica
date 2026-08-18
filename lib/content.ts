import { cache } from "react";
import {
  EPISODES,
  PLAYLISTS,
  SEASON,
  SERIES,
  SHOW,
  episodeBySlug as staticEpisodeBySlug,
  featuredEpisode as staticFeaturedEpisode,
  type CatalogEpisode,
  type CatalogPlaylist,
  type CatalogSeason,
  type CatalogShow,
} from "@/lib/catalog";
import { getPrisma } from "@/lib/prisma";

export type PublicEpisode = CatalogEpisode & {
  showSlug: string;
  seasonSlug: string;
  seasonTitle: string;
};

export type PublicPlaylist = CatalogPlaylist & {
  episodes: PublicEpisode[];
};

export type PublicCatalog = {
  source: "database" | "catalog";
  show: CatalogShow;
  season: CatalogSeason;
  episodes: PublicEpisode[];
  playlists: PublicPlaylist[];
  featured: PublicEpisode;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

function toPublicEpisode(episode: CatalogEpisode): PublicEpisode {
  return {
    ...episode,
    showSlug: SHOW.slug,
    seasonSlug: SEASON.slug,
    seasonTitle: SEASON.title,
  };
}

function fromStatic(): PublicCatalog {
  const episodes = EPISODES.map(toPublicEpisode);
  return {
    source: "catalog",
    show: SHOW,
    season: SEASON,
    episodes,
    playlists: PLAYLISTS.map((playlist) => ({
      ...playlist,
      episodes: playlist.episodeCodes
        .map((code) => episodes.find((episode) => episode.code === code))
        .filter((episode): episode is PublicEpisode => Boolean(episode)),
    })),
    featured: toPublicEpisode(staticFeaturedEpisode()),
  };
}

function seriesKeyFromLockup(lockup: string): CatalogEpisode["series"] {
  if (lockup.includes("Money")) return "MONEY";
  return "AI";
}

async function fromDatabase(): Promise<PublicCatalog | null> {
  const prisma = getPrisma();
  if (!prisma) return null;

  try {
    const show = await prisma.show.findUnique({
      where: { slug: SHOW.slug },
      include: {
        seasons: { orderBy: { seasonNumber: "asc" } },
        episodes: { orderBy: { episodeNumber: "asc" } },
        playlists: {
          orderBy: { sortOrder: "asc" },
          include: {
            items: {
              orderBy: { sortOrder: "asc" },
              include: { episode: true },
            },
          },
        },
      },
    });

    if (!show || show.episodes.length === 0) return null;

    const season = show.seasons[0];
    if (!season) return null;

    const episodes: PublicEpisode[] = show.episodes
      .filter((episode) => isValidSlug(episode.slug))
      .map((episode) => {
        const series = seriesKeyFromLockup(episode.seriesLockup);
        return {
          code: episode.code,
          episodeNumber: episode.episodeNumber,
          title: episode.title,
          slug: episode.slug,
          synopsis: episode.synopsis ?? episode.description ?? "",
          description: episode.description ?? "",
          series,
          thumbnailPath: episode.thumbnailPath,
          youtubeVideoId: episode.youtubeVideoId,
          status: episode.status,
          publishStatus: episode.publishStatus,
          primaryLanguage: "en",
          showSlug: show.slug,
          seasonSlug: season.slug,
          seasonTitle: season.title,
        };
      });

    if (episodes.length === 0) return null;

    const playlists: PublicPlaylist[] = show.playlists.map((playlist) => ({
      slug: playlist.slug,
      title: playlist.title,
      description: playlist.description ?? "",
      series: seriesKeyFromLockup(playlist.seriesLockup),
      youtubePlaylistId: playlist.youtubePlaylistId,
      episodeCodes: playlist.items.map((item) => item.episode.code),
      episodes: playlist.items
        .map((item) => episodes.find((episode) => episode.code === item.episode.code))
        .filter((episode): episode is PublicEpisode => Boolean(episode)),
    }));

    return {
      source: "database",
      show: {
        slug: show.slug,
        name: show.name,
        description: show.description ?? SHOW.description,
        primaryLanguage: "en",
        youtubeHandle: show.youtubeHandle ?? SHOW.youtubeHandle,
      },
      season: {
        seasonNumber: season.seasonNumber,
        slug: season.slug,
        title: season.title,
        description: season.description ?? SEASON.description,
      },
      episodes,
      playlists:
        playlists.length > 0
          ? playlists
          : PLAYLISTS.map((playlist) => ({
              ...playlist,
              episodes: playlist.episodeCodes
                .map((code) => episodes.find((episode) => episode.code === code))
                .filter((episode): episode is PublicEpisode => Boolean(episode)),
            })),
      featured: episodes[0],
    };
  } catch (error) {
    console.warn("[futureher] Database catalog unavailable; using static catalog.", error);
    return null;
  }
}

export const getPublicCatalog = cache(async function getPublicCatalog(): Promise<PublicCatalog> {
  return (await fromDatabase()) ?? fromStatic();
});

export async function getEpisodeBySlug(slug: string): Promise<PublicEpisode | null> {
  if (!isValidSlug(slug)) return null;
  const catalog = await getPublicCatalog();
  return catalog.episodes.find((episode) => episode.slug === slug) ?? null;
}

export async function getShowBySlug(slug: string) {
  if (!isValidSlug(slug)) return null;
  const catalog = await getPublicCatalog();
  if (catalog.show.slug !== slug) return null;
  return catalog;
}

export function seriesMeta(series: CatalogEpisode["series"]) {
  return SERIES[series];
}

export { staticEpisodeBySlug };
