import Image from "next/image";
import Link from "next/link";
import {
  investmentBusinessDesk,
  investmentPillars,
  investmentResourceGroups,
  investmentSectors,
} from "@/lib/content/investment";

export default function InvestmentHub() {
  const featured = investmentSectors.filter((s) => s.slug !== "invest-in-ethiopia");
  const start = investmentSectors.find((s) => s.slug === "invest-in-ethiopia");

  return (
    <main className="bg-canvas">
      {/* Hero — one composition */}
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src="/images/investment/overviews.jpg"
          alt="Investment and industrial development in Ethiopia"
          fill
          priority
          sizes="100vw"
          className="animate-soft-pan object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Invest in Ethiopia
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Invest in Ethiopia
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            A growing economy. A reforming investment climate. A clear path from
            London to opportunity.
          </p>
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
            <a
              href={investmentBusinessDesk.eicStartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-deep transition hover:bg-gold-bright"
            >
              Start with EIC
            </a>
            <a
              href={`mailto:${investmentBusinessDesk.email}`}
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold"
            >
              Speak to our desk
            </a>
          </div>
        </div>
      </section>

      {/* Why Ethiopia */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(197,165,114,0.16),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Why Ethiopia
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Macroeconomic stability. Private-sector ambition. Room to scale.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              Ethiopia is a diverse, vibrant country poised for expanded economic
              growth — with sustained momentum since 2003 and a government
              committed to private enterprise.
            </p>
          </div>

          <ul className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {investmentPillars.map((pillar, index) => (
              <li key={pillar.title} className="animate-fade-up" style={{ animationDelay: `${index * 80}ms` }}>
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

      {/* Sectors — full-bleed interactive strips */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Priority sectors
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Where capital meets capability
              </h2>
            </div>
            {start ? (
              <Link
                href={start.href}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:text-emerald"
              >
                {start.label} →
              </Link>
            ) : null}
          </div>
        </div>

        <ul>
          {featured.map((sector, index) => (
            <li key={sector.href}>
              <Link
                href={sector.href}
                className="group relative block min-h-[48vh] overflow-hidden text-white sm:min-h-[42vh]"
              >
                <Image
                  src={sector.hero.src}
                  alt={sector.hero.alt}
                  fill
                  sizes="100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div
                  className={`absolute inset-0 ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-navy-deep via-navy-deep/75 to-transparent"
                      : "bg-gradient-to-l from-navy-deep via-navy-deep/75 to-transparent"
                  }`}
                />
                <div
                  className={`relative mx-auto flex min-h-[48vh] max-w-7xl items-end px-4 py-14 sm:min-h-[42vh] sm:px-6 sm:py-16 lg:px-8 ${
                    index % 2 === 0 ? "" : "justify-end text-right"
                  }`}
                >
                  <div className="max-w-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {sector.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {sector.label}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                      {sector.summary}
                    </p>
                    <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-gold transition group-hover:text-gold-bright">
                      View sector →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Diaspora note */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              For the diaspora
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy">
              Invest with roots — and with purpose
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Ethiopians and foreign nationals of Ethiopian origin can explore
              bank account guidance, duty-free investor pathways, and the
              Ethiopian Origin ID Card through the Embassy.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/yellow-card"
              className="inline-flex bg-navy px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-navy-mid"
            >
              Yellow Card
            </Link>
            <Link
              href="/duty-free-notes"
              className="inline-flex border border-navy px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition hover:bg-canvas"
            >
              Duty-Free Notes
            </Link>
            <Link
              href="/diaspora-policy"
              className="inline-flex border border-navy px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition hover:bg-canvas"
            >
              Diaspora Policy
            </Link>
          </div>
        </div>
      </section>

      {/* Resource library */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Investor library
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Briefings, laws, and pipelines
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Curated materials for deeper diligence. For the latest official
              guidance, always confirm with the Ethiopian Investment Commission.
            </p>
          </div>

          <div className="mt-14 space-y-14">
            {investmentResourceGroups.map((group) => (
              <div key={group.title}>
                <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{group.description}</p>
                  </div>
                </div>
                <ul className="mt-2 divide-y divide-line">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-6 py-4 transition hover:bg-surface/80"
                      >
                        <span className="text-sm font-medium text-navy group-hover:text-emerald sm:text-[15px]">
                          {item.label}
                        </span>
                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                          {item.kind} ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(197,165,114,0.18),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              London business desk
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to discuss your next move?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              The Embassy of Ethiopia in London supports serious conversations
              about trade, investment, and partnership with Ethiopia.
            </p>
          </div>
          <div className="space-y-4 lg:justify-self-end">
            <p className="text-sm leading-relaxed text-white/85">
              {investmentBusinessDesk.address}
              <br />
              <a
                href={investmentBusinessDesk.telHref}
                className="transition hover:text-gold"
              >
                {investmentBusinessDesk.tel}
              </a>
              <br />
              <a
                href={`mailto:${investmentBusinessDesk.email}`}
                className="transition hover:text-gold"
              >
                {investmentBusinessDesk.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={investmentBusinessDesk.eicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep transition hover:bg-gold-bright"
              >
                Ethiopian Investment Commission
              </a>
              <Link
                href="/contact-us"
                className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
