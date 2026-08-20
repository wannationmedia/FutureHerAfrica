import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { YOUTUBE_CHANNEL } from "@/lib/catalog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "FutureHer Africa is a multilingual educational media company helping African women become future-ready. Tagline: Ready for what’s next.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1 className="about-brand">
            <Logo on="ink" variant="lockup" linked={false} className="logo--about" />
            <span className="sr-only">FutureHer Africa</span>
          </h1>
          <hr className="woven-rule" />
          <p className="lede">
            A multilingual educational media company helping African women become future-ready.
            Not a lifestyle influencer brand. Not hustle-culture motivation media.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container prose">
          <p className="eyebrow">Greeting</p>
          <h2>Welcome forward.</h2>
          <p>
            <strong>Tagline:</strong> Ready for what’s next.
          </p>
          <p>
            FutureHer does not create noise. FutureHer creates readiness — and a place to practice it
            together.
          </p>
          <hr className="woven-rule" />
          <h2>Mission</h2>
          <p>
            Build the most trusted multilingual educational media brand for women in South Africa,
            beginning in Limpopo and expanding across Africa.
          </p>
          <p>
            FutureHer teaches women how to think, decide, earn, build, and lead in a world shaped by
            AI, economic pressure, and accelerating change — with practical skills they can use today.
          </p>
          <h2>What we teach</h2>
          <ul>
            <li>Technology and AI — fluency without intimidation</li>
            <li>Digital skills — tools that compound on a phone or basic computer</li>
            <li>Entrepreneurship — practical building, not motivation</li>
            <li>Financial literacy — clarity, systems, and dignity with money</li>
            <li>Careers and employability — positioning, communication, and proof</li>
            <li>Confidence and communication — presence without performance theatre</li>
            <li>Productivity — calm systems that survive real life</li>
            <li>Lifelong learning — adaptability as a permanent practice</li>
          </ul>
          <h2>What FutureHer is</h2>
          <ul>
            <li>An educational media startup</li>
            <li>A trust brand for future-ready women</li>
            <li>A content → community → education → commerce pipeline</li>
            <li>Long-term South African / African intellectual property</li>
            <li>A multilingual access project rooted in Limpopo</li>
          </ul>
          <h2>What FutureHer is not</h2>
          <ul>
            <li>Not a creator brand chasing algorithms as identity</li>
            <li>Not an influencer lifestyle brand</li>
            <li>Not hustle-culture motivation media</li>
            <li>Not a therapy substitute or clinical service</li>
            <li>Not a “girlboss” parody of ambition</li>
            <li>Not a trend farm disguised as education</li>
          </ul>
          <h2>The classroom</h2>
          <p>
            FutureHerAfrica teaches South African women how to get ready for what’s next — AI,
            careers, money, and digital skills — without the noise. Every lesson gives you one idea,
            one practical skill, and one action you can take today.
          </p>
          <p>
            Psychology supports the lesson. It never becomes the headline. Community brand: The
            Forward Collective.
          </p>
          <div className="actions">
            <Button href={YOUTUBE_CHANNEL.url} external>
              @{YOUTUBE_CHANNEL.handle}
            </Button>
            <Button href="/watch" variant="ghost">
              Watch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
