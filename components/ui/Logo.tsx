import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  on?: "ink" | "stone";
  priority?: boolean;
};

export function Logo({ on = "ink", priority = false }: LogoProps) {
  const src = on === "ink" ? "/brand/logo-ivory.svg" : "/brand/logo-ink.svg";

  return (
    <Link href="/" className="logo">
      <Image src={src} alt="FutureHer home" width={168} height={36} priority={priority} />
    </Link>
  );
}
