import type { Metadata } from "next";

export const SITE_NAME = "FutureHer";
export const SITE_URL = "https://futureher.africa";

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
  const images = image ? [{ url: image }] : undefined;

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
