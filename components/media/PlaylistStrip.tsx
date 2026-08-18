import {
  isValidYouTubePlaylistId,
  playlistWatchUrl,
  YOUTUBE_CHANNEL,
} from "@/lib/catalog";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { Button } from "@/components/ui/Button";
import { seriesMeta, type PublicPlaylist } from "@/lib/content";

type PlaylistStripProps = {
  playlist: PublicPlaylist;
};

export function PlaylistStrip({ playlist }: PlaylistStripProps) {
  const series = seriesMeta(playlist.series);
  const youtubeHref = isValidYouTubePlaylistId(playlist.youtubePlaylistId)
    ? playlistWatchUrl(playlist.youtubePlaylistId)
    : YOUTUBE_CHANNEL.playlistsUrl;

  return (
    <section className="section" aria-labelledby={`playlist-${playlist.slug}`}>
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{series.pill}</p>
            <h2 id={`playlist-${playlist.slug}`}>{playlist.title}</h2>
            <p className="lede">{playlist.description}</p>
          </div>
          <Button href={youtubeHref} variant="ghost" external>
            Open on YouTube
          </Button>
        </div>
        <div className="grid grid--3">
          {playlist.episodes.map((episode) => (
            <EpisodeCard key={episode.code} episode={episode} />
          ))}
        </div>
      </div>
    </section>
  );
}
