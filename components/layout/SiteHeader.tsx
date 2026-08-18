"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch" },
  { href: "/shows", label: "Shows" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo on="ink" priority />
        <nav aria-label="Primary">
          <ul className="nav">
            {links.map((link) => {
              const current =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link href={link.href} aria-current={current ? "page" : undefined}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
