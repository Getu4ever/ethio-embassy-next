import type { AuditEntry } from "@/lib/audit/types";

const ACTION_LABELS: Record<AuditEntry["action"], string> = {
  "case.approve": "Approve case",
  "case.reject": "Reject case",
  "case.request_info": "Request info",
  "case.status_update": "Status update",
  "case.view": "View case",
  "case.update": "Update case",
  "case.delete": "Delete case",
  "holiday.add": "Add holiday",
  "holiday.remove": "Remove holiday",
  "booking.update": "Update booking",
  "booking.delete": "Delete booking",
  "staff.login": "Staff login",
  "staff.logout": "Staff logout",
  "staff.create": "Create staff",
  "staff.update": "Update staff",
  "staff.delete": "Delete staff",
  "content.update": "Update content",
  "employee.create": "Add employee",
  "employee.update": "Update employee",
  "employee.delete": "Delete employee",
  "news.create": "Create news post",
  "news.update": "Update news post",
  "news.delete": "Delete news post",
  "system.note": "System note",
};

type Props = {
  entries: AuditEntry[];
};

export default function AuditLog({ entries }: Props) {
  return (
    <div className="overflow-x-auto border border-navy/10 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-canvas text-xs uppercase tracking-[0.12em] text-muted">
          <tr>
            <th className="px-4 py-3">Timestamp</th>
            <th className="px-4 py-3">Admin</th>
            <th className="px-4 py-3">Action</th>
            <th className="px-4 py-3">Module</th>
            <th className="px-4 py-3">Summary</th>
            <th className="px-4 py-3">IP address</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-t border-line align-top">
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                {new Date(entry.at).toLocaleString("en-GB")}
              </td>
              <td className="px-4 py-3 font-medium text-navy">{entry.username}</td>
              <td className="px-4 py-3">{ACTION_LABELS[entry.action]}</td>
              <td className="px-4 py-3 capitalize text-muted">{entry.module}</td>
              <td className="max-w-md px-4 py-3 text-charcoal">{entry.summary}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted">
                {entry.ipAddress}
              </td>
            </tr>
          ))}
          {entries.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-muted">
                No audit events recorded yet. Staff decisions will appear here.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
