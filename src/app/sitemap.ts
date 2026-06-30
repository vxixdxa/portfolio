import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

// Static (non-localized) route segments. "" is the home page.
const staticPaths = ["", "/about"];

// Note: per-URL hreflang alternates aren't supported by Next 13's sitemap type.
// The hreflang links are instead emitted in each page's <head> via
// generateMetadata's `alternates.languages`, which Google reads equivalently.
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(`/${locale}${path}`),
        changeFrequency: path === "" ? "monthly" : "yearly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  for (const project of projects) {
    const path = `/projects/${project.slug}`;
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(`/${locale}${path}`),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
