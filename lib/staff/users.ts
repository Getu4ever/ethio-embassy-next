import { readOpsJson, writeOpsJson } from "@/lib/ops/json-store";
import { hashPassword, verifyPassword } from "@/lib/staff/password";
import {
  MASTER_ADMIN_EMAIL,
  MASTER_ADMIN_NAME,
  MASTER_ADMIN_PASSWORD,
  type StaffRole,
  type StaffUser,
} from "@/lib/staff/types";

const BLOB_KEY = "ops/staff-users.json";

function createId(): string {
  return `STF-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
}

function masterSeed(): StaffUser {
  const now = new Date().toISOString();
  return {
    id: "STF-MASTER",
    email: MASTER_ADMIN_EMAIL.toLowerCase(),
    displayName: MASTER_ADMIN_NAME,
    role: "master",
    passwordHash: hashPassword(MASTER_ADMIN_PASSWORD),
    active: true,
    createdAt: now,
    updatedAt: now,
    suppressOutboundMail: true,
  };
}

async function readUsers(): Promise<StaffUser[]> {
  const data = await readOpsJson<StaffUser[]>(BLOB_KEY, []);
  return Array.isArray(data) ? data : [];
}

async function writeUsers(users: StaffUser[]): Promise<void> {
  await writeOpsJson(BLOB_KEY, users);
}

/** Ensure master exists with the canonical email/password. */
export async function ensureStaffUsers(): Promise<StaffUser[]> {
  let users = await readUsers();
  const masterIdx = users.findIndex(
    (u) =>
      u.id === "STF-MASTER" ||
      u.email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase() ||
      u.role === "master",
  );

  if (masterIdx === -1) {
    users = [masterSeed(), ...users];
    await writeUsers(users);
    return users;
  }

  const current = users[masterIdx]!;
  const passwordOk = verifyPassword(
    MASTER_ADMIN_PASSWORD,
    current.passwordHash,
  );
  const needsUpdate =
    current.id !== "STF-MASTER" ||
    current.email.toLowerCase() !== MASTER_ADMIN_EMAIL.toLowerCase() ||
    current.role !== "master" ||
    current.suppressOutboundMail !== true ||
    current.displayName !== MASTER_ADMIN_NAME ||
    !current.active ||
    !passwordOk;

  if (needsUpdate) {
    users[masterIdx] = {
      ...current,
      id: "STF-MASTER",
      email: MASTER_ADMIN_EMAIL.toLowerCase(),
      displayName: MASTER_ADMIN_NAME,
      role: "master",
      passwordHash: passwordOk
        ? current.passwordHash
        : hashPassword(MASTER_ADMIN_PASSWORD),
      active: true,
      suppressOutboundMail: true,
      updatedAt: new Date().toISOString(),
    };
    await writeUsers(users);
  }

  return users;
}

export async function listStaffUsers(): Promise<StaffUser[]> {
  const users = await ensureStaffUsers();
  return users.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export async function findStaffByLogin(login: string): Promise<StaffUser | null> {
  const needle = login.trim().toLowerCase();
  if (!needle) return null;
  const users = await ensureStaffUsers();
  return (
    users.find(
      (u) =>
        u.active &&
        (u.email.toLowerCase() === needle ||
          u.displayName.toLowerCase() === needle),
    ) ?? null
  );
}

export async function findStaffById(id: string): Promise<StaffUser | null> {
  const users = await ensureStaffUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function createStaffUser(input: {
  email: string;
  displayName: string;
  role: StaffRole;
  password: string;
  createdBy: string;
}): Promise<StaffUser> {
  const email = input.email.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    throw new Error("A valid email is required.");
  }
  if (email === MASTER_ADMIN_EMAIL.toLowerCase()) {
    throw new Error("That email is reserved for the Master Admin.");
  }
  if (input.role === "master") {
    throw new Error("Only one Master Admin account is allowed.");
  }
  if (input.password.trim().length < 10) {
    throw new Error("Password must be at least 10 characters.");
  }

  const users = await ensureStaffUsers();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    throw new Error("A staff account with that email already exists.");
  }

  const now = new Date().toISOString();
  const user: StaffUser = {
    id: createId(),
    email,
    displayName: input.displayName.trim() || email.split("@")[0]!,
    role: input.role,
    passwordHash: hashPassword(input.password),
    active: true,
    createdAt: now,
    updatedAt: now,
    createdBy: input.createdBy,
    suppressOutboundMail: false,
  };
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function updateStaffUser(
  id: string,
  patch: Partial<
    Pick<StaffUser, "displayName" | "role" | "active" | "email">
  > & { password?: string },
): Promise<StaffUser> {
  const users = await ensureStaffUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("Staff account not found.");

  const current = users[idx]!;
  if (current.role === "master" || current.id === "STF-MASTER") {
    if (patch.role && patch.role !== "master") {
      throw new Error("Master Admin role cannot be changed.");
    }
    if (patch.active === false) {
      throw new Error("Master Admin cannot be deactivated.");
    }
    if (patch.email && patch.email.toLowerCase() !== MASTER_ADMIN_EMAIL) {
      throw new Error("Master Admin email cannot be changed.");
    }
  }

  if (patch.email) {
    const email = patch.email.trim().toLowerCase();
    if (
      users.some((u) => u.id !== id && u.email.toLowerCase() === email)
    ) {
      throw new Error("Another account already uses that email.");
    }
    current.email = email;
  }
  if (patch.displayName !== undefined) {
    current.displayName = patch.displayName.trim() || current.displayName;
  }
  if (patch.role && current.role !== "master") {
    if (patch.role === "master") {
      throw new Error("Cannot promote accounts to Master Admin.");
    }
    current.role = patch.role;
  }
  if (patch.active !== undefined && current.role !== "master") {
    current.active = patch.active;
  }
  if (patch.password) {
    if (patch.password.trim().length < 10) {
      throw new Error("Password must be at least 10 characters.");
    }
    current.passwordHash = hashPassword(patch.password);
  }
  current.updatedAt = new Date().toISOString();
  users[idx] = current;
  await writeUsers(users);
  return current;
}

export async function deleteStaffUser(id: string): Promise<void> {
  const users = await ensureStaffUsers();
  const target = users.find((u) => u.id === id);
  if (!target) throw new Error("Staff account not found.");
  if (target.role === "master" || target.id === "STF-MASTER") {
    throw new Error("Master Admin cannot be deleted.");
  }
  await writeUsers(users.filter((u) => u.id !== id));
}

/** Public-safe projection (no password hash). */
export function toPublicStaff(user: StaffUser) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
