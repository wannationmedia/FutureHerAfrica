"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { YOUTUBE_CHANNEL } from "@/lib/catalog";

const links = [
  { href: "/", label: "Discover" },
  { href: "/watch", label: "Watch" },
  { href: "/shows", label: "Read" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const navId = useId();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 799px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const navigation = (
    <ul className="nav">
      {links.map((link) => {
        const current =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={current ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo on="ink" variant="lockup" priority className="logo--masthead" />
        <nav
          className="site-header__nav site-header__nav--desktop"
          aria-label="Primary"
          inert={isMobile || undefined}
        >
          {navigation}
        </nav>
        <div className="site-header__end">
          <a
            className="button button--subscribe site-header__subscribe"
            href={YOUTUBE_CHANNEL.communityUrl}
            rel="noopener noreferrer"
          >
            Subscribe
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={navId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav-toggle__bars" aria-hidden="true" />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
        <nav
          id={navId}
          className={`site-header__nav site-header__nav--mobile${open ? " is-open" : ""}`}
          aria-label="Primary"
          inert={!isMobile || !open ? true : undefined}
        >
          <div className="mobile-nav__brand">
            <Logo on="ink" variant="lockup" className="logo--mobile-nav" />
            <p className="mobile-nav__kicker">A FutureHer Africa publication</p>
          </div>
          {navigation}
          <a
            className="button button--subscribe"
            href={YOUTUBE_CHANNEL.communityUrl}
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  );
}
