"use server";

import { revalidatePath } from "next/cache";
import { recordStaffAudit } from "@/lib/audit/record";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/lib/cms/employees";
import { getSessionStaff } from "@/lib/staff/auth";
import {
  assertPermission,
  canManageEmployees,
} from "@/lib/staff/permissions";

async function requireEmployeeManager() {
  const user = await getSessionStaff();
  if (!user) throw new Error("Unauthorized.");
  assertPermission(user, canManageEmployees(user.role));
  return user;
}

export async function adminCreateEmployee(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
) {
  try {
    await requireEmployeeManager();
    const employee = await createEmployee({
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      imageSrc: String(formData.get("imageSrc") ?? ""),
      imageAlt: String(formData.get("imageAlt") ?? ""),
      published: formData.get("published") === "on",
    });
    await recordStaffAudit({
      action: "employee.create",
      module: "employees",
      summary: `Added employee ${employee.name}`,
      targetId: employee.id,
    });
    revalidatePath("/admin/employees");
    revalidatePath("/about-us");
    revalidatePath("/the-embassy");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not create employee.",
    };
  }
}

export async function adminUpdateEmployee(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
) {
  try {
    await requireEmployeeManager();
    const id = String(formData.get("id") ?? "");
    const employee = await updateEmployee(id, {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      imageSrc: String(formData.get("imageSrc") ?? ""),
      imageAlt: String(formData.get("imageAlt") ?? ""),
      published: formData.get("published") === "on",
      sortOrder: Number(formData.get("sortOrder") ?? 0),
    });
    await recordStaffAudit({
      action: "employee.update",
      module: "employees",
      summary: `Updated employee ${employee.name}`,
      targetId: employee.id,
    });
    revalidatePath("/admin/employees");
    revalidatePath("/about-us");
    revalidatePath("/the-embassy");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not update employee.",
    };
  }
}

export async function adminDeleteEmployee(formData: FormData): Promise<void> {
  try {
    await requireEmployeeManager();
    const id = String(formData.get("id") ?? "");
    await deleteEmployee(id);
    await recordStaffAudit({
      action: "employee.delete",
      module: "employees",
      summary: `Deleted employee ${id}`,
      targetId: id,
    });
    revalidatePath("/admin/employees");
    revalidatePath("/about-us");
    revalidatePath("/the-embassy");
  } catch (error) {
    console.error("[adminDeleteEmployee]", error);
  }
}
