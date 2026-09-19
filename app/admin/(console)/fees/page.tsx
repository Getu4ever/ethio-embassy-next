import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SiteContentEditor from "@/components/admin/SiteContentEditor";
import {
  getResolvedFees,
  getSiteContent,
} from "@/lib/cms/content-store";
import { canManageContent } from "@/lib/staff/permissions";
import { requireAdmin } from "@/lib/staff/session";

export const metadata: Metadata = {
  title: "Fees & content",
};

export const dynamic = "force-dynamic";

export default async function AdminFeesPage() {
  const viewer = await requireAdmin();
  if (!canManageContent(viewer.role)) {
    redirect(viewer.role === "editor" ? "/admin/news" : "/admin");
  }
  const [content, feesMap] = await Promise.all([
    getSiteContent(),
    getResolvedFees(),
  ]);
  const fees = Object.values(feesMap);
  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  const webhookConfigured = Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Fees & content
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Edit service fees (including Vital Events), office hours, and desk
          notes for visa documents, TIN requests, and duty-free guidance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Stripe
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {stripeConfigured ? "Configured" : "Missing"}
          </p>
        </div>
        <div className="border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Webhook
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {webhookConfigured ? "Configured" : "Missing"}
          </p>
        </div>
        <div className="border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Last content edit
          </p>
          <p className="mt-2 font-display text-lg font-semibold text-navy">
            {content.updatedAt
              ? new Date(content.updatedAt).toLocaleString("en-GB")
              : "Defaults"}
          </p>
          {content.updatedBy ? (
            <p className="mt-1 text-xs text-muted">by {content.updatedBy}</p>
          ) : null}
        </div>
      </div>

      <SiteContentEditor
        content={content}
        fees={fees}
        canEdit={canManageContent(viewer.role)}
      />
    </div>
  );
}
