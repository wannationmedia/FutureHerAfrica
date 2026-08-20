import type { Metadata } from "next";

export const SITE_NAME = "FutureHer Africa";
export const SITE_URL = "https://futureher.africa";
export const SITE_LOGO = "/brand/futureher-africa/futureher-africa-apple-touch-1024.png";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} · ${SITE_NAME}`;
  const images = [{ url: image || SITE_LOGO, alt: SITE_NAME }];

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_ZA",
      type: "website",
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      images,
    },
  };
}
