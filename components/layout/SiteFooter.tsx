import Link from "next/link";
import { YOUTUBE_CHANNEL } from "@/lib/catalog";
import { Logo } from "@/components/ui/Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo on="ink" variant="lockup" className="logo--footer" />
          <p className="site-footer__tagline">Ready for what’s next.</p>
          <hr className="woven-rule" />
          <p className="site-footer__mark">A FutureHer Africa publication</p>
        </div>
        <nav aria-label="Explore">
          <p className="eyebrow">Explore</p>
          <ul className="nav nav--stack">
            <li>
              <Link href="/">Discover</Link>
            </li>
            <li>
              <Link href="/watch">Watch</Link>
            </li>
            <li>
              <Link href="/shows">Read</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Classroom">
          <p className="eyebrow">Classroom</p>
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
