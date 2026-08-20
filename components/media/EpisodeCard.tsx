import Link from "next/link";
import { MediaPoster } from "@/components/media/MediaPoster";
import { PlayGlyph } from "@/components/media/PlayGlyph";
import { Flag } from "@/components/ui/Flag";
import { seriesMeta, type PublicEpisode } from "@/lib/content";

type EpisodeCardProps = {
  episode: PublicEpisode;
  href?: string;
  variant?: "featured" | "standard" | "portrait" | "text" | "video" | "strip" | "numbered" | "cinematic";
  index?: number;
  flag?: string;
};

export function EpisodeCard({
  episode,
  href,
  variant = "standard",
  index,
  flag,
}: EpisodeCardProps) {
  const series = seriesMeta(episode.series);
  const destination = href ?? `/watch/${episode.slug}`;
  const number = String(index ?? episode.episodeNumber).padStart(2, "0");
  const layout = variant === "cinematic" || variant === "strip" ? "standard" : variant;
  const sizes =
    layout === "featured"
      ? "(max-width: 800px) 100vw, 58vw"
      : layout === "portrait"
        ? "(max-width: 800px) 80vw, 22rem"
        : "(max-width: 800px) 88vw, 24rem";

  return (
    <article className={`episode-card episode-card--${layout}`}>
      <Link className="episode-card__link" href={destination}>
        {layout === "numbered" ? (
          <span className="episode-card__index" aria-hidden="true">
            {number}
          </span>
        ) : null}
        {layout !== "text" ? (
          <div className="episode-card__media">
            <MediaPoster episode={episode} sizes={sizes} />
            {layout === "video" || layout === "featured" || layout === "standard" || layout === "portrait" ? (
              <span className="episode-card__play" aria-hidden="true">
                <PlayGlyph />
              </span>
            ) : null}
            {layout === "portrait" ? (
              <div className="episode-card__overlay">
                <span className="eyebrow">{series.lockup}</span>
                <h3 className="episode-card__title">{episode.title}</h3>
              </div>
            ) : null}
            {layout !== "numbered" && layout !== "portrait" ? (
              <span className="episode-card__badge">{episode.code}</span>
            ) : null}
          </div>
        ) : null}
        {layout !== "portrait" ? (
          <div className="episode-card__body">
            <div className="meta">
              {flag ? <Flag>{flag}</Flag> : null}
              <span className={`pill pill--${series.token}`}>{series.pill}</span>
              <span>{episode.code}</span>
            </div>
            <h3 className="episode-card__title">{episode.title}</h3>
            {layout === "featured" || layout === "text" ? <p>{episode.synopsis}</p> : null}
            {layout === "standard" || layout === "video" ? (
              <p className="episode-card__deck">{episode.synopsis}</p>
            ) : null}
          </div>
        ) : null}
      </Link>
    </article>
  );
}
