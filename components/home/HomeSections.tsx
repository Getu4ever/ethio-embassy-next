import Image from "next/image";
import Link from "next/link";
import NewsCarousel from "@/components/home/NewsCarousel";
import { listNewsPosts, toNewsArticle } from "@/lib/cms/news";
import { assets } from "@/lib/content/assets";
import {
  ambassadorWelcome,
  leadership,
  site,
} from "@/lib/content/site";
import { governmentOnlineServices } from "@/lib/content/navigation";

const consularActions = [
  {
    title: "Visa Services",
    href: "/visa-services",
    description:
      "Tourist, business, and official visa guidance with secure online fee payment.",
    accent: "border-gold/40 hover:border-gold",
  },
  {
    title: "Passport Services",
    href: "/passport-services",
    description:
      "New passports, renewals, and replacements for Ethiopian nationals in the UK.",
    accent: "border-emerald/30 hover:border-emerald",
  },
  {
    title: "Legalization",
    href: "/legalization",
    description:
      "Authentication, legalization, and Power of Attorney document services.",
    accent: "border-crimson/30 hover:border-crimson",
  },
  {
    title: "Yellow Card",
    href: "/yellow-card",
    description:
      "Ethiopian Origin ID Card applications and renewals at the London mission.",
    accent: "border-gold/40 hover:border-gold",
  },
] as const;

