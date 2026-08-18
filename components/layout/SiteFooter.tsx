import Link from "next/link";
import { YOUTUBE_CHANNEL } from "@/lib/catalog";
import { Logo } from "@/components/ui/Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Logo on="ink" />
          <p>Ready for what’s next.</p>
          <p>Welcome forward.</p>
        </div>
        <nav aria-label="Explore">
          <h2 className="h3">Explore</h2>
          <ul className="nav nav--stack">
            <li>
              <Link href="/watch">Watch</Link>
            </li>
            <li>
              <Link href="/shows">Shows & episodes</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Classroom">
          <h2 className="h3">Classroom</h2>
          <ul className="nav nav--stack">
            <li>
              <a href={YOUTUBE_CHANNEL.url} rel="noopener noreferrer">
                YouTube · @{YOUTUBE_CHANNEL.handle}
              </a>
            </li>
            <li>
              <a href={YOUTUBE_CHANNEL.communityUrl} rel="noopener noreferrer">
                The Forward Collective
              </a>
            </li>
            <li>
              <a href={YOUTUBE_CHANNEL.playlistsUrl} rel="noopener noreferrer">
                Playlists
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
