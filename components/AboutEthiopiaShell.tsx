import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  aboutEthiopiaHeroes,
  aboutEthiopiaNav,
  type AboutPage,
  type ContentBlock,
} from "@/lib/content/about-ethiopia";

function firstParagraph(page: AboutPage): string | undefined {
  for (const section of page.sections) {
    for (const block of section.blocks) {
      if (block.type === "paragraph") return block.text;
    }
  }
  return undefined;
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-[1.8] text-muted sm:text-lg">
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-relaxed text-muted sm:text-[17px]"
            >
              <span
                aria-hidden
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "officials":
      return (
        <ul className="divide-y divide-line border-y border-line">
          {block.items.map((item) => (
            <li
              key={`${item.role}-${item.name}`}
              className="grid gap-1 py-4 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:items-baseline sm:gap-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
                {item.role}
              </span>
              <span className="text-[15px] text-charcoal sm:text-base">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      );
    case "regions":
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item.name} className="border-l-2 border-gold px-4 py-3">
              <p className="font-display text-sm font-semibold text-navy">
                {item.name}
              </p>
              <p className="mt-1 text-sm text-muted">Capital: {item.capital}</p>
            </li>
          ))}
        </ul>
      );
  }
}

function AboutEthiopiaTopicNav({ currentHref }: { currentHref: string }) {
  return (
    <nav
      aria-label="About Ethiopia topics"
      className="border-y border-white/10 bg-navy-deep/80 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0">
          <Link
            href="/about-ethiopia"
            className={`inline-flex px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
              currentHref === "/about-ethiopia"
                ? "bg-gold text-navy-deep"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            Overview
          </Link>
        </li>
        {aboutEthiopiaNav.map((link) => {
          const active = currentHref === link.href;
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className={`inline-flex px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  active
                    ? "bg-gold text-navy-deep"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.shortLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AboutPageBody({ page }: { page: AboutPage }) {
  const lede = firstParagraph(page);
  let skippedLede = false;

  return (
    <div className="space-y-12">
      {page.sections.map((section, index) => {
        const blocks = section.blocks.filter((block) => {
          if (
            !skippedLede &&
            !section.heading &&
            index === 0 &&
            block.type === "paragraph" &&
            block.text === lede
          ) {
            skippedLede = true;
            return false;
          }
          return true;
        });

        if (blocks.length === 0) return null;

        return (
          <section key={`${section.heading ?? "intro"}-${index}`}>
            {section.heading ? (
              <div className="mb-5">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-navy">
                  {section.heading}
                </h2>
                <div className="mt-3 h-px w-14 bg-gold" />
              </div>
            ) : null}
            <div className="space-y-5">
              {blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function AboutEthiopiaShell({
  page,
  currentHref,
  children,
}: {
  page: AboutPage;
  currentHref: string;
  children?: ReactNode;
}) {
  const hero =
    aboutEthiopiaHeroes[currentHref] ?? aboutEthiopiaHeroes["/profile"];
  const lede = firstParagraph(page);

  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className={`animate-soft-pan object-cover ${hero.position ?? "object-center"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            About Ethiopia
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {page.pageTitle}
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {hero.summary}
          </p>
        </div>
      </section>

      <AboutEthiopiaTopicNav currentHref={currentHref} />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <article className="lg:col-span-8">
          {lede ? (
            <p className="mb-10 border-l-2 border-gold pl-4 text-lg leading-relaxed text-charcoal sm:text-xl sm:leading-relaxed">
              {lede}
            </p>
          ) : null}
          {children ?? <AboutPageBody page={page} />}
        </article>

        <aside className="lg:col-span-4">
          <div className="bg-navy px-6 py-8 text-white sm:px-8">
            <p className="font-display text-lg font-semibold">
              Continue exploring
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Discover more of Ethiopia — or plan a consular visit at the London
              Embassy.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/about-ethiopia"
                className="inline-flex border border-white/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
              >
                About Ethiopia overview
              </Link>
              <Link
                href="/booking"
                className="inline-flex bg-gold px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep transition hover:bg-gold-bright"
              >
                Book appointment
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-muted">
            Return to the full story of Ethiopia.
          </p>
          <Link
            href="/about-ethiopia"
            className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:text-emerald"
          >
            Back to About Ethiopia →
          </Link>
        </div>
      </section>
    </main>
  );
}

export function makeAboutMetadata(title: string) {
  return { title };
}
