import type { Metadata } from "next";
import { redirect } from "next/navigation";
import NewsAdminPanel from "@/components/admin/NewsAdminPanel";
import { listNewsPosts } from "@/lib/cms/news";
import { canManageNews } from "@/lib/staff/permissions";
import { requireAdmin } from "@/lib/staff/session";

export const metadata: Metadata = {
  title: "News posts",
};

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const viewer = await requireAdmin();
  if (!canManageNews(viewer.role)) {
    redirect("/admin");
  }

  const posts = await listNewsPosts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          News desk
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          File briefings with a cover photo, headline, and story. Released posts
          appear on <span className="font-medium text-navy">/news</span>, each
          article page, and the homepage — in the same public layout visitors
          already see.
        </p>
      </div>

      <NewsAdminPanel posts={posts} />
    </div>
  );
}
