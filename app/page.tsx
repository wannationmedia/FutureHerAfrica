import { Button } from "@/components/ui/Button";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { FeaturedVideo } from "@/components/media/FeaturedVideo";
import { YOUTUBE_CHANNEL } from "@/lib/catalog";
import { getPublicCatalog } from "@/lib/content";

export default async function HomePage() {
  const catalog = await getPublicCatalog();
  const featured = catalog.featured;
  const more = catalog.episodes.slice(1, 4);

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Welcome forward</p>
          <h1 className="display">Ready for what’s next.</h1>
          <p className="lede">
            FutureHer is a multilingual educational media company helping African women become
            future-ready. YouTube is the public classroom. The work is practical: one idea, one skill,
            one action you can take today.
          </p>
          <div className="actions">
            <Button href="/watch">Watch</Button>
            <Button href="/shows" variant="secondary">
              Explore episodes
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="prose">
            <p className="eyebrow">Mission</p>
            <h2>Build readiness, not noise.</h2>
            <hr className="horizon-rule" />
            <p>
              FutureHer teaches women how to think, decide, earn, build, and lead in a world shaped by
              AI, economic pressure, and accelerating change — with practical skills they can use today.
            </p>
            <p>
              The geographic mandate begins in Limpopo, then South Africa, Africa, and the diaspora.
              Psychology supports every lesson. It is never the headline.
            </p>
          </div>
          <div className="card">
            <div className="card__body">
              <p className="eyebrow">The media proposition</p>
              <h3>A calm classroom</h3>
              <p>
                Every lesson gives you one idea, one practical skill, and one action for today. We are
                an educational media company, not a hustle channel.
              </p>
              <p>
                Join The Forward Collective on YouTube for challenges, worksheets, and calm weekly
                practice.
              </p>
              <div className="actions">
                <Button href={YOUTUBE_CHANNEL.url} variant="ghost" external>
                  @{YOUTUBE_CHANNEL.handle}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured</p>
              <h2>Current lesson</h2>
            </div>
            <Button href="/watch" variant="ghost">
              Open the watch hub
            </Button>
          </div>
          <FeaturedVideo episode={featured} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{catalog.show.name}</p>
              <h2>More from Season 1</h2>
            </div>
          </div>
          <div className="grid grid--3">
            {more.map((episode) => (
              <EpisodeCard key={episode.code} episode={episode} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
