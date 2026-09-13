import { contact, site } from "@/lib/content/site";
import { assets } from "@/lib/content/assets";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site-url";
import { homepageFaqs } from "@/lib/content/faq";

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": ["GovernmentOrganization", "LocalBusiness"],
    "@id": `${url}/#organization`,
    name: site.fullName,
    alternateName: [site.name, site.shortName, "Ethiopian Embassy London"],
    url,
    logo: absoluteUrl(assets.logo.src),
    image: absoluteUrl(assets.ogDefault.src),
    email: contact.email,
    telephone: contact.phoneDisplay,
    priceRange: "$$",
    sameAs: [
      site.twitter,
      "https://x.com/ETEmbassyLDN",
      site.facebook,
      site.linkedin,
      site.youtube,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "17 Princes Gate",
      addressLocality: "London",
      postalCode: "SW7 1PZ",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5014,
      longitude: -0.1736,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "13:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:00",
        closes: "17:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "consular services",
        telephone: contact.phoneDisplay,
        email: contact.email,
        areaServed: "GB",
        availableLanguage: ["English", "Amharic"],
      },
    ],
  };
}

export function websiteJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: site.shortName,
    description: site.fullName,
    publisher: { "@id": `${url}/#organization` },
    inLanguage: "en-GB",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
