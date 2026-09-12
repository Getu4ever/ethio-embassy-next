export const STAFF_ROLES = [
  "master",
  "director",
  "ambassador",
  "consular",
  "editor",
] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  master: "Master Admin",
  director: "Director",
  ambassador: "Ambassador",
  consular: "Consular Officer",
  editor: "Content Editor",
};

export type StaffUser = {
  id: string;
  email: string;
  displayName: string;
  role: StaffRole;
  /** scrypt salt:hash */
  passwordHash: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  /** Login accounts never receive automated mail to this address when true */
  suppressOutboundMail?: boolean;
};

export type StaffSessionUser = {
  id: string;
  email: string;
  displayName: string;
  role: StaffRole;
};

export const MASTER_ADMIN_EMAIL = "london.embassy@mfa.gov.et";
export const MASTER_ADMIN_PASSWORD = "EthioEmbassyLondon2026!";
export const MASTER_ADMIN_NAME = "Master Admin";
