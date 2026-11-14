import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}

export function Section({
  children,
  mist = false,
  labelledBy,
}: {
  children: ReactNode;
  mist?: boolean;
  labelledBy?: string;
}) {
  return (
    <section className={mist ? "section section--mist" : "section"} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
