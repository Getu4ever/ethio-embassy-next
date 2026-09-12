"use client";

import { useEffect, useId, useRef, useState } from "react";
import { contact } from "@/lib/content/site";

type Props = {
  email?: string;
  subject?: string;
  body?: string;
  label?: string;
  className?: string;
  /** Small uppercase label above the dialog title */
  eyebrow?: string;
};

type Provider = {
  id: string;
  name: string;
  description: string;
  href: string;
  external: boolean;
};

function buildProviders(
  email: string,
  subject: string,
  body: string,
): Provider[] {
  const su = encodeURIComponent(subject);
  const bd = encodeURIComponent(body);
  const to = encodeURIComponent(email);

  return [
    {
      id: "gmail",
      name: "Gmail",
      description: "Open a new message in Google Mail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}`,
      external: true,
    },
    {
      id: "outlook",
      name: "Outlook",
      description: "Compose in Microsoft Outlook on the web",
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bd}`,
      external: true,
    },
    {
      id: "office",
      name: "Microsoft 365",
      description: "Compose with your work or school account",
      href: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${su}&body=${bd}`,
      external: true,
    },
    {
      id: "yahoo",
      name: "Yahoo Mail",
      description: "Open Yahoo Mail compose",
      href: `https://compose.mail.yahoo.com/?to=${to}&subject=${su}&body=${bd}`,
      external: true,
    },
    {
      id: "default",
      name: "Default mail app",
      description: "Use Mail, Outlook desktop, or your system client",
      href: `mailto:${email}?subject=${su}&body=${bd}`,
      external: false,
    },
  ];
}

function ProviderIcon({ id }: { id: string }) {
  switch (id) {
    case "gmail":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M3 6.75V18h4.5V11.4L12 14.7l4.5-3.3V18H21V6.75L12 13.2 3 6.75z" />
          <path fill="#34A853" d="M21 6.75V5.4L16.5 8.7V18H21V6.75z" />
          <path fill="#FBBC04" d="M3 5.4v1.35L7.5 8.7V18H3V5.4z" />
          <path fill="#EA4335" d="M3 5.4L12 11.85 21 5.4H3z" />
        </svg>
      );
    case "outlook":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#0078D4"
            d="M3.5 5.5h9.2c.6 0 1.1.5 1.1 1.1v10.8c0 .6-.5 1.1-1.1 1.1H3.5V5.5z"
          />
          <path fill="#28A8EA" d="M13.8 7.8H21v8.4c0 .9-.7 1.6-1.6 1.6h-5.6V7.8z" />
          <circle cx="8.1" cy="12" r="2.5" fill="#fff" />
        </svg>
      );
    case "office":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#D83B01"
            d="M4 4.8h7.4L20 7.2v12.4c0 .6-.5 1.1-1.1 1.1H9.8L4 17.8V4.8z"
          />
          <path fill="#fff" d="M9.2 8.4h5.1v1.5H11v1.6h3v1.5h-3v1.7h3.4v1.5H9.2V8.4z" />
        </svg>
      );
    case "yahoo":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#6001D2"
            d="M5 5.5h3.1l2.5 5.1 2.5-5.1H16l-4.4 8.3v4.7h-2.4v-4.7L5 5.5zm11.8 4h2.5v9h-2.5v-9zm1.25-4.6a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
          />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5 text-navy" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

export default function EmailProviderChooser({
  email = contact.email,
  subject = "Consular enquiry — Embassy of Ethiopia, London",
  body = "Dear Consular Desk,\n\nI would like to enquire about the following:\n\n\n\nKind regards,\n",
  label = "Email consular desk",
  className = "inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold",
  eyebrow = "Consular desk",
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const providers = buildProviders(email, subject, body);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            aria-label="Close email options"
            className="absolute inset-0 bg-navy-deep/70 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-md overflow-hidden border border-white/10 bg-white shadow-[0_28px_80px_rgba(7,21,40,0.45)]"
          >
            <div className="h-1 bg-gradient-to-r from-[#8a7048] via-gold to-[#f0e0bc]" />

            <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {eyebrow}
                </p>
                <h2
                  id={titleId}
                  className="mt-1.5 font-display text-xl font-semibold text-navy sm:text-2xl"
                >
                  Choose how to email
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Open a ready-to-send message to{" "}
                  <span className="font-medium text-navy">{email}</span>
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-line text-navy/70 transition hover:border-navy hover:text-navy"
                aria-label="Close"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            <ul className="mt-5 space-y-2 px-5 pb-2 sm:px-6">
              {providers.map((provider) => (
                <li key={provider.id}>
                  <a
                    href={provider.href}
                    target={provider.external ? "_blank" : undefined}
                    rel={provider.external ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 border border-line bg-canvas/60 px-3.5 py-3 transition hover:border-gold/50 hover:bg-white"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-white">
                      <ProviderIcon id={provider.id} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-navy">
                        {provider.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {provider.description}
                      </span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/40 transition group-hover:text-gold">
                      Open →
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-line bg-canvas px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={copyEmail}
                className="flex w-full items-center justify-between gap-3 border border-navy/15 bg-white px-3.5 py-3 text-left transition hover:border-navy/40"
              >
                <span>
                  <span className="block text-sm font-semibold text-navy">
                    {copied ? "Address copied" : "Copy email address"}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{email}</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                  {copied ? "Done" : "Copy"}
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
