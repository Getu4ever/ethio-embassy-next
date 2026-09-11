import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import {
  isStaffAuthenticated,
  staffAuthConfigured,
} from "@/lib/staff/auth";

export const metadata: Metadata = {
  title: "Log In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (staffAuthConfigured() && (await isStaffAuthenticated())) {
    redirect("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <Image
        src="/images/about-us/embassy-building.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-navy-deep/55 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/70" />
      <div className="relative z-10 w-full flex justify-center">
        <AdminLoginForm configured={staffAuthConfigured()} />
      </div>
    </main>
  );
}
