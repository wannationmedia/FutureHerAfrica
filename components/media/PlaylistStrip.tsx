import {
  isValidYouTubePlaylistId,
  playlistWatchUrl,
  YOUTUBE_CHANNEL,
} from "@/lib/catalog";
import { EpisodeCard } from "@/components/media/EpisodeCard";
import { Button } from "@/components/ui/Button";
import { isListedEpisode, seriesMeta, type PublicPlaylist } from "@/lib/content";

type PlaylistStripProps = {
  playlist: PublicPlaylist;
};

export function PlaylistStrip({ playlist }: PlaylistStripProps) {
  const series = seriesMeta(playlist.series);
  const episodes = playlist.episodes.filter(isListedEpisode);
  const youtubeHref = isValidYouTubePlaylistId(playlist.youtubePlaylistId)
    ? playlistWatchUrl(playlist.youtubePlaylistId)
    : YOUTUBE_CHANNEL.playlistsUrl;

  if (episodes.length === 0) return null;

  return (
    <section className="section section--night" aria-labelledby={`playlist-${playlist.slug}`}>
      <div className="container container--wide">
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
        <div className="story-strip">
          {episodes.map((episode, index) => (
            <EpisodeCard
              key={episode.code}
              episode={episode}
              variant={index === 0 ? "featured" : index === 1 ? "portrait" : "video"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
