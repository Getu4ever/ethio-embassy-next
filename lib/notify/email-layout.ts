import { contact, site } from "@/lib/content/site";

const BRAND = {
  navy: "#0B2545",
  navyDeep: "#071528",
  gold: "#c5a572",
  goldBright: "#dbbf8a",
  charcoal: "#1f2933",
  muted: "#5b6775",
  line: "#e5e7eb",
  canvas: "#f7f5f1",
  white: "#ffffff",
} as const;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return site.url.replace(/\/$/, "");
}

export type EmailDetailRow = {
  label: string;
  value: string;
};

export type BrandedEmailInput = {
  /** Main headline, e.g. "Appointment request received" */
  title: string;
  /** Optional greeting line, e.g. "Dear Jane Doe," */
  greeting?: string;
  /** Intro paragraphs (plain text; will be escaped) */
  intro?: string[];
  /** Label above the details card */
  detailsLabel?: string;
  details?: EmailDetailRow[];
  /** Extra HTML already escaped / trusted (use sparingly) */
  bodyHtml?: string;
  /** Primary CTA */
  cta?: { label: string; href: string };
  /** Closing paragraphs */
  closing?: string[];
  /** Staff vs public tone — staff omits applicant-facing closing fluff */
  variant?: "applicant" | "staff";
};

/**
 * Professional HTML email shell matching Embassy navy/gold brand.
 * Table-based for client compatibility.
 */
export function renderBrandedEmail(input: BrandedEmailInput): string {
  const origin = siteOrigin();
  const logoUrl = `${origin}/images/logo-uk.png`;
  const detailsLabel = input.detailsLabel ?? "Details";
  const variant = input.variant ?? "applicant";

  const introHtml = (input.intro ?? [])
    .map(
      (p) =>
        `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${BRAND.charcoal};">${escapeHtml(p)}</p>`,
    )
    .join("");

  const closingHtml = (input.closing ?? [])
    .map(
      (p) =>
        `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${BRAND.charcoal};">${escapeHtml(p)}</p>`,
    )
    .join("");

  const detailsRows = (input.details ?? [])
    .map(
      (row) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};vertical-align:top;width:38%;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.muted};">${escapeHtml(row.label)}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};vertical-align:top;font-size:15px;line-height:1.5;color:${BRAND.navy};font-weight:600;">
          ${escapeHtml(row.value)}
        </td>
      </tr>`,
    )
    .join("");

  const detailsBlock =
    detailsRows.length > 0
      ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 8px;background:${BRAND.canvas};border:1px solid ${BRAND.line};">
        <tr>
          <td style="padding:18px 20px 8px;">
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.gold};">${escapeHtml(detailsLabel)}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${detailsRows}
            </table>
          </td>
        </tr>
      </table>`
      : "";

  const ctaBlock = input.cta
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
        <tr>
          <td style="background:${BRAND.navy};">
            <a href="${escapeHtml(input.cta.href)}" style="display:inline-block;padding:14px 28px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;color:${BRAND.white};">${escapeHtml(input.cta.label)}</a>
          </td>
        </tr>
      </table>`
    : "";

  const greeting = input.greeting
    ? `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${BRAND.charcoal};">${escapeHtml(input.greeting)}</p>`
    : "";

  const signOff =
    variant === "applicant"
      ? `
        <p style="margin:24px 0 0;font-size:15px;line-height:1.65;color:${BRAND.charcoal};">With regards,</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:${BRAND.navy};">${escapeHtml(site.shortName)}</p>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(input.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.canvas};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.canvas};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${BRAND.white};border:1px solid ${BRAND.line};">
          <tr>
            <td style="height:4px;background:${BRAND.gold};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 20px;text-align:center;background:${BRAND.white};">
              <img src="${logoUrl}" width="64" height="64" alt="${escapeHtml(site.name)}" style="display:block;margin:0 auto 14px;border:0;outline:none;" />
              <p style="margin:0;font-size:18px;font-weight:700;letter-spacing:0.02em;color:${BRAND.navy};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(site.name)}</p>
              <p style="margin:6px 0 0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.gold};">London</p>
              <div style="margin:18px auto 0;width:56px;height:2px;background:${BRAND.gold};"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 32px;">
              <h1 style="margin:0 0 18px;font-size:24px;line-height:1.3;font-weight:700;color:${BRAND.navy};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(input.title)}</h1>
              ${greeting}
              ${introHtml}
              ${detailsBlock}
              ${input.bodyHtml ?? ""}
              ${ctaBlock}
              ${closingHtml}
              ${signOff}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px;background:${BRAND.navyDeep};color:${BRAND.white};">
              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:${BRAND.white};">${escapeHtml(site.fullName)}</p>
              <p style="margin:0;font-size:12px;line-height:1.7;color:rgba(255,255,255,0.75);">
                ${escapeHtml(contact.address)}<br />
                Tel.: <a href="tel:${escapeHtml(contact.phone)}" style="color:${BRAND.goldBright};text-decoration:none;">${escapeHtml(contact.phoneDisplay)}</a><br />
                <a href="mailto:${escapeHtml(contact.email)}" style="color:${BRAND.goldBright};text-decoration:none;">${escapeHtml(contact.email)}</a><br />
                <a href="${escapeHtml(origin)}" style="color:${BRAND.gold};text-decoration:none;">${escapeHtml(origin.replace(/^https?:\/\//, ""))}</a>
              </p>
              <p style="margin:14px 0 0;font-size:11px;line-height:1.5;color:rgba(255,255,255,0.45);">
                This message was sent by the Embassy of Ethiopia in London. Please do not reply with personal documents unless requested by the consular desk.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
