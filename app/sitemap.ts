import type { MetadataRoute } from "next";
import { primaryNav } from "@/lib/content/navigation";
import { getAllNewsSlugs } from "@/lib/content/news";
import { getSiteUrl } from "@/lib/seo/site-url";

function collectNavPaths(): string[] {
  const paths = new Set<string>(["/", "/news", "/search", "/cookie-policy"]);
  for (const item of primaryNav) {
    paths.add(item.href);
    for (const child of item.children ?? []) {
      paths.add(child.href);
    }
  }
  for (const slug of getAllNewsSlugs()) {
    paths.add(`/news/${slug}`);
  }
  return [...paths].sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return collectNavPaths().map((path) => {
    const url = path === "/" ? `${base}/` : `${base}${path}`;
    const isHome = path === "/";
    const isNews = path.startsWith("/news");
    return {
      url,
      lastModified: now,
      changeFrequency: isHome ? "daily" : isNews ? "weekly" : "monthly",
      priority: isHome ? 1 : isNews ? 0.8 : 0.7,
    };
  });
}
