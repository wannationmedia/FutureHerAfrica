import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  params: Promise<{ showSlug: string; episodeSlug: string }>;
};

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const catalog = listedCatalog(await getPublicCatalog());
  return catalog.episodes.map((episode) => ({
    showSlug: episode.showSlug,
    episodeSlug: episode.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { showSlug, episodeSlug } = await params;
  const episode = await getEpisodeBySlug(episodeSlug);
  if (!episode || episode.showSlug !== showSlug || !isListedEpisode(episode)) {
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
  });
}

export default async function EpisodePage({ params }: PageProps) {
  const { showSlug, episodeSlug } = await params;
  const episode = await getEpisodeBySlug(episodeSlug);
  if (!episode || episode.showSlug !== showSlug || !isListedEpisode(episode)) notFound();
  const series = seriesMeta(episode.series);

  return (
    <>
      <section className="hero">
        <div className="container">
          <Logo on="ink" variant="mark" linked={false} className="logo--page" />
          <p className="eyebrow">
            {episode.seasonTitle} · {episode.code}
          </p>
          <h1>{episode.title}</h1>
          <hr className="woven-rule" />
          <p className="lede">{episode.synopsis}</p>
        </div>
      </section>
      <section className="section section--night">
        <div className="container container--wide split">
          <FeaturedVideo episode={episode} showCopy={false} showDetailsLink={false} />
          <article className="card card--editorial">
            <div className="card__body">
              <h2 className="h3">Episode record</h2>
              <ul className="meta meta--stack">
                <li>Show · FutureHerAfrica</li>
                <li>Season · {episode.seasonTitle}</li>
                <li>Series · {series.lockup}</li>
                <li>Title · {episode.title}</li>
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
