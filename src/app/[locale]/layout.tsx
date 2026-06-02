import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Montserrat, Inter, Noto_Sans_Thai } from "next/font/google";
import "../globals.css";
import {
  site,
  siteUrl,
  locales,
  isLocale,
  getDictionary,
  type Locale,
} from "@/data/content";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "th") as Locale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.seo.home.title,
      template: `%s | ${site.fullName}`,
    },
    description: dict.seo.home.description,
    keywords: dict.seo.keywords,
    authors: [{ name: site.fullName }],
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        th: `${siteUrl}/th`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/th`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? "en_US" : "th_TH",
      url: `${siteUrl}/${locale}`,
      siteName: site.fullName,
      title: `${site.fullName} | ${site.nameTh}`,
      description: dict.seo.home.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.fullName} | ${site.nameTh}`,
      description: dict.seo.home.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  if (!isLocale(params.locale)) notFound();

  return (
    <html
      lang={params.locale}
      className={`${montserrat.variable} ${inter.variable} ${notoThai.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
