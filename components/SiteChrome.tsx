"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return <div className="min-h-full">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
