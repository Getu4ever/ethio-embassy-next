import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import NewsImageCarousel from "@/components/NewsImageCarousel";
import NewsShareBar from "@/components/NewsShareBar";
import {
  getRelatedNews,
  type NewsArticle,
  type NewsBlock,
} from "@/lib/content/news";
import { site } from "@/lib/content/site";

function DocumentNotice({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="overflow-hidden border border-line bg-white shadow-[0_18px_40px_rgba(11,37,69,0.06)]">
      <div className="bg-[linear-gradient(180deg,#f4f1ea_0%,#ebe6dc_100%)] px-3 py-5 sm:px-8 sm:py-8">
        <div className="relative mx-auto aspect-[210/297] w-full max-w-xl overflow-hidden bg-white shadow-[0_12px_32px_rgba(11,37,69,0.12)]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain object-top"
            sizes="(max-width: 640px) 100vw, 576px"
            priority={false}
          />
        </div>
      </div>
      {caption ? (
        <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Block({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-[1.85] text-muted sm:text-lg">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-gold bg-gold/10 px-5 py-4 font-display text-lg leading-relaxed text-navy sm:text-xl">
          {block.text}
        </blockquote>
      );
    case "image":
      if (block.presentation === "document") {
        return (
          <DocumentNotice
            src={block.src}
            alt={block.alt}
            caption={block.caption}
          />
        );
      }
      return (
        <NewsImageCarousel
          label="Featured image"
          images={[
            {
              src: block.src,
              alt: block.alt,
              caption: block.caption,
            },
          ]}
        />
      );
    case "gallery":
      return (
        <NewsImageCarousel
          label="Photo gallery"
          images={block.images.map((image) => ({
            src: image.src,
            alt: image.alt,
          }))}
        />
      );
    case "video":
      return (
        <figure className="overflow-hidden border border-line bg-navy">
          <video
            controls
            playsInline
            preload="metadata"
            poster={block.poster}
            className="aspect-video w-full bg-navy"
          >
            <source src={block.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {block.caption ? (
            <figcaption className="border-t border-line bg-white px-4 py-3 text-sm text-muted sm:px-5">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
  }
}

function RelatedPosts({ posts }: { posts: NewsArticle[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Continue reading
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Related Posts
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            More Embassy news, announcements, and diplomatic updates.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {posts.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="group flex flex-col overflow-hidden border border-line bg-canvas transition hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 via-transparent to-transparent opacity-80" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {item.category} · {item.dateLabel}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-navy transition group-hover:text-emerald">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                  {item.excerpt}
                </p>
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition group-hover:text-emerald">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function makeNewsMetadata(article: NewsArticle): Metadata {
  return {
    title: `${article.title} | ${site.name}`,
    description: article.lede || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.lede || article.excerpt,
      images: [{ url: article.image.src }],
    },
  };
}

export default function NewsArticleShell({ article }: { article: NewsArticle }) {
  const related = getRelatedNews(article.slug);

  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority
          sizes="100vw"
          className="animate-soft-pan object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.22),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            {article.category} · {article.dateLabel}
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-4xl font-display text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {article.title}
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {article.lede}
          </p>
        </div>
      </section>

      <div className="gold-rule" />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-20">
        <article className="space-y-8 lg:col-span-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-5 text-sm text-muted">
            <span>By {article.author}</span>
            <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
            <time dateTime={article.date}>{article.dateLabel}</time>
            {article.sourceUrl.includes("x.com/") ||
            article.sourceUrl.includes("twitter.com/") ? (
              <>
                <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-navy transition hover:text-emerald"
                >
                  View on X →
                </a>
              </>
            ) : null}
          </div>

          {article.blocks.map((block, index) => (
            <Block key={`${block.type}-${index}`} block={block} />
          ))}

          <NewsShareBar
            title={article.title}
            path={`/news/${article.slug}`}
            excerpt={article.excerpt}
          />

          <div className="border-t border-line pt-8">
            <Link
              href="/news"
              className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:text-emerald"
            >
              ← Back to Embassy News
            </Link>
          </div>
        </article>

        <aside className="space-y-6 lg:col-span-4">
          <div className="bg-navy px-6 py-8 text-white sm:px-7">
            <p className="font-display text-lg font-semibold">Stay informed</p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Follow Embassy announcements, diplomatic engagements, and consular
              updates from Princes Gate.
            </p>
            <Link
              href="/contact-us"
              className="mt-6 inline-flex border border-white/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
            >
              Contact the Embassy →
            </Link>
          </div>
        </aside>
      </section>

      <RelatedPosts posts={related} />
    </main>
  );
}
