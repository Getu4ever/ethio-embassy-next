import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Noto_Sans_Ethiopic,
  Source_Sans_3,
} from "next/font/google";
import Script from "next/script";
import SiteChrome from "@/components/SiteChrome";
import SitePreloader from "@/components/SitePreloader";
import { PRELOADER_STORAGE_KEY } from "@/lib/preloader";
import { site } from "@/lib/content/site";
import "./globals.css";

const preloaderBoot = `(function(){try{var k=${JSON.stringify(PRELOADER_STORAGE_KEY)};var p=location.pathname||"";if(p.indexOf("/admin")===0||p.indexOf("/staff")===0){document.documentElement.classList.add("preloader-skip");return;}if(sessionStorage.getItem(k)==="1"){document.documentElement.classList.add("preloader-skip");}else{document.documentElement.classList.add("preloader-pending");}}catch(e){document.documentElement.classList.add("preloader-pending");}})();`;

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
        <Script
          id="preloader-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: preloaderBoot }}
        />
        <SitePreloader />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
