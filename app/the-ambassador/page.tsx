import Image from "next/image";
import Link from "next/link";
import {
  AboutUsShell,
  makeAboutUsMetadata,
} from "@/components/AboutUsShell";
import { ambassadorProfile } from "@/lib/content/about-us";
import { ambassadorWelcome } from "@/lib/content/site";

export const metadata = makeAboutUsMetadata("The Ambassador");

export default function TheAmbassadorPage() {
  return (
    <AboutUsShell
      title="The Ambassador"
      currentHref="/the-ambassador"
      lede={ambassadorProfile.title}
      hero={{
        src: "/images/about-ethiopia/ethiopian-london-embassy.jpg",
        alt: "Embassy of Ethiopia in London",
        position: "object-center",
      }}
    >
      <div className="grid gap-10 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] sm:items-start sm:gap-12">
        <div className="group relative mx-auto aspect-square w-full max-w-[18rem] sm:mx-0 sm:max-w-[20rem]">
          <div
            className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(197,165,114,0.32)_0%,transparent_70%)] opacity-80 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
            aria-hidden
          />
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f0e0bc] via-[#c5a572] to-[#8a7048] p-[2.5px] shadow-[0_20px_44px_rgba(11,37,69,0.16)] transition duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_28px_56px_rgba(11,37,69,0.22)]"
            aria-hidden
          >
            <div className="h-full w-full rounded-full bg-canvas p-[6px]">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-[#e8d5a8] via-[#c5a572] to-[#7a6240] p-[1.5px]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-navy/5">
                  <Image
                    src={ambassadorProfile.image.src}
                    alt={ambassadorProfile.image.alt}
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 70vw, 320px"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_45%,rgba(7,21,40,0.28)_100%)]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/30 via-transparent to-white/15"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Head of Mission
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            {ambassadorProfile.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {ambassadorProfile.title}
          </p>
          <p className="mt-4 text-sm text-charcoal">
            Appointed{" "}
            <span className="font-semibold">{ambassadorProfile.appointed}</span>
          </p>
          <div className="mt-5 h-px w-16 bg-gold" />
          <p className="mt-5 text-[15px] leading-[1.75] text-muted sm:text-base">
            {ambassadorProfile.body}
          </p>
        </div>
      </div>

      <section className="mt-12 border border-line bg-canvas/70 px-5 py-6 sm:px-7">
        <h3 className="font-display text-lg font-semibold text-navy">
          {ambassadorWelcome.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">
          {ambassadorWelcome.greeting} {ambassadorWelcome.body}
        </p>
        <p className="mt-5 text-sm font-semibold text-navy">
          {ambassadorWelcome.attribution}
        </p>
        <p className="text-sm text-muted">{ambassadorWelcome.role}</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/the-embassy"
          className="inline-flex bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-navy-mid"
        >
          The Embassy
        </Link>
        <Link
          href="/contact-us"
          className="inline-flex border border-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition hover:bg-canvas"
        >
          Contact Us
        </Link>
      </div>
    </AboutUsShell>
  );
}
