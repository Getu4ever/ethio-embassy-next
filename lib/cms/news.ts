import { unstable_noStore as noStore } from "next/cache";
import { newsArticles, type NewsBlock } from "@/lib/content/news";
import type { NewsCategory } from "@/lib/content/site";
import {
  embassyTodayDate,
  paragraphsToBlocks,
  videoBlockFromEmbedUrl,
  type ManagedNewsPost,
} from "@/lib/cms/news-shared";
import { readOpsJson, writeOpsJson } from "@/lib/ops/json-store";

export type { ManagedNewsPost } from "@/lib/cms/news-shared";
export {
  blocksToParagraphText,
  embassyTodayDate,
  paragraphsToBlocks,
  parseVideoEmbedUrl,
  toNewsArticle,
  videoBlockFromEmbedUrl,
  videoEmbedFromPost,
} from "@/lib/cms/news-shared";

const BLOB_KEY = "ops/news-posts.json";

async function readAll(): Promise<ManagedNewsPost[]> {
  // Never serve a cached RSC snapshot of the news desk / homepage feed.
  noStore();
  try {
    const data = await readOpsJson<ManagedNewsPost[] | null>(BLOB_KEY, null);
    // Empty array is valid (every post deleted) — never reseed over it.
    if (Array.isArray(data)) return data;
  } catch (error) {
    console.error("[news:read]", error);
    throw error instanceof Error
      ? error
      : new Error("Could not load news posts.");
  }

  const seeded = seedFromStatic();
  try {
    await writeOpsJson(BLOB_KEY, seeded);
  } catch (error) {
    console.error("[news:seed-write]", error);
  }
  return seeded;
}

