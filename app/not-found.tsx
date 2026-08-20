import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section section--paper">
      <div className="container prose">
        <Logo on="stone" variant="mark" className="logo--page" />
        <p className="eyebrow">404</p>
        <h1>This page is not on the map.</h1>
        <hr className="woven-rule" />
        <p>The classroom is still here. Choose a path that exists.</p>
        <p>
          <Link href="/">Discover</Link>
          {" · "}
          <Link href="/watch">Watch</Link>
          {" · "}
          <Link href="/shows">Read</Link>
        </p>
      </div>
    </section>
  );
}
