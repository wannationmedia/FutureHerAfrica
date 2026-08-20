import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Flag } from "@/components/ui/Flag";
import { Logo } from "@/components/ui/Logo";
import { seriesMeta, type PublicEpisode } from "@/lib/content";

type EditorialHeroProps = {
  episode: PublicEpisode | null;
  showName: string;
  showDescription: string;
};

export function EditorialHero({ episode, showName, showDescription }: EditorialHeroProps) {
  const series = episode ? seriesMeta(episode.series) : null;
  const heading = episode?.title ?? "Ready for what’s next.";
  const lede = episode?.synopsis ?? showDescription;

  return (
    <section className="editorial-hero" aria-labelledby="hero-heading">
      <div className="editorial-hero__media" aria-hidden={Boolean(episode?.thumbnailPath)}>
        {episode?.thumbnailPath ? (
          <Image
            src={episode.thumbnailPath}
            alt=""
            fill
            priority
            sizes="100vw"
            className="editorial-hero__image"
          />
        ) : (
          <div className="editorial-hero__placeholder">
            <span className="editorial-hero__motif" aria-hidden="true" />
          </div>
        )}
        <div className="editorial-hero__veil" />
        <div className="editorial-hero__grain" aria-hidden="true" />
      </div>
      <div className="editorial-hero__content">
        <p className="kicker">
          {episode ? (
            <>
              <Flag>Featured</Flag>
              <span>{showName}</span>
            </>
          ) : (
            <>
              <Logo on="ink" variant="mark" linked={false} className="logo--kicker" />
              <span>A FutureHer Africa publication</span>
            </>
          )}
        </p>
        <h1 id="hero-heading" className="display display--hero">
          {heading}
        </h1>
        <hr className="woven-rule" />
        <p className="lede lede--hero">{lede}</p>
        <div className="actions">
          {episode ? (
            <>
              <Button href={`/watch/${episode.slug}`}>Watch the lesson</Button>
              <Button href={`/shows/${episode.showSlug}/${episode.slug}`} variant="secondary">
                Read the record
              </Button>
            </>
          ) : (
            <>
              <Button href="/watch">Watch</Button>
              <Button href="/shows" variant="secondary">
                Read
              </Button>
            </>
          )}
        </div>
        {episode && series ? (
          <p className="hero-indicator">
            <span>{episode.code}</span>
            <span aria-hidden="true">·</span>
            <span>{series.lockup}</span>
            <span aria-hidden="true">·</span>
            <span>{episode.seasonTitle}</span>
          </p>
        ) : (
          <p className="hero-indicator">
            <span>Watch</span>
            <span aria-hidden="true">·</span>
            <span>Read</span>
            <span aria-hidden="true">·</span>
            <span>Learn</span>
          </p>
        )}
      </div>
    </section>
  );
}
