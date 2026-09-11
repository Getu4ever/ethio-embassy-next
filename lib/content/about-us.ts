import type { NavLink } from "./navigation";
import { contact } from "./site";
import { assets } from "./assets";

export type AboutUsNavItem = NavLink & { shortLabel: string };

export const aboutUsNav: AboutUsNavItem[] = [
  { label: "The Embassy", shortLabel: "Embassy", href: "/the-embassy" },
  {
    label: "The Embassy Profile",
    shortLabel: "Profile",
    href: "/the-embassy-profile",
  },
  {
    label: "The Ambassador",
    shortLabel: "Ambassador",
    href: "/the-ambassador",
  },
  {
    label: "Photo Gallery",
    shortLabel: "Gallery",
    href: "/category/photo-gallery",
  },
];

export const aboutUsPillars = [
  {
    title: "Diplomatic presence",
    body: "Representing the Federal Democratic Republic of Ethiopia across the United Kingdom from Knightsbridge.",
  },
  {
    title: "Consular care",
    body: "Supporting Ethiopian nationals and partners with passports, visas, legalization, and vital documents.",
  },
  {
    title: "Partnership",
    body: "Advancing trade, investment, culture, and diaspora engagement between Ethiopia and the UK.",
  },
] as const;

export const aboutUsHubPages = [
  {
    href: "/the-embassy",
    label: "The Embassy",
    summary:
      "Mission contacts, office hours, and the diplomatic leadership serving London.",
    hero: {
      src: "/images/about-us/embassy-building.jpg",
      alt: "Embassy of Ethiopia building in London",
    },
  },
  {
    href: "/the-embassy-profile",
    label: "The Embassy Profile",
    summary:
      "How the London mission advances Ethiopia’s interests in the United Kingdom.",
    hero: {
      src: "/images/about-ethiopia/ethiopian-london-embassy.jpg",
      alt: "Embassy of Ethiopia in London",
    },
  },
  {
    href: "/the-ambassador",
    label: "The Ambassador",
    summary:
      "Meet H.E. Biruk Mekonnen, Ambassador Extraordinary and Plenipotentiary.",
    hero: {
      src: "/images/about-us/ambassador-section-bg.jpg",
      alt: "Formal diplomatic hall representing the Ambassador’s mission",
    },
  },
  {
    href: "/category/photo-gallery",
    label: "Photo Gallery",
    summary:
      "Moments from diplomacy, community, and Ethiopia’s landmarks.",
    hero: {
      src: "/legacy-site/images/hero-images/adwa-2024-02-11-65c847a8a5a08.jpg",
      alt: "Embassy photo gallery",
    },
  },
] as const;

export type EmbassyContactRow = {
  label: string;
  value: string;
};

export const embassyContactRows: EmbassyContactRow[] = [
  { label: "Email", value: contact.email },
  { label: "Tel.", value: contact.phone },
  { label: "Address", value: contact.address },
  {
    label: "Office Hours",
    value: `${contact.officeHours.days}\nMorning ${contact.officeHours.morning}\nAfternoon ${contact.officeHours.afternoon}`,
  },
  {
    label: "Head of mission",
    value:
      "H.E. Ambassador Biruk Mekonnen, Ambassador Extraordinary and Plenipotentiary of the Federal Democratic Republic of Ethiopia to the United Kingdom of Great Britain and Northern Ireland",
  },
  {
    label: "Deputy Head of Mission",
    value: "H.E. Ambassador Lalisa Birhanu",
  },
];

export const diplomaticStaff = [
  {
    role: "Head of Mission",
    name: "H.E. Ambassador Biruk Mekonnen",
    title:
      "Ambassador Extraordinary and Plenipotentiary of the Federal Democratic Republic of Ethiopia to the United Kingdom of Great Britain and Northern Ireland",
    image: {
      src: "/images/about-us/ambassador_biruk.jpg",
      alt: "H.E. Ambassador Biruk Mekonnen",
    },
  },
  {
    role: "Deputy Head of Mission",
    name: "H.E. Ambassador Lalisa Birhanu",
    title: "Deputy Head of Mission",
    image: {
      src: "/images/about-us/ambassador_lalisa.jpg",
      alt: "H.E. Ambassador Lalisa Birhanu",
    },
  },
] as const;

export const ambassadorProfile = {
  name: "H.E. Biruk Mekonnen",
  title:
    "Ambassador Extraordinary and Plenipotentiary of the Federal Democratic Republic of Ethiopia to the United Kingdom of Great Britain and Northern Ireland",
  appointed: "15 May 2024",
  body: "H.E. Biruk Mekonnen was appointed as Ambassador Extraordinary and Plenipotentiary of the Federal Democratic Republic of Ethiopia to the United Kingdom of Great Britain and Northern Ireland on 15 May 2024.",
  image: {
    src: "/images/about-us/ambassador_biruk.jpg",
    alt: "H.E. Ambassador Biruk Mekonnen",
  },
} as const;

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

/** Curated gallery from existing Embassy media */
export const photoGallery: GalleryItem[] = [
  {
    src: "/images/about-us/embassy-building.jpg",
    alt: "Embassy of Ethiopia in London",
    caption: "The Embassy at Princes Gate",
  },
  {
    src: "/images/about-ethiopia/ethiopian-london-embassy.jpg",
    alt: "Embassy of Ethiopia London façade",
    caption: "Embassy of Ethiopia — London",
  },
  {
    src: assets.newsScholars.src,
    alt: assets.newsScholars.alt,
    caption: "Welcoming future scholars from UK universities",
  },
  {
    src: assets.newsCredentials.src,
    alt: assets.newsCredentials.alt,
    caption: "Credentials presentation to the IMO Secretary-General",
  },
  {
    src: assets.newsKagool.src,
    alt: assets.newsKagool.alt,
    caption: "Engagement with Kagool in Birmingham",
  },
  {
    src: "/legacy-site/images/hero-images/adwa-2024-02-11-65c847a8a6a40.jpg",
    alt: "Adwa Victory Memorial",
    caption: "Adwa Victory Memorial, Addis Ababa",
  },
  {
    src: "/legacy-site/images/hero-images/bole-corridor-2024-08-02-66ac9ba76a987.jpg",
    alt: "Addis Ababa Bole corridor",
    caption: "Modern Addis Ababa",
  },
  {
    src: "/legacy-site/images/hero-images/lalibela.jpg",
    alt: "Lalibela",
    caption: "Rock-hewn churches of Lalibela",
  },
  {
    src: "/images/about-ethiopia/addis-ababa-african-union.jpeg",
    alt: "African Union headquarters",
    caption: "African Union headquarters, Addis Ababa",
  },
  {
    src: "/images/about-ethiopia/gerd.jpg",
    alt: "Grand Ethiopian Renaissance Dam",
    caption: "Grand Ethiopian Renaissance Dam (GERD)",
  },
];
