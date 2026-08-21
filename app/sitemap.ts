import type { MetadataRoute } from "next";
import { getPublicCatalog } from "@/lib/content";
import { SITE_URL } from "@/lib/metadata";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getPublicCatalog();
  const publishedEpisodes = catalog.episodes.filter(
    (episode) => episode.publishStatus === "PUBLISHED"
  );
  const paths = [
    "",
    "/watch",
    "/shows",
    "/about",
    `/shows/${catalog.show.slug}`,
    ...publishedEpisodes.map((episode) => `/watch/${episode.slug}`),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
