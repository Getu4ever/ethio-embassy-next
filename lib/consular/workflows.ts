import type { StripeFeeId } from "@/lib/stripe/fees";

export type WorkflowDocumentReq = {
  id: string;
  label: string;
  description?: string;
  /** MIME types accepted by the file input */
  accept: string;
  required: boolean;
};

export type ConsularWorkflowId =
  | "visa"
  | "legalization"
  | "criminal-record"
  | "vital-events"
  | "duty-free"
  | "laissez-passer"
  | "shipping-remains";

export type ConsularWorkflow = {
  id: ConsularWorkflowId;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  servicePageHref: string;
  /** Optional Stripe fee charged before or with submission */
  feeId?: StripeFeeId;
  /** Recommend booking an in-person slot after approval */
  recommendBooking: boolean;
  documents: WorkflowDocumentReq[];
  applicantHints?: string[];
};

export const CONSULAR_WORKFLOWS: Record<ConsularWorkflowId, ConsularWorkflow> = {
  visa: {
    id: "visa",
    title: "Diplomatic / Service Visa documents",
    shortTitle: "Visa",
    description:
      "Upload supporting documents for Diplomatic or Service visa processing by appointment.",
    href: "/apply/visa",
    servicePageHref: "/visa-services",
    feeId: "visa-standard",
    recommendBooking: true,
    documents: [
      {
        id: "passport-bio",
        label: "Passport biodata page",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "visa-application",
        label: "Completed visa application form",
        description: "PDF of the Embassy application where required.",
        accept: "application/pdf",
        required: true,
      },
      {
        id: "supporting-letter",
        label: "Supporting / invitation letter",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "photo",
        label: "Passport photograph",
        accept: "image/jpeg,image/png",
        required: false,
      },
    ],
    applicantHints: [
      "Tourist visitors should normally use evisa.gov.et unless advised otherwise.",
      "The Embassy currently processes Diplomatic and Service visas by appointment.",
    ],
  },
  legalization: {
    id: "legalization",
    title: "Authentication / Legalization",
    shortTitle: "Legalization",
    description:
      "Submit documents for authentication, legalization, or Power of Attorney review.",
    href: "/apply/legalization",
    servicePageHref: "/legalization",
    feeId: "legalization-standard",
    recommendBooking: true,
    documents: [
      {
        id: "source-document",
        label: "Document to authenticate (PDF)",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "passport-bio",
        label: "Applicant passport / ID",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "prior-auth",
        label: "Prior UK / foreign authentication (if any)",
        accept: "application/pdf,image/jpeg,image/png",
        required: false,
      },
    ],
  },
  "criminal-record": {
    id: "criminal-record",
    title: "Criminal Record / TIN request",
    shortTitle: "Police / TIN",
    description:
      "Upload identity and supporting materials for criminal record or TIN number services.",
    href: "/apply/criminal-record",
    servicePageHref: "/criminal-record",
    feeId: "criminal-record",
    recommendBooking: true,
    documents: [
      {
        id: "passport-bio",
        label: "Passport biodata page",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "request-letter",
        label: "Signed request letter",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "uk-address",
        label: "Proof of UK address",
        accept: "application/pdf,image/jpeg,image/png",
        required: false,
      },
    ],
  },
  "vital-events": {
    id: "vital-events",
    title: "Vital Events certificate",
    shortTitle: "Vital Events",
    description:
      "Birth, marriage, or related vital-event certificate applications.",
    href: "/apply/vital-events",
    servicePageHref: "/vital-events",
    feeId: "vital-events",
    recommendBooking: true,
    documents: [
      {
        id: "application-form",
        label: "Completed application",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "passport-bio",
        label: "Passport / ID",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "evidence",
        label: "Supporting civil registry evidence",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
    ],
  },
  "duty-free": {
    id: "duty-free",
    title: "Duty-Free Notes",
    shortTitle: "Duty-Free",
    description: "Submit documents required for duty-free note issuance.",
    href: "/apply/duty-free",
    servicePageHref: "/duty-free-notes",
    feeId: "duty-free",
    recommendBooking: true,
    documents: [
      {
        id: "passport-bio",
        label: "Passport biodata page",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "shipping-list",
        label: "Goods / packing list",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "residence-proof",
        label: "Proof of residence / return",
        accept: "application/pdf,image/jpeg,image/png",
        required: false,
      },
    ],
  },
  "laissez-passer": {
    id: "laissez-passer",
    title: "Laissez-passer",
    shortTitle: "Laissez-passer",
    description: "Emergency travel document supporting pack.",
    href: "/apply/laissez-passer",
    servicePageHref: "/lassiez-passer",
    recommendBooking: true,
    documents: [
      {
        id: "identity",
        label: "Identity document / expired passport",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "police-report",
        label: "Police report (if lost/stolen)",
        accept: "application/pdf,image/jpeg,image/png",
        required: false,
      },
      {
        id: "photo",
        label: "Passport photograph",
        accept: "image/jpeg,image/png",
        required: true,
      },
    ],
  },
  "shipping-remains": {
    id: "shipping-remains",
    title: "Shipping human remains",
    shortTitle: "Repatriation",
    description:
      "Confidential document pack for repatriation of human remains.",
    href: "/apply/shipping-remains",
    servicePageHref: "/shipping-human-remains",
    recommendBooking: true,
    documents: [
      {
        id: "death-certificate",
        label: "Death certificate",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "health-letter",
        label: "Non-contagious disease letter",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "passport-deceased",
        label: "Passport of the deceased",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
      {
        id: "requester-id",
        label: "Requester passport / ID",
        accept: "application/pdf,image/jpeg,image/png",
        required: true,
      },
    ],
  },
};

export const WORKFLOW_LIST = Object.values(CONSULAR_WORKFLOWS);

export function getWorkflow(id: string): ConsularWorkflow | null {
  return (CONSULAR_WORKFLOWS as Record<string, ConsularWorkflow>)[id] ?? null;
}
