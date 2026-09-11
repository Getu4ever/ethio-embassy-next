import type { Metadata } from "next";
import { STRIPE_FEES, formatFeeAmount } from "@/lib/stripe/fees";
import { WORKFLOW_LIST } from "@/lib/consular/workflows";

export const metadata: Metadata = {
  title: "Fee catalogue",
};

export default function AdminFeesPage() {
  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  const webhookConfigured = Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim());
  const fees = Object.values(STRIPE_FEES);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Fee catalogue
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Online amounts charged via Stripe Checkout. Placeholder fees must be
          replaced with the Embassy’s official GBP schedule before production.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Stripe secret key
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {stripeConfigured ? "Configured" : "Missing"}
          </p>
        </div>
        <div className="border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Webhook secret
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {webhookConfigured ? "Configured" : "Missing"}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border border-navy/10 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3">Fee</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Used by</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => {
              const workflows = WORKFLOW_LIST.filter((w) => w.feeId === fee.id)
                .map((w) => w.shortTitle)
                .join(", ");
              return (
                <tr key={fee.id} className="border-t border-line">
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy">{fee.label}</div>
                    <div className="text-xs text-muted">{fee.id}</div>
                  </td>
                  <td className="px-4 py-3">{formatFeeAmount(fee)}</td>
                  <td className="px-4 py-3">
                    {fee.placeholder ? (
                      <span className="text-crimson">Placeholder</span>
                    ) : (
                      <span className="text-emerald">Live amount</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {workflows || "Standalone checkout button"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted">
        Edit amounts in <code className="text-navy">lib/stripe/fees.ts</code>.
        Webhook endpoint: <code className="text-navy">/api/stripe/webhook</code>.
      </p>
    </div>
  );
}
