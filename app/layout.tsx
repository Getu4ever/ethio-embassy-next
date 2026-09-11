import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Noto_Sans_Ethiopic,
  Source_Sans_3,
} from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import SitePreloader from "@/components/SitePreloader";
import { site } from "@/lib/content/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ethiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | London`,
    template: `%s | ${site.name}`,
  },
  description: site.fullName,
  icons: {
    icon: "/images/cropped-icon-32x32.png",
    apple: "/images/cropped-icon-180x180.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B2545",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${ethiopic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-charcoal">
        <SitePreloader />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
