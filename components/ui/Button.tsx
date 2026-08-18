import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export function Button({ href, children, variant = "primary", external }: ButtonProps) {
  const className = `button button--${variant}`;
  if (external) {
    return (
      <a className={className} href={href} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
