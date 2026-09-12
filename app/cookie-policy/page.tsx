import type { Metadata } from "next";
import Link from "next/link";
import { contact, site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${site.name} London uses cookies on this website.`,
};

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="diplomatic-mesh px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Embassy of Ethiopia · London
          </p>
          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Cookie Policy
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            This policy explains how cookies are used on the official website of
            the Embassy of Ethiopia in London.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <article className="space-y-8 text-sm leading-relaxed text-muted sm:text-base">
          <section>
            <h2 className="font-display text-xl font-semibold text-navy">
              What are cookies?
            </h2>
            <p className="mt-3">
              Cookies are small text files stored on your device when you visit a
              website. They help the site function securely, remember choices,
              and understand how pages are used.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy">
              How we use cookies
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-navy">Necessary</strong> — required for
                security, session management, and essential site features.
              </li>
              <li>
                <strong className="text-navy">Preferences</strong> — remember
                settings that improve your experience (optional).
              </li>
              <li>
                <strong className="text-navy">Statistics</strong> — help us
                understand traffic and improve services (optional).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy">
              Your choices
            </h2>
            <p className="mt-3">
              When you first visit, you can allow all cookies, deny non-essential
              cookies, or customise your selection. You can clear stored
              preferences in your browser at any time. Necessary cookies remain
              active so the site can operate safely.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy">
              Contact
            </h2>
            <p className="mt-3">
              Questions about this policy may be sent to{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-navy underline decoration-gold/40"
              >
                {contact.email}
              </a>{" "}
              or raised via{" "}
              <Link
                href="/contact-us"
                className="text-navy underline decoration-gold/40"
              >
                Contact Us
              </Link>
              .
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
