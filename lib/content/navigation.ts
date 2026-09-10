export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

/** Primary navbar — mirrors `#menu-main-menu` in legacy-site/index.html */
export const primaryNav: NavItem[] = [
  {
    label: "About Us",
    href: "#",
    children: [
      { label: "The Embassy", href: "/the-embassy" },
      { label: "The Embassy Profile", href: "/the-embassy-profile" },
      { label: "The Ambassador", href: "/the-ambassador" },
      { label: "Photo Gallery", href: "/category/photo-gallery" },
    ],
  },
  {
    label: "About Ethiopia",
    href: "#",
    children: [
      { label: "Profile", href: "/profile" },
      { label: "History", href: "/history" },
      { label: "Government", href: "/government" },
      { label: "Culture", href: "/culture" },
      { label: "Economy", href: "/economy" },
      { label: "Tourism", href: "/tourism" },
      { label: "Diplomatic Hub of Africa", href: "/diplomatic-hub-of-africa" },
    ],
  },
  {
    label: "Consular Services",
    href: "#",
    children: [
      { label: "Visa Services", href: "/visa-services" },
      { label: "Passport Services", href: "/passport-services" },
      {
        label: "Ethiopian Origin ID Card (Yellow Card)",
        href: "/yellow-card",
      },
      { label: "Lassiez-passer", href: "/lassiez-passer" },
      {
        label: "Authentication/Legalization and Power of Attorney",
        href: "/legalization",
      },
      {
        label: "Criminal Record and TIN Number Services",
        href: "/criminal-record",
      },
      { label: "Duty-Free Notes", href: "/duty-free-notes" },
    ],
  },
  { label: "Diaspora", href: "/diaspora-policy" },
  { label: "Investment", href: "/investment-overviews" },
  { label: "GERD", href: "/gerd" },
  { label: "Contact Us", href: "/contact-us" },
];

export const governmentOnlineServices: NavLink[] = [
  {
    label: "E-Service Ethiopia",
    href: "https://www.eservices.gov.et/provider/5",
    external: true,
  },
  {
    label: "Digital INVEA",
    href: "http://www.digitalinvea.com/",
    external: true,
  },
  {
    label: "Ethiopian e-VISA",
    href: "https://www.evisa.gov.et/",
    external: true,
  },
  {
    label: "Single Window for Trader",
    href: "https://esw.et/esw-trd/",
    external: true,
  },
];

export const importantLinks: NavLink[] = [
  {
    label: "Office of the Prime Minister",
    href: "https://www.pmo.gov.et/",
    external: true,
  },
  {
    label: "Ethiopian Airlines / Fly Ethiopian",
    href: "https://www.ethiopianairlines.com/",
    external: true,
  },
  {
    label: "Ethiopian Investment Commission",
    href: "https://investethiopia.gov.et/",
    external: true,
  },
  {
    label: "Ministry of Tourism",
    href: "https://www.visitethiopia.travel/",
    external: true,
  },
];
