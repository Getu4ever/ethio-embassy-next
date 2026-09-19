import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { assets } from "@/lib/content/assets";
import { listNewsPosts, toNewsArticle } from "@/lib/cms/news";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `Embassy News | ${site.name}`,
  description:
    "Official news, announcements, and diplomatic updates from the Embassy of Ethiopia in London.",
  openGraph: {
    title: `Embassy News | ${site.name}`,
    description:
      "Official news, announcements, and diplomatic updates from the Embassy of Ethiopia in London.",
    images: [{ url: assets.newsIndexHero.src }],
  },
};

export const dynamic = "force-dynamic";

export default async function NewsIndexPage() {
  const posts = (await listNewsPosts({ publishedOnly: true })).map(toNewsArticle);

  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[52vh] overflow-hidden text-white sm:min-h-[58vh]">
        <Image
          src={assets.newsIndexHero.src}
          alt={assets.newsIndexHero.alt}
          fill
          priority
          sizes="100vw"
          className="animate-soft-pan object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.22),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[58vh] sm:px-6 sm:pb-14 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Official News Stream
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Embassy News
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Announcements, diplomatic engagements, and updates from the Embassy
            of Ethiopia in London.
          </p>
        </div>
      </section>

      <div className="gold-rule" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {posts.length === 0 ? (
          <p className="border border-line bg-white px-6 py-16 text-center text-sm text-muted">
            No published briefings yet. Check back soon for Embassy updates.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="group flex flex-col overflow-hidden border border-line bg-white transition hover:border-gold/50"
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
                  <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-navy transition group-hover:text-emerald">
                    {item.title}
                  </h2>
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
        )}
      </section>
    </main>
  );
}
