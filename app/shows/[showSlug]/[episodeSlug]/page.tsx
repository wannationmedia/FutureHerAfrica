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
  params: Promise<{ showSlug: string; episodeSlug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const catalog = await getPublicCatalog();
  return catalog.episodes.map((episode) => ({
    showSlug: episode.showSlug,
    episodeSlug: episode.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { showSlug, episodeSlug } = await params;
  const episode = await getEpisodeBySlug(episodeSlug);
  if (!episode || episode.showSlug !== showSlug) {
    return { title: "Episode", robots: { index: false, follow: true } };
  }
  const image = episode.thumbnailPath
    ?? (isValidYouTubeVideoId(episode.youtubeVideoId)
      ? youtubeThumbnailUrl(episode.youtubeVideoId)
      : null);
  return createPageMetadata({
    title: `${episode.code} · ${episode.title}`,
    description: episode.synopsis,
    path: `/watch/${episode.slug}`,
    image,
    noIndex: episode.publishStatus !== "PUBLISHED",
  });
}

export default async function EpisodePage({ params }: PageProps) {
  const { showSlug, episodeSlug } = await params;
  const episode = await getEpisodeBySlug(episodeSlug);
  if (!episode || episode.showSlug !== showSlug) notFound();
  const series = seriesMeta(episode.series);

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">
            {episode.seasonTitle} · {episode.code}
          </p>
          <h1>{episode.title}</h1>
          <p className="lede">{episode.synopsis}</p>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <FeaturedVideo episode={episode} showCopy={false} showDetailsLink={false} />
          <article className="card">
            <div className="card__body">
              <h2 className="h3">Episode record</h2>
              <ul className="meta meta--stack">
                <li>Show · FutureHerAfrica</li>
                <li>Season · {episode.seasonTitle}</li>
                <li>Series · {series.lockup}</li>
                <li>Title · {episode.title}</li>
                <li>Publication · {publishLabel(episode.publishStatus)}</li>
                <li>
                  YouTube ID · {episode.youtubeVideoId ?? "Not recorded yet"}
                </li>
                {episode.thumbnailPath ? <li>Thumbnail on file</li> : <li>Thumbnail pending pack export</li>}
              </ul>
              {episode.description.split("\n").map((line) => (
                <p key={line}>{line}</p>
              ))}
              <div className="actions">
                <Button href={`/watch/${episode.slug}`}>Watch</Button>
                <Button href={YOUTUBE_CHANNEL.url} variant="ghost" external>
                  @{YOUTUBE_CHANNEL.handle}
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
