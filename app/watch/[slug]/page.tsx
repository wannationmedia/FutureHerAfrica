import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturedVideo } from "@/components/media/FeaturedVideo";
import { Button } from "@/components/ui/Button";
import {
  isValidYouTubeVideoId,
  publishLabel,
  youtubeThumbnailUrl,
  YOUTUBE_CHANNEL,
} from "@/lib/catalog";
import { getEpisodeBySlug, getPublicCatalog, seriesMeta } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const catalog = await getPublicCatalog();
  return catalog.episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode) return { title: "Episode", robots: { index: false, follow: true } };
  const image = episode.thumbnailPath
    ?? (isValidYouTubeVideoId(episode.youtubeVideoId)
      ? youtubeThumbnailUrl(episode.youtubeVideoId)
      : null);
  return createPageMetadata({
    title: episode.title,
    description: episode.synopsis,
    path: `/watch/${episode.slug}`,
    image,
    noIndex: episode.publishStatus !== "PUBLISHED",
  });
}

export default async function WatchEpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode) notFound();
  const series = seriesMeta(episode.series);

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">
            {series.lockup} · {episode.code}
          </p>
          <h1>{episode.title}</h1>
          <p className="lede">{episode.synopsis}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <FeaturedVideo episode={episode} showCopy={false} />
          <div className="prose" style={{ marginTop: "2rem" }}>
            <ul className="meta">
              <li>{episode.seasonTitle}</li>
              <li>{publishLabel(episode.publishStatus)}</li>
              <li>{episode.primaryLanguage.toUpperCase()}</li>
            </ul>
            {episode.description.split("\n").map((line) => (
              <p key={line}>{line}</p>
            ))}
            <div className="actions">
              <Button href="/watch" variant="ghost">
                Back to Watch
              </Button>
              <Button href={`/shows/${episode.showSlug}/${episode.slug}`} variant="ghost">
                Full episode record
              </Button>
              <Button href={YOUTUBE_CHANNEL.url} variant="ghost" external>
                Channel
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
