import { diplomaticStaff } from "@/lib/content/about-us";
import { readOpsJson, writeOpsJson } from "@/lib/ops/json-store";

const BLOB_KEY = "ops/employees.json";

export type Employee = {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  imageSrc: string;
  imageAlt: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

function createId(): string {
  return `EMP-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
}

function seedFromDiplomatic(): Employee[] {
  const now = new Date().toISOString();
  return diplomaticStaff.map((person, index) => ({
    id: `EMP-SEED-${index + 1}`,
    name: person.name,
    role: person.role,
    bio: person.title,
    email: "",
    phone: "",
    imageSrc: person.image.src,
    imageAlt: person.image.alt,
    sortOrder: index,
    published: true,
    createdAt: now,
    updatedAt: now,
  }));
}

async function readAll(): Promise<Employee[]> {
  try {
    const data = await readOpsJson<Employee[] | null>(BLOB_KEY, null);
    if (Array.isArray(data)) return data;
  } catch (error) {
    console.error("[employees:read]", error);
    throw error instanceof Error
      ? error
      : new Error("Could not load employees.");
  }
  const seeded = seedFromDiplomatic();
  try {
    await writeOpsJson(BLOB_KEY, seeded);
  } catch (error) {
    console.error("[employees:seed-write]", error);
  }
  return seeded;
}

async function writeAll(employees: Employee[]): Promise<void> {
  await writeOpsJson(BLOB_KEY, employees);
}

export async function listEmployees(opts?: {
  publishedOnly?: boolean;
}): Promise<Employee[]> {
  const all = await readAll();
  const filtered = opts?.publishedOnly
    ? all.filter((e) => e.published)
    : all;
  return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getEmployee(id: string): Promise<Employee | null> {
  const all = await readAll();
  return all.find((e) => e.id === id) ?? null;
}

export async function createEmployee(input: {
  name: string;
  role: string;
  bio: string;
  email?: string;
  phone?: string;
  imageSrc?: string;
  imageAlt?: string;
  published?: boolean;
}): Promise<Employee> {
  const all = await readAll();
  const now = new Date().toISOString();
  const employee: Employee = {
    id: createId(),
    name: input.name.trim(),
    role: input.role.trim(),
    bio: input.bio.trim(),
    email: (input.email ?? "").trim(),
    phone: (input.phone ?? "").trim(),
    imageSrc: input.imageSrc?.trim() || "/images/about-us/ambassador_biruk.jpg",
    imageAlt: input.imageAlt?.trim() || input.name.trim(),
    sortOrder: all.length,
    published: input.published ?? true,
    createdAt: now,
    updatedAt: now,
  };
  if (!employee.name || !employee.role) {
    throw new Error("Name and role are required.");
  }
  all.push(employee);
  await writeAll(all);
  return employee;
}

export async function updateEmployee(
  id: string,
  patch: Partial<
    Pick<
      Employee,
      | "name"
      | "role"
      | "bio"
      | "email"
      | "phone"
      | "imageSrc"
      | "imageAlt"
      | "sortOrder"
      | "published"
    >
  >,
): Promise<Employee> {
  const all = await readAll();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) throw new Error("Employee not found.");
  const current = all[idx]!;
  all[idx] = {
    ...current,
    ...patch,
    name: patch.name?.trim() ?? current.name,
    role: patch.role?.trim() ?? current.role,
    bio: patch.bio?.trim() ?? current.bio,
    email: patch.email?.trim() ?? current.email,
    phone: patch.phone?.trim() ?? current.phone,
    imageSrc: patch.imageSrc?.trim() ?? current.imageSrc,
    imageAlt: patch.imageAlt?.trim() ?? current.imageAlt,
    updatedAt: new Date().toISOString(),
  };
  await writeAll(all);
  return all[idx]!;
}

export async function deleteEmployee(id: string): Promise<void> {
  const all = await readAll();
  if (!all.some((e) => e.id === id)) throw new Error("Employee not found.");
  await writeAll(all.filter((e) => e.id !== id));
}
