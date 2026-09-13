import { contact } from "./site";
import type { StripeFeeId } from "@/lib/stripe/fees";

export type ConsularNavItem = {
  label: string;
  shortLabel: string;
  href: string;
};

/** Horizontal topic nav + hub cards */
export const consularNav: ConsularNavItem[] = [
  { label: "Visa Services", shortLabel: "Visa", href: "/visa-services" },
  {
    label: "Passport Services",
    shortLabel: "Passport",
    href: "/passport-services",
  },
  {
    label: "Ethiopian Origin ID Card (Yellow Card)",
    shortLabel: "Yellow Card",
    href: "/yellow-card",
  },
  {
    label: "Lassiez-passer",
    shortLabel: "Laissez-passer",
    href: "/lassiez-passer",
  },
  {
    label: "Authentication & Legalization",
    shortLabel: "Legalization",
    href: "/legalization",
  },
  {
    label: "Criminal Record & TIN",
    shortLabel: "Police / TIN",
    href: "/criminal-record",
  },
  {
    label: "Duty-Free Notes",
    shortLabel: "Duty-Free",
    href: "/duty-free-notes",
  },
  {
    label: "Shipping Human Remains",
    shortLabel: "Repatriation",
    href: "/shipping-human-remains",
  },
  { label: "Vital Events", shortLabel: "Vital Events", href: "/vital-events" },
];

export const consularPillars = [
  {
    title: "Book before you visit",
    body: "Most consular services at Princes Gate require an appointment. Secure your slot online, then bring complete documents.",
  },
  {
    title: "Submit documents online",
    body: "Upload your supporting pack through a guided workflow. The consular desk reviews cases in a secure staff queue.",
  },
  {
    title: "Pay where applicable",
    body: "Selected processing fees can be paid securely online via Stripe before or with your submission.",
  },
] as const;

export type ConsularBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | {
      type: "links";
      items: { label: string; href: string; external?: boolean }[];
    }
  | { type: "notice"; text: string };

export type ConsularSection = {
  heading?: string;
  /** When set, heading/fee copy use CMS Vital Events USD amounts. */
  feeKey?: "birth" | "marriage" | "divorce" | "death";
  blocks: ConsularBlock[];
};

export type ConsularPage = {
  slug: string;
  title: string;
  pageTitle: string;
  lede: string;
  hero: { src: string; alt: string; position?: string };
  sections: ConsularSection[];
  showStripe?: boolean;
  stripeFees?: StripeFeeId[];
};

