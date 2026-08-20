import Link from "next/link";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { Logo } from "@/components/ui/Logo";
import { getPublicCatalog, listedCatalog } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Shows",
  description:
    "FutureHerAfrica Season 1 — structured episodes across AI fluency and money systems, with publication state and YouTube identifiers when available.",
  path: "/shows",
});

export default async function ShowsPage() {
  const catalog = listedCatalog(await getPublicCatalog());

  return (
    <>
      <section className="hero">
        <div className="container">
          <Logo on="ink" variant="mark" linked={false} className="logo--page" />
          <p className="eyebrow">Read</p>
          <h1>{catalog.show.name}</h1>
          <hr className="woven-rule" />
          <p className="lede">{catalog.show.description}</p>
        </div>
      </section>
      <section className="section section--paper">
        <div className="container">
          <article className="card card--editorial">
            <div className="card__body">
              <p className="eyebrow">Show</p>
              <h2>
                <Link href={`/shows/${catalog.show.slug}`}>{catalog.show.name}</Link>
              </h2>
              <p>
                {catalog.season.title}. {catalog.season.description}
              </p>
              <p className="meta">
                <span>
                  {catalog.episodes.length} published episode{catalog.episodes.length === 1 ? "" : "s"}
                </span>
                <span>@{catalog.show.youtubeHandle}</span>
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="section section--night">
        <div className="container container--wide">
          <div className="section-head">
            <div>
              <p className="eyebrow">{catalog.season.title}</p>
              <h2>Episodes</h2>
            </div>
          </div>
          {catalog.episodes.length > 0 ? (
            <div className="editorial-grid">
              {catalog.episodes.map((episode, index) => (
                <EpisodeCard
                  key={episode.code}
                  episode={episode}
                  href={`/shows/${episode.showSlug}/${episode.slug}`}
                  variant={index === 0 ? "featured" : index % 3 === 1 ? "portrait" : "standard"}
                />
              ))}
            </div>
          ) : (
            <p className="lede">Published episode records appear here.</p>
          )}
        </div>
      </section>
    </>
  );
}
