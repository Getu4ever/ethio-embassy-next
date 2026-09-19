import type { MetadataRoute } from "next";
import { listNewsPosts } from "@/lib/cms/news";
import { primaryNav } from "@/lib/content/navigation";
import { getSiteUrl } from "@/lib/seo/site-url";

async function collectNavPaths(): Promise<string[]> {
  const paths = new Set<string>(["/", "/news", "/search", "/cookie-policy"]);
  for (const item of primaryNav) {
    paths.add(item.href);
    for (const child of item.children ?? []) {
      paths.add(child.href);
    }
  }
  const posts = await listNewsPosts({ publishedOnly: true });
  for (const post of posts) {
    paths.add(`/news/${post.slug}`);
  }
  return [...paths].sort();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const paths = await collectNavPaths();

  return paths.map((path) => {
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
