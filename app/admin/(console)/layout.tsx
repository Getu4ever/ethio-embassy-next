import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/staff/session";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = await requireAdmin();
  return <AdminShell username={username}>{children}</AdminShell>;
}
