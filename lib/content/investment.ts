export const investmentBusinessDesk = {
  address: "17 Princes Gate, London SW7 1PZ",
  tel: "+44 20 7589 7212",
  telHref: "tel:+442075897212",
  email: "business@ethioembassy.org",
  eicUrl: "https://investethiopia.gov.et/",
  eicStartUrl: "https://investethiopia.gov.et/get-started/invest-in-ethiopia/",
} as const;

export type InvestmentSector = {
  slug: string;
  href: string;
  label: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  narrative: string[];
  highlights: string[];
  hero: { src: string; alt: string };
  eicUrl: string;
  resources?: { label: string; href: string; kind: "pdf" | "pptx" | "link" }[];
};

export const investmentSectors: InvestmentSector[] = [
  {
    slug: "invest-in-ethiopia",
    href: "/invest-in-ethiopia",
    label: "Invest in Ethiopia",
    shortLabel: "Start here",
    eyebrow: "Gateway",
    title: "Begin your investment journey",
    summary:
      "Licensing, incentives, and aftercare through Ethiopia’s official investment pathway.",
    narrative: [
      "Ethiopia welcomes investors seeking growth markets, renewable energy, industrial parks, and a strategic gateway between Africa, the Middle East, and Europe.",
      "The Ethiopian Investment Commission (EIC) is the primary government body supporting foreign and domestic investors — from sector guidance and incentives to licensing and aftercare.",
    ],
    highlights: [
      "Large and growing domestic market",
      "Industrial parks and infrastructure corridors",
      "Abundant renewable energy potential",
      "Ethiopian Airlines global connectivity",
      "Ongoing reforms to improve the investment climate",
    ],
    hero: {
      src: "/images/investment/invest-in-ethiopia.jpg",
      alt: "Modern Addis Ababa skyline",
    },
    eicUrl: "https://investethiopia.gov.et/get-started/invest-in-ethiopia/",
  },
  {
    slug: "agriculture",
    href: "/agriculture",
    label: "Agriculture",
    shortLabel: "Agriculture",
    eyebrow: "Priority sector",
    title: "Agriculture & agro-processing",
    summary:
      "Commercial farming, horticulture, and value-added processing across Ethiopia’s highland and lowland corridors.",
    narrative: [
      "Agriculture remains a cornerstone of Ethiopia’s economy, with strong opportunities in commercial farming, agro-processing, and export commodities.",
      "From highland crops to horticulture and livestock-linked value chains, agriculture and agro-processing are priority areas for sustainable investment and job creation.",
    ],
    highlights: [
      "Diverse agro-climatic zones",
      "Growing demand for processed foods",
      "Export pathways for spices, coffee, and horticulture",
      "Alignment with industrial park agro-processing clusters",
    ],
    hero: {
      src: "/images/investment/agriculture.jpg",
      alt: "Ethiopian highland farmland",
    },
    eicUrl: "https://investethiopia.gov.et/",
    resources: [
      {
        label: "Agriculture sector opportunities",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/02/EIC-presentation-agriculture.pptx",
        kind: "pptx",
      },
      {
        label: "Agro-processing opportunities",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/02/Agro-Processesing.pptx",
        kind: "pptx",
      },
      {
        label: "Sustainable agro-processing & light manufacturing",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/05/Investment-Opportunities-Agro-processing-Light-Manufacturing_EIC.pdf",
        kind: "pdf",
      },
    ],
  },
  {
    slug: "textiles",
    href: "/textiles",
    label: "Textile & Garment",
    shortLabel: "Textile",
    eyebrow: "Manufacturing",
    title: "Textile and garment manufacturing",
    summary:
      "Industrial parks, competitive labour, and preferential market access for apparel and textiles.",
    narrative: [
      "Ethiopia’s textile and garment sector is a priority manufacturing industry, supported by industrial parks, competitive labour, and logistics links through Ethiopian Airlines and regional corridors.",
      "Investors can build integrated operations across spinning, weaving, finishing, and garment production within Ethiopia’s manufacturing ecosystem.",
    ],
    highlights: [
      "Industrial park manufacturing clusters",
      "Growing fibre and cotton supply chains",
      "Export-oriented garment production",
      "Skilled and trainable workforce",
    ],
    hero: {
      src: "/images/investment/textile.jpg",
      alt: "Textile manufacturing in Ethiopia",
    },
    eicUrl:
      "https://investethiopia.gov.et/key-sectors/manufacturing/textile-garment/",
  },
  {
    slug: "leather-and-leather-products",
    href: "/leather-and-leather-products",
    label: "Leather Products",
    shortLabel: "Leather",
    eyebrow: "Manufacturing",
    title: "Leather and leather products",
    summary:
      "One of Africa’s largest livestock bases supporting tanning, footwear, and accessories.",
    narrative: [
      "Ethiopia has one of Africa’s largest livestock populations, creating a strong foundation for leather and leather-product manufacturing and export.",
      "The leather value chain spans tanning, footwear, garments, and accessories — with clear opportunities for investors across the supply chain.",
    ],
    highlights: [
      "Strong raw material base",
      "Footwear and accessories manufacturing",
      "Export potential to regional and global markets",
      "Value-chain upgrading opportunities",
    ],
    hero: {
      src: "/images/investment/leather.jpg",
      alt: "Leather industry craftsmanship",
    },
    eicUrl:
      "https://investethiopia.gov.et/key-sectors/manufacturing/leather-and-leather-products/",
    resources: [
      {
        label: "The Leather Sector presentation",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/02/Leather-PPT-Updated-1.ppt",
        kind: "pptx",
      },
    ],
  },
  {
    slug: "mining",
    href: "/mining",
    label: "Mining",
    shortLabel: "Mining",
    eyebrow: "Natural resources",
    title: "Mining and minerals",
    summary:
      "Precious metals, industrial minerals, and related services under an evolving investment framework.",
    narrative: [
      "Ethiopia’s mining sector offers opportunities in precious metals, industrial minerals, and related services.",
      "Prospective investors should consult the Ethiopian Investment Commission and relevant regulatory bodies for licensing, environmental requirements, and current incentives.",
    ],
    highlights: [
      "Precious metals and industrial minerals",
      "Evolving regulatory and investment framework",
      "Opportunities across exploration and services",
      "Embassy business desk support for UK-based investors",
    ],
    hero: {
      src: "/images/investment/mining.jpg",
      alt: "Ethiopian highland mineral landscape",
    },
    eicUrl: "https://investethiopia.gov.et/key-sectors/mining/",
  },
];

