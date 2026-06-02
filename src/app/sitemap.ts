import type { MetadataRoute } from "next";
import { siteUrl, locales, serviceSlugs } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    });
    entries.push({
      url: `${siteUrl}/${locale}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
    for (const slug of serviceSlugs) {
      entries.push({
        url: `${siteUrl}/${locale}/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
