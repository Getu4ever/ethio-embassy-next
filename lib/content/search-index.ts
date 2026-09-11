export type SearchEntry = {
  title: string;
  href: string;
  description: string;
  keywords?: string[];
};

/** Static site index for header search */
export const searchIndex: SearchEntry[] = [
  {
    title: "Home",
    href: "/",
    description: "Embassy of Ethiopia in London — homepage",
    keywords: ["home", "start"],
  },
  {
    title: "About Us",
    href: "/about-us",
    description: "Mission overview, leadership, and Embassy presence in London",
    keywords: ["embassy", "mission", "about"],
  },
  {
    title: "The Embassy",
    href: "/the-embassy",
    description: "Contact details and diplomatic staff",
    keywords: ["princes gate", "contact", "hours"],
  },
  {
    title: "The Ambassador",
    href: "/the-ambassador",
    description: "H.E. Biruk Mekonnen — Head of Mission",
    keywords: ["biruk", "ambassador", "bruk"],
  },
  {
    title: "Photo Gallery",
    href: "/category/photo-gallery",
    description: "Embassy events and Ethiopia landmarks",
    keywords: ["photos", "gallery", "images"],
  },
  {
    title: "About Ethiopia",
    href: "/about-ethiopia",
    description: "Profile, history, culture, economy, and tourism",
    keywords: ["ethiopia", "country"],
  },
  {
    title: "Profile",
    href: "/profile",
    description: "Geography, people, and the Federal Democratic Republic",
  },
  {
    title: "History",
    href: "/history",
    description: "From antiquity to Adwa and modern Ethiopia",
  },
  {
    title: "Government",
    href: "/government",
    description: "Federal institutions and leadership",
  },
  {
    title: "Culture",
    href: "/culture",
    description: "Heritage, faith, languages, and the arts",
  },
  {
    title: "Economy",
    href: "/economy",
    description: "Reform, growth, and private-sector opportunity",
  },
  {
    title: "Tourism",
    href: "/tourism",
    description: "Landscapes, pilgrimage, and UNESCO sites",
  },
  {
    title: "Diplomatic Hub of Africa",
    href: "/diplomatic-hub-of-africa",
    description: "Addis Ababa and the African Union",
  },
  {
    title: "Consular Services",
    href: "/consular-services",
    description: "Passports, visas, legalization, and vital documents",
    keywords: ["consular", "appointment", "documents"],
  },
  {
    title: "Visa Services",
    href: "/visa-services",
    description: "e-Visa, diplomatic and service visas",
    keywords: ["visa", "evisa", "travel"],
  },
  {
    title: "Passport Services",
    href: "/passport-services",
    description: "Renewal, new passports, lost passport, and corrections",
    keywords: ["passport", "renewal", "invea"],
  },
  {
    title: "Yellow Card",
    href: "/yellow-card",
    description: "Ethiopian Origin ID Card",
    keywords: ["yellow card", "origin id", "diaspora"],
  },
  {
    title: "Legalization",
    href: "/legalization",
    description: "Authentication, legalization, and Power of Attorney",
    keywords: ["mofa", "authentication", "poa"],
  },
  {
    title: "Laissez-passer",
    href: "/lassiez-passer",
    description: "Emergency travel documents",
  },
  {
    title: "Criminal Record and TIN",
    href: "/criminal-record",
    description: "Police clearance and TIN-related documentation",
  },
  {
    title: "Duty-Free Notes",
    href: "/duty-free-notes",
    description: "Duty-free support letters for returning residents",
  },
  {
    title: "Shipping Human Remains",
    href: "/shipping-human-remains",
    description: "Repatriation documentation and Embassy permit",
  },
  {
    title: "Vital Events",
    href: "/vital-events",
    description: "Birth, marriage, divorce, and death registration",
  },
  {
    title: "Diaspora Policy",
    href: "/diaspora-policy",
    description: "Engaging Ethiopians abroad",
  },
  {
    title: "Invest in Ethiopia",
    href: "/investment-overviews",
    description: "Investment overview, sectors, and business desk",
    keywords: ["investment", "business", "eic"],
  },
  {
    title: "Agriculture",
    href: "/agriculture",
    description: "Agriculture and agro-processing opportunities",
  },
  {
    title: "Textile & Garment",
    href: "/textiles",
    description: "Textile and garment manufacturing",
  },
  {
    title: "Leather Products",
    href: "/leather-and-leather-products",
    description: "Leather and leather-product manufacturing",
  },
  {
    title: "Mining",
    href: "/mining",
    description: "Mining and minerals investment",
  },
  {
    title: "GERD",
    href: "/gerd",
    description: "Grand Ethiopian Renaissance Dam",
  },
  {
    title: "Book Appointment",
    href: "/booking",
    description: "Book a consular appointment online",
    keywords: ["booking", "appointment", "visit"],
  },
  {
    title: "Submit Consular Documents",
    href: "/apply",
    description: "Upload documents for consular review",
    keywords: ["apply", "documents", "upload", "legalization", "visa"],
  },
  {
    title: "Consular Admin",
    href: "/admin/login",
    description: "Staff login for case review and operations",
    keywords: ["admin", "staff", "login", "queue"],
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    description: "Reach the Embassy in London",
    keywords: ["email", "phone", "map"],
  },
];

export function searchSite(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  const scored = searchIndex
    .map((entry) => {
      const hay = [
        entry.title,
        entry.description,
        ...(entry.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (entry.title.toLowerCase().includes(term)) score += 4;
        if ((entry.keywords ?? []).some((k) => k.includes(term))) score += 3;
        if (entry.description.toLowerCase().includes(term)) score += 2;
        if (hay.includes(term)) score += 1;
      }
      return { entry, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  return scored.slice(0, limit).map((row) => row.entry);
}
