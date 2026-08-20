import Link from "next/link";
import { EditorialHero } from "@/components/home/EditorialHero";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { MediaPoster } from "@/components/media/MediaPoster";
import { PlayGlyph } from "@/components/media/PlayGlyph";
import { Button } from "@/components/ui/Button";
import { Flag } from "@/components/ui/Flag";
import { YOUTUBE_CHANNEL } from "@/lib/catalog";
import { lessonBeats, listedCatalog, seriesMeta, type PublicCatalog } from "@/lib/content";

type EditorialHomeProps = {
  catalog: PublicCatalog;
};

const PILLARS = [
  { title: "Technology and AI", copy: "Fluency without intimidation." },
  { title: "Digital skills", copy: "Tools that compound on a phone or a basic computer." },
  { title: "Entrepreneurship", copy: "Practical building, not motivation." },
  { title: "Financial literacy", copy: "Clarity, systems, and dignity with money." },
  { title: "Careers", copy: "Positioning, communication, and proof." },
  { title: "Presence", copy: "Confidence and communication without performance theatre." },
];

export function EditorialHome({ catalog }: EditorialHomeProps) {
  const listed = listedCatalog(catalog);
  const featured = listed.featured;
  const featuredSeries = featured ? seriesMeta(featured.series) : null;
  const beats = featured ? lessonBeats(featured.description) : null;
  const latest = listed.episodes.filter((episode) => episode.code !== featured?.code).slice(0, 4);
  const watching = listed.playlists[0]?.episodes.slice(0, 6) ?? listed.episodes.slice(0, 6);
  const portraits = listed.episodes.slice(0, 3);

  return (
    <>
      <EditorialHero
        episode={featured}
        showName={catalog.show.name}
        showDescription={catalog.show.description}
      />

      {featured && featuredSeries ? (
        <section className="section section--paper reveal" aria-labelledby="featured-story-heading">
          <div className="container container--wide">
            <div className="section-kicker">
              <p className="eyebrow">Cover story</p>
              <p className="section-kicker__meta">
                {featured.code} · {featured.seasonTitle}
              </p>
            </div>
            <article className="feature-split">
              <Link className="feature-split__media" href={`/watch/${featured.slug}`}>
                <MediaPoster
                  episode={featured}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  alt=""
                />
                <span className="episode-card__play" aria-hidden="true">
                  <PlayGlyph />
                </span>
                <span className="sr-only">Watch {featured.title}</span>
              </Link>
              <div className="feature-split__copy">
                <p className="eyebrow">{featuredSeries.lockup}</p>
                <h2 id="featured-story-heading" className="display display--section">
                  {featured.title}
                </h2>
                <hr className="woven-rule" />
                <p className="lede">{featured.synopsis}</p>
                {beats && (beats.idea || beats.skill || beats.action) ? (
                  <ol className="beat-list">
                    {beats.idea ? (
                      <li>
                        <span>One idea</span>
                        {beats.idea}
                      </li>
                    ) : null}
                    {beats.skill ? (
                      <li>
                        <span>One skill</span>
                        {beats.skill}
                      </li>
                    ) : null}
                    {beats.action ? (
                      <li>
                        <span>One action</span>
                        {beats.action}
                      </li>
                    ) : null}
                  </ol>
                ) : null}
                <div className="actions">
                  <Button href={`/watch/${featured.slug}`}>Watch the lesson</Button>
                  <Button href={`/shows/${featured.showSlug}/${featured.slug}`} variant="ghost">
                    Read the record
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <section className="section section--paper reveal" aria-labelledby="opening-heading">
          <div className="container container--wide feature-split">
            <div>
              <p className="eyebrow">The institution</p>
              <h2 id="opening-heading" className="display display--section">
                Educational media for African women becoming future-ready.
              </h2>
              <hr className="woven-rule" />
              <p className="lede">{catalog.show.description}</p>
              <div className="actions">
                <Button href="/watch">Open the classroom</Button>
                <Button href="/about" variant="ghost">
                  About FutureHer Africa
                </Button>
              </div>
            </div>
            <blockquote className="pull-quote">
              <p>Every lesson gives you one idea, one practical skill, and one action for today.</p>
              <cite>FutureHer Africa</cite>
            </blockquote>
          </div>
        </section>
      )}

      {latest.length > 0 ? (
        <section className="section section--night reveal" aria-labelledby="latest-heading">
          <div className="container container--wide">
            <div className="section-head">
              <div>
                <p className="eyebrow">Latest episodes</p>
                <h2 id="latest-heading" className="display display--section">
                  {catalog.season.title}
                </h2>
              </div>
              <Button href="/watch" variant="secondary">
                Open the watch hub
              </Button>
            </div>
            <div className="story-strip">
              {latest.map((episode, index) => (
                <EpisodeCard
                  key={episode.code}
                  episode={episode}
                  variant={index === 0 ? "featured" : index === 1 ? "portrait" : "video"}
                  flag={index === 0 ? "Editor’s pick" : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section--idea reveal" aria-labelledby="big-idea-heading">
        <div className="container container--narrow">
          <p className="eyebrow">The method</p>
          <h2 id="big-idea-heading" className="display display--idea">
            One idea.
            <br />
            One skill.
            <br />
            One action.
          </h2>
          <hr className="woven-rule woven-rule--center" />
          <p className="lede lede--center">
            Every lesson gives you one idea, one practical skill, and one action for today. We are
            an educational media company, not a hustle channel.
          </p>
        </div>
      </section>

      <section className="section reveal" aria-labelledby="destinations-heading">
        <div className="container container--wide">
          <div className="section-head">
            <div>
              <p className="eyebrow">Enter the house</p>
              <h2 id="destinations-heading" className="display display--section">
                Watch the classroom. Read the record.
              </h2>
            </div>
          </div>
          <div className="destination-grid">
            <Link className="destination-card destination-card--watch" href="/watch">
              <span className="eyebrow">Watch</span>
              <strong>The public classroom</strong>
              <p>Lessons live on YouTube, organised here as a calm media house.</p>
            </Link>
            <Link className="destination-card destination-card--read" href="/shows">
              <span className="eyebrow">Read</span>
              <strong>Season records</strong>
              <p>{catalog.season.description}</p>
            </Link>
          </div>
        </div>
      </section>

      {watching.length > 0 ? (
        <section className="section section--paper reveal" aria-labelledby="watching-heading">
          <div className="container container--wide watching">
            <div className="watching__intro">
              <p className="eyebrow">What we’re watching</p>
              <h2 id="watching-heading" className="display display--section">
                {listed.playlists[0]?.title ?? catalog.show.name}
              </h2>
              <p className="lede">
                {listed.playlists[0]?.description ?? catalog.show.description}
              </p>
              <Button href="/watch" variant="ghost">
                Browse the classroom
              </Button>
            </div>
            <ol className="watch-list">
              {watching.map((episode) => {
                const series = seriesMeta(episode.series);
                return (
                  <li key={episode.code}>
                    <Link className="watch-row" href={`/watch/${episode.slug}`}>
                      <span className="watch-row__index" aria-hidden="true">
                        {String(episode.episodeNumber).padStart(2, "0")}
                      </span>
                      <span className="watch-row__copy">
                        <span className="meta">
                          <span>{episode.code}</span>
                          <span>{series.pill}</span>
                        </span>
                        <span className="watch-row__title">{episode.title}</span>
                      </span>
                      <span className="watch-row__play" aria-hidden="true">
                        <PlayGlyph />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : null}

      {portraits.length > 0 ? (
        <section className="section section--night reveal" aria-labelledby="portrait-heading">
          <div className="container container--wide">
            <div className="section-head">
              <div>
                <p className="eyebrow">Stories in frame</p>
                <h2 id="portrait-heading" className="display display--section">
                  Lessons with presence
                </h2>
              </div>
            </div>
            <div className="portrait-rail">
              {portraits.map((episode, index) => (
                <EpisodeCard
                  key={episode.code}
                  episode={episode}
                  variant={index === 2 ? "text" : "portrait"}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section--future reveal" aria-labelledby="africa-heading">
        <div className="container split split--future">
          <div>
            <p className="eyebrow">Africa’s future</p>
            <h2 id="africa-heading" className="display display--section">
              Build readiness, not noise.
            </h2>
            <hr className="woven-rule" />
            <p>
              FutureHer teaches women how to think, decide, earn, build, and lead in a world shaped
              by AI, economic pressure, and accelerating change — with practical skills they can use
              today.
            </p>
            <p>
              The geographic mandate begins in Limpopo, then South Africa, Africa, and the diaspora.
              Psychology supports every lesson. It is never the headline.
            </p>
          </div>
          <blockquote className="pull-quote">
            <p>Welcome forward.</p>
            <cite>FutureHer Africa</cite>
          </blockquote>
        </div>
      </section>

      <section className="section section--paper reveal" aria-labelledby="skills-heading">
        <div className="container container--wide">
          <div className="section-head">
            <div>
              <p className="eyebrow">The curriculum</p>
              <h2 id="skills-heading" className="display display--section">
                Methods you can keep
              </h2>
            </div>
          </div>
          <ol className="skill-grid">
            {PILLARS.map((pillar, index) => (
              <li key={pillar.title}>
                <article className="skill-card">
                  <span className="skill-card__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--membership reveal" aria-labelledby="membership-heading">
        <div className="container container--wide membership">
          <div className="membership__intro">
            <p className="eyebrow">FutureHer Membership</p>
            <h2 id="membership-heading" className="display display--section">
              A house built to last.
            </h2>
            <p className="lede">
              The public classroom stays free on YouTube. These surfaces mark where the institution
              is heading — membership, collections, events, and learning — without locking what is
              already published.
            </p>
          </div>
          <ul className="membership__signals">
            <li>
              <Flag>Premium</Flag>
              <strong>Premium stories</strong>
              <p>Longer editorial work as the catalogue grows.</p>
            </li>
            <li>
              <Flag>Exclusive</Flag>
              <strong>Exclusive episodes</strong>
              <p>Members-first lessons, when they exist.</p>
            </li>
            <li>
              <Flag>Members</Flag>
              <strong>The Forward Collective</strong>
              <p>Practice, worksheets, and weekly calm on the channel.</p>
            </li>
            <li>
              <Flag>Featured</Flag>
              <strong>Collections & learning</strong>
              <p>Courses, events, and creator opportunities — forthcoming.</p>
            </li>
          </ul>
          <div className="actions">
            <Button href={YOUTUBE_CHANNEL.communityUrl} external>
              Enter the collective
            </Button>
            <Button href="/about" variant="secondary">
              Read the mandate
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--community reveal" aria-labelledby="community-heading">
        <div className="container community">
          <p className="eyebrow">The community</p>
          <h2 id="community-heading" className="display display--section">
            The Forward Collective
          </h2>
          <p className="lede">
            Join The Forward Collective on YouTube for challenges, worksheets, and calm weekly
            practice. The public classroom stays on the channel.
          </p>
          <div className="actions">
            <Button href={YOUTUBE_CHANNEL.communityUrl} external>
              Enter the collective
            </Button>
            <Button href={YOUTUBE_CHANNEL.url} variant="secondary" external>
              @{YOUTUBE_CHANNEL.handle}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