export type InvestmentResourceGroup = {
  title: string;
  description: string;
  items: { label: string; href: string; kind: "pdf" | "pptx" | "link" }[];
};

export const investmentResourceGroups: InvestmentResourceGroup[] = [
  {
    title: "Sector briefings",
    description: "Presentations and guides prepared for prospective investors.",
    items: [
      {
        label: "Agro-processing opportunities",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/02/Agro-Processesing.pptx",
        kind: "pptx",
      },
      {
        label: "Pharmaceutical hub of Africa",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/02/EIC_-Presentation-Pharma-2021.pptx",
        kind: "pptx",
      },
      {
        label: "Agriculture sector opportunities",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/02/EIC-presentation-agriculture.pptx",
        kind: "pptx",
      },
      {
        label: "Industrial park development",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/02/INDUSTRIAL-PARK-dEVELOPMENT-PPP.pptx",
        kind: "pptx",
      },
      {
        label: "Leather sector",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/02/Leather-PPT-Updated-1.ppt",
        kind: "pptx",
      },
      {
        label: "Sustainable agro-processing & light manufacturing",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/05/Investment-Opportunities-Agro-processing-Light-Manufacturing_EIC.pdf",
        kind: "pdf",
      },
      {
        label: "Spices manufacturers & exporters",
        href: "https://ethiopianembassy.org/wp-content/uploads/2020/11/Ethiopian-Manufacturers-and-Exporters-Information.pdf",
        kind: "pdf",
      },
    ],
  },
  {
    title: "Laws & frameworks",
    description: "Core legal and policy references for investment planning.",
    items: [
      {
        label: "Investment Guide to Ethiopia (EIC)",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/05/An-Investment-Guide-to-Ethiopia-EIC_2017.pdf",
        kind: "pdf",
      },
      {
        label: "Investment Proclamation No. 1180/2020",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/05/New-Investment-Proclamation-No-1180_2020-EIC.pdf",
        kind: "pdf",
      },
      {
        label: "Investment Regulation No. 474/2020",
        href: "https://faolex.fao.org/docs/pdf/eth216473.pdf",
        kind: "pdf",
      },
    ],
  },
  {
    title: "PPP pipeline",
    description:
      "Public-Private Partnership Directorate General project pipeline materials.",
    items: [
      {
        label: "PPP Project Pipeline 2020/21 (PPTX)",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/06/PPP-Projects-Pipeline-20202021.pptx",
        kind: "pptx",
      },
      {
        label: "PPP Project Pipeline 2020/21 (PDF)",
        href: "https://ethiopianembassy.org/wp-content/uploads/2021/06/Pipeline-Projects-2020-and-21.pdf",
        kind: "pdf",
      },
    ],
  },
];

export const investmentPillars = [
  {
    title: "Private-sector momentum",
    body: "Strong government commitment to private enterprise has helped underpin sustained economic progress since the early 2000s.",
  },
  {
    title: "Stable operating environment",
    body: "A comparatively stable exchange-rate setting and secure working and living conditions support longer-term investment planning.",
  },
  {
    title: "Scale and connectivity",
    body: "A large domestic market, industrial parks, renewable energy potential, and Ethiopian Airlines connectivity form a practical platform for growth.",
  },
] as const;

export function getInvestmentSector(slug: string) {
  return investmentSectors.find((s) => s.slug === slug);
}
