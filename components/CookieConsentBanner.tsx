"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "embassy_cookie_consent_v1";

type ConsentChoice = "all" | "necessary" | "denied" | "custom";

type ConsentState = {
  choice: ConsentChoice;
  preferences: boolean;
  statistics: boolean;
  at: string;
};

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [customise, setCustomise] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [statistics, setStatistics] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (payload: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
    setVisible(false);
    setCustomise(false);
  };

  const save = (choice: ConsentChoice) => {
    const at = new Date().toISOString();
    if (choice === "all") {
      persist({
        choice,
        preferences: true,
        statistics: true,
        at,
      });
      return;
    }
    if (choice === "denied" || choice === "necessary") {
      persist({
        choice,
        preferences: false,
        statistics: false,
        at,
      });
      return;
    }
    persist({
      choice: "custom",
      preferences,
      statistics,
      at,
    });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[80]"
    >
      <div className="gold-rule" />
      <div className="border-t border-white/10 bg-navy-deep text-white shadow-[0_-16px_48px_rgba(7,21,40,0.45)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-3.5 lg:px-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 bg-white/5 sm:h-14 sm:w-14">
            <Image
              src="/images/logo-uk.png"
              alt="Embassy of Ethiopia"
              width={48}
              height={48}
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
              priority
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-semibold text-white sm:text-lg">
              This website uses cookies
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/75">
              We use cookies to keep the site working, understand traffic, and
              improve our services. You can accept all, refuse non-essential
              cookies, or customise your choices.{" "}
              <Link
                href="/cookie-policy"
                className="text-gold underline decoration-gold/40 underline-offset-2 transition hover:text-gold-bright"
              >
                Cookie Policy
              </Link>
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => save("denied")}
              className="border border-white/30 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:border-gold hover:text-gold"
            >
              Deny
            </button>
            <button
              type="button"
              onClick={() => setCustomise((v) => !v)}
              className="border border-white/30 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:border-gold hover:text-gold"
            >
              Customise
            </button>
            <button
              type="button"
              onClick={() => save("all")}
              className="bg-gold px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-deep transition hover:bg-gold-bright"
            >
              Allow all
            </button>
          </div>
        </div>

        {customise ? (
          <div className="border-t border-white/10 bg-navy px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
              <ToggleRow
                label="Necessary"
                description="Required for security and core site functions."
                checked
                locked
              />
              <ToggleRow
                label="Preferences"
                description="Remember choices that improve your visit."
                checked={preferences}
                onChange={setPreferences}
              />
              <ToggleRow
                label="Statistics"
                description="Help us understand how the site is used."
                checked={statistics}
                onChange={setStatistics}
              />
            </div>
            <div className="mx-auto mt-4 flex max-w-7xl justify-end">
              <button
                type="button"
                onClick={() => save("custom")}
                className="bg-gold px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-deep transition hover:bg-gold-bright"
              >
                Allow selection
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  locked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="border border-white/15 bg-white/5 px-3 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">{label}</p>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={locked}
          onClick={() => onChange?.(!checked)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            checked ? "bg-gold" : "bg-white/20"
          } ${locked ? "cursor-default opacity-90" : ""}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              checked ? "left-[1.35rem]" : "left-0.5"
            }`}
          />
        </button>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-white/65">{description}</p>
    </div>
  );
}
