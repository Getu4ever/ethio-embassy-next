"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { staffLogout } from "@/app/actions/staff";
import { STAFF_ROLE_LABELS, type StaffRole } from "@/lib/staff/types";

const NAV: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/cases", label: "Case queue" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/fees", label: "Fees & content" },
  { href: "/admin/employees", label: "Employees" },
  { href: "/admin/staff", label: "Staff & access" },
  { href: "/admin/audit", label: "Audit log" },
];

export default function AdminShell({
  children,
  username,
  role,
}: {
  children: ReactNode;
  username: string;
  role?: StaffRole;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#eef1f5] text-charcoal">
      <header className="border-b border-navy/10 bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/admin.png"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Consular operations
              </p>
              <p className="font-display text-lg font-semibold leading-tight">
                Embassy Admin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-white/70 sm:inline">
              <strong className="text-white">{username}</strong>
              {role ? (
                <span className="text-white/50">
                  {" "}
                  · {STAFF_ROLE_LABELS[role]}
                </span>
              ) : null}
            </span>
            <Link
              href="/"
              className="text-white/70 transition hover:text-gold"
              target="_blank"
            >
              View site
            </Link>
            <form action={staffLogout}>
              <button
                type="submit"
                className="rounded-sm border border-white/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:border-gold hover:text-gold"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-8">
        <aside className="h-fit border border-navy/10 bg-white p-3 shadow-sm lg:sticky lg:top-6">
          <nav aria-label="Admin">
            <ul className="space-y-1">
              {NAV.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-2.5 text-sm transition ${
                        active
                          ? "bg-navy text-white"
                          : "text-charcoal hover:bg-canvas"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-4 border-t border-line px-3 pt-4 text-xs text-muted">
            <p>
              Cases, fees, staff accounts, employees, and activity oversight.
            </p>
          </div>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
