import Link from "next/link";
import type { Metadata } from "next";
import { searchSite } from "@/lib/content/search-index";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Search",
  description: `Search pages and services on the ${site.shortName} website.`,
  robots: { index: true, follow: true },
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? searchSite(query, 24) : [];

  return (
    <main className="bg-canvas">
      <section className="border-b border-line bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Site search
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Search
          </h1>
          <form action="/search" method="get" className="mt-8" role="search">
            <label htmlFor="site-search-q" className="sr-only">
              Search the Embassy website
            </label>
            <div className="flex gap-2">
              <input
                id="site-search-q"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search pages, services…"
                className="min-w-0 flex-1 border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-gold"
              />
              <button
                type="submit"
                className="shrink-0 bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition hover:bg-[#dbbf8a]"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {!query ? (
          <p className="text-sm leading-relaxed text-muted">
            Try keywords such as passport, visa, ambassador, booking, or
            investment.
          </p>
        ) : results.length === 0 ? (
          <p className="text-sm leading-relaxed text-muted">
            No matching pages for “{query}”. Try a shorter keyword.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for “
              {query}”
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {results.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-5 transition hover:bg-white"
                  >
                    <span className="font-display text-lg font-semibold text-navy">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
