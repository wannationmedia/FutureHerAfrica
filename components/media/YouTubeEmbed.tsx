import { isValidYouTubeVideoId, youtubeEmbedUrl } from "@/lib/catalog";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  if (!isValidYouTubeVideoId(videoId)) return null;

  return (
    <div className="video-frame">
      <iframe
        title={`YouTube video: ${title}`}
        src={youtubeEmbedUrl(videoId)}
        allow="encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
