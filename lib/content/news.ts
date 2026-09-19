import { assets } from "@/lib/content/assets";
import type { NewsItem } from "@/lib/content/site";
import { newsItems } from "@/lib/content/site";

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      /** Full A4 / letter notice — show complete page without cropping */
      presentation?: "photo" | "document";
    }
  | { type: "gallery"; images: { src: string; alt: string; caption?: string }[] }
  | {
      type: "video";
      src: string;
      poster?: string;
      caption?: string;
      /** Hosted file by default; facebook uses an embed iframe */
      provider?: "file" | "facebook";
      /** Optional outbound link (e.g. original Facebook reel) */
      externalUrl?: string;
      externalLabel?: string;
    };

export type NewsArticle = NewsItem & {
  sourceUrl: string;
  lede: string;
  blocks: NewsBlock[];
};

const bySlug = Object.fromEntries(newsItems.map((item) => [item.slug, item]));

function base(slug: string): NewsItem {
  const item = bySlug[slug];
  if (!item) throw new Error(`Missing news item: ${slug}`);
  return item;
}

export const newsArticles: NewsArticle[] = [
  {
    ...base("zamzam-bank-islamic-finance-award"),
    sourceUrl: "https://x.com/ETEmbassyLDN/status/2097975677056061493",
    lede:
      "Deputy Head of the Ethiopian Embassy in London, H.E. Ambassador Lalisa Birhanu, received ZamZam Bank’s 2026 Global Islamic Finance Award for Islamic Banking on behalf of the institution in London on 8 September 2026.",
    blocks: [
      {
        type: "paragraph",
        text: "Deputy Head of the Ethiopian Embassy in London, H.E. Ambassador Lalisa Birhanu, received ZamZam Bank’s 2026 Global Islamic Finance Award for Islamic Banking on behalf of the institution in London on 8 September 2026. The award acknowledges the bank’s continued efforts in Islamic banking, including its focus on resilience, consistency, and ethical financial practices. The recognition also reflects ZamZam Bank’s growing engagement with the international Islamic finance sector and its contribution to Ethiopia’s visibility within the global financial community.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/images/news/x-posts/zamzam-1.jpg",
            alt: "Ambassador Lalisa Birhanu with the ZamZam Bank award",
          },
          {
            src: "/images/news/x-posts/zamzam-2.jpg",
            alt: "ZamZam Bank 2026 Global Islamic Finance Award ceremony in London",
          },
        ],
      },
    ],
  },
  {
    ...base("ethiopian-new-year-2026"),
    sourceUrl: "https://x.com/ETEmbassyLDN/status/2098036068100538879",
    lede:
      "His Excellency Ambassador Biruk Mekonnen and the staff of the Embassy of Ethiopia in London extend their warmest wishes for a joyful and prosperous Ethiopian New Year.",
    blocks: [
      {
        type: "paragraph",
        text: "እንኳን አደረሳችሁ! Happy New Year!",
      },
      {
        type: "paragraph",
        text: "His Excellency Ambassador Biruk Mekonnen and the staff of the Embassy of Ethiopia in London extend their warmest wishes to you and your loved ones for a joyful and prosperous Ethiopian New Year.",
      },
      {
        type: "paragraph",
        text: "May the new year bring renewed hope, happiness, and countless moments of celebration, and may it strengthen the bonds of friendship and unity we cherish.",
      },
      {
        type: "video",
        src: "https://github.com/Getu4ever/ethio-embassy-next/releases/download/media-ethiopian-new-year-2026/new-year-facebook-web.mp4",
        poster: assets.newsEthiopianNewYear.src,
        caption:
          "New Year message from H.E. Ambassador Biruk Mekonnen and Embassy staff",
        externalUrl: "https://www.facebook.com/reel/1060014623613371",
        externalLabel: "Watch on Facebook →",
      },
    ],
  },
  {
    ...base("embassy-welcomes-future-scholars"),
    sourceUrl:
      "https://ethioembassy.org.uk/%f0%9d%97%98%f0%9d%97%ba%f0%9d%97%af%f0%9d%97%ae%f0%9d%98%80%f0%9d%98%80%f0%9d%98%86-%f0%9d%97%bc%f0%9d%97%b3-%f0%9d%97%98%f0%9d%98%81%f0%9d%97%b5%f0%9d%97%b6%f0%9d%97%bc%f0%9d%97%bd%f0%9d%97%b6/",
    lede:
      "SOALCAP 2026 students from universities across the United Kingdom join the Embassy for a conversation on Ethiopia, Africa, and global affairs.",
    blocks: [
      {
        type: "paragraph",
        text: "The Embassy of Ethiopia in London is delighted to welcome the SOALCAP (School of African Languages and Cultural Program) 2026 student cohort from universities across the United Kingdom for an engaging discussion on Ethiopia, Africa, and global affairs.",
      },
      {
        type: "paragraph",
        text: "In his welcoming remarks, Deputy Chief of Mission, H.E. Ambassador Lalisa Berhanu highlighted Ethiopia’s unique place in Africa’s history and contemporary development as the diplomatic capital of the Continent and a champion of Pan-African solidarity and regional integration. The visit provided students with an opportunity to learn about diplomacy, Ethiopia’s development priorities, and the country’s contribution to multilateral cooperation.",
      },
      {
        type: "gallery",
        images: [
          {
            src: assets.newsScholars.src,
            alt: assets.newsScholars.alt,
          },
          {
            src: "/images/news/scholars-1.jpeg",
            alt: "SOALCAP scholars visit the Embassy of Ethiopia in London",
          },
          {
            src: "/images/news/scholars-2.jpeg",
            alt: "Embassy reception for future scholars from UK universities",
          },
          {
            src: "/images/news/scholars-3.jpeg",
            alt: "Discussion session with Embassy staff and visiting students",
          },
          {
            src: "/images/news/scholars-4.jpeg",
            alt: "Students engage with Embassy diplomats",
          },
          {
            src: "/images/news/scholars-5.jpeg",
            alt: "Group photograph from the SOALCAP Embassy visit",
          },
          {
            src: "/images/news/scholars-6.jpeg",
            alt: "Networking during the scholars programme at the Embassy",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Throughout the programme, Embassy staff shared perspectives on Ethiopia’s and Africa’s growing role in addressing global challenges and advancing international cooperation. Discussions also underscored the importance of language, culture, and historical heritage as powerful forces for unity and mutual understanding.",
      },
      {
        type: "paragraph",
        text: "The visit concluded with networking and informal discussions, accompanied by a showcase of Ethiopia’s renowned hospitality.",
      },
    ],
  },
  {
    ...base("consular-announcement"),
    sourceUrl: "https://ethioembassy.org.uk/%e1%88%9b%e1%88%b5%e1%89%b3%e1%8b%88%e1%89%82%e1%8b%ab/",
    lede:
      "Official consular announcement from the Embassy of Ethiopia in London. Please review the notice carefully and contact the consular desk with any questions.",
    blocks: [
      {
        type: "paragraph",
        text: "The Embassy of Ethiopia in London has issued the following consular notice for the attention of applicants and the Ethiopian community in the United Kingdom.",
      },
      {
        type: "image",
        src: assets.consularAd.src,
        alt: assets.consularAd.alt,
        caption: "Official consular announcement — ማስታወቂያ",
        presentation: "document",
      },
      {
        type: "paragraph",
        text: "For clarification on documentary requirements, appointments, or related consular services, please contact the Embassy consular desk or book an appointment through the website.",
      },
    ],
  },
  {
    ...base("kagool-birmingham-visit"),
    sourceUrl:
      "https://ethioembassy.org.uk/embassy-ethiopia-has-visited-kagools-office-in-bermingham-uk-an-engaging-panel-discussion-was-held-with-kagool-team/",
    lede:
      "An engaging panel discussion with Kagool focused on Ethiopia’s expansion roadmap, digital transformation, and Africa’s growing tech opportunity.",
    blocks: [
      {
        type: "paragraph",
        text: "Embassy Ethiopia has visited Kagool’s office in Birmingham, UK. An engaging panel discussion was held with the Kagool team.",
      },
      {
        type: "paragraph",
        text: "Discussion focused on Kagool’s expansion roadmap for Ethiopia. Kagool’s decision and its remarkable progress on the expansion is an important journey.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/images/news/kagool-1.jpg",
            alt: "Embassy visit to Kagool Birmingham — panel discussion",
          },
          {
            src: "/images/news/kagool-2.jpg",
            alt: "Investment dialogue with Kagool leadership",
          },
          {
            src: "/images/news/kagool-3.jpg",
            alt: "Embassy and Kagool teams during the Birmingham visit",
          },
          {
            src: "/images/news/kagool-4.jpg",
            alt: "Presentation on Ethiopia’s digital and investment opportunities",
          },
          {
            src: "/images/news/kagool-5.jpg",
            alt: "Group photograph following the Kagool Embassy visit",
          },
        ],
      },
      {
        type: "paragraph",
        text: "We explored investment opportunities in Ethiopia and across Africa, discussed Ethiopia’s Vision 2025 for digital transformation and the role of startups, and highlighted the Prime Minister’s initiative to train 5 million coders and develop a thriving tech ecosystem in Ethiopia.",
      },
      {
        type: "quote",
        text: "Very soon Kagool will be at the gate of Africa — Ethiopia.",
      },
    ],
  },
  {
    ...base("ambassador-credentials-imo"),
    sourceUrl:
      "https://ethioembassy.org.uk/h-e-ambassador-biruk-mekonnen-presents-his-credential-to-imo-secretary-general/",
    lede:
      "On 11 February 2025, H.E. Ambassador Biruk Mekonnen presented his credentials to IMO Secretary-General H.E. Arsenio Dominguez in London.",
    blocks: [
      {
        type: "paragraph",
        text: "On February 11, 2025, H.E. Ambassador Biruk Mekonnen presented his credentials to the Secretary-General of the International Maritime Organization (IMO), H.E. Arsenio Dominguez. The Secretary-General warmly welcomed the Ambassador and acknowledged Ethiopia’s strong commitment to maritime affairs.",
      },
      {
        type: "paragraph",
        text: "During their discussions, they focused on the long-standing partnership between Ethiopia and the IMO, exploring ways to enhance Ethiopia’s utilization of IMO tools and technical assistance. Key topics included maritime safety and security, as well as Ethiopia’s contributions to the sector.",
      },
      {
        type: "image",
        src: assets.newsCredentials.src,
        alt: assets.newsCredentials.alt,
        caption:
          "H.E. Ambassador Biruk Mekonnen with IMO Secretary-General H.E. Arsenio Dominguez",
      },
      {
        type: "paragraph",
        text: "H.E. Arsenio Dominguez commended Ethiopia for its dedication to training skilled seafarers and emphasized the importance of advancing the Maritime Single Window system. They also discussed Ethiopia’s role in the Djibouti Code of Conduct and opportunities to strengthen regional cooperation for a safer and more efficient maritime industry.",
      },
      {
        type: "paragraph",
        text: "H.E. Ambassador Biruk reiterated Ethiopia’s commitment to actively contributing to the global maritime sector.",
      },
    ],
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getAllNewsSlugs(): string[] {
  return newsArticles.map((article) => article.slug);
}

export function getRelatedNews(slug: string, limit = 3): NewsArticle[] {
  return newsArticles.filter((article) => article.slug !== slug).slice(0, limit);
}
