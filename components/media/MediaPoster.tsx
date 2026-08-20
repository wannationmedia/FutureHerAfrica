import Image from "next/image";
import { isValidYouTubeVideoId, youtubeThumbnailUrl } from "@/lib/catalog";
import { seriesMeta, type PublicEpisode } from "@/lib/content";

type MediaPosterProps = {
  episode: PublicEpisode;
  sizes: string;
  priority?: boolean;
  alt?: string;
  className?: string;
};

export function MediaPoster({
  episode,
  sizes,
  priority = false,
  alt = "",
  className,
}: MediaPosterProps) {
  const series = seriesMeta(episode.series);
  const imageSrc =
    episode.thumbnailPath ??
    (isValidYouTubeVideoId(episode.youtubeVideoId)
      ? youtubeThumbnailUrl(episode.youtubeVideoId)
      : null);

  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <div
      className={`title-card title-card--${series.token}${className ? ` ${className}` : ""}`}
    >
      <p className="title-card__mark">Still forthcoming</p>
      <p className="title-card__code">{episode.code}</p>
      <p className="title-card__title">{episode.title}</p>
    </div>
  );
}
