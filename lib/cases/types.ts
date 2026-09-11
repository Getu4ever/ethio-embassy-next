import type { ConsularWorkflowId } from "@/lib/consular/workflows";
import type { StripeFeeId } from "@/lib/stripe/fees";

export type CaseStatus =
  | "submitted"
  | "awaiting_payment"
  | "in_review"
  | "needs_info"
  | "approved"
  | "rejected"
  | "completed";

export type PaymentStatus = "not_required" | "unpaid" | "paid" | "refunded";

export type CaseDocument = {
  requirementId: string;
  fileName: string;
  contentType: string;
  size: number;
  /** Blob URL or local path key */
  storageKey: string;
  url?: string;
  uploadedAt: string;
};

export type CaseNote = {
  id: string;
  at: string;
  by: "applicant" | "staff" | "system";
  body: string;
};

export type ConsularCase = {
  id: string;
  reference: string;
  workflowId: ConsularWorkflowId;
  status: CaseStatus;
  paymentStatus: PaymentStatus;
  feeId?: StripeFeeId;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    passportNumber: string;
    notes: string;
  };
  documents: CaseDocument[];
  staffNotes: CaseNote[];
  createdAt: string;
  updatedAt: string;
};

export const CASE_STATUS_LABELS: Record<CaseStatus, string> = {
  submitted: "Submitted",
  awaiting_payment: "Awaiting payment",
  in_review: "In review",
  needs_info: "Needs information",
  approved: "Approved",
  rejected: "Rejected",
  completed: "Completed",
};

export function createCaseId(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const stamp = Date.now().toString(36).toUpperCase();
  return `CASE-${stamp}-${rand}`;
}

export function createReference(workflowId: string): string {
  const prefix = workflowId.slice(0, 3).toUpperCase();
  const n = Math.floor(100000 + Math.random() * 900000);
  return `EE-${prefix}-${n}`;
}
