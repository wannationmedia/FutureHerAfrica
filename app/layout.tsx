import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Medium.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Satoshi-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

const rootTitle = "FutureHer — Ready for what’s next.";
const rootDescription =
  "FutureHer is a multilingual educational media company helping African women become future-ready through practical lessons in AI, careers, money, and digital skills.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: rootTitle,
    template: "%s · FutureHer",
  },
  description: rootDescription,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: rootTitle,
    description: rootDescription,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: rootTitle,
    description: rootDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={`${satoshi.variable} ${newsreader.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
