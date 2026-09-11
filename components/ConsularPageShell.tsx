import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import {
  consularNav,
  type ConsularBlock,
  type ConsularPage,
} from "@/lib/content/consular";
import { contact } from "@/lib/content/site";
import type { StripeFeeId } from "@/lib/stripe/fees";

function Block({ block }: { block: ConsularBlock }) {
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
    case "links":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={`${item.label}-${item.href}`}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-base font-medium text-navy underline decoration-gold/50 underline-offset-4 transition hover:text-emerald"
                >
                  {item.label} ↗
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex text-base font-medium text-navy underline decoration-gold/50 underline-offset-4 transition hover:text-emerald"
                >
                  {item.label} →
                </Link>
              )}
            </li>
          ))}
        </ul>
      );
    case "notice":
      return (
        <p className="border-l-2 border-gold bg-gold/10 px-4 py-3 text-sm leading-relaxed text-charcoal sm:text-[15px]">
          {block.text}
        </p>
      );
  }
}

function ConsularTopicNav({ currentHref }: { currentHref: string }) {
  return (
    <nav
      aria-label="Consular services"
      className="border-y border-white/10 bg-navy-deep/80 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0">
          <Link
            href="/consular-services"
            className={`inline-flex px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
              currentHref === "/consular-services"
                ? "bg-gold text-navy-deep"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            Overview
          </Link>
        </li>
        {consularNav.map((link) => {
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

function pagePathForFee(feeId: StripeFeeId): string {
  if (feeId.startsWith("visa")) return "visa-services";
  if (feeId === "legalization-standard") return "legalization";
  if (feeId === "criminal-record") return "criminal-record";
  if (feeId === "vital-events") return "vital-events";
  if (feeId === "duty-free") return "duty-free-notes";
  return "consular-services";
}

function StripeAside({ fees }: { fees: StripeFeeId[] }) {
  const labels: Partial<Record<StripeFeeId, string>> = {
    "visa-standard": "Pay Visa Processing Fee",
    "visa-express": "Pay Visa Express Fee",
    "legalization-standard": "Pay Legalization Fee",
    "criminal-record": "Pay Criminal Record / TIN Fee",
    "vital-events": "Pay Vital Events Fee",
    "duty-free": "Pay Duty-Free Note Fee",
  };

  return (
    <div className="border border-line bg-surface p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        Pay online
      </p>
      <h2 className="mt-2 font-display text-lg font-semibold text-navy">
        Secure fee payment
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Complete applicable processing fees via Stripe Checkout before your
        appointment.
      </p>
      <div className="mt-5 space-y-3">
        {fees.map((feeId) => (
          <StripeCheckoutButton
            key={feeId}
            feeId={feeId}
            label={labels[feeId]}
            successPath={`/${pagePathForFee(feeId)}?paid=1`}
            cancelPath={`/${pagePathForFee(feeId)}?cancelled=1`}
          />
        ))}
      </div>
    </div>
  );
}

export function ConsularPageBody({ page }: { page: ConsularPage }) {
  const lede = page.lede;
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
          <section key={`${section.heading ?? "section"}-${index}`}>
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

export function ConsularPageShell({
  page,
  currentHref,
  children,
}: {
  page: ConsularPage;
  currentHref: string;
  children?: ReactNode;
}) {
  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src={page.hero.src}
          alt={page.hero.alt}
          fill
          priority
          sizes="100vw"
          className={`animate-soft-pan object-cover ${page.hero.position ?? "object-center"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Consular Services
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {page.pageTitle}
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {page.lede}
          </p>
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-deep transition hover:bg-gold-bright"
            >
              Book appointment
            </Link>
            <Link
              href="/apply"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold"
            >
              Submit documents
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold"
            >
              Email consular desk
            </a>
          </div>
        </div>
      </section>

      <ConsularTopicNav currentHref={currentHref} />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <article className="lg:col-span-7">
          {children ?? <ConsularPageBody page={page} />}
        </article>

        <aside className="space-y-6 lg:col-span-5">
          {page.showStripe && page.stripeFees?.length ? (
            <StripeAside fees={page.stripeFees} />
          ) : null}

          <div className="bg-navy px-6 py-8 text-white sm:px-8">
            <p className="font-display text-lg font-semibold">Visit Princes Gate</p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              {contact.address}
              <br />
              {contact.officeHours.days}
              <br />
              Morning {contact.officeHours.morning}
              <br />
              Afternoon {contact.officeHours.afternoon}
            </p>
            <p className="mt-5 text-sm text-white/90">
              <a
                href={`tel:${contact.phone}`}
                className="transition hover:text-gold"
              >
                {contact.phoneDisplay}
              </a>
              <br />
              <a
                href={`mailto:${contact.email}`}
                className="transition hover:text-gold"
              >
                {contact.email}
              </a>
            </p>
            <Link
              href="/booking"
              className="mt-6 inline-flex border border-white/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
            >
              Book appointment →
            </Link>
          </div>
        </aside>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-muted">
            Explore every consular pathway available in London.
          </p>
          <Link
            href="/consular-services"
            className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:text-emerald"
          >
            Back to Consular Overview →
          </Link>
        </div>
      </section>
    </main>
  );
}

export function makeConsularMetadata(title: string) {
  return { title };
}
