import type { Metadata } from "next";
import { Montserrat, Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { site, seo, siteUrl } from "@/data/content";

/* English headings — premium, clean */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

/* English body — highly readable */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

/* Thai — covers both headings and body for Thai copy */
const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: site.fullName }],
  openGraph: {
    type: "website",
    locale: seo.locale,
    alternateLocale: seo.alternateLocale,
    url: siteUrl,
    siteName: site.fullName,
    title: `${site.fullName} | ${site.nameTh}`,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} | ${site.nameTh}`,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${montserrat.variable} ${inter.variable} ${notoThai.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
