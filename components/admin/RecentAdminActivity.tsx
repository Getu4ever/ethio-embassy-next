import Link from "next/link";
import type { AuditEntry } from "@/lib/audit/types";

export default function RecentAdminActivity({
  entries,
}: {
  entries: AuditEntry[];
}) {
  return (
    <section className="border border-navy/10 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            Oversight
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-navy">
            Recent admin activity
          </h2>
        </div>
        <Link
          href="/admin/audit"
          className="text-xs font-semibold uppercase tracking-[0.12em] text-navy"
        >
          Full log →
        </Link>
      </div>
      <ul className="mt-5 divide-y divide-line">
        {entries.map((entry) => (
          <li key={entry.id} className="py-3 text-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-navy">{entry.summary}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {entry.username} · {entry.module} · {entry.action}
                </p>
              </div>
              <time className="shrink-0 text-xs text-muted">
                {new Date(entry.at).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </li>
        ))}
        {entries.length === 0 ? (
          <li className="py-8 text-center text-sm text-muted">
            No staff activity recorded yet. Logins, content edits, and case
            decisions will appear here.
          </li>
        ) : null}
      </ul>
    </section>
  );
}
