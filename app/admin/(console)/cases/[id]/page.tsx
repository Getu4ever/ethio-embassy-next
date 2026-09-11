import type { Metadata } from "next";
import Link from "next/link";
import CaseDetailView from "@/components/admin/CaseDetailView";
import { getCase } from "@/lib/cases/store";
import { CONSULAR_WORKFLOWS } from "@/lib/consular/workflows";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const record = await getCase(id);
  return {
    title: record ? record.reference : `Case ${id}`,
  };
}

export default async function AdminCaseDetailPage({ params }: Props) {
  const { id } = await params;
  const record = await getCase(id);
  if (!record) notFound();

  const workflow = CONSULAR_WORKFLOWS[record.workflowId];

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/cases"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
        >
          ← Back to queue
        </Link>
        <h1 className="mt-3 font-display text-3xl font-semibold text-navy">
          {record.reference}
        </h1>
      </div>
      <CaseDetailView record={record} workflow={workflow} />
    </div>
  );
}