/** Content sourced from ethioembassy.org.uk consular pages */
export const consularPages: Record<string, ConsularPage> = {
  "visa-services": {
    slug: "visa-services",
    title: "Visa Services",
    pageTitle: "Visas",
    lede: "All visitors to Ethiopia require visas.",
    hero: {
      src: "/images/consular/visa.jpg",
      alt: "Passport and travel documents for visa services",
      position: "object-center",
    },
    showStripe: true,
    stripeFees: ["visa-standard"],
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "All visitors to Ethiopia require visas.",
          },
          {
            type: "bullets",
            items: [
              "Until further notice, the Embassy will only be processing Diplomatic and Service Visas by appointment only.",
              "Effective June 1, 2018, the Main Department for Immigration and Nationality Affairs, in collaboration with Ethiopian Airlines, rolled out its e-visa service to all international visitors to Ethiopia. Therefore, all applicants are urged to apply for their visas online, exclusively at www.evisa.gov.et.",
              "Visa-on-arrival service is available for tourists from various countries — see the official visa categories page for eligibility.",
              `For visa services, please contact us on ${contact.phoneDisplay} or by email at ${contact.email}.`,
            ],
          },
        ],
      },
      {
        heading: "Apply and download",
        blocks: [
          {
            type: "links",
            items: [
              {
                label: "Ethiopian e-VISA portal (www.evisa.gov.et)",
                href: "https://www.evisa.gov.et/",
                external: true,
              },
              {
                label: "Tourist visa-on-arrival categories",
                href: "https://www.evisa.gov.et/information/touristOnArrivalVisa",
                external: true,
              },
              {
                label: "Download visa application form (PDF)",
                href: "https://usb.dmo.temporary.site/wp-content/uploads/2024/08/Visa-Application-Form.pdf",
                external: true,
              },
              { label: "Book an appointment", href: "/booking" },
            ],
          },
        ],
      },
    ],
  },

  "passport-services": {
    slug: "passport-services",
    title: "Passport Services",
    pageTitle: "Passport Services",
    lede:
      "If you wish to apply, renew or replace your Ethiopian passport, please read the following information carefully.",
    hero: {
      src: "/images/consular/passport-hero-modern.jpg",
      alt: "Ethiopian passport on a desk at the Embassy of Ethiopia in London",
      position: "object-center",
    },
    showStripe: false,
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "If you wish to apply, renew or replace your Ethiopian passport, please read the following information carefully.",
          },
        ],
      },
      {
        heading: "How to pay (current practice)",
        blocks: [
          {
            type: "paragraph",
            text: "The Embassy’s passport page asks applicants to make “payment of service fee” and bring a “receipt for payment of service fee,” but it does not publish a bank transfer, cash, or card desk method on that page.",
          },
          {
            type: "paragraph",
            text: "For diaspora passport applications processed online, payment is currently handled through Digital INVEA (Immigration, Nationality and Vital Events Agency): applicants pay by debit or credit card inside the Digital INVEA app / portal. Published INVEA pricing is listed in US dollars (for example, new and renewal passport packages commonly shown at $350 for the 32-page option on digitalinvea.com/pricing — confirm the live amount in the app before paying).",
          },
          {
            type: "notice",
            text: "Online passport payment is via Digital INVEA (card in the app/portal). The London Embassy passport page does not publish a public Stripe or bank-transfer schedule — contact the Embassy if you need appointment-specific fee guidance.",
          },
          {
            type: "links",
            items: [
              {
                label: "Digital INVEA",
                href: "https://www.digitalinvea.com/",
                external: true,
              },
              {
                label: "Digital INVEA pricing",
                href: "https://digitalinvea.com/pricing/",
                external: true,
              },
              {
                label: "E-Service Ethiopia",
                href: "https://www.eservices.gov.et/provider/5",
                external: true,
              },
              { label: "Book an appointment", href: "/booking" },
              { label: "Contact Us", href: "/contact-us" },
            ],
          },
        ],
      },
      {
        heading: "1. Regular Passport Renewal",
        blocks: [
          {
            type: "bullets",
            items: [
              "Previous passport and its copy",
              "Applicant must appear in person",
              "Unexpired British residence card and its copy",
              "Completed application form",
              "Two 3×4 photographs",
              "Payment of service fee",
            ],
          },
        ],
      },
      {
        heading:
          "2. New Regular Passport for Children Under 14 Years (Born Abroad)",
        blocks: [
          {
            type: "bullets",
            items: [
              "Child’s birth certificate certified by the Ministry of Foreign Affairs of the applicant’s country of birth",
              "Unexpired British residence card and its copy",
              "Parent’s (father’s or mother’s) Ethiopian passport",
              "Application letter from a parent to issue a passport for their child",
              "Completed application form",
              "Two 3×4 photographs",
              "Receipt for payment of service fee",
              "Appearance in person after fulfilling the above conditions",
            ],
          },
        ],
      },
      {
        heading: "3. Lost Passport",
        blocks: [
          {
            type: "bullets",
            items: [
              "Police report on the loss of the passport",
              "Copy of the previous passport or passport number (if available)",
              "Unexpired British residence card and its copy",
              "Two 3×4 photographs",
              "Receipt for payment of service fee",
              "Appearance in person after fulfilling the above conditions",
            ],
          },
        ],
      },
      {
        heading: "4. Passport Correction",
        blocks: [
          {
            type: "bullets",
            items: [
              "Passport and its copy",
              "Two 3×4 photographs",
              "Court order for name changes or, if the name change is due to marriage, marriage certificate (certified by Ministry of Foreign Affairs) if applicable",
              "Birth certificate certified by Ministry of Foreign Affairs for spelling, date, or place of birth correction",
            ],
          },
          {
            type: "links",
            items: [
              { label: "Book an appointment", href: "/booking" },
              { label: "Contact Us", href: "/contact-us" },
            ],
          },
        ],
      },
    ],
  },

  legalization: {
    slug: "legalization",
    title: "Authentication/Legalization and Power of Attorney",
    pageTitle: "Authentication / Legalization and Power of Attorney",
    lede:
      "To obtain Power of Attorney and legalize documents, download the ‘Digital Mofa’ app from either the App Store or Play Store and follow the instructions provided.",
    hero: {
      src: "/images/consular/legalization.jpg",
      alt: "Official seal and documents for legalization services",
      position: "object-center",
    },
    showStripe: true,
    stripeFees: ["legalization-standard"],
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "To obtain Power of Attorney and legalize documents, download the ‘Digital Mofa’ app from either the App Store or Play Store and follow the instructions provided.",
          },
          {
            type: "links",
            items: [
              {
                label: "Digital Mofa on the App Store",
                href: "https://apps.apple.com/search?term=Digital%20Mofa",
                external: true,
              },
              {
                label: "Digital Mofa on Google Play",
                href: "https://play.google.com/store/search?q=Digital%20Mofa&c=apps",
                external: true,
              },
              { label: "Book an appointment", href: "/booking" },
            ],
          },
        ],
      },
      {
        heading:
          "Document authentication — Ethiopian government documents",
        blocks: [
          {
            type: "paragraph",
            text: "The following requirements apply to documents issued by Ethiopian government offices before authentication by the Ministry of Foreign Affairs (as published by the Embassy).",
          },
          {
            type: "paragraph",
            text: "Birth, marriage, death certificates and documents declaring applicant’s marital status as single:",
          },
          {
            type: "bullets",
            items: [
              "Documents issued by Addis Ababa city administration municipality and in sub-cities and Dire Dawa city Administration Municipality shall be given services without any requirements of certification.",
              "Where a document is issued by different organs of national regional governments, the document shall be certified by the concerned regional bureau.",
              "Where birth and a marriage certificate is issued by religious institutions; it shall be certified by supreme organs of the respective religious institutions residing in Addis Ababa.",
              "Death certificates issued by medical institutions shall be certified, in the case of documents issued by institutions in Addis Ababa and Dire-Dawa by the respective health bureaus and in the case of regional governments by regional health bureaus.",
              "Death certificates and documents declaring a status of the applicant as single shall not be issued by religious institutions and where such document is submitted to the directorate such documents shall not be regarded as a valid document.",
            ],
          },
        ],
      },
      {
        heading: "Educational credentials",
        blocks: [
          {
            type: "bullets",
            items: [
              "Elementary school and high school transcripts — Dire Dawa/Addis Ababa: city education bureaus; regional: regional education bureaus.",
              "Grade 10 and 12 General School Leaving Certificate Examination — National Examination Agency of Ethiopia.",
              "Education diplomas and certificates — Regional TVET agencies; private college diplomas: Addis Ababa Technical and Vocational Agency; private college degrees: Higher Education Quality and Relevance Agency.",
              "Graduate and post-graduate degrees from Ethiopian private universities — Ethiopian Higher Education Quality and Relevance Agency.",
              "Education documents from Ethiopian public universities signed and sealed by the relevant registrar offices — AAU: University Registrar; regional HEIs: registrar of issuing institution.",
            ],
          },
        ],
      },
      {
        heading: "Other document categories",
        blocks: [
          {
            type: "bullets",
            items: [
              "Medical certificates — Addis/Dire Dawa health bureaus; regional health bureaus; MoH institutions: Ministry.",
              "Driving licence — regional/city transport bureaus.",
              "Forensic (criminal record) evidence — Federal Police Forensic Bureau.",
              "Ethiopian passport copy — Main Department of Immigration and Nationality Affairs.",
              "Court judgment, order, decree — Addis/Dire Dawa first instance: court registrar; regional courts: Supreme Court registrar or authorized body; Federal High/Supreme: respective registrars; Sharia: Supreme Council of Ethiopian Islamic Affairs.",
              "Power of Attorney, declaration, affidavits — document authentication and registration offices; regional justice bureaus / authentication offices.",
              "Translated documents — original + translation from licensed office; authenticated by city/regional authentication offices; submit original attached.",
              "Trade licence and trade related documents — trade bureaus; certificate of origin: Ethiopian Chamber of Commerce or Authorized Regional Chamber; quarantine/sanitation of export: Ministry of Agriculture and Rural Development.",
              "Investment licence — city investment bureaus / relevant regional organ / Federal Investment Agency authorized official.",
              "Adoption documents — court of law with jurisdiction, certified by court registrar.",
              "“To whom it may concern” — Woreda → Sub-Cities/City Admin; Dire Dawa → Regional Justice Bureau; regional → regional justice bureau; federal → authorized officials of issuing organ.",
              "Other documents — must be authenticated by relevant government body; NGO documents certified by the governmental organ that issues their operation licence.",
              "Documents originating from foreign countries — authenticated by Ethiopian mission in that country or country’s mission to Ethiopia before MoFA authentication; if no mission, authenticate first by origin country’s mission in a convenient country, then Ethiopian mission.",
            ],
          },
        ],
      },
      {
        heading: "Timeframe",
        blocks: [
          {
            type: "bullets",
            items: [
              "Support letters for importation of goods by returning Ethiopians: authenticate within 1 year of issuance.",
              "Education credentials, birth, death with signature samples in MoFA database: always authenticable.",
              "Other documents: within 2 years of issuance by authorized MoFA official.",
              "Expired service documents are not eligible.",
              "Certified document older than 2 years: renew/replace for submission.",
              "Previously authenticated document for renewal: services up to 10 years from issuance.",
            ],
          },
          {
            type: "notice",
            text: "Previously issued documents that require replacement or renewal must be presented as originals. Incorrect details require replacement or renewal before authentication.",
          },
        ],
      },
    ],
  },

  "lassiez-passer": {
    slug: "lassiez-passer",
    title: "Lassiez-passer",
    pageTitle: "Lassiez-passer",
    lede:
      "A laissez-passer is an emergency travel document that may be issued by the Embassy to Ethiopian nationals in exceptional circumstances.",
    hero: {
      src: "/images/consular/laissez-passer.jpg",
      alt: "Travel documents for laissez-passer services",
      position: "object-center",
    },
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "A laissez-passer is an emergency travel document that may be issued by the Embassy to Ethiopian nationals who are unable to obtain a regular passport in time for urgent travel.",
          },
          {
            type: "notice",
            text: "Detailed requirements are assessed case by case by the consular section. Please contact the Embassy and book an appointment before travelling to Princes Gate.",
          },
          {
            type: "bullets",
            items: [
              "Eligibility is assessed case by case by the consular section",
              "Supporting identity documents and proof of urgency are required",
              "Book an appointment and contact the Embassy before visiting",
            ],
          },
          {
            type: "links",
            items: [
              { label: "Book an appointment", href: "/booking" },
              { label: "Contact Us", href: "/contact-us" },
            ],
          },
        ],
      },
    ],
  },

  "criminal-record": {
    slug: "criminal-record",
    title: "Criminal Record and TIN Number Services",
    pageTitle: "Criminal Record and TIN Number Services",
    lede:
      "Assistance with Ethiopian criminal record (police clearance) requests and TIN-related documentation for eligible applicants.",
    hero: {
      src: "/images/consular/criminal-record.jpg",
      alt: "Official certificates for criminal record and TIN services",
      position: "object-center",
    },
    sections: [
      {
        heading: "Ethiopian or Ethiopian-Origin Individuals",
        blocks: [
          {
            type: "bullets",
            items: [
              "Unexpired Ethiopian passport",
              "Unexpired British residence permit",
              "Unexpired Ethiopian origin identity card and passport",
              "Two recent photographs (taken within the last 6 months)",
              "Payment of service fee",
            ],
          },
        ],
      },
      {
        heading: "Non-Ethiopian Individuals",
        blocks: [
          {
            type: "bullets",
            items: [
              "Valid passport",
              "Recent photograph (taken within the last 6 months)",
              "Payment of service fee",
            ],
          },
        ],
      },
      {
        heading: "Retirement letter",
        blocks: [
          {
            type: "bullets",
            items: [
              "Valid passport",
              "Previous retirement letter given from the Ethiopian Embassy",
              "Payment of service fee",
            ],
          },
          {
            type: "links",
            items: [
              { label: "Book an appointment", href: "/booking" },
              { label: "Contact Us", href: "/contact-us" },
            ],
          },
        ],
      },
    ],
  },

  "duty-free-notes": {
    slug: "duty-free-notes",
    title: "Duty-Free Notes",
    pageTitle: "Duty-Free Notes",
    lede:
      "ጠቅልለው ወደ ሀገር ቤት ሲገቡ ቀረጥና ታክስ ከፍለው እቃዎች ለማስገባት ለሚፈልጉ አመልካቾች።",
    hero: {
      src: "/images/consular/duty-free.jpg",
      alt: "Diplomatic correspondence for duty-free notes",
      position: "object-center",
    },
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "ጠቅልለው ወደ ሀገር ቤት ሲገቡ ቀረጥና ታክስ ከፍለው እቃዎች ለማስገባት ለሚፈልጉ አመልካቾች።",
          },
          {
            type: "notice",
            text: "እባክዎ አገልግሎቱን አዘጋጅተን እንድንሰጥዎ በጥንቃቄ አንብበው አስፈላጊውን ማስረጃዎች ከነ ፎቶ ኮፒያቸው አያይዘው ይላኩ።",
          },
          {
            type: "bullets",
            items: [
              "አገልግሎቱን ለመጠየቅ አንድ አመትና ከዚያ በላይ በውጭ አገር የኖሩ መሆን ይኖርብዎታል።",
              "በአምስት አመት ጊዜ ውስጥ ከአንድ ጊዜ በላይ አገልግሎቱን መጠየቅ አይችሉም።",
            ],
          },
          {
            type: "paragraph",
            text: "አገልግሎቱ ለማግኘት የሚከተሉትን መስፈርቶች ያሟሉ፡-",
          },
          {
            type: "bullets",
            items: [
              "በኤምባሲው የተዘጋጀውን የማመልከቻ ቅጽ መሙላት",
              "ወደ ሀገር የሚያስገቧቸውን የግል መገልገያ ዕቃዎች ዝርዝር ማቅረብ",
              "የቤት አውቶሞቢል/መኪና ግዢ የተፈጸመበት “Commercial Invoice” ማቅረብ",
              "የቤት አውቶሞቢል/መኪና ግዢ የተፈጸመው ከዩኬ ውጪ ከሆነ፣ ግዢው በተፈፀመበት ሀገር የኢ.ፌ.ዲ.ሪ. ሚሲዮን Commercial Invoice መረጋገጥ ይኖርበታል",
              "የአገልግሎት ዘመኑ ያላለቀ ፓስፖርት ዋናው እና ኮፒ ወይም",
              "ፓስፖርት የሌላቸው ደግሞ ከኤምባሲ የተሰጠ የይለፍ ወረቀት/ሊሴፓሴ",
              "የብሪቲሽ መኖሪያ ፈቃድ /Resident permit or ID/ መሰረዙን የሚያረጋግጥ ሰነድ/ማስረጃ",
            ],
          },
          {
            type: "notice",
            text: "ማስታወሻ ፡- ከላይ የተዘረዘሩት ሰነዶች ተሟልተው ሲቀርቡ ለኢትዮጵያ ጉምሩክ ኮሚሽን የድጋፍ ደብዳቤ ይጻፋል።",
          },
          {
            type: "links",
            items: [
              { label: "Book an appointment", href: "/booking" },
              { label: "Contact Us", href: "/contact-us" },
            ],
          },
        ],
      },
    ],
  },

  "shipping-human-remains": {
    slug: "shipping-human-remains",
    title: "Shipping Human Remains",
    pageTitle: "Shipping Human Remains",
    lede:
      "Requirements for Shipping Human Remains. The Government of Ethiopia depends upon Ethiopian Airlines to set the regulations for the transport of human remains.",
    hero: {
      src: "/images/consular/shipping-human-remains.jpg",
      alt: "Quiet consular desk for repatriation assistance",
      position: "object-center",
    },
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Requirements for Shipping Human Remains. The Government of Ethiopia depends upon Ethiopian Airlines to set the regulations for the transport of human remains. Ethiopian Airlines requires the following documentation to fly human remains to Ethiopia.",
          },
          {
            type: "bullets",
            items: [
              "Original and a Copy of Death Certificate.",
              "Original and a Copy of letter from the funeral home showing: embalming or preserving the (dead) body by standard Ghanaian methods; and use of a hermetically sealed casket.",
              "Original and a Copy of Non-contagious disease letters issued by the local health authority and/or Department of Health.",
              "Original and a copy of Burial Permit.",
              "A copy of the deceased passport.",
            ],
          },
          {
            type: "notice",
            text: "If all of the requirements listed above are met, the Embassy will issue the permit for the shipment of the body within 30 minutes.",
          },
          {
            type: "links",
            items: [
              { label: "Contact Us", href: "/contact-us" },
              { label: "Book an appointment", href: "/booking" },
            ],
          },
        ],
      },
    ],
  },

  "vital-events": {
    slug: "vital-events",
    title: "Vital Events",
    pageTitle: "Vital Events",
    lede:
      "የወሳኝ ኩነት ምዝገባ አፈጻጸም መመሪያ (የልደት፣ጋብቻ፣ፍቺ እና ሞት) የምስክር ወረቀት።",
    hero: {
      src: "/images/consular/vital-events.jpg",
      alt: "Registry documents for vital events services",
      position: "object-center",
    },
    showStripe: true,
    stripeFees: ["vital-events"],
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "የወሳኝ ኩነት ምዝገባ አፈጻጸም መመሪያ (የልደት፣ጋብቻ፣ፍቺ እና ሞት) የምስክር ወረቀት።",
          },
          {
            type: "paragraph",
            text: "የወሳኝ ኩነት አገልግሎት ለመስጠት የሚያስፈልጉ ቅድመ ሁኔታዎች፣መስፈርቶች እና ደጋፊ ማስረጃዎች፡-",
          },
        ],
      },
      {
        heading: "የልደት ምዝገባ (Birth)",
        feeKey: "birth",
        blocks: [
          {
            type: "bullets",
            items: [
              "አስመዝጋቢው ጊዜው ያላለፈበት የነዋሪነት/ብሄራዊ መታወቂያ ወይም ፓስፖርት ወይም የመኖሪያ ፍቃድ ወይም ስደተኝነቱን የሚገልጽ ማስረጃ ማቅረብ አለበት።",
              "በውጭ ለሚኖሩ ኢትዮጵያዊያን ልደቱ የተከሰተው በጤና ተቋም ከሆነ አስመዝጋቢው ከጤና ተቋም የተሰጠውን የልደት ማስረጃ ማቅረብ አለበት።",
              "የልደት አስመዝጋቢው ከጤና ተቋም የተሰጠውን የልደት ማሳወቂያ ቅጽ ማቅረብ አለበት። ሆኖም ምዝገባው ከመጀመሩ በፊት የተከሰተን ልደት ምዝገባን አይጨምርም።",
              "የህጻኑ አሳዳጊ ወይም ተንከባካቢ ልደቱን ለማስመዝገብ ሕጋዊ የአሳዳሪነት ወይም ተንከባካቢነት ማስረጃ ማቅረብ አለባቸው።",
              "ዕድሜው አስራ ስምንት ዓመትና በላይ የሆነ ስደተኛ ወላጆቹን የሚገልፅ ማስረጃ ከስደተኞች መረጃ ዳታ ቤዝ ላይ መረጃው የሌለ እንደሆነ ስደተኛውን በመጠየቅ መመዝገብ አለበት።",
              "የልደት ምዝገባ አገልግሎት ክፍያ {{amount}} ዶላር ብቻ ነው።",
            ],
          },
        ],
      },
      {
        heading: "የጋብቻ ምዝገባ (Marriage)",
        feeKey: "marriage",
        blocks: [
          {
            type: "bullets",
            items: [
              "ተጋቢዎች ጋብቻ ለመፈፀም ማሰባቸውን እጅግ ቢዘገይ ጋብቻቸውን ለመፈፀም ከወሰኑበት ቀን ከአንድ ወር በፊት ለኢምባሲው ማስታወቅ አለባቸው። ሆኖም ይህ ድንጋጌ በሃይማኖታዊ እና ባህላዊ ስርዓት የሚፈፀም ጋብቻን አይመለከትም።",
              "የክብር መዝገብ ሹሙ ጥያቄው በቀረበለት ቀን ከተጋቢዎቹ ጋር በመነጋገር ከወሰነ በኃላ በማግስቱ ጋብቻው የሚፈፀምበትን ቀን በመግለጽ አመቺ በሆነው መንገድ ለ15 ተከታታይ ቀን የሚቆይ ማስታወቂያ ያወጣል።",
              "ተጋቢዎች ማንነታቸውን የሚገልጽ ማስረጃ ማቅረብ አለባቸው።",
              "የተጋቢ ምስክሮች አገልግሎቱ ያላለፈበት የነዋሪነት/ብሄራዊ መታወቂያ ወይም የስደተኝነት መታወቂያ ወይም ፓስፖርት ወይም ሌላ ማንነትን ሊገልፅ የሚችል ማስረጃ መቅረብ አለበት።",
              "ተጋቢዎች ከዚህ በፊት አግብተው የተፋቱ ከሆነ የፍቺ ምስክር ወረቀት ካለ መቅረብ አለባቸው።",
              "ከ6 ወር ወዲህ በተመሳሳይ ጊዜ የተነሱት ሁለት ሁለት 3 በ 4 የሆነ የተጋቢዎች ጉርድ ፎቶግራፍ መቅረብ አለበት።",
              "በባህላዊ ስርዓት የተፈፀመ ጋብቻ የተጋቢዎች ምስክሮች ወይም በጋብቻ ስርዓቱ ላይ የታደመ ሰው በክብር መዝገብ ሹሙ ፊት በአካል ቀርበው ፊርማቸውን ማኖር አለባቸው።",
              "የተጋቢዎች የልደት ምስክር ወረቀት ካለ መቅረብ አለበት።",
              "በሙሽራው በኩል 2 በሙሽሪት በኩል 2 በድምሩ 4 ምስክሮች መቅረብ አለባቸው።",
              "ሙሽራዋ/ው ከዚህ በፊት አግብታ/ቶ የፈታ/ች ከሆነ የፍቺ ምስክርነት ወረቀት ማቅረብ አለባት/በት።",
              "ሙሽራዋ/ው ከዚህ በፊት አግብታ/ቶ የሞተባት/ችበት ከሆነ የሞት የምስክር ወረቀት ማቅረብ አለባት/በት።",
              "ተጋቢው ስደተኛ ከሆነ የስደተኝነት እውቅና ያገኘ መሆን አለበት።",
              "ማንኛውም ጋብቻ በኢትዮጵያ/ በፌዴራል የቤተሰብ ህግ መሰረት ተፈጻሚ ይሆናል።",
              "በማንኛውም ስርዓት የሚፈፀም ጋብቻ ከዚህ በላይ የተዘረዘሩ ቅድመ ሁኔታዎችን ማሟላት አለበት።",
              "የጋብቻ ምዝገባ አገልግሎት ክፍያ {{amount}} ዶላር ብቻ ነው።",
            ],
          },
        ],
      },
      {
        heading: "የፍቺ ምዝገባ (Divorce)",
        feeKey: "divorce",
        blocks: [
          {
            type: "bullets",
            items: [
              "ፍቺው ስልጣን ባለው ፍርድ ቤት የተፈፀመ መሆን አለበት።",
              "የፍቺ አስመዝጋቢ ሆነው የሚቀርቡት ተፋቺዎች በጋራ ወይም ከተፋቺዎች አንዱ ወይም የተፋቺዎች ልዩ ውክልና ያለው መሆን አለበት።",
              "ተፋቺው ስደተኛ ከሆነ የስደተኝነት እውቅና ያገኘ መሆን አለበት።",
              "ፍቺው በፍርድ ቤት የተከናወነ መሆኑን የሚገልፅ የፍርድ ቤት ውሳኔ ግልባጭ መቅረብ አለበት።",
              "ተፋቺዎች ፍቺውን ለማስመዝገብ ሲመጡ ጊዜው ያላለፈበት የመኖሪያ ፈቃድ ወይም ፓስፖርት ወይም ስደተኝነታቸውን የሚገልጽ ማስረጃ ማቅረብ አለባቸው።",
              "ቀደም ሲል የጋብቻ ምስክር ወረቀት የተሰጠ ከሆነ መመለስ አለበት።",
              "የፍቺ ምዝገባ አገልግሎት ክፍያ {{amount}} ዶላር ብቻ ነው።",
            ],
          },
        ],
      },
      {
        heading: "የሞት ምዝገባ (Death)",
        feeKey: "death",
        blocks: [
          {
            type: "bullets",
            items: [
              "ሞቱን ለማስመዝገብ ከጤና ተቋም የተሰጠ ማስረጃ መቅረብ አለበት።",
              "የሟች ማንነት የሚገልጽ ማሰረጃ ወይም የመኖሪያ ፈቃድ ወይም ፓስፖርት ወይም ሊሴ-ፓሴ ወይም ማህበራዊ መታወቂያ መቅረብ አለበት።",
              "የሞት አስመዝጋቢ ከሀገሩ መንግሥት የሞት ምስክር ወረቀት ይዞ መቅረብ አለበት።",
              "ሞቱ የሚመዘገበው በግለሰቡ መጥፋት ውሳኔ ምክንያት ከሆነ የፍርድ ቤት ውሳኔ ትክክለኛ ግልባጭ መቅረብ አለበት።",
              "ሞቱን የሚያስመዘግበው ፖሊስ ማንነቱን የሚገልጽ መታወቂያ/ማስረጃ ማቅረብ አለበት።",
              "የሞት ምዝገባ አገልግሎት ክፍያ {{amount}} ዶላር ብቻ ነው።",
            ],
          },
          {
            type: "links",
            items: [
              { label: "Book an appointment", href: "/booking" },
              { label: "Contact Us", href: "/contact-us" },
            ],
          },
        ],
      },
    ],
  },
};

