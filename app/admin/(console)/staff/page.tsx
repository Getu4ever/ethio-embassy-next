import type { Metadata } from "next";
import { getStaffUsername } from "@/lib/staff/auth";

export const metadata: Metadata = {
  title: "Staff & access",
};

function Status({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-line py-3 text-sm last:border-0">
      <span className="text-charcoal">{label}</span>
      <span className={ok ? "font-semibold text-emerald" : "font-semibold text-crimson"}>
        {ok ? "Ready" : "Missing"}
      </span>
    </li>
  );
}

export default function AdminStaffPage() {
  const username = getStaffUsername();

  const checks = [
    { ok: Boolean(process.env.STAFF_ACCESS_PASSWORD?.trim()), label: "STAFF_ACCESS_PASSWORD" },
    { ok: Boolean(process.env.STAFF_SESSION_SECRET?.trim() || process.env.STAFF_ACCESS_PASSWORD?.trim()), label: "Session signing secret" },
    { ok: Boolean(process.env.RESEND_API_KEY?.trim()), label: "Resend API key" },
    { ok: Boolean(process.env.BOOKING_FROM_EMAIL?.trim()), label: "From email" },
    { ok: Boolean(process.env.BOOKING_NOTIFY_EMAIL?.trim()), label: "Desk notify email" },
    { ok: Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim()), label: "Vercel Blob (prod storage)" },
    { ok: Boolean(process.env.STRIPE_SECRET_KEY?.trim()), label: "Stripe secret key" },
    { ok: Boolean(process.env.GOOGLE_CALENDAR_ID?.trim()), label: "Google Calendar ID" },
    { ok: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()), label: "Public site URL" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Staff & access
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Admin console credentials and integration health for the London
          consular desk.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="border border-navy/10 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Login username
          </p>
          <p className="mt-3 font-display text-2xl font-semibold text-navy">
            {username}
          </p>
          <p className="mt-2 text-sm text-muted">
            Override with <code className="text-navy">STAFF_USERNAME</code>.
            Default is <code className="text-navy">admin</code>.
          </p>
        </div>
        <div className="border border-navy/10 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Session length
          </p>
          <p className="mt-3 font-display text-2xl font-semibold text-navy">
            12h / 14d
          </p>
          <p className="mt-2 text-sm text-muted">
            Standard session is 12 hours. “Remember Me” extends to 14 days on
            this device.
          </p>
        </div>
      </section>

      <section className="border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-navy">
          Integration checklist
        </h2>
        <ul className="mt-2">
          {checks.map((item) => (
            <Status key={item.label} ok={item.ok} label={item.label} />
          ))}
        </ul>
      </section>

      <section className="border border-navy/10 bg-navy p-6 text-white shadow-sm">
        <h2 className="font-display text-xl font-semibold">Roles (current)</h2>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          <li>
            <strong className="text-white">Consular admin</strong> — full access
            to case queue, fee catalogue, and appointment guidance (this login).
          </li>
          <li>
            Additional named staff accounts can be added later (Clerk / SSO).
            Today a single shared desk password is intentional for the Embassy
            ops MVP.
          </li>
        </ul>
      </section>
    </div>
  );
}
