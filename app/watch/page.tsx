import { FeaturedVideo } from "@/components/media/FeaturedVideo";
import { PlaylistStrip } from "@/components/media/PlaylistStrip";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { YOUTUBE_CHANNEL } from "@/lib/catalog";
import { getPublicCatalog, listedCatalog } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Watch",
  description:
    "Watch FutureHerAfrica lessons on YouTube. Playlists for AI fluency and money systems, organised as a calm public classroom.",
  path: "/watch",
});

export default async function WatchPage() {
  const catalog = listedCatalog(await getPublicCatalog());

  return (
    <>
      <section className="hero">
        <div className="container">
          <Logo on="ink" variant="mark" linked={false} className="logo--page" />
          <p className="eyebrow">Watch</p>
          <h1>The FutureHer Africa classroom</h1>
          <hr className="woven-rule" />
          <p className="lede">
            Video lives on YouTube. This hub organises the show, season, playlists, and episode
            metadata so you can find the next practical lesson without the noise.
          </p>
          <div className="actions">
            <Button href={YOUTUBE_CHANNEL.url} external>
              Open @{YOUTUBE_CHANNEL.handle}
            </Button>
            <Button href={YOUTUBE_CHANNEL.playlistsUrl} variant="secondary" external>
              YouTube playlists
            </Button>
          </div>
        </div>
      </section>

      {catalog.featured ? (
        <section className="section section--night">
          <div className="container container--wide">
            <p className="eyebrow">Featured</p>
            <h2 className="sr-only">Featured episode</h2>
            <FeaturedVideo episode={catalog.featured} />
          </div>
        </section>
      ) : (
        <section className="section section--night">
          <div className="container container--wide">
            <div className="cinema-empty">
              <p className="eyebrow">Now showing</p>
              <h2>Lessons go live on the channel.</h2>
              <p className="lede">
                Published episodes appear here. Until then, the classroom is on YouTube.
              </p>
              <div className="actions">
                <Button href={YOUTUBE_CHANNEL.url} external>
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {catalog.playlists.map((playlist) => (
        <PlaylistStrip key={playlist.slug} playlist={playlist} />
      ))}
    </>
  );
}
