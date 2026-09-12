"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { OfficeHoursContent } from "@/lib/cms/types";
import type { ReactNode } from "react";

export default function SiteChrome({
  children,
  officeHours,
}: {
  children: ReactNode;
  officeHours: OfficeHoursContent;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return (
      <div className="min-h-full" data-site-chrome>
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col" data-site-chrome>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer officeHours={officeHours} />
    </div>
  );
}
