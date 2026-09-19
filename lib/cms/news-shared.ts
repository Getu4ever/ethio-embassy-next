import type { NewsArticle, NewsBlock } from "@/lib/content/news";

export type ManagedNewsPost = NewsArticle & {
  id: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VideoEmbedProvider = "youtube" | "facebook";

export type ParsedVideoEmbed = {
  provider: VideoEmbedProvider;
  /** Canonical watch / post URL stored on the block */
  src: string;
  externalUrl: string;
  /** YouTube video id when provider is youtube */
  youtubeId?: string;
  label: string;
};

type ParagraphBlock = Extract<NewsBlock, { type: "paragraph" }>;
type VideoBlock = Extract<NewsBlock, { type: "video" }>;

export function paragraphsToBlocks(body: string): ParagraphBlock[] {
  return body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((text) => ({ type: "paragraph" as const, text }));
}

export function blocksToParagraphText(blocks: NewsBlock[]): string {
  return blocks
    .filter((block): block is Extract<NewsBlock, { type: "paragraph" }> =>
      block.type === "paragraph",
    )
    .map((block) => block.text)
    .join("\n\n");
}

/** First social embed on a post (YouTube / Facebook), if any. */
export function videoEmbedFromPost(post: ManagedNewsPost | null): {
  url: string;
  caption: string;
} {
  if (!post) return { url: "", caption: "" };
  const video = post.blocks.find(
    (block): block is VideoBlock =>
      block.type === "video" &&
      (block.provider === "youtube" || block.provider === "facebook"),
  );
  if (!video) return { url: "", caption: "" };
  return {
    url: video.externalUrl?.trim() || video.src,
    caption: video.caption?.trim() || "",
  };
}

function youtubeIdFromUrl(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && /^[\w-]{6,}$/.test(id) ? id : null;
  }
  if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "music.youtube.com"
  ) {
    const v = url.searchParams.get("v");
    if (v && /^[\w-]{6,}$/.test(v)) return v;
    const parts = url.pathname.split("/").filter(Boolean);
    if (
      (parts[0] === "embed" ||
        parts[0] === "shorts" ||
        parts[0] === "live" ||
        parts[0] === "v") &&
      parts[1] &&
      /^[\w-]{6,}$/.test(parts[1])
    ) {
      return parts[1];
    }
  }
  return null;
}

function isFacebookVideoUrl(url: URL): boolean {
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host === "fb.watch" || host === "fb.com" || host === "m.facebook.com") {
    return true;
  }
  if (host !== "facebook.com") return false;
  const path = url.pathname.toLowerCase();
  return (
    path.includes("/videos/") ||
    path.includes("/reel/") ||
    path.includes("/watch") ||
    url.searchParams.has("v")
  );
}

/**
 * Accept a pasted YouTube or Facebook video URL for news embeds.
 * Returns null when the URL is empty. Throws when the URL is present but unsupported.
 */
export function parseVideoEmbedUrl(raw: string): ParsedVideoEmbed | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error(
      "Enter a full video link (starting with https://) from YouTube or Facebook.",
    );
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Video links must use https://");
  }

  const youtubeId = youtubeIdFromUrl(url);
  if (youtubeId) {
    return {
      provider: "youtube",
      src: `https://www.youtube.com/watch?v=${youtubeId}`,
      externalUrl: trimmed,
      youtubeId,
      label: "YouTube",
    };
  }

  if (isFacebookVideoUrl(url)) {
    return {
      provider: "facebook",
      src: trimmed,
      externalUrl: trimmed,
      label: "Facebook",
    };
  }

  throw new Error(
    "That link isn’t recognised. Paste a YouTube or Facebook video / reel URL.",
  );
}

export function videoBlockFromEmbedUrl(
  raw: string,
  caption?: string,
): VideoBlock | null {
  const parsed = parseVideoEmbedUrl(raw);
  if (!parsed) return null;
  const trimmedCaption = caption?.trim() || undefined;
  return {
    type: "video",
    provider: parsed.provider,
    src: parsed.src,
    caption: trimmedCaption,
    externalUrl: parsed.externalUrl,
    externalLabel:
      parsed.provider === "youtube" ? "Watch on YouTube" : "Watch on Facebook",
  };
}

/** YYYY-MM-DD for date inputs — London calendar day for Embassy posts. */
export function embassyTodayDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function toNewsArticle(post: ManagedNewsPost): NewsArticle {
  const { id: _id, published: _published, createdAt: _c, updatedAt: _u, ...article } =
    post;
  return article;
}
