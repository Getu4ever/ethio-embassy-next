"use client";

import { useMemo, useState } from "react";
import type { CaseDocument } from "@/lib/cases/types";
import type { ConsularWorkflow } from "@/lib/consular/workflows";

type Props = {
  documents: CaseDocument[];
  workflow: ConsularWorkflow;
};

function isImage(contentType: string, fileName: string): boolean {
  if (contentType.startsWith("image/")) return true;
  return /\.(jpe?g|png|gif|webp)$/i.test(fileName);
}

function isPdf(contentType: string, fileName: string): boolean {
  if (contentType === "application/pdf") return true;
  return /\.pdf$/i.test(fileName);
}

export default function CaseDocumentViewer({ documents, workflow }: Props) {
  const labeled = useMemo(
    () =>
      documents.map((doc) => ({
        ...doc,
        label:
          workflow.documents.find((d) => d.id === doc.requirementId)?.label ??
          doc.requirementId,
      })),
    [documents, workflow.documents],
  );

  const [activeKey, setActiveKey] = useState(
    labeled[0] ? `${labeled[0].requirementId}-${labeled[0].fileName}` : "",
  );

  const active = labeled.find(
    (d) => `${d.requirementId}-${d.fileName}` === activeKey,
  );

  if (labeled.length === 0) {
    return (
      <div className="border border-dashed border-line bg-canvas px-4 py-10 text-center text-sm text-muted">
        No documents uploaded for this case.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {labeled.map((doc) => {
          const key = `${doc.requirementId}-${doc.fileName}`;
          const selected = key === activeKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveKey(key)}
              className={`shrink-0 border px-3 py-2 text-left text-xs transition ${
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-navy hover:border-navy/40"
              }`}
            >
              <span className="block max-w-[140px] truncate font-semibold">
                {doc.label}
              </span>
              <span className="mt-0.5 block max-w-[140px] truncate opacity-70">
                {doc.fileName}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden border border-navy/10 bg-[#0b1220]">
        {active?.url ? (
          isImage(active.contentType, active.fileName) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={active.url}
              alt={active.label}
              className="mx-auto max-h-[520px] w-full object-contain"
            />
          ) : isPdf(active.contentType, active.fileName) ? (
            <iframe
              title={active.label}
              src={active.url}
              className="h-[520px] w-full bg-white"
            />
          ) : (
            <div className="flex h-[240px] flex-col items-center justify-center gap-3 text-sm text-white/80">
              <p>Preview not available for this file type.</p>
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gold/50"
              >
                Open {active.fileName}
              </a>
            </div>
          )
        ) : (
          <div className="flex h-[240px] items-center justify-center px-4 text-center text-sm text-white/70">
            Document stored locally on this server (.data) — open from the host
            filesystem path recorded on the case.
          </div>
        )}
      </div>

      {active?.url ? (
        <a
          href={active.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-navy underline"
        >
          Open full document ↗
        </a>
      ) : null}
    </div>
  );
}
