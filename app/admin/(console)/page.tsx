import type { Metadata } from "next";
import Link from "next/link";
import { listCases } from "@/lib/cases/store";
import { CASE_STATUS_LABELS, type CaseStatus } from "@/lib/cases/types";
import { WORKFLOW_LIST } from "@/lib/consular/workflows";
import { STRIPE_FEES, formatFeeAmount } from "@/lib/stripe/fees";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const cases = await listCases();
  const awaitingPayment = cases.filter((c) => c.status === "awaiting_payment").length;
  const inReview = cases.filter((c) => c.status === "in_review").length;
  const needsInfo = cases.filter((c) => c.status === "needs_info").length;
  const submitted = cases.filter((c) => c.status === "submitted").length;
  const recent = cases.slice(0, 6);

  const statusOrder: CaseStatus[] = [
    "awaiting_payment",
    "submitted",
    "in_review",
    "needs_info",
    "approved",
    "rejected",
    "completed",
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted">
          Overview of consular document cases, fees, and staff tools.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total cases", value: cases.length, href: "/admin/cases" },
          { label: "Awaiting payment", value: awaitingPayment, href: "/admin/cases?status=awaiting_payment" },
          { label: "In review", value: inReview, href: "/admin/cases?status=in_review" },
          { label: "Needs info", value: needsInfo, href: "/admin/cases?status=needs_info" },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-navy/10 bg-white p-5 shadow-sm transition hover:border-gold/50"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {card.label}
            </p>
            <p className="mt-3 font-display text-4xl font-semibold text-navy">
              {card.value}
            </p>
            {card.label === "Total cases" && submitted > 0 ? (
              <p className="mt-2 text-xs text-emerald">
                {submitted} newly submitted
              </p>
            ) : null}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="border border-navy/10 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-navy">
              Recent cases
            </h2>
            <Link
              href="/admin/cases"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-navy"
            >
              Open queue →
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-line">
            {recent.map((record) => (
              <li key={record.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div>
                  <Link
                    href={`/admin/cases/${record.id}`}
                    className="font-medium text-navy underline decoration-gold/40"
                  >
                    {record.reference}
                  </Link>
                  <p className="text-muted">
                    {record.applicant.fullName} ·{" "}
                    {CASE_STATUS_LABELS[record.status]}
                  </p>
                </div>
                <time className="shrink-0 text-xs text-muted">
                  {new Date(record.updatedAt).toLocaleDateString("en-GB")}
                </time>
              </li>
            ))}
            {recent.length === 0 ? (
              <li className="py-8 text-center text-sm text-muted">
                No cases yet. Applicants submit via{" "}
                <Link href="/apply" className="text-navy underline">
                  /apply
                </Link>
                .
              </li>
            ) : null}
          </ul>
        </section>

        <section className="space-y-6 lg:col-span-2">
          <div className="border border-navy/10 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-navy">
              Queue by status
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {statusOrder.map((status) => {
                const count = cases.filter((c) => c.status === status).length;
                return (
                  <li key={status} className="flex justify-between gap-3">
                    <Link
                      href={`/admin/cases?status=${status}`}
                      className="text-charcoal hover:text-navy"
                    >
                      {CASE_STATUS_LABELS[status]}
                    </Link>
                    <span className="font-semibold text-navy">{count}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border border-navy/10 bg-navy p-6 text-white shadow-sm">
            <h2 className="font-display text-xl font-semibold">Quick actions</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <Link href="/admin/cases" className="hover:text-gold">
                  Review document cases →
                </Link>
              </li>
              <li>
                <Link href="/admin/appointments" className="hover:text-gold">
                  Appointment calendar guidance →
                </Link>
              </li>
              <li>
                <Link href="/admin/fees" className="hover:text-gold">
                  Stripe fee catalogue →
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-gold" target="_blank">
                  Open applicant portal →
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <section className="border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-navy">
          Active workflows
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFLOW_LIST.map((workflow) => {
            const fee = workflow.feeId ? STRIPE_FEES[workflow.feeId] : null;
            return (
              <li key={workflow.id} className="border border-line p-4 text-sm">
                <p className="font-medium text-navy">{workflow.shortTitle}</p>
                <p className="mt-1 text-muted">
                  {fee
                    ? `${formatFeeAmount(fee)}${fee.placeholder ? " · placeholder" : ""}`
                    : "No online fee"}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
