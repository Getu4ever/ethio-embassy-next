import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "embassy_staff_session";
const SESSION_SHORT_SEC = 60 * 60 * 12; // 12 hours
const SESSION_LONG_SEC = 60 * 60 * 24 * 14; // 14 days

function secret(): string {
  const value =
    process.env.STAFF_SESSION_SECRET?.trim() ||
    process.env.STAFF_ACCESS_PASSWORD?.trim();
  if (!value) {
    throw new Error("Missing STAFF_ACCESS_PASSWORD (or STAFF_SESSION_SECRET).");
  }
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function staffAuthConfigured(): boolean {
  return Boolean(process.env.STAFF_ACCESS_PASSWORD?.trim());
}

/** @deprecated use staffAuthConfigured */
export function staffPasswordConfigured(): boolean {
  return staffAuthConfigured();
}

export function getStaffUsername(): string {
  return process.env.STAFF_USERNAME?.trim() || "admin";
}

export function getStaffEmail(): string | null {
  const email = process.env.STAFF_EMAIL?.trim().toLowerCase();
  return email || null;
}

export async function createStaffSession(remember = false): Promise<void> {
  const maxAge = remember ? SESSION_LONG_SEC : SESSION_SHORT_SEC;
  const exp = String(Date.now() + maxAge * 1000);
  const token = `${exp}.${sign(exp)}`;
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

export async function isStaffAuthenticated(): Promise<boolean> {
  if (!staffAuthConfigured()) return false;
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  const [exp, sig] = raw.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyStaffCredentials(
  username: string,
  password: string,
): boolean {
  const expectedUser = getStaffUsername();
  const expectedEmail = getStaffEmail();
  const expectedPass = process.env.STAFF_ACCESS_PASSWORD?.trim() ?? "";
  if (!expectedPass || !password || !username) return false;

  const login = username.trim().toLowerCase();
  const userOk =
    login === expectedUser.toLowerCase() ||
    (expectedEmail !== null && login === expectedEmail);

  const a = Buffer.from(password);
  const b = Buffer.from(expectedPass);
  if (a.length !== b.length) return false;
  const passOk = timingSafeEqual(a, b);
  return userOk && passOk;
}

export function verifyStaffPassword(password: string): boolean {
  return verifyStaffCredentials(getStaffUsername(), password);
}