/** Hub strip cards — Yellow Card lives in About Ethiopia content but is a core consular pathway */
export const consularHubServices: {
  href: string;
  label: string;
  summary: string;
  hero: { src: string; alt: string; position?: string };
}[] = [
  {
    href: "/visa-services",
    label: "Visa Services",
    summary:
      "e-Visa for most travellers; Diplomatic and Service visas by appointment in London.",
    hero: {
      src: "/images/consular/visa.jpg",
      alt: "Passport and travel documents for visa services",
    },
  },
  {
    href: "/passport-services",
    label: "Passport Services",
    summary:
      "Renewal, children born abroad, lost passport, and corrections — with full document checklists.",
    hero: {
      src: "/images/consular/passport-hero-modern.jpg",
      alt: "Ethiopian passport on a desk at the Embassy of Ethiopia in London",
    },
  },
  {
    href: "/yellow-card",
    label: "Yellow Card",
    summary:
      "Ethiopian Origin ID Card for diaspora nationals reconnecting with Ethiopia.",
    hero: {
      src: "/images/consular/yellow-card.jpg",
      alt: "Ethiopian Origin ID Card (Yellow Card) documents on a diplomatic desk",
      position: "object-center",
    },
  },
  {
    href: "/legalization",
    label: "Legalization",
    summary:
      "Digital Mofa for Power of Attorney, plus document authentication requirements.",
    hero: {
      src: "/images/consular/legalization.jpg",
      alt: "Official seal and documents for legalization",
    },
  },
  {
    href: "/lassiez-passer",
    label: "Laissez-passer",
    summary: "Emergency travel documents in exceptional circumstances.",
    hero: {
      src: "/images/consular/laissez-passer.jpg",
      alt: "Travel documents for laissez-passer services",
    },
  },
  {
    href: "/criminal-record",
    label: "Criminal Record & TIN",
    summary:
      "Police clearance and TIN-related documentation for eligible applicants.",
    hero: {
      src: "/images/consular/criminal-record.jpg",
      alt: "Official certificates for criminal record and TIN",
    },
  },
  {
    href: "/duty-free-notes",
    label: "Duty-Free Notes",
    summary: "Duty-free notes for eligible returning residents and shipments.",
    hero: {
      src: "/images/consular/duty-free.jpg",
      alt: "Diplomatic correspondence for duty-free notes",
    },
  },
  {
    href: "/shipping-human-remains",
    label: "Shipping Human Remains",
    summary:
      "Ethiopian Airlines documentation requirements and Embassy permit process.",
    hero: {
      src: "/images/consular/shipping-human-remains.jpg",
      alt: "Quiet consular desk for repatriation assistance",
    },
  },
  {
    href: "/vital-events",
    label: "Vital Events",
    summary:
      "Birth, marriage, divorce, and death registration requirements and fees.",
    hero: {
      src: "/images/consular/vital-events.jpg",
      alt: "Registry documents for vital events",
    },
  },
];
