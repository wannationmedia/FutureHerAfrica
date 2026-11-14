import { isLocalVideoPath } from "@/lib/catalog";

type LocalVideoProps = {
  src: string;
  title: string;
  poster?: string | null;
};

export function LocalVideo({ src, title, poster }: LocalVideoProps) {
  if (!isLocalVideoPath(src)) return null;

  return (
    <div className="video-frame">
      <video
        controls
        playsInline
        preload="metadata"
        poster={poster ?? undefined}
        title={title}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
