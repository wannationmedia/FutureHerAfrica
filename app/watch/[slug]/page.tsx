import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { FeaturedVideo } from "@/components/media/FeaturedVideo";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import {
  isValidYouTubeVideoId,
  youtubeThumbnailUrl,
  YOUTUBE_CHANNEL,
} from "@/lib/catalog";
import {
  getEpisodeBySlug,
  getPublicCatalog,
  isListedEpisode,
  listedCatalog,
  seriesMeta,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const catalog = listedCatalog(await getPublicCatalog());
  return catalog.episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode || !isListedEpisode(episode)) {
    return { title: "Episode", robots: { index: false, follow: true } };
  }
  const image = episode.thumbnailPath
    ?? (isValidYouTubeVideoId(episode.youtubeVideoId)
      ? youtubeThumbnailUrl(episode.youtubeVideoId)
      : null);
  return createPageMetadata({
    title: episode.title,
    description: episode.synopsis,
    path: `/watch/${episode.slug}`,
    image,
  });
}

export default async function WatchEpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode || !isListedEpisode(episode)) notFound();
  const series = seriesMeta(episode.series);
  const related = listedCatalog(await getPublicCatalog()).episodes
    .filter((entry) => entry.slug !== episode.slug)
    .slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          <Logo on="ink" variant="mark" linked={false} className="logo--page" />
          <p className="eyebrow">
            {series.lockup} · {episode.code}
          </p>
          <h1>{episode.title}</h1>
          <hr className="woven-rule" />
          <p className="lede">{episode.synopsis}</p>
        </div>
      </section>
      <section className="section section--night">
        <div className="container container--wide">
          <FeaturedVideo episode={episode} showCopy={false} />
          <div className="prose media-prose">
            <ul className="meta">
              <li>{episode.seasonTitle}</li>
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
      {related.length > 0 ? (
        <section className="section section--night" aria-labelledby="related-heading">
          <div className="container container--wide">
            <div className="section-head">
              <div>
                <p className="eyebrow">Continue</p>
                <h2 id="related-heading">Related stories</h2>
              </div>
            </div>
            <div className="story-strip">
              {related.map((entry, index) => (
                <EpisodeCard
                  key={entry.code}
                  episode={entry}
                  variant={index === 0 ? "portrait" : "standard"}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
