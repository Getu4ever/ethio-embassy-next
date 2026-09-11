import { redirect } from "next/navigation";

export default function StaffIndexRedirect() {
  redirect("/admin/cases");
}
