import Link from "next/link";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { getPublicCatalog } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Shows",
  description:
    "FutureHerAfrica Season 1 — structured episodes across AI fluency and money systems, with publication state and YouTube identifiers when available.",
  path: "/shows",
});

export default async function ShowsPage() {
  const catalog = await getPublicCatalog();

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Shows</p>
          <h1>{catalog.show.name}</h1>
          <p className="lede">{catalog.show.description}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <article className="card">
            <div className="card__body">
              <p className="eyebrow">Show</p>
              <h2>
                <Link href={`/shows/${catalog.show.slug}`}>{catalog.show.name}</Link>
              </h2>
              <p>{catalog.season.title}. {catalog.season.description}</p>
              <p className="meta">
                <span>{catalog.episodes.length} episodes</span>
                <span>@{catalog.show.youtubeHandle}</span>
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{catalog.season.title}</p>
              <h2>Episodes</h2>
            </div>
          </div>
          <div className="grid grid--3">
            {catalog.episodes.map((episode) => (
              <EpisodeCard
                key={episode.code}
                episode={episode}
                href={`/shows/${episode.showSlug}/${episode.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
