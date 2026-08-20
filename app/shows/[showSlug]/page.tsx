import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { Logo } from "@/components/ui/Logo";
import { getPublicCatalog, getShowBySlug, listedCatalog } from "@/lib/content";
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
  const listed = listedCatalog(catalog);

  return (
    <>
      <section className="hero">
        <div className="container">
          <Logo on="ink" variant="mark" linked={false} className="logo--page" />
          <p className="eyebrow">Show</p>
          <h1>{catalog.show.name}</h1>
          <hr className="woven-rule" />
          <p className="lede">{catalog.show.description}</p>
        </div>
      </section>
      <section className="section section--night">
        <div className="container container--wide">
          <p className="eyebrow">{catalog.season.title}</p>
          <h2>Season record</h2>
          <p className="lede">{catalog.season.description}</p>
          {listed.episodes.length > 0 ? (
            <div className="editorial-grid editorial-grid--follow">
              {listed.episodes.map((episode, index) => (
                <EpisodeCard
                  key={episode.code}
                  episode={episode}
                  href={`/shows/${catalog.show.slug}/${episode.slug}`}
                  variant={index === 0 ? "featured" : index % 2 === 0 ? "portrait" : "standard"}
                />
              ))}
            </div>
          ) : (
            <p className="lede">Published episodes will be recorded here.</p>
          )}
        </div>
      </section>
    </>
  );
}
