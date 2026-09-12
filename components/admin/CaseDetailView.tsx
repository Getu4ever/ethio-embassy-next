import CaseActionPanel from "@/components/admin/CaseActionPanel";
import CaseDocumentViewer from "@/components/admin/CaseDocumentViewer";
import CaseRecordEditor from "@/components/admin/CaseRecordEditor";
import {
  CASE_STATUS_LABELS,
  type ConsularCase,
} from "@/lib/cases/types";
import type { ConsularWorkflow } from "@/lib/consular/workflows";

type Props = {
  record: ConsularCase;
  workflow: ConsularWorkflow;
  canEditDelete?: boolean;
};

export default function CaseDetailView({
  record,
  workflow,
  canEditDelete = false,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        <section className="border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                Applicant dossier
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-navy">
                {record.applicant.fullName}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {workflow.title} · {CASE_STATUS_LABELS[record.status]} · Payment{" "}
                {record.paymentStatus.replace("_", " ")}
              </p>
            </div>
            <div className="text-right text-xs text-muted">
              <p>Created {new Date(record.createdAt).toLocaleString("en-GB")}</p>
              <p>Updated {new Date(record.updatedAt).toLocaleString("en-GB")}</p>
            </div>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {(
              [
                ["Email", record.applicant.email],
                ["Phone", record.applicant.phone],
                ["Passport / ID", record.applicant.passportNumber || "—"],
                ["Reference", record.reference],
                ["Case ID", record.id],
                ["Workflow", workflow.shortTitle],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="border border-line bg-canvas px-3 py-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 break-all text-sm text-charcoal">{value}</dd>
              </div>
            ))}
          </dl>

          {record.applicant.notes ? (
            <div className="mt-4 border-l-2 border-gold bg-gold/10 px-4 py-3 text-sm text-charcoal">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Applicant notes
              </p>
              <p className="mt-1">{record.applicant.notes}</p>
            </div>
          ) : null}
        </section>

        {canEditDelete ? <CaseRecordEditor record={record} /> : null}

        <section className="border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-display text-xl font-semibold text-navy">
            Document viewer
          </h2>
          <p className="mt-1 text-sm text-muted">
            Review uploaded identity and supporting files before deciding.
          </p>
          <div className="mt-4">
            <CaseDocumentViewer
              documents={record.documents}
              workflow={workflow}
            />
          </div>
        </section>

        <section className="border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-display text-xl font-semibold text-navy">
            Case timeline
          </h2>
          <ul className="mt-4 space-y-3">
            {record.staffNotes
              .slice()
              .reverse()
              .map((note) => (
                <li
                  key={note.id}
                  className="border-l-2 border-gold/50 py-1 pl-4 text-sm"
                >
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted">
                    {note.by} · {new Date(note.at).toLocaleString("en-GB")}
                  </p>
                  <p className="mt-1 text-charcoal">{note.body}</p>
                </li>
              ))}
          </ul>
        </section>
      </div>

      <aside className="lg:col-span-4">
        <CaseActionPanel record={record} />
      </aside>
    </div>
  );
}