/** Top of homepage — news carousel + distinctive ambassador welcome card */
export async function HomeTop() {
  const newsItems = (await listNewsPosts({ publishedOnly: true })).map(
    toNewsArticle,
  );

  return (
    <section className="bg-canvas">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:py-10">
        <div className="lg:col-span-8">
          <NewsCarousel items={newsItems} />
        </div>
        <aside className="relative flex min-h-[280px] flex-col overflow-hidden lg:col-span-4 lg:min-h-[420px]">
          {/* Flag accent */}
          <div className="absolute inset-x-0 top-0 z-20 flex h-1.5" aria-hidden>
            <span className="flex-1 bg-[#078930]" />
            <span className="flex-1 bg-[#FCDD09]" />
            <span className="flex-1 bg-[#DA121A]" />
          </div>

          <div className="relative z-10 bg-[#006699] px-5 py-3.5 sm:px-6">
            <h2 className="text-center font-display text-xs font-semibold uppercase tracking-[0.18em] text-white sm:text-sm">
              {ambassadorWelcome.title}
            </h2>
          </div>

          <div className="relative flex h-full flex-1 flex-col bg-[#0B2545] px-6 pb-7 pt-5 text-white sm:px-7">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#c5a572]/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-[#0a7a4b]/20 blur-3xl"
              aria-hidden
            />

            <div className="relative flex justify-center">
              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#dbbf8a] via-[#c5a572] to-[#8a7048] opacity-90"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-full bg-[#0B2545] p-1.5">
                  <Image
                    src={assets.logoEthioUk.src}
                    alt={assets.logoEthioUk.alt}
                    width={140}
                    height={140}
                    className="h-auto w-[5.5rem] object-contain sm:w-24"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="relative mt-7 flex flex-1 flex-col">
              <span
                className="font-display text-5xl leading-none text-[#c5a572]/35"
                aria-hidden
              >
                “
              </span>
              <h3 className="-mt-3 font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                {ambassadorWelcome.greeting}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                {ambassadorWelcome.body}
              </p>

              <div className="mt-auto pt-6">
                <div className="h-px w-12 bg-[#c5a572]" aria-hidden />
                <p className="mt-4 font-display text-sm font-semibold text-white">
                  {ambassadorWelcome.attribution}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#d7c4a3]/90">
                  {ambassadorWelcome.role}
                </p>
                <Link
                  href={ambassadorWelcome.ctaHref}
                  className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-[#dbbf8a] transition hover:text-white"
                >
                  {ambassadorWelcome.ctaLabel} →
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function ConsularActions() {
  return (
    <section className="bg-canvas px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {consularActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`group relative border bg-surface p-5 shadow-[0_20px_50px_rgba(11,31,58,0.08)] transition duration-300 hover:bg-[#0B2545] sm:p-6 ${action.accent}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold transition group-hover:text-[#dbbf8a]">
              Consular
            </p>
            <h2 className="mt-3 font-display text-lg font-semibold text-navy transition group-hover:text-white sm:text-xl">
              {action.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted transition group-hover:text-white/70">
              {action.description}
            </p>
            <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition duration-300 group-hover:gap-3 group-hover:text-[#dbbf8a]">
              Explore
              <span aria-hidden>→</span>
            </span>
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[#c5a572] transition duration-300 group-hover:scale-x-100"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function LeadershipSection() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            National Leadership
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Official ministerial statements &amp; leadership
          </h2>
        </div>
        <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-3">
          {leadership.map((person) => (
            <article key={person.role} className="text-center">
              <div className="relative mx-auto aspect-[4/5] max-w-[16rem] overflow-hidden border border-gold/30 bg-navy-mid sm:max-w-xs">
                <Image
                  src={person.image.src}
                  alt={person.image.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 70vw, (max-width: 768px) 40vw, 25vw"
                />
              </div>
              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {person.role}
              </h3>
              <p className="mt-2 font-display text-sm font-medium uppercase tracking-wide text-white/90">
                {person.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function NewsSection() {
  const newsItems = (await listNewsPosts({ publishedOnly: true })).map(
    toNewsArticle,
  );
  if (newsItems.length === 0) return null;
  const featured = newsItems[0]!;
  const ticker = newsItems
    .slice(0, 3)
    .map((item) => item.title)
    .join(" · ");

  return (
    <section
      id="news"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Official News Stream
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Latest from the Embassy
          </h2>
        </div>
        <div className="hidden max-w-md text-sm text-muted sm:line-clamp-2 md:block">
          {ticker}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-12">
        <Link
          href={`/news/${featured.slug}`}
          className="group relative min-h-[22rem] overflow-hidden bg-navy sm:min-h-[28rem] lg:col-span-7"
        >
          <Image
            src={
              featured.slug === "zamzam-bank-islamic-finance-award"
                ? "/images/news/x-posts/zamzam-1-featured.jpg"
                : featured.image.src
            }
            alt={featured.image.alt}
            fill
            className="object-cover object-center transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              {featured.category} · {featured.dateLabel}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl md:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/75">
              {featured.excerpt}
            </p>
          </div>
        </Link>

        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-5">
          {newsItems.slice(1).map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="group grid grid-cols-[5.5rem_1fr] gap-3 border border-line bg-surface p-3 transition hover:border-gold/50 sm:grid-cols-[9rem_1fr] sm:gap-4"
            >
              <div className="relative aspect-square overflow-hidden bg-navy">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="144px"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center pr-1 sm:pr-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {item.category} · {item.dateLabel}
                </span>
                <h3 className="mt-2 font-display text-sm font-semibold leading-snug text-navy sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                  {item.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesAndHorn() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Operational Linkages
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Government online services
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Access Digital INVEA, E-Service Ethiopia, Ethiopian e-VISA, and the
            Single Window for Trader through official federal portals.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {governmentOnlineServices.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 h-full items-center justify-between gap-3 border border-line bg-canvas px-4 py-4 text-sm font-medium text-navy transition hover:border-emerald hover:text-emerald"
                >
                  <span className="min-w-0 break-words">{link.label}</span>
                  <span aria-hidden className="shrink-0">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-line bg-canvas p-5 sm:p-6">
            <h3 className="font-display text-xl font-semibold text-navy">
              A Week in the Horn
            </h3>
            <p className="mt-1 text-sm text-muted">ሳምንቱ በአፍሪካ ቀንድ</p>
            <a
              href={site.weekInTheHornUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block overflow-hidden"
            >
              <Image
                src={assets.weekInTheHorn.src}
                alt={assets.weekInTheHorn.alt}
                width={assets.weekInTheHorn.width}
                height={assets.weekInTheHorn.height}
                className="h-auto w-full object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