function createId(): string {
  return `NWS-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function formatDateLabel(date: string): string {
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function seedFromStatic(): ManagedNewsPost[] {
  const now = new Date().toISOString();
  return newsArticles.map((article, index) => ({
    ...article,
    image: {
      src: article.image.src,
      alt: article.image.alt,
      width: article.image.width,
      height: article.image.height,
    },
    id: `NWS-SEED-${index + 1}`,
    published: true,
    createdAt: now,
    updatedAt: now,
  }));
}

async function writeAll(posts: ManagedNewsPost[]): Promise<void> {
  await writeOpsJson(BLOB_KEY, posts);
}

export async function listNewsPosts(opts?: {
  publishedOnly?: boolean;
}): Promise<ManagedNewsPost[]> {
  const all = await readAll();
  const filtered = opts?.publishedOnly
    ? all.filter((post) => Boolean(post.published))
    : all;
  return filtered.sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

export async function getNewsPostBySlug(
  slug: string,
  opts?: { publishedOnly?: boolean },
): Promise<ManagedNewsPost | null> {
  const all = await listNewsPosts(opts);
  return all.find((post) => post.slug === slug) ?? null;
}

export async function getNewsPostById(
  id: string,
): Promise<ManagedNewsPost | null> {
  const all = await readAll();
  return all.find((post) => post.id === id) ?? null;
}

export async function createNewsPost(input: {
  title: string;
  slug?: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  author?: string;
  lede: string;
  sourceUrl?: string;
  body: string;
  imageSrc: string;
  imageAlt?: string;
  galleryImages?: { src: string; alt: string; caption?: string }[];
  /** Optional YouTube / Facebook video to embed under the story */
  videoEmbedUrl?: string;
  videoCaption?: string;
  published?: boolean;
}): Promise<ManagedNewsPost> {
  const all = await readAll();
  const title = input.title.trim();
  if (!title) throw new Error("Title is required.");
  const slug = slugify(input.slug?.trim() || title);
  if (!slug) throw new Error("A valid slug is required.");
  if (all.some((post) => post.slug === slug)) {
    throw new Error("A post with that slug already exists.");
  }
  const date = input.date.trim() || embassyTodayDate();
  const imageSrc = input.imageSrc.trim();
  if (!imageSrc) throw new Error("Add a cover photo for the post.");
  const now = new Date().toISOString();
  const paragraphs = paragraphsToBlocks(input.body);
  if (paragraphs.length === 0) {
    throw new Error("Write your post text before publishing.");
  }
  const firstParagraph = paragraphs[0]?.text ?? "";
  const lede = input.lede.trim() || firstParagraph.slice(0, 220);
  const excerpt = input.excerpt.trim() || lede.slice(0, 180);
  const blocks: NewsBlock[] = [...paragraphs];
  if (input.galleryImages && input.galleryImages.length > 0) {
    blocks.push({
      type: "gallery",
      images: input.galleryImages,
    });
  }
  const videoBlock = videoBlockFromEmbedUrl(
    input.videoEmbedUrl ?? "",
    input.videoCaption,
  );
  if (videoBlock) blocks.push(videoBlock);

  const post: ManagedNewsPost = {
    id: createId(),
    slug,
    title,
    excerpt,
    date,
    dateLabel: formatDateLabel(date),
    category: input.category === "Announcements" ? "Announcements" : "News",
    image: {
      src: imageSrc,
      alt: input.imageAlt?.trim() || title,
      width: 1200,
      height: 800,
    },
    author: input.author?.trim() || "Embassy of Ethiopia in London",
    sourceUrl: input.sourceUrl?.trim() || "",
    lede,
    blocks,
    published: input.published ?? true,
    createdAt: now,
    updatedAt: now,
  };

  all.unshift(post);
  await writeAll(all);
  return post;
}

export async function updateNewsPost(
  id: string,
  input: {
    title: string;
    slug?: string;
    excerpt: string;
    date: string;
    category: NewsCategory;
    author?: string;
    lede: string;
    sourceUrl?: string;
    body: string;
    imageSrc?: string;
    imageAlt?: string;
    /** When provided (even empty), replaces the gallery. Omit to leave unchanged. */
    galleryImages?: { src: string; alt: string; caption?: string }[];
    /** When provided (even empty), replaces social video embeds. Omit to leave unchanged. */
    videoEmbedUrl?: string;
    videoCaption?: string;
    published?: boolean;
  },
): Promise<ManagedNewsPost> {
  const all = await readAll();
  const idx = all.findIndex((post) => post.id === id);
  if (idx === -1) throw new Error("Post not found.");
  const current = all[idx]!;
  const title = input.title.trim() || current.title;
  const slug = slugify(input.slug?.trim() || current.slug);
  if (!slug) throw new Error("A valid slug is required.");
  if (all.some((post) => post.id !== id && post.slug === slug)) {
    throw new Error("Another post already uses that slug.");
  }
  const date = input.date.trim() || current.date;
  const paragraphs = paragraphsToBlocks(input.body);
  if (paragraphs.length === 0) {
    throw new Error("Write your post text before saving.");
  }
  const firstParagraph = paragraphs[0]?.text ?? "";
  const lede =
    input.lede.trim() || current.lede || firstParagraph.slice(0, 220);
  const excerpt =
    input.excerpt.trim() || current.excerpt || lede.slice(0, 180);
  const imageSrc = input.imageSrc?.trim() || current.image.src;

  const preservedFileVideos = current.blocks.filter(
    (block) =>
      block.type === "video" &&
      (!block.provider || block.provider === "file"),
  );
  const preservedSocialVideos = current.blocks.filter(
    (block) =>
      block.type === "video" &&
      (block.provider === "youtube" || block.provider === "facebook"),
  );
  const blocks: NewsBlock[] = [...paragraphs];
  if (input.galleryImages) {
    if (input.galleryImages.length > 0) {
      blocks.push({ type: "gallery", images: input.galleryImages });
    }
  } else {
    const existingGallery = current.blocks.find((b) => b.type === "gallery");
    if (existingGallery) blocks.push(existingGallery);
  }
  // Keep single image blocks that aren't the hero (legacy seeded content)
  for (const block of current.blocks) {
    if (block.type === "image") blocks.push(block);
  }
  blocks.push(...preservedFileVideos);
  if (input.videoEmbedUrl !== undefined) {
    const videoBlock = videoBlockFromEmbedUrl(
      input.videoEmbedUrl,
      input.videoCaption,
    );
    if (videoBlock) blocks.push(videoBlock);
  } else {
    blocks.push(...preservedSocialVideos);
  }

  all[idx] = {
    ...current,
    slug,
    title,
    excerpt,
    date,
    dateLabel: formatDateLabel(date),
    category: input.category === "Announcements" ? "Announcements" : "News",
    image: {
      src: imageSrc,
      alt: input.imageAlt?.trim() || current.image.alt || title,
      width: current.image.width ?? 1200,
      height: current.image.height ?? 800,
    },
    author: input.author?.trim() || current.author,
    sourceUrl: input.sourceUrl?.trim() ?? current.sourceUrl,
    lede,
    blocks,
    published: input.published ?? current.published,
    updatedAt: new Date().toISOString(),
  };

  await writeAll(all);
  return all[idx]!;
}

export async function deleteNewsPost(id: string): Promise<void> {
  const all = await readAll();
  if (!all.some((post) => post.id === id)) throw new Error("Post not found.");
  const next = all.filter((post) => post.id !== id);
  await writeAll(next);

  // Origin reads can still race briefly; confirm and rewrite once if needed.
  const confirmed = await readAll();
  if (confirmed.some((post) => post.id === id)) {
    await writeAll(confirmed.filter((post) => post.id !== id));
  }
}
