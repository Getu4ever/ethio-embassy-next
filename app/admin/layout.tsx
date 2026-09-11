import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Consular Admin",
    template: "%s | Consular Admin",
  },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
