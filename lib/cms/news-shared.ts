import type { NewsArticle, NewsBlock } from "@/lib/content/news";

export type ManagedNewsPost = NewsArticle & {
  id: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type ParagraphBlock = Extract<NewsBlock, { type: "paragraph" }>;

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
