import Image from "next/image";
import Link from "next/link";
import EmailProviderChooser from "@/components/EmailProviderChooser";
import {
  investmentBusinessDesk,
  investmentSectors,
  type InvestmentSector,
} from "@/lib/content/investment";

const businessEmailSubject =
  "Investment enquiry — Embassy of Ethiopia, London";
const businessEmailBody =
  "Dear Business Desk,\n\nI would like to discuss investment opportunities in Ethiopia.\n\n\n\nKind regards,\n";

function SectorNav({ currentHref }: { currentHref: string }) {
  return (
    <nav
      aria-label="Investment sectors"
      className="border-y border-white/10 bg-navy-deep/80 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0">
          <Link
            href="/investment-overviews"
            className={`inline-flex px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
              currentHref === "/investment-overviews"
                ? "bg-gold text-navy-deep"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            Overview
          </Link>
        </li>
        {investmentSectors.map((sector) => {
          const active = currentHref === sector.href;
          return (
            <li key={sector.href} className="shrink-0">
              <Link
                href={sector.href}
                className={`inline-flex px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  active
                    ? "bg-gold text-navy-deep"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {sector.shortLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function InvestmentSectorPage({ sector }: { sector: InvestmentSector }) {
  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src={sector.hero.src}
          alt={sector.hero.alt}
          fill
          priority
          sizes="100vw"
          className="animate-soft-pan object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            {sector.eyebrow}
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {sector.title}
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {sector.summary}
          </p>
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
            <a
              href={sector.eicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-deep transition hover:bg-gold-bright"
            >
              Explore on EIC
            </a>
            <EmailProviderChooser
              email={investmentBusinessDesk.email}
              subject={businessEmailSubject}
              body={businessEmailBody}
              label="Contact business desk"
              eyebrow="Business desk"
            />
          </div>
        </div>
      </section>

      <SectorNav currentHref={sector.href} />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <div className="space-y-6">
            {sector.narrative.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-[1.8] text-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {sector.resources?.length ? (
            <div className="mt-12 border-t border-line pt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Resources
              </p>
              <ul className="mt-5 space-y-3">
                {sector.resources.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 border-b border-line py-3 text-sm text-navy transition hover:text-emerald"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted group-hover:text-emerald">
                        {item.kind} ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-line bg-surface p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              At a glance
            </p>
            <ul className="mt-6 space-y-4">
              {sector.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 bg-navy px-6 py-8 text-white sm:px-8">
            <p className="font-display text-lg font-semibold">
              Talk to London
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              The Embassy business desk helps UK-based and international partners
              connect with opportunities in Ethiopia.
            </p>
            <p className="mt-5 text-sm text-white/90">
              {investmentBusinessDesk.address}
              <br />
              <a
                href={investmentBusinessDesk.telHref}
                className="transition hover:text-gold"
              >
                {investmentBusinessDesk.tel}
              </a>
              <br />
              <EmailProviderChooser
                email={investmentBusinessDesk.email}
                subject={`${sector.title} enquiry — Embassy of Ethiopia, London`}
                body={`Dear Business Desk,\n\nI would like to discuss ${sector.title.toLowerCase()} opportunities in Ethiopia.\n\n\n\nKind regards,\n`}
                label={investmentBusinessDesk.email}
                eyebrow="Business desk"
                className="transition hover:text-gold"
              />
            </p>
          </div>
        </aside>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-muted">
            Continue exploring investment opportunities across Ethiopia.
          </p>
          <Link
            href="/investment-overviews"
            className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:text-emerald"
          >
            Back to Investment Overview →
          </Link>
        </div>
      </section>
    </main>
  );
}

export function makeInvestmentMetadata(title: string) {
  return { title };
}
