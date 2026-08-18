import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { getPublicCatalog, getShowBySlug } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ showSlug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const catalog = await getPublicCatalog();
  return [{ showSlug: catalog.show.slug }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { showSlug } = await params;
  const catalog = await getShowBySlug(showSlug);
  if (!catalog) return { title: "Show", robots: { index: false, follow: true } };
  return createPageMetadata({
    title: catalog.show.name,
    description: catalog.show.description,
    path: `/shows/${catalog.show.slug}`,
  });
}

export default async function ShowPage({ params }: PageProps) {
  const { showSlug } = await params;
  const catalog = await getShowBySlug(showSlug);
  if (!catalog) notFound();

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Show</p>
          <h1>{catalog.show.name}</h1>
          <p className="lede">{catalog.show.description}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">{catalog.season.title}</p>
          <h2>Season record</h2>
          <p className="lede">{catalog.season.description}</p>
          <div className="grid grid--3" style={{ marginTop: "2rem" }}>
            {catalog.episodes.map((episode) => (
              <EpisodeCard
                key={episode.code}
                episode={episode}
                href={`/shows/${catalog.show.slug}/${episode.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
