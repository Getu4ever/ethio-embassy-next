import { assets } from "./assets";

export const site = {
  name: "Embassy of Ethiopia",
  fullName:
    "Embassy of the Federal Democratic Republic of Ethiopia to the United Kingdom",
  shortName: "Embassy of Ethiopia — London",
  url: "https://ethioembassy.org.uk",
  twitter: "https://twitter.com/ETEmbassyLDN",
  twitterHandle: "@ETEmbassyLDN",
  weekInTheHornUrl: "https://mfaethiopiablog.wordpress.com/",
} as const;

export const contact = {
  address: "17 Princes Gate, London SW7 1PZ",
  phone: "+442075897212",
  phoneDisplay: "+44 20 7589 7212",
  email: "london.embassy@mfa.gov.et",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=17%20Princes%20Gate%2C%20London%20SW7%201PZ&t=m&z=10&output=embed&iwloc=near",
  officeHours: {
    days: "Monday to Friday",
    morning: "9:00AM – 1:00PM",
    afternoon: "2:00PM – 5:00PM",
    summary: "9:00 am – 5:00 pm",
    closed: "Saturday & Sunday also Holidays — Closed",
  },
} as const;

export const heroIntro = {
  eyebrow: "Embassy of Ethiopia · London",
  headline: "Where two nations meet",
  body: "Secure consular services and a lasting bridge between Ethiopia and the United Kingdom — from the heart of Knightsbridge.",
} as const;

export const ambassadorWelcome = {
  title: "Ambassador's Welcome",
  greeting: "It is my honour to welcome you.",
  body: "Whether you seek consular assistance, wish to deepen ties with Ethiopia, or simply explore our shared story, this Embassy stands ready to serve you with care and professionalism.",
  attribution: "H.E. Biruk Mekonnen",
  role: "Ambassador Extraordinary and Plenipotentiary",
  ctaLabel: "Meet the Ambassador",
  ctaHref: "/the-ambassador",
  logo: assets.logoEthioUk,
} as const;

export const leadership = [
  {
    role: "President",
    name: "H.E. Taye Atskeselassie AMDE",
    image: assets.president,
  },
  {
    role: "Prime Minister",
    name: "H.E. ABIY AHMED ALI (PHD)",
    image: assets.primeMinister,
  },
  {
    role: "Minister",
    name: "H.E. Gedion Timotheos (PhD)",
    image: assets.minister,
  },
] as const;

export type NewsCategory = "News" | "Announcements";

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  category: NewsCategory;
  image: (typeof assets)[keyof typeof assets];
  author: string;
};

export const latestTicker: { title: string; href: string }[] = [
  {
    title:
      "Embassy of Ethiopia Welcomes Future Scholars from UK Universities",
    href: "/news/embassy-welcomes-future-scholars",
  },
  {
    title:
      "Embassy visits Kagool’s Birmingham office for investment dialogue",
    href: "/news/kagool-birmingham-visit",
  },
  {
    title:
      "H.E. Ambassador Biruk Mekonnen Presents his Credential to IMO Secretary-General",
    href: "/news/ambassador-credentials-imo",
  },
];

export const newsItems: NewsItem[] = [
  {
    slug: "embassy-welcomes-future-scholars",
    title:
      "Embassy of Ethiopia Welcomes Future Scholars from UK Universities",
    excerpt:
      "The Embassy of Ethiopia in London is delighted to welcome the SOALCAP (School of African Languages and Cultural Program) 2026 student cohort from universities",
    date: "2026-07-14",
    dateLabel: "July 14, 2026",
    category: "News",
    image: assets.newsScholars,
    author: "Website Admin",
  },
  {
    slug: "consular-announcement",
    title: "ማስታወቂያ",
    excerpt: "Official consular announcement from the Embassy of Ethiopia in London.",
    date: "2026-07-13",
    dateLabel: "July 13, 2026",
    category: "Announcements",
    image: assets.consularAnnouncementHero,
    author: "Website Admin",
  },
  {
    slug: "kagool-birmingham-visit",
    title:
      "Embassy visits Kagool’s Birmingham office for investment dialogue",
    excerpt:
      "An engaging panel discussion with Kagool focused on Ethiopia’s expansion roadmap, digital transformation, and Africa’s growing tech opportunity.",
    date: "2025-02-20",
    dateLabel: "February 20, 2025",
    category: "News",
    image: assets.newsKagool,
    author: "Website Admin",
  },
  {
    slug: "ambassador-credentials-imo",
    title:
      "H.E. Ambassador Biruk Mekonnen Presents his Credential to IMO Secretary-General",
    excerpt:
      "On February 11, 2025, H.E. Ambassador Biruk Mekonnen presented his credentials to the Secretary-General of the International Maritime Organization (IMO), H.E. Arsenio Dominguez. The Secretary-General",
    date: "2025-02-20",
    dateLabel: "February 20, 2025",
    category: "News",
    image: assets.newsCredentials,
    author: "Website Admin",
  },
];
