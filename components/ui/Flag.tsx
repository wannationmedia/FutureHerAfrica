import type { ReactNode } from "react";

type FlagProps = {
  children: ReactNode;
  tone?: "brass" | "ivory" | "paper";
};

export function Flag({ children, tone = "brass" }: FlagProps) {
  return <span className={`flag flag--${tone}`}>{children}</span>;
}
