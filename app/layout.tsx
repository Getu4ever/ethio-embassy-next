import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Noto_Sans_Ethiopic,
  Source_Sans_3,
} from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import SiteChrome from "@/components/SiteChrome";
import SitePreloader from "@/components/SitePreloader";
import { assets } from "@/lib/content/assets";
import { getResolvedOfficeHours } from "@/lib/cms/content-store";
import { PRELOADER_STORAGE_KEY } from "@/lib/preloader";
import { site } from "@/lib/content/site";
import {
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/structured-data";
import { getSiteUrl } from "@/lib/seo/site-url";
import "./globals.css";

const preloaderBoot = `(function(){try{var k=${JSON.stringify(PRELOADER_STORAGE_KEY)};var p=location.pathname||"";var root=document.documentElement;if(p.indexOf("/admin")===0||p.indexOf("/staff")===0){root.dataset.preloader="skip";return;}if(sessionStorage.getItem(k)==="1"){root.dataset.preloader="skip";}else{root.dataset.preloader="pending";}}catch(e){document.documentElement.dataset.preloader="pending";}})();`;

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | London`,
    template: `%s | ${site.name}`,
  },
  description:
    "Official Embassy of Ethiopia in London — consular services, visas, passports, news, and diplomatic engagement with the United Kingdom.",
  applicationName: site.shortName,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Embassy of Ethiopia",
    "Ethiopian Embassy London",
    "consular services",
    "Ethiopia visa UK",
    "Ethiopian passport London",
    "Princes Gate",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: site.shortName,
    title: `${site.name} | London`,
    description:
      "Secure consular services and a lasting bridge between Ethiopia and the United Kingdom — from the heart of Knightsbridge.",
    images: [
      {
        url: assets.ogDefault.src,
        width: assets.ogDefault.width,
        height: assets.ogDefault.height,
        alt: assets.ogDefault.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
    title: `${site.name} | London`,
    description:
      "Secure consular services and a lasting bridge between Ethiopia and the United Kingdom.",
    images: [assets.ogDefault.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let officeHours = {
    days: "Monday to Friday",
    morning: "9:00AM – 1:00PM",
    afternoon: "2:00PM – 5:00PM",
    summary: "9:00 am – 5:00 pm",
    closed: "Saturday & Sunday also Holidays — Closed",
  };
  try {
    officeHours = await getResolvedOfficeHours();
  } catch (error) {
    console.error("[layout] office hours fallback", error);
  }

  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${sans.variable} ${ethiopic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans text-charcoal">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Script
          id="preloader-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: preloaderBoot }}
        />
        <SitePreloader />
        <SiteChrome officeHours={officeHours}>{children}</SiteChrome>
      </body>
    </html>
  );
}
