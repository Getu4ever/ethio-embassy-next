"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { staffLogin } from "@/app/actions/staff";

type Props = {
  configured: boolean;
};

export default function AdminLoginForm({ configured }: Props) {
  const [state, action, pending] = useActionState(staffLogin, null);
  const [showPassword, setShowPassword] = useState(false);

  if (!configured) {
    return (
      <div className="w-full max-w-[420px] rounded-sm bg-white px-8 py-10 text-center shadow-[0_24px_60px_rgba(7,21,40,0.28)]">
        <Image
          src="/images/admin.png"
          alt="Emblem of Ethiopia"
          width={88}
          height={88}
          className="mx-auto"
          priority
        />
        <h1 className="mt-6 font-display text-2xl font-semibold text-navy">
          Admin not configured
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Set <code className="text-navy">STAFF_ACCESS_PASSWORD</code> (and
          optionally <code className="text-navy">STAFF_USERNAME</code>) in the
          environment to enable the consular admin console.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-navy underline decoration-gold/50 underline-offset-4"
        >
          ← Go to Embassy of Ethiopia
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] rounded-sm bg-white px-8 py-9 shadow-[0_24px_60px_rgba(7,21,40,0.28)] sm:px-10 sm:py-10">
      <div className="text-center">
        <Image
          src="/images/admin.png"
          alt="Emblem of Ethiopia"
          width={96}
          height={96}
          className="mx-auto"
          priority
        />
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          Embassy of Ethiopia · London
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-navy sm:text-[1.75rem]">
          Consular Admin
        </h1>
      </div>

      <form action={action} className="mt-8 space-y-5">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-charcoal">
            Username or Email Address
          </span>
          <input
            type="text"
            name="username"
            autoComplete="username"
            required
            defaultValue=""
            placeholder="Username or email"
            className="w-full rounded-sm border border-[#c3c4c7] bg-white px-3 py-2.5 text-[15px] text-charcoal outline-none transition focus:border-navy focus:ring-1 focus:ring-navy/20"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-charcoal">Password</span>
          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              className="w-full rounded-sm border border-[#c3c4c7] bg-white px-3 py-2.5 pr-11 text-[15px] text-charcoal outline-none transition focus:border-navy focus:ring-1 focus:ring-navy/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-navy/70 transition hover:text-navy"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 5c5 0 9.3 3.1 11 7.5a11.5 11.5 0 01-4.1 5.1M6.1 6.1A11.5 11.5 0 001 12.5C2.7 16.9 7 20 12 20c1.7 0 3.3-.4 4.7-1" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M1 12.5C2.7 8.1 7 5 12 5s9.3 3.1 11 7.5c-1.7 4.4-6 7.5-11 7.5S2.7 16.9 1 12.5z" />
                  <circle cx="12" cy="12.5" r="3" />
                </svg>
              )}
            </button>
          </span>
        </label>

        <label className="flex items-center gap-2.5 text-sm text-charcoal">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded-sm border-[#c3c4c7] accent-navy"
          />
          <span>Remember Me</span>
          <span
            title="Keeps you signed in on this device for 14 days."
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-muted/40 text-[10px] text-muted"
          >
            ?
          </span>
        </label>

        {state?.error ? (
          <p className="text-sm text-crimson" role="alert">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-sm bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-mid disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Log In"}
        </button>
      </form>

      <div className="mt-8 space-y-2 text-center text-sm">
        <p className="text-muted">
          Lost your password? Contact your system administrator.
        </p>
        <Link
          href="/"
          className="inline-block text-muted underline decoration-muted/40 underline-offset-4 transition hover:text-navy"
        >
          ← Go to Embassy of Ethiopia
        </Link>
      </div>
    </div>
  );
}
