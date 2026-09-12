import Link from "next/link";
import { homepageFaqs } from "@/lib/content/faq";

export default function HomeFaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-line bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Practical guidance
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Quick answers for visitors, applicants, and members of the Ethiopian
            community in the United Kingdom.
          </p>
        </div>

        <div className="mt-8 divide-y divide-line border-y border-line sm:mt-10">
          {homepageFaqs.map((item) => (
            <details
              key={item.question}
              className="group py-5 open:bg-canvas/40 sm:px-1"
            >
              <summary className="cursor-pointer list-none font-display text-lg font-semibold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-gold transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Need more help?{" "}
          <Link
            href="/contact-us"
            className="font-semibold text-navy underline-offset-4 transition hover:text-emerald hover:underline"
          >
            Contact the Embassy
          </Link>{" "}
          or{" "}
          <Link
            href="/booking"
            className="font-semibold text-navy underline-offset-4 transition hover:text-emerald hover:underline"
          >
            book an appointment
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
