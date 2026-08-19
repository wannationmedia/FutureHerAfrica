import type { CatalogShow, SeriesKey } from "@/lib/catalog";
import { getPublicCatalog, type PublicCatalog, type PublicEpisode, type PublicPlaylist } from "@/lib/content";

export type PublishedCatalog = Omit<PublicCatalog, "featured"> & {
  featured: PublicEpisode | null;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EPISODE_CODE_PATTERN = /^EP\d{3}$/i;

export function isCatalogSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

export function isEpisodeCode(value: string): boolean {
  return EPISODE_CODE_PATTERN.test(value);
}

function isPublished(episode: PublicEpisode): boolean {
  return episode.publishStatus === "PUBLISHED";
}

export function selectPublishedCatalog(catalog: PublicCatalog): PublishedCatalog {
  const episodes = catalog.episodes.filter(isPublished);
  const playlists: PublicPlaylist[] = catalog.playlists
    .map((playlist) => {
      const publishedEpisodes = playlist.episodes.filter(isPublished);
      return {
        ...playlist,
        episodes: publishedEpisodes,
        episodeCodes: publishedEpisodes.map((episode) => episode.code),
      };
    })
    .filter((playlist) => playlist.episodes.length > 0);

  return {
    source: catalog.source,
    show: catalog.show,
    season: catalog.season,
    episodes,
    playlists,
    featured: episodes[0] ?? null,
  };
}

/** Mutable load seam so tests can inject mixed PUBLISHED/DRAFT catalogues without Prisma. */
export const publishedCatalogSource = {
  load: getPublicCatalog,
};

export async function getPublishedCatalog(): Promise<PublishedCatalog> {
  return selectPublishedCatalog(await publishedCatalogSource.load());
}

export type AgentEpisode = {
  code: string;
  episodeNumber: number;
  title: string;
  slug: string;
  synopsis: string;
  description: string;
  series: SeriesKey;
  thumbnailPath: string | null;
  youtubeVideoId: string | null;
  publishStatus: "PUBLISHED";
  primaryLanguage: PublicEpisode["primaryLanguage"];
  showSlug: string;
  seasonSlug: string;
  seasonTitle: string;
  path: string;
};

export type AgentShow = CatalogShow & {
  path: string;
  season: PublishedCatalog["season"];
};

export function toAgentEpisode(episode: PublicEpisode): AgentEpisode {
  return {
    code: episode.code,
    episodeNumber: episode.episodeNumber,
    title: episode.title,
    slug: episode.slug,
    synopsis: episode.synopsis,
    description: episode.description,
    series: episode.series,
    thumbnailPath: episode.thumbnailPath,
    youtubeVideoId: episode.youtubeVideoId,
    publishStatus: "PUBLISHED",
    primaryLanguage: episode.primaryLanguage,
    showSlug: episode.showSlug,
    seasonSlug: episode.seasonSlug,
    seasonTitle: episode.seasonTitle,
    path: `/watch/${episode.slug}`,
  };
}

export function toAgentShow(catalog: PublishedCatalog): AgentShow {
  return {
    ...catalog.show,
    path: `/shows/${catalog.show.slug}`,
    season: catalog.season,
  };
}

export function findPublishedEpisode(
  catalog: PublishedCatalog,
  selector: { slug?: string; code?: string }
): PublicEpisode | null {
  if (selector.slug) {
    if (!isCatalogSlug(selector.slug)) return null;
    return catalog.episodes.find((episode) => episode.slug === selector.slug) ?? null;
  }
  if (selector.code) {
    const code = selector.code.toUpperCase();
    if (!isEpisodeCode(code)) return null;
    return catalog.episodes.find((episode) => episode.code === code) ?? null;
  }
  return null;
}
