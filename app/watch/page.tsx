import { FeaturedVideo } from "@/components/media/FeaturedVideo";
import { PlaylistStrip } from "@/components/media/PlaylistStrip";
import { Button } from "@/components/ui/Button";
import { YOUTUBE_CHANNEL } from "@/lib/catalog";
import { getPublicCatalog } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Watch",
  description:
    "Watch FutureHerAfrica lessons on YouTube. Playlists for AI fluency and money systems, organised as a calm public classroom.",
  path: "/watch",
});

export default async function WatchPage() {
  const catalog = await getPublicCatalog();

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Watch</p>
          <h1>The FutureHer classroom</h1>
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

      <section className="section">
        <div className="container">
          <p className="eyebrow">Featured</p>
          <h2 className="sr-only">Featured episode</h2>
          <FeaturedVideo episode={catalog.featured} />
        </div>
      </section>

      {catalog.playlists.map((playlist) => (
        <PlaylistStrip key={playlist.slug} playlist={playlist} />
      ))}
    </>
  );
}
