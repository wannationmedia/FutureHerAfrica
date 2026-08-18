import Image from "next/image";
import Link from "next/link";
import { seriesMeta, type PublicEpisode } from "@/lib/content";
import { publishLabel } from "@/lib/catalog";

type EpisodeCardProps = {
  episode: PublicEpisode;
  href?: string;
};

export function EpisodeCard({ episode, href }: EpisodeCardProps) {
  const series = seriesMeta(episode.series);
  const destination = href ?? `/watch/${episode.slug}`;

  return (
    <article className="card">
      <Link className="stretched" href={destination}>
        <div className="card__media">
          {episode.thumbnailPath ? (
            <Image src={episode.thumbnailPath} alt="" fill sizes="(max-width: 800px) 100vw, 22rem" />
          ) : (
            <div className={`placeholder-thumb placeholder-thumb--${series.token}`}>
              <span>{episode.title}</span>
            </div>
          )}
        </div>
        <div className="card__body">
          <div className="meta">
            <span className={`pill pill--${series.token}`}>{series.pill}</span>
            <span>{episode.code}</span>
            <span>{publishLabel(episode.publishStatus)}</span>
          </div>
          <h3 className="h3">{episode.title}</h3>
          <p>{episode.synopsis}</p>
        </div>
      </Link>
    </article>
  );
}
