import Image from "next/image";
import Link from "next/link";
import {
  aboutEthiopiaHeroes,
  aboutEthiopiaHubChapters,
  aboutEthiopiaHubRelated,
  aboutEthiopiaPillars,
} from "@/lib/content/about-ethiopia";

export default function AboutEthiopiaHub() {
  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src="/legacy-site/images/hero-images/BaleMountain.jpg"
          alt="Bale Mountains landscape in Ethiopia"
          fill
          priority
          sizes="100vw"
          className="animate-soft-pan object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            About Ethiopia
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            About Ethiopia
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            An ancient nation. A continental capital. A living culture at the
            heart of the Horn of Africa.
          </p>
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
            <Link
              href="/profile"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-deep transition hover:bg-gold-bright"
            >
              Start with Profile
            </Link>
            <Link
              href="/tourism"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold"
            >
              Explore tourism
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(197,165,114,0.16),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Why Ethiopia
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Continuity, place, and presence.
            </h2>
          </div>
          <ul className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {aboutEthiopiaPillars.map((pillar, index) => (
              <li key={pillar.title}>
                <p className="font-display text-5xl font-semibold text-gold/40">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Chapters
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Know the country
          </h2>
        </div>

        <ul>
          {aboutEthiopiaHubChapters.map((chapter, index) => {
            const hero = aboutEthiopiaHeroes[chapter.href];
            return (
              <li key={chapter.href}>
                <Link
                  href={chapter.href}
                  className="group relative block min-h-[44vh] overflow-hidden text-white sm:min-h-[40vh]"
                >
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill
                    sizes="100vw"
                    className={`object-cover transition duration-700 group-hover:scale-[1.04] ${hero.position ?? "object-center"}`}
                  />
                  <div
                    className={`absolute inset-0 ${
                      index % 2 === 0
                        ? "bg-gradient-to-r from-navy-deep via-navy-deep/75 to-transparent"
                        : "bg-gradient-to-l from-navy-deep via-navy-deep/75 to-transparent"
                    }`}
                  />
                  <div
                    className={`relative mx-auto flex min-h-[44vh] max-w-7xl items-end px-4 py-14 sm:min-h-[40vh] sm:px-6 sm:py-16 lg:px-8 ${
                      index % 2 === 0 ? "" : "justify-end text-right"
                    }`}
                  >
                    <div className="max-w-md">
                      <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                        {chapter.label}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                        {hero.summary}
                      </p>
                      <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-gold transition group-hover:text-gold-bright">
                        Read chapter →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Also explore
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy">
            Mission, diaspora, and GERD
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutEthiopiaHubRelated.map((item) => {
              const hero = aboutEthiopiaHeroes[item.href];
              return (
                <li key={item.href}>
                  <Link href={item.href} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={hero.src}
                        alt={hero.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
                      <p className="absolute inset-x-0 bottom-0 p-4 font-display text-lg font-semibold text-white">
                        {item.label}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(197,165,114,0.18),transparent_45%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-20 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Visit or invest
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Next steps from London
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/investment-overviews"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep transition hover:bg-gold-bright"
            >
              Invest in Ethiopia
            </Link>
            <Link
              href="/consular-services"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
            >
              Consular Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
