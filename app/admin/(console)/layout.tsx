import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/staff/session";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  return (
    <AdminShell username={user.displayName || user.email} role={user.role}>
      {children}
    </AdminShell>
  );
}
