import Image from "next/image";
import { isValidYouTubeVideoId, YOUTUBE_CHANNEL } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { seriesMeta, type PublicEpisode } from "@/lib/content";

type FeaturedVideoProps = {
  episode: PublicEpisode;
  showCopy?: boolean;
  showDetailsLink?: boolean;
};

export function FeaturedVideo({
  episode,
  showCopy = true,
  showDetailsLink = true,
}: FeaturedVideoProps) {
  const series = seriesMeta(episode.series);
  const videoId = isValidYouTubeVideoId(episode.youtubeVideoId)
    ? episode.youtubeVideoId
    : null;

  if (videoId) {
    return (
      <section
        aria-label={showCopy ? undefined : `${episode.title} video`}
        aria-labelledby={showCopy ? "featured-heading" : undefined}
      >
        <YouTubeEmbed videoId={videoId} title={episode.title} />
        {showCopy ? (
          <div style={{ marginTop: "1.25rem" }}>
            <p className="eyebrow">{series.lockup}</p>
            <h3 id="featured-heading" className="h2">
              {episode.title}
            </h3>
            <p className="lede">{episode.synopsis}</p>
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section
      aria-label={showCopy ? undefined : `${episode.title} video status`}
      aria-labelledby={showCopy ? "featured-heading" : undefined}
    >
      <div className="video-frame video-frame--fallback">
        <div className="video-fallback">
          {episode.thumbnailPath ? (
            <Image
              src={episode.thumbnailPath}
              alt=""
              fill
              sizes="(max-width: 800px) 100vw, 72rem"
              style={{ objectFit: "cover", zIndex: 0 }}
            />
          ) : null}
          <div style={{ position: "relative", zIndex: 2 }}>
            <p className="eyebrow">{series.lockup}</p>
            {showCopy ? (
              <h3 id="featured-heading" className="h2">
                {episode.title}
              </h3>
            ) : (
              <p className="h2" aria-hidden="true">
                {episode.title}
              </p>
            )}
            <p>
              This lesson is packaged for the FutureHerAfrica classroom. The YouTube video
              identifier has not been recorded yet — watch on the channel when it is live.
            </p>
            <div className="actions">
              <Button href={YOUTUBE_CHANNEL.url} variant="primary" external>
                Watch on YouTube
              </Button>
              {showDetailsLink ? (
                <Button href={`/shows/${episode.showSlug}/${episode.slug}`} variant="secondary">
                  Episode details
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
