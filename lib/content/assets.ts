/**
 * Asset migration map: legacy-site/images → public/images (next/image).
 * Paths are rooted at /images for the Next.js public folder.
 */
export const assets = {
  logo: {
    src: "/images/logo-uk.png",
    width: 270,
    height: 270,
    alt: "Embassy of Ethiopia in London",
  },
  logoLockup: {
    src: "/images/ethiopian-embassy-london-logo.png",
    width: 1280,
    height: 720,
    alt: "Ethiopian Embassy London",
  },
  logoEthioUk: {
    src: "/images/ethio-uk-modified.png",
    width: 282,
    height: 282,
    alt: "Ethiopia and United Kingdom",
  },
  logoThumb: {
    src: "/images/logo-uk-modified-150x150.png",
    width: 150,
    height: 150,
    alt: "Embassy of Ethiopia in London",
  },
  embassyLogo: {
    src: "/images/embassy-logo.png",
    width: 400,
    height: 400,
    alt: "Embassy of Ethiopia crest",
  },
  icon: {
    src: "/images/cropped-icon-192x192.png",
    width: 192,
    height: 192,
    alt: "Embassy favicon",
  },
  president: {
    src: "/images/presdant-r1sms7uiijhcvm8x5t9qt3lkrtbcsxtrnzo7oc8rjw.png",
    width: 400,
    height: 500,
    alt: "H.E. Taye Atskeselassie Amde, President",
  },
  primeMinister: {
    src: "/images/pm-r1smsx85n2g3l3821m8o6f70t7u9krmirhabmt74vw.png",
    width: 400,
    height: 500,
    alt: "H.E. Abiy Ahmed Ali (PhD), Prime Minister",
  },
  minister: {
    src: "/images/H.E.-Gedion-Timotheos-PhD-qzrr5n5botrjz6z76j5zovg65q6dzila91rbmp1w1o.jpg",
    width: 400,
    height: 500,
    alt: "H.E. Gedion Timotheos (PhD), Minister",
  },
  weekInTheHorn: {
    src: "/images/WeekInTHe-Horn.jpg",
    width: 400,
    height: 320,
    alt: "A Week in the Horn",
  },
  weekInTheHornThumb: {
    src: "/images/WeekInTHe-Horn-300x240.jpg",
    width: 300,
    height: 240,
    alt: "ሳምንቱ በአፍሪካ ቀንድ",
  },
  consularAd: {
    src: "/images/Consular-Advertizment.jpg",
    width: 800,
    height: 1131,
    alt: "Consular announcement — ማስታወቂያ",
  },
  consularAnnouncementHero: {
    src: "/images/news/consular-announcement-hero.jpg",
    width: 1376,
    height: 768,
    alt: "Consular services desk at the Embassy of Ethiopia in London",
  },
  newsIndexHero: {
    src: "/images/news/news-index-hero.jpg",
    width: 1376,
    height: 768,
    alt: "Diplomatic reading room at the Embassy of Ethiopia in London",
  },
  ogDefault: {
    src: "/images/og-default.jpg",
    width: 1200,
    height: 630,
    alt: "Embassy of Ethiopia in London",
  },
  newsScholars: {
    src: "/images/745524975_3207126539434264_6130311344526054697_n.jpeg",
    width: 1200,
    height: 800,
    alt: "Embassy welcomes future scholars from UK universities",
  },
  newsKagool: {
    src: "/images/7.jpg",
    width: 1200,
    height: 800,
    alt: "Embassy visit to Kagool office in Birmingham",
  },
  newsCredentials: {
    src: "/images/476838189_1039174184910280_246836420208223993_n.jpg",
    width: 1200,
    height: 800,
    alt: "Ambassador Biruk Mekonnen presents credentials to IMO",
  },
  newsEthiopianNewYear: {
    src: "/images/news/x-posts/new-year-poster.jpg",
    width: 848,
    height: 480,
    alt: "Ambassador Biruk Mekonnen delivers Ethiopian New Year greetings",
  },
  newsEthiopianNewYearCard: {
    src: "/images/news/x-posts/new-year.jpg",
    width: 890,
    height: 1600,
    alt: "Ethiopian New Year greeting card from the Embassy of Ethiopia in London",
  },
  newsZamzamAward: {
    src: "/images/news/x-posts/zamzam-1.jpg",
    width: 1200,
    height: 1600,
    alt: "Ambassador Lalisa Birhanu receives ZamZam Bank Global Islamic Finance Award",
  },
} as const;

export type AssetKey = keyof typeof assets;
export type Asset = (typeof assets)[AssetKey];
