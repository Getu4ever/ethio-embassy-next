import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { verifyPassword } from "@/lib/staff/password";
import {
  MASTER_ADMIN_EMAIL,
  type StaffRole,
  type StaffSessionUser,
} from "@/lib/staff/types";
import { ensureStaffUsers, findStaffByLogin } from "@/lib/staff/users";

const COOKIE = "embassy_staff_session";
const SESSION_SHORT_SEC = 60 * 60 * 12;
const SESSION_LONG_SEC = 60 * 60 * 24 * 14;

function secret(): string {
  const value =
    process.env.STAFF_SESSION_SECRET?.trim() ||
    process.env.STAFF_ACCESS_PASSWORD?.trim() ||
    "ethio-embassy-london-session-fallback-2026";
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function encodeSession(user: StaffSessionUser, exp: number): string {
  const body = Buffer.from(
    JSON.stringify({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      exp,
    }),
    "utf8",
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeSession(raw: string): (StaffSessionUser & { exp: number }) | null {
  const [body, sig] = raw.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  try {
    const parsed = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as StaffSessionUser & { exp: number };
    if (!parsed?.id || !parsed.email || !parsed.role || !parsed.exp) return null;
    if (parsed.exp < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function staffAuthConfigured(): boolean {
  // Master Admin is seeded in durable storage — console is always available.
  return true;
}

/** @deprecated use staffAuthConfigured */
export function staffPasswordConfigured(): boolean {
  return staffAuthConfigured();
}

/** Display label for shells that still expect a sync username string. */
export function getStaffUsername(): string {
  return process.env.STAFF_USERNAME?.trim() || "admin";
}

export function getStaffEmail(): string | null {
  return MASTER_ADMIN_EMAIL;
}

export async function createStaffSession(
  user: StaffSessionUser,
  remember = false,
): Promise<void> {
  const maxAge = remember ? SESSION_LONG_SEC : SESSION_SHORT_SEC;
  const exp = Date.now() + maxAge * 1000;
  const token = encodeSession(user, exp);
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function clearStaffSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSessionStaff(): Promise<StaffSessionUser | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;
  const session = decodeSession(raw);
  if (!session) return null;
  return {
    id: session.id,
    email: session.email,
    displayName: session.displayName,
    role: session.role as StaffRole,
  };
}

export async function isStaffAuthenticated(): Promise<boolean> {
  return Boolean(await getSessionStaff());
}

export async function authenticateStaff(
  login: string,
  password: string,
): Promise<StaffSessionUser | null> {
  await ensureStaffUsers();
  const user = await findStaffByLogin(login);
  if (!user || !user.active) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
  };
}

/** Sync helper kept for transitional call sites — prefer authenticateStaff. */
export function verifyStaffCredentials(
  username: string,
  password: string,
): boolean {
  void username;
  void password;
  return false;
}

export function verifyStaffPassword(password: string): boolean {
  void password;
  return false;
}
