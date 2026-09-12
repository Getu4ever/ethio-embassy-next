"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  path: string;
  excerpt?: string;
};

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.12.18 2.12.18v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 2H2v20h20V2z" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.5 2 2 6.48 2 12c0 1.88.52 3.63 1.43 5.14L2.05 22l4.99-1.31A9.9 9.9 0 0 0 12.04 22C17.57 22 22 17.52 22 12S17.57 2 12.04 2zm0 18.07c-1.66 0-3.2-.47-4.5-1.28l-.32-.19-2.96.78.79-2.89-.21-.34A8.05 8.05 0 0 1 3.96 12c0-4.44 3.63-8.05 8.08-8.05 4.44 0 8.07 3.61 8.07 8.05 0 4.44-3.63 8.07-8.07 8.07z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 7.5 12 13l8.5-5.5" />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5.93" />
      <path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.41a5 5 0 0 0 7.07 7.07L14 18.07" />
    </svg>
  );
}

function shareTargets(url: string, title: string, excerpt: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(excerpt || title);

  return [
    {
      id: "x",
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: IconX,
    },
    {
      id: "facebook",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: IconFacebook,
    },
    {
      id: "linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: IconLinkedIn,
    },
    {
      id: "whatsapp",
      label: "Share on WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: IconWhatsApp,
    },
    {
      id: "email",
      label: "Share by email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      icon: IconMail,
    },
  ] as const;
}

export default function NewsShareBar({ title, path, excerpt = "" }: Props) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      window.location.origin;
    setUrl(`${origin}${path.startsWith("/") ? path : `/${path}`}`);
  }, [path]);

  async function copyLink() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const targets = url ? shareTargets(url, title, excerpt) : [];

  return (
    <div className="border-t border-line pt-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            Share
          </p>
          <p className="mt-1.5 font-display text-lg font-semibold text-navy">
            Pass this story on
          </p>
        </div>

        <div
          className="flex flex-wrap items-center gap-2.5"
          role="group"
          aria-label="Share this article"
        >
          {targets.map((target) => {
            const Icon = target.icon;
            return (
              <a
                key={target.id}
                href={target.href}
                target={target.id === "email" ? undefined : "_blank"}
                rel={
                  target.id === "email" ? undefined : "noopener noreferrer"
                }
                aria-label={target.label}
                className="group inline-flex h-11 w-11 items-center justify-center border border-navy/15 bg-white text-navy shadow-[0_8px_20px_rgba(11,37,69,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-navy hover:text-gold hover:shadow-[0_12px_28px_rgba(11,37,69,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Icon className="h-[18px] w-[18px] transition duration-300" />
              </a>
            );
          })}

          <button
            type="button"
            onClick={copyLink}
            disabled={!url}
            aria-label={copied ? "Link copied" : "Copy link"}
            className="group inline-flex h-11 items-center gap-2 border border-navy/15 bg-white px-3.5 text-navy shadow-[0_8px_20px_rgba(11,37,69,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-navy hover:text-gold hover:shadow-[0_12px_28px_rgba(11,37,69,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50"
          >
            <IconLink className="h-[18px] w-[18px]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
