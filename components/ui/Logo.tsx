import Image from "next/image";
import Link from "next/link";

const ASSETS = {
  ink: {
    mark: "/brand/futureher-africa/futureher-africa-mark-ivory.svg",
    wordmark: "/brand/futureher-africa/futureher-africa-wordmark-ivory.svg",
    primary: "/brand/futureher-africa/futureher-africa-primary-ivory.svg",
  },
  stone: {
    mark: "/brand/futureher-africa/futureher-africa-mark-ink.svg",
    wordmark: "/brand/futureher-africa/futureher-africa-wordmark-ink.svg",
    primary: "/brand/futureher-africa/futureher-africa-primary-ink.svg",
  },
} as const;

type LogoProps = {
  on?: "ink" | "stone";
  variant?: "lockup" | "mark" | "wordmark" | "primary";
  priority?: boolean;
  linked?: boolean;
  className?: string;
};

export function Logo({
  on = "ink",
  variant = "lockup",
  priority = false,
  linked = true,
  className,
}: LogoProps) {
  const assets = ASSETS[on];
  const classes = ["logo", `logo--${on === "ink" ? "ivory" : "ink"}`, `logo--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const inner =
    variant === "primary" ? (
      <Image
        src={assets.primary}
        alt=""
        width={640}
        height={760}
        priority={priority}
      />
    ) : variant === "mark" ? (
      <Image
        className="logo__mark"
        src={assets.mark}
        alt=""
        width={280}
        height={300}
        priority={priority}
      />
    ) : variant === "wordmark" ? (
      <Image
        className="logo__wordmark"
        src={assets.wordmark}
        alt=""
        width={640}
        height={168}
        priority={priority}
      />
    ) : (
      <>
        <Image
          className="logo__mark"
          src={assets.mark}
          alt=""
          width={280}
          height={300}
          priority={priority}
        />
        <Image
          className="logo__wordmark"
          src={assets.wordmark}
          alt=""
          width={640}
          height={168}
          priority={priority}
        />
      </>
    );

  if (!linked) {
    return (
      <span className={classes} aria-hidden="true">
        {inner}
      </span>
    );
  }

  return (
    <Link href="/" className={classes} aria-label="FutureHer Africa home">
      {inner}
    </Link>
  );
}
