import { Button } from "@/components/ui/Button";
import { MediaPoster } from "@/components/media/MediaPoster";
import { PlayGlyph } from "@/components/media/PlayGlyph";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { isValidYouTubeVideoId, YOUTUBE_CHANNEL } from "@/lib/catalog";
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
        className="media-stage media-stage--cinema"
        aria-label={showCopy ? undefined : `${episode.title} video`}
        aria-labelledby={showCopy ? "featured-heading" : undefined}
      >
        <YouTubeEmbed videoId={videoId} title={episode.title} />
        {showCopy ? (
          <div className="media-stage__copy">
            <p className="eyebrow">{series.lockup}</p>
            <h3 id="featured-heading" className="h2">
              {episode.title}
            </h3>
            <p className="lede">{episode.synopsis}</p>
            <p className="meta media-stage__meta">
              <span>{episode.code}</span>
              <span>{episode.seasonTitle}</span>
            </p>
          </div>
        ) : null}
      </section>
    );
  }

  return (
      <section
        className="media-stage media-stage--cinema"
        aria-label={showCopy ? undefined : `${episode.title} video status`}
        aria-labelledby={showCopy ? "featured-heading" : undefined}
      >
      <div className="video-frame video-frame--fallback">
        <div className="video-fallback">
          <MediaPoster
            episode={episode}
            sizes="(max-width: 800px) 100vw, 72rem"
            alt=""
          />
          <div className="video-fallback__content">
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
                <PlayGlyph className="play-glyph play-glyph--inline" />
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
