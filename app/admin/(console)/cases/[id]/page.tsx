import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaffCaseActions from "@/components/staff/StaffCaseActions";
import { getCase } from "@/lib/cases/store";
import { CASE_STATUS_LABELS } from "@/lib/cases/types";
import { CONSULAR_WORKFLOWS } from "@/lib/consular/workflows";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Case ${id}` };
}

export default async function AdminCaseDetailPage({ params }: Props) {
  const { id } = await params;
  const record = await getCase(id);
  if (!record) notFound();

  const workflow = CONSULAR_WORKFLOWS[record.workflowId];

  return (
    <div className="space-y-8">
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
        <p className="mt-2 text-sm text-muted">
          {workflow.title} · {CASE_STATUS_LABELS[record.status]} · Payment{" "}
          {record.paymentStatus.replace("_", " ")}
        </p>
      </div>

      <section className="grid gap-6 border border-navy/10 bg-white p-6 shadow-sm sm:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-navy">
            Applicant
          </h2>
          <dl className="mt-3 space-y-2 text-sm text-muted">
            <div>
              <dt className="text-xs uppercase tracking-[0.12em]">Name</dt>
              <dd className="text-charcoal">{record.applicant.fullName}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em]">Email</dt>
              <dd>
                <a className="text-navy" href={`mailto:${record.applicant.email}`}>
                  {record.applicant.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em]">Phone</dt>
              <dd>{record.applicant.phone}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em]">Passport / ID</dt>
              <dd>{record.applicant.passportNumber || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em]">Notes</dt>
              <dd>{record.applicant.notes || "—"}</dd>
            </div>
          </dl>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-navy">
            Staff actions
          </h2>
          <div className="mt-3">
            <StaffCaseActions record={record} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-navy">
          Documents
        </h2>
        <ul className="mt-4 space-y-3">
          {record.documents.map((doc) => {
            const req = workflow.documents.find(
              (d) => d.id === doc.requirementId,
            );
            return (
              <li
                key={`${doc.requirementId}-${doc.fileName}`}
                className="flex flex-wrap items-center justify-between gap-3 border border-navy/10 bg-white px-4 py-3 text-sm shadow-sm"
              >
                <div>
                  <p className="font-medium text-navy">
                    {req?.label ?? doc.requirementId}
                  </p>
                  <p className="text-muted">
                    {doc.fileName} · {(doc.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                {doc.url ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-navy underline"
                  >
                    Open
                  </a>
                ) : (
                  <span className="text-xs text-muted">
                    Stored locally (.data)
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-navy">Timeline</h2>
        <ul className="mt-4 space-y-3">
          {record.staffNotes
            .slice()
            .reverse()
            .map((note) => (
              <li
                key={note.id}
                className="border-l-2 border-gold/50 bg-white py-2 pl-4 text-sm shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-muted">
                  {note.by} · {new Date(note.at).toLocaleString("en-GB")}
                </p>
                <p className="mt-1 text-charcoal">{note.body}</p>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
