import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container prose">
        <p className="eyebrow">404</p>
        <h1>This page is not on the map.</h1>
        <p>The classroom is still here. Choose a path that exists.</p>
        <p>
          <Link href="/">Home</Link>
          {" · "}
          <Link href="/watch">Watch</Link>
          {" · "}
          <Link href="/shows">Shows</Link>
        </p>
      </div>
    </section>
  );
}
