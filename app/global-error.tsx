"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-ZA">
      <body className="fh-earth">
        <main id="main" className="site-main">
          <section className="section section--paper">
            <div className="container prose">
              <Logo on="stone" variant="mark" linked={false} className="logo--page" />
              <p className="eyebrow">Error</p>
              <h1>This page could not be loaded.</h1>
              <hr className="woven-rule" />
              <p>The classroom is still here. Try again, or choose a path that exists.</p>
              {error.digest ? <p className="meta">Reference {error.digest}</p> : null}
              <div className="actions">
                <button type="button" className="button button--ghost" onClick={() => reset()}>
                  Try again
                </button>
                <Link className="button button--ghost" href="/">
                  Discover
                </Link>
                <Link className="button button--ghost" href="/watch">
                  Watch
                </Link>
                <Link className="button button--ghost" href="/shows">
                  Read
                </Link>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
