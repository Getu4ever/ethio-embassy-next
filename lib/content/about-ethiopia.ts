import type { NavLink } from "./navigation";

export type AboutEthiopiaNavItem = NavLink & { shortLabel: string };

/** Horizontal topic nav on About Ethiopia pages */
export const aboutEthiopiaNav: AboutEthiopiaNavItem[] = [
  { label: "Profile", shortLabel: "Profile", href: "/profile" },
  { label: "History", shortLabel: "History", href: "/history" },
  { label: "Government", shortLabel: "Government", href: "/government" },
  { label: "Culture", shortLabel: "Culture", href: "/culture" },
  { label: "Economy", shortLabel: "Economy", href: "/economy" },
  { label: "Tourism", shortLabel: "Tourism", href: "/tourism" },
  {
    label: "Diplomatic Hub of Africa",
    shortLabel: "Diplomatic Hub",
    href: "/diplomatic-hub-of-africa",
  },
  {
    label: "The Embassy Profile",
    shortLabel: "Embassy",
    href: "/the-embassy-profile",
  },
  {
    label: "Ethiopian Origin ID Card (Yellow Card)",
    shortLabel: "Yellow Card",
    href: "/yellow-card",
  },
  { label: "Diaspora Policy", shortLabel: "Diaspora", href: "/diaspora-policy" },
  { label: "GERD", shortLabel: "GERD", href: "/gerd" },
];

export const aboutEthiopiaPillars = [
  {
    title: "Ancient continuity",
    body: "One of the world’s oldest continuous civilizations — from Axum and Lalibela to a modern federal republic.",
  },
  {
    title: "Strategic geography",
    body: "Horn of Africa location, regional logistics, and Addis Ababa as the diplomatic capital of Africa.",
  },
  {
    title: "Living culture",
    body: "Over eighty nations and nationalities, living faiths, cuisine, music, and landscapes that draw the world.",
  },
] as const;

export const aboutEthiopiaHeroes: Record<
  string,
  { src: string; alt: string; position?: string; summary: string }
> = {
  "/profile": {
    src: "/legacy-site/images/hero-images/BaleMountain.jpg",
    alt: "Bale Mountains landscape in Ethiopia",
    position: "object-[50%_40%]",
    summary:
      "Geography, people, and the federal republic at the heart of the Horn of Africa.",
  },
  "/history": {
    src: "/legacy-site/images/hero-images/adwa-2024-02-11-65c847a88eec6.jpg",
    alt: "Adwa commemorative landscape",
    summary: "From antiquity to Adwa — a nation that shaped African independence.",
  },
  "/government": {
    src: "/legacy-site/images/hero-images/adwa-2024-02-11-65c847a8a6a40.jpg",
    alt: "Adwa Victory Memorial in Addis Ababa",
    position: "object-[50%_40%]",
    summary: "Federal institutions, leadership, and the structure of the FDRE.",
  },
  "/culture": {
    src: "/legacy-site/images/hero-images/lalibela.jpg",
    alt: "Rock-hewn churches of Lalibela",
    summary: "Faith, heritage, languages, and the arts that define Ethiopian life.",
  },
  "/economy": {
    src: "/legacy-site/images/hero-images/bole-corridor-2024-08-02-66ac9ba76a987.jpg",
    alt: "Modern Addis Ababa commercial corridor",
    position: "object-[50%_30%]",
    summary: "Reform, growth, and a private-sector horizon for the decades ahead.",
  },
  "/tourism": {
    src: "/legacy-site/images/hero-images/sofomar.jpg",
    alt: "Sof Omar caves and landscape",
    summary: "Landscapes, pilgrimage, wildlife, and journeys across Ethiopia.",
  },
  "/diplomatic-hub-of-africa": {
    src: "/images/about-ethiopia/addis-ababa-african-union.jpeg",
    alt: "African Union headquarters in Addis Ababa",
    summary: "Addis Ababa — seat of the African Union and a continental diplomatic centre.",
  },
  "/the-embassy-profile": {
    src: "/images/about-ethiopia/ethiopian-london-embassy.jpg",
    alt: "Embassy of Ethiopia in London",
    summary: "How the London mission represents Ethiopia in the United Kingdom.",
  },
  "/yellow-card": {
    src: "/images/about-ethiopia/ethio-origin.jpg",
    alt: "Ethiopian Origin ID Card (Yellow Card)",
    summary: "Identity and connection for foreign nationals of Ethiopian origin.",
  },
  "/diaspora-policy": {
    src: "/images/about-ethiopia/ethiopian-diaspora.jpeg",
    alt: "Ethiopian diaspora community",
    summary: "Engaging Ethiopians abroad in national development and cultural life.",
  },
  "/gerd": {
    src: "/images/about-ethiopia/gerd.jpg",
    alt: "Grand Ethiopian Renaissance Dam (GERD)",
    summary: "Africa’s largest hydropower project — power, progress, and sovereignty.",
  },
};

export const aboutEthiopiaHubChapters = [
  { href: "/profile", label: "Profile" },
  { href: "/history", label: "History" },
  { href: "/government", label: "Government" },
  { href: "/culture", label: "Culture" },
  { href: "/economy", label: "Economy" },
  { href: "/tourism", label: "Tourism" },
  { href: "/diplomatic-hub-of-africa", label: "Diplomatic Hub of Africa" },
] as const;

export const aboutEthiopiaHubRelated = [
  { href: "/the-embassy-profile", label: "The Embassy Profile" },
  { href: "/yellow-card", label: "Yellow Card" },
  { href: "/diaspora-policy", label: "Diaspora Policy" },
  { href: "/gerd", label: "GERD" },
] as const;

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "officials"; items: { role: string; name: string }[] }
  | { type: "regions"; items: { name: string; capital: string }[] };

export type ContentSection = {
  heading?: string;
  blocks: ContentBlock[];
};

export type AboutPage = {
  slug: string;
  title: string;
  pageTitle: string;
  sections: ContentSection[];
};

export const aboutEthiopiaPages: Record<string, AboutPage> = {
  profile: {
    slug: "profile",
    title: "Profile",
    pageTitle: "The Federal Democratic Republic of Ethiopia (FDRE)",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "The Federal Democratic Republic of Ethiopia is located in the north-eastern part of Africa commonly known as the Horn of Africa. It is strategically proximate to the Middle East and Europe, together with its easy access to the major ports of the region and enhance its international trade. It shares borders with Sudan and South Sudan to the west; Eritrea to the north and north-east; Djibouti & Somalia to the east; Somalia and Kenya to the south. Ethiopia is relatively larger in size, covering 1,112,000 square kilometres (472,000 sq. miles) which roughly makes it as large as France and Spain combined and is five times the size of the UK.",
          },
          {
            type: "paragraph",
            text: "The country has different topographies. From the north and running down to the center are the Abyssinian highlands. To the west of the chain the land drops to the grasslands of Sudan, to the east to the deserts of the Afar. South of Addis Ababa, the land is dominated by the Rift Valley Lakes.",
          },
          {
            type: "paragraph",
            text: "Ethiopia’s central plateau varies in height from 2,000 and 3,000 meters. In the north and the center of the country there are about 25 mountains whose peaks rises over 4,000 meters (13,200ft), the highest being Ras Dashen at 4,543 meters (14,538ft) above sea level.",
          },
        ],
      },
      {
        heading: "Population",
        blocks: [
          {
            type: "paragraph",
            text: "With a population of more than 120 million, Ethiopia represents a melting pot of ancient cultures with Middle Eastern and African cultures evident in the religious, ethnic and language composition of its Semitic, Cushitic, Omotic and Nilotic peoples. The Ethiopia comprises over 80 different nations and nationalities of which the Amhara and the Oromo constitute the majority. Approximately 75-80 percent of the population lives in the rural areas. Economically active segment of the population whose age is between 14 and 60 is about 57.23%, aged from 0-14 is 39.63% and over 65 is 3.14%.",
          },
        ],
      },
      {
        heading: "Regional States and Chartered Cities",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia is a Federal Democratic Republic state composed of twelve regions and two city administrations: Tigray, Afar, Amhara, Oromia, Benishangul-Gumuz, Central Ethiopia Regional State, Gambella, Harari, Sidama, Somali, South Ethiopia Regional State, South West Ethiopia Peoples’ Region; and two city administrations–Addis Ababa and Dire Dawa. Addis Ababa is the Capital City and the Seat of African Union.",
          },
        ],
      },
      {
        heading: "Some Basic Facts",
        blocks: [
          {
            type: "paragraph",
            text: "Location: Ethiopia is located in the Horn of Africa, 3′ and 14.8″ latitude 33′ and 48′ longitude bordering Somalia, the Sudan, South Sudan, Djibouti, Kenya and Eritrea.",
          },
          {
            type: "bullets",
            items: [
              "It is the 10th largest country in Africa.",
              "The 2nd-most populous country in Africa after Nigeria",
              "With the lowest point of 100 meters below sea level, the Danakil Depression, and with the highest point of 4620 meters above sea level, Ras Dashen",
              "Abay (Blue Nile) River which contributes 86% of the Nile River emanates from the northern high lands of Ethiopia to join the White Nile in Khartoum, after flowing a distance of 1,450 kilometres.",
              "South of Addis Ababa, the land is dominated by the Rift Valley Lakes with beautiful scenery.",
              "Its proximity to the Middle East and Europe, together with its easy access to the major ports of the region, enhances its international trade.",
            ],
          },
        ],
      },
      {
        heading: "Climate",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia has various climatic ecological zones and four seasons: summer, spring, winter and autumn. Summer is the rainy season running from June to August. Spring is a transition from rainy to dry season. It is very colourful and attractive to enjoy the visit because the field will commonly be covered with flowers and greenery. It runs from September to November. Winter is dry season because there is no rain as such in most of the areas. It consists months of December, January and February. The last season, Autumn, is again a transition period from dry to rainy season, Summer. March, April and May are included in this season.",
          },
          {
            type: "paragraph",
            text: "Although Ethiopia lies within 15 degrees north of the equator, owing to the moderating influence of high altitude, its central highland, generally enjoy a temperate and pleasant climate. The temperature rarely exceeds 25°C in most of the country. In fact, in the lower lying areas like Awash, Omo and Mago parks, which experience sub-tropical and tropical climates, it can get considerably hotter. The temperature generally drops quite rapidly towards sunset.",
          },
          {
            type: "paragraph",
            text: "The Green Legacy Initiative, launched by Ethiopian Prime Minister Abiy Ahmed, is a significant environmental campaign aimed at combating climate change, deforestation, and land degradation in Ethiopia. Since its inception in 2019, the initiative has led to the planting of over 17.5 billion trees across the country. This large-scale afforestation effort is part of Ethiopia’s broader strategy to address environmental challenges while fostering economic resilience.",
          },
          {
            type: "paragraph",
            text: "The initiative not only focuses on increasing tree coverage to absorb carbon emissions but also aligns with Ethiopia’s economic reforms. These reforms aim to create a balance between economic growth and environmental sustainability, ensuring that economic activities do not lead to further environmental degradation. By enhancing the country’s green infrastructure, Ethiopia seeks to mitigate the impacts of climate change, improve biodiversity, and support sustainable livelihoods for its population.",
          },
        ],
      },
      {
        heading: "Time",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopians also use a 12-hour clock, with one cycle of 1 to 12 running from dawn (6 am) to dusk (6 pm) and the other cycle from dusk to dawn. The start of the day is dawn, rather than midnight. Thus, 7:00 AM in East Africa Time (EAT) corresponds to 1:00 daylight hour in local Ethiopian time; 12:00 noon EAT is 6:00 daylight hours, and 6:00 pm EAT is 12:00 local time.",
          },
          {
            type: "paragraph",
            text: "Urban Ethiopians often use both systems as appropriate. Nevertheless, in general, when asking about dates and times, it is always worth checking which system is being used!",
          },
        ],
      },
      {
        heading: "Language",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia, one of the countries with ancient civilization, has its own alphabetic characters and numerical systems. Its alphabets fully depict any sound that there is no consonant and vowel distinction in the writing system. Just an alphabet represents a sound.",
          },
          {
            type: "paragraph",
            text: "Ethiopia is a land of enormous ethnic diversity and as a result Ethiopia has more than 80 languages and over 200 dialects. Amharic or Amharigna is the working language of Ethiopia. The working languages of the national/regional governments may differ according to regions. Other languages with considerably wide speakers are Oromifa, Somiligna, Tigrigna, Sidamigna, Afari, etc.",
          },
        ],
      },
      {
        heading: "Religion",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia has all the three worldly dominant religions: Christianity, Muslim and Jewish religions, though the number is getting less and less in case of the last one. This time the most dominant religions are Christianity and Muslim. Among christians there are distinctions including Orthodox Christianity and Protestant Christians. In fact, there are traditional beliefs, too.",
          },
        ],
      },
      {
        heading: "Communications",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia has international airports including in Addis Ababa (Bole International Airport), Dire Dawa, Bahr Dar, Gondar, Lalibela, Axum, Arba Minch, and Mekelle. The national carrier, Ethiopian Airlines, has excellent international reputation and currently flies almost to every corner of the world, having destinations in America, Europe, Africa, Asia and Latin America. The main entry points by road are at Moyale (from Kenya), Humera and Metema (from Sudan), Dewaele (from Djibouti). All have full customs and immigration checks. Humera, Rama, Zalembessa and Bureae entry points from Eritrea.",
          },
        ],
      },
      {
        heading: "Currency and Currency Regulations",
        blocks: [
          {
            type: "paragraph",
            text: "The local currency is the Ethiopian birr. Notes are issued in denominations of 5, 10, 50, 100 and 200 birrs. There are six different coins: 1, 5, 10, 25, 50 cents, and 1 birr. Currency exchange is based on free market and it varies from day to day. There is no limit to the amount of foreign currency that can be imported into Ethiopia, but it must be declared on arrival, using a currency declaration form. Foreign currency may be changed only at authorized banks and hotels. Recently, the Ethiopian government has launched macro-economic reform, and in this regard forex bureaus are expected to be opened and serve based on demand. The currency declaration form will be required by Customs on departure. Visitors may change back any excess birr into foreign currency at the airport before departure.",
          },
        ],
      },
      {
        heading: "Credit cards",
        blocks: [
          {
            type: "paragraph",
            text: "These can be used in some of the larger hotels in Addis Ababa, and major credit cards can be used for flights by Ethiopian Airlines. A number of banks and hotels have ATM machines available and Visa cards can be used at some banks. The Major foreign currencies can be exchanged at banks and foreign exchange bureaus.",
          },
        ],
      },
      {
        heading: "Why is Ethiopia attracting foreign investors?",
        blocks: [],
      },
      {
        heading: "Youth Job Opportunity and Available Labour Force",
        blocks: [
          {
            type: "paragraph",
            text: "Among its populations, more than 70% of them are under the age of 30 while 50% are under the age of 15.",
          },
          {
            type: "paragraph",
            text: "Ethiopia has a highly trained and easy trainable inexpensive labour force. The work culture is promising and companies can benefit from the work ethics and discipline of the youth Ethiopia currently has.",
          },
        ],
      },
      {
        heading:
          "Privatization of state-owned enterprises / newly established Ethiopian Investment Holdings (EIH)",
        blocks: [
          {
            type: "paragraph",
            text: "The EIH advances performance of public commercial assets by utilizing modern management practices, corporate governance standards and public interest protection, while mobilizing new investments through the development of multiple, innovative platforms.",
          },
          {
            type: "paragraph",
            text: "State-owned enterprises such as railway projects, sugar development plants, industrial parks, hotels, Ethio-Telecom, electricity generation projects are either partially or fully privatized. Ethiopian Airlines, Ethiopian Shipping and Logistics Services Enterprise and others are on the pipeline to be privatized.",
          },
        ],
      },
      {
        heading: "Strategic location between Europe and Asia",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia is the gateway to the Middle East, Europe and Asia. In this regard, Ethiopian Airlines is playing a pivotal role connecting Africa with the rest of the world. The country is also the seat of the African Union and the United Nations Economic Commission for Africa in addition to more than 100 Embassies, High Commissions and Consulates of different countries.",
          },
        ],
      },
      {
        heading: "Access to cheap and renewable energy",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia is endowed with abundant renewable energy resources and has a potential to generate over 60,000 megawatts (MW) of electric power from hydroelectric, wind, solar and geothermal sources. Currently Ethiopia is among few countries that provide electric power for companies with cheaper price.",
          },
          {
            type: "paragraph",
            text: "Ethiopia is on the verge of finalizing the Grand Ethiopian Renaissance Dam (GERD) which has the capacity of producing 5150 MW of electric power. The Dam has the potential of lifting millions of Ethiopians out of poverty and raising the standard of living. It will further connect Ethiopia with its neighbours laying the ground for regional economic integration.",
          },
        ],
      },
      {
        heading: "Greater social stability",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia is working towards greater openness and democratic process. Since 2018, a number of measures have been taken which manifested in terms of reconciliation both domestically and in the subregion. The rapprochement with Eritrea on a border dispute that lasted for two decades is an asset for Ethiopia’s continued stability.",
          },
        ],
      },
      {
        heading: "Major holidays in Ethiopia",
        blocks: [
          {
            type: "paragraph",
            text: "Enkutatash (New Year’s Day- September 11/12); Eid al Fitr – the end of Ramadan (variable); Meskel (the finding of the True Cross); Eid al Adha; Genna (Christmas – the birth of Christ); Timkat (Epiphany: Baptism of Christ); Maulid (Birth of the Prophet Mohammed); Adwa Day (commemorating the victory over Italy in 1896); Patriots’ Day (celebrating the end of the five years Italian occupation in 1941); Siklet (Good Friday); Tensai (Easter Sunday); International Labour Day and so on.",
          },
        ],
      },
    ],
  },
  history: {
    slug: "history",
    title: "History",
    pageTitle: "Ethiopia – A Brief History",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia is the oldest independent country in Africa and one of the oldest in the world. The oldest remains of a human ancestor ever found, which have been dated as being some five million years old, were discovered in the Awash Valley in Ethiopia. This puts Ethiopia among the earliest known locations of human presence. Ethiopia is also the first African nation to defeat a European colonial power, at the Battle of Adwa in 1896.",
          },
          {
            type: "paragraph",
            text: "The Greek historian Herodotus, of the fifth century BC, describes ancient Ethiopia in his writings, while the Bible’s Old Testament records the Queen of Sheba’s visit to Jerusalem where “she proved Solomon with hard questions”.",
          },
          {
            type: "paragraph",
            text: "The remains of Queen of Sheba’s palace can still be seen today in Axum, in the province of Tigray, northern Ethiopia. Axum is also home to many other extensive historical sites.",
          },
          {
            type: "paragraph",
            text: "From the 1700s, for roughly 100 years, there was no central power in Ethiopia. This “Era of the Princes” was characterized by the turmoil caused by local rulers competing against each other for power.",
          },
          {
            type: "paragraph",
            text: "Emperor Menelik II reigned from 1889 to 1913, fending off the encroachment of European powers. Italy posed the greatest threat, having begun to colonize Ethiopia. In 1896 Ethiopia defeated Italy at the Battle of Adwa — a defining moment of African resistance to colonialism.",
          },
          {
            type: "paragraph",
            text: "In 1916, the Christian nobility deposed the sitting king, Lij Iyassu and made his predecessor’s, King Menelik II (1889 – 1913), daughter Zewditu, Empress and her cousin, Ras Tafari Makonnen (1892-1975), Regent.",
          },
          {
            type: "paragraph",
            text: "Zewditu died in 1930, after which the regent – adopting the name Haileselassie – became Emperor. His reign was interrupted in 1936 when Italian forces briefly invaded and occupied Ethiopia. Haileselassie was restored with Allied support in 1941.",
          },
          {
            type: "paragraph",
            text: "Haileselassie then reigned until 1974 when he was deposed and a provisional council of soldiers (the Derg, meaning committee) seized power and installed a government which was socialist in name and military in character.",
          },
          {
            type: "paragraph",
            text: "In 1991 Ethiopian Peoples Revolutionary Democratic Front overthrew the Derg and the Transitional Government of Ethiopia (TGE) was set up by the EPRDF and other political parties in the country and a transitional period began.",
          },
          {
            type: "paragraph",
            text: "The Multiparty system was installed in Ethiopia and an election for a 548-member constituent assembly was held in June 1994. This assembly adopted the constitution of the Federal Democratic Republic of Ethiopia.",
          },
          {
            type: "paragraph",
            text: "In 1994, a new constitution was written that formed a bicameral legislature and a judicial system. A general election was held in 1995 to elect the Parliament which also elected Meles Zenawi as Prime Minister.",
          },
          {
            type: "paragraph",
            text: "Following the death of Prime Minister Meles Zenawi in August 2012, Hailemariam Desalegn succeeded him as Prime Minister of the Federal Democratic Republic of Ethiopia and Chairman of the ruling coalition.",
          },
          {
            type: "paragraph",
            text: "Following popular uprisings seeking changes in leadership and reform of the ruling EPRDF coalition, Abiy Ahmed (PhD) was declared Prime Minister on 2 April 2018. The Parliament also appointed Sahle-Work Zewde as President.",
          },
          {
            type: "paragraph",
            text: "Prime Minister Abiy further expanded his effort to bring peace in the region and brought to an end the 20 years stalemate with Eritrea and signing a peace agreement. He was later awarded the 2019 Nobel Peace Prize.",
          },
          {
            type: "paragraph",
            text: "In conclusion, Ethiopia is Africa’s oldest independent country and one of the fastest growing economies, the second most populous country in Africa with a population of over 120 million.",
          },
          {
            type: "paragraph",
            text: "Since Prime Minister Abiy Ahmed came to power, the government introduced a home-grown economic reform and growth policy at the centre of which is private ownership through privatization of state-owned enterprises and opening key sectors of the economy to foreign investment.",
          },
        ],
      },
    ],
  },
  government: {
    slug: "government",
    title: "Government",
    pageTitle: "Government",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia follows a multi-party democratic political system and the federal government system with legislative authority resting with the government headed by an executive Prime Minister and the elected Parliament, while the President serves as Head of State.",
          },
        ],
      },
      {
        heading: "Capital City",
        blocks: [
          {
            type: "paragraph",
            text: "Addis Ababa, one of the two chartered cities in the Federation, is the seat of the Federal Government. It is the largest city in the country with an estimated population in millions. It lies on the central highlands.",
          },
          {
            type: "paragraph",
            text: "Addis Ababa, founded in 1887, is a host to the African Union (AU), to the United Nations Economic Commission for Africa (ECA), and also, it’s a home to numerous Embassies and Consulates, making it a key diplomatic hub of Africa.",
          },
        ],
      },
      {
        heading: "The Council of Ministers",
        blocks: [
          {
            type: "paragraph",
            text: "According to Article 76 of the Constitution of the Federal Democratic Republic of Ethiopia, the Council of Ministers is accountable to the Prime Minister. In all its decisions, the Council of Ministers is collectively responsible.",
          },
          {
            type: "paragraph",
            text: "Per Proclamation No. 1097/2018, defining the power and duties of the executive organs of the Federal Democratic Republic of Ethiopia, federal ministries are established under the Council.",
          },
          {
            type: "officials",
            items: [
              { role: "President", name: "H.E. Ambassador Taye Atske-Selassie" },
              { role: "Prime Minister", name: "H.E. Abiy Ahmed Ali (PhD)" },
              {
                role: "Speaker of the House of People's Representatives",
                name: "H.E. Tagese Chafo",
              },
              { role: "Deputy Prime Minister", name: "H.E. Temesgen Tiruneh" },
              { role: "Ministry of Peace", name: "H.E. Binalf Andualem" },
              {
                role: "Ministry of National Defense",
                name: "H.E. Ayisha Mohammed",
              },
              {
                role: "Ministry of Foreign Affairs",
                name: "H.E. Gedion Timothewos Hessebon (SJD)",
              },
              { role: "Ministry of Finance", name: "H.E. Ahmed Shide" },
              { role: "Ministry of Justice", name: "H.E. Hana Arayaslase" },
              {
                role: "Ministry of Agriculture",
                name: "H.E. Girma Amente (PhD)",
              },
              { role: "Ministry of Industry", name: "H.E. Melaku Alebel" },
              {
                role: "Ministry of Innovation and Technology",
                name: "H.E. Bellete Molla",
              },
              { role: "Ministry of Tourism", name: "H.E. Selamawit Kassa" },
              {
                role: "Ministry of Transport and Logistics",
                name: "H.E. Dr. Alemu Sime",
              },
              {
                role: "Ministry of Urban and Infrastructure Development",
                name: "H.E. Chaltu Sani",
              },
              {
                role: "Ministry of Trade and Regional Integration",
                name: "H.E. Kassahun Gofe (PhD)",
              },
              {
                role: "Ministry of Water and Energy",
                name: "H.E. Dr. Eng. Habtamu Itefa",
              },
              {
                role: "Ministry of Mine",
                name: "H.E. Engineer Habtamu Tegegne",
              },
              {
                role: "Ministry of Education",
                name: "H.E. Birhanu Nega (PhD)",
              },
              { role: "Ministry of Health", name: "H.E. Dr. Mekdes Daba" },
              {
                role: "Ministry of Women and Social Affairs",
                name: "H.E. Ergogie Tesfaye (PhD)",
              },
              {
                role: "Ministry of Labor Skill",
                name: "H.E. Muferiat Kamil",
              },
              {
                role: "Ministry of Culture and Sport",
                name: "H.E. Shewit Shanka",
              },
              { role: "Ministry of Revenues", name: "H.E. Aynalem Nigusie" },
              {
                role: "Ministry of Plan and Development",
                name: "H.E. Fitsum Assefa (PhD)",
              },
              {
                role: "Ministry of Irrigation and Lowlands",
                name: "H.E. Abraham Belay (PhD)",
              },
            ],
          },
        ],
      },
      {
        heading: "Regional State Governments with Capitals and Two City Administrations",
        blocks: [
          {
            type: "regions",
            items: [
              { name: "Afar Regional State", capital: "Semera" },
              { name: "Amhara Regional State", capital: "Bahr-Dar" },
              { name: "Benishangul Gumuz", capital: "Asossa" },
              { name: "Gambella Regional State", capital: "Gambella" },
              { name: "Harari Regional State", capital: "Harari" },
              {
                name: "Oromia Regional State",
                capital: "Finfinnee (Addis Ababa)",
              },
              { name: "Somali Regional State", capital: "Jijiga" },
              { name: "SNNP Regional State", capital: "Hawassa" },
              { name: "Tigray Regional State", capital: "Mekelle" },
              { name: "Sidama Regional State", capital: "Hawassa" },
              { name: "Addis Ababa City Administration", capital: "Addis Ababa" },
              {
                name: "Dire-Dawa City Administration",
                capital: "Dire-Dawa",
              },
            ],
          },
        ],
      },
    ],
  },
  culture: {
    slug: "culture",
    title: "Culture",
    pageTitle: "Culture",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia has a diverse mix of ethnic and linguistic backgrounds. It is a country with more than 80 different ethnic groups each with its own language, culture, custom and tradition. One of the most significant areas of Ethiopian culture is its literature, the ancient language Ge’ez, modern Amharic languages.",
          },
          {
            type: "paragraph",
            text: "Ge’ez is one of the most ancient languages in the world and is still used today by the Ethiopian Orthodox Tewahedo Church. The Ethiopian Orthodox Tewahedo Church has its own unique customs and traditions.",
          },
        ],
      },
      {
        heading: "Costume",
        blocks: [
          {
            type: "paragraph",
            text: "The Ethiopian traditional costume is made of woven cotton. Ethiopian men and women wear this traditional costume called gabbi or Netella. Women often wear dresses (Kemis) and netella with borders of coloured embroidered woven crosses, but other designs are also used.",
          },
          {
            type: "paragraph",
            text: "Ethiopia is a country rich in cultural diversity, and this is reflected in the wide variety of traditional clothing styles found across the nation. Each ethnic group in Ethiopia has its own unique attire, often characterized by specific patterns, colors, and materials that carry cultural significance.",
          },
          {
            type: "paragraph",
            text: "The traditional outfits are often worn during cultural celebrations, weddings, and religious ceremonies, serving as a proud expression of Ethiopia’s rich heritage and diversity. The variation in styles across different regions and ethnic groups highlights the country’s deep cultural roots and the importance of tradition in Ethiopian society.",
          },
        ],
      },
      {
        heading: "Food and Drinks",
        blocks: [
          {
            type: "paragraph",
            text: "The national dish for most Ethiopians is injera, a flat, sour dough pancake made from a special grain called teff, which is served with either meat or vegetable sauces. Ethiopians eat these injera by tearing off a bit of injera and uses it to pick up pieces of meat or mop up the sauce. Berbere, the blend of spices which gives Ethiopian food its characteristic taste.",
          },
          {
            type: "paragraph",
            text: "When eating national food Ethiopians eat together, off one large circular plate. Visitors and guests will have choice morsels and pieces of meat placed in front of them, and when eating doro wot, chicken stew, the pieces of meat are eaten last, after filling up on injera and sauce. You eat with your right hand, and should always wash your hands before eating.",
          },
          {
            type: "paragraph",
            text: "Vegetarians should try “fasting food”, what Orthodox Christians eat during fasting periods, and which is free of meat and animal products. Ethiopian Orthodox Tewahedo Christians do not eat meat and diary products (i.e. egg, butter, milk, and cheese) on Wednesdays and Fridays except the 50 days between Easter and Pentecost, the Fast of the Prophets, the fast of Nineveh, Lent, the Fast of the Apostles and the fast of the Holy Virgin Mary. According to the Ethiopian Orthodox Tewahedo Church belief, the faithful must abstain from eating meat and diary products to attain forgiveness of sins committed during the year, and undergo a rigorous schedule of prayers and atonement. Ethiopian Orthodox Tewahedo Christians, Jews and Muslims do not eat pork as it is forbidden by their religious beliefs.",
          },
          {
            type: "paragraph",
            text: "The favourite drink of many Ethiopians is bunna (coffee). Bunna is drunk in Ethiopia in a unique and traditional way known as a “coffee ceremony”. First the coffee is roasted, then ground and placed in a Jebena (coffee pot) with boiling water. When ready it is then served to people in little cups, up to three times per ceremony.",
          },
          {
            type: "paragraph",
            text: "Other locally produced beverages are tella (a local beer made from grain), tej (honey wine), and kati kala (distilled liquor), which are served and drunk on major religious festivals, Saints Days and weddings. Tella and tej are also sold by numerous designated commercial houses all over the country. Ethiopia also produces its own wines like Dukam, Goudar, and Axumite.",
          },
        ],
      },
    ],
  },
  economy: {
    slug: "economy",
    title: "Economy",
    pageTitle: "Economy",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Currently, Ethiopia is pursuing a homegrown economic reform agenda, and blueprint to expedite the economic progress of the country. This agenda is designed taking our successes into account through an in-depth review of key bottlenecks and designing adequate remedy outlines of macro-economic, structural, and sectoral reforms that will pave the path for job creation and inclusive growth.",
          },
          {
            type: "paragraph",
            text: "Hand in hand with the homegrown economic reform agenda, Ethiopia has launched the encouraging business initiative in order to improve the investment climate. This improvement is the main part of Ethiopia’s New Horizon of Hope Action Plan for Job creation. Beyond having a demographic dividend, demand, and committed government, in the past two decades Ethiopia has made a considerable investment in physical infrastructure.",
          },
          {
            type: "paragraph",
            text: "The horizon of possibilities for businesses could be expanded by a smart approach through regulation that keeps the equilibrium of efficiency and promotion of legitimate policy objectives. Prioritized policy, regulatory and administrative reforms that lowered unjustified costs, increased investment, business formation, and greater productivity will be addressed by the initiative.",
          },
          {
            type: "paragraph",
            text: "Recently, Ethiopia has initiated significant economic reforms, including the opening up of telecom services to private foreign corporations like Safaricom. Additionally, the country is in the process of liberalizing its financial markets, which includes enabling foreign commercial banks to establish operations within Ethiopia. These measures are part of broader efforts to attract foreign investment and stimulate economic growth.",
          },
        ],
      },
    ],
  },
  tourism: {
    slug: "tourism",
    title: "Tourism",
    pageTitle: "Tourism",
    sections: [
      {
        heading: "Topography and Sceneries of Ethiopia",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia has an abundant range of natural habitats, ranging from the extraordinary peaks and ambas (flat-topped summits) of the Simien Mountains at over 4,000 meters to the Danakil Depression, 120 meters below sea-level which is one of the lowest points as well as the hottest place on Earth. There are many more attractive natural sceneries including Afro-Alpine highlands, moors, and mountains, deep gorges, the Sof Omar caves (the most extensive in Africa), the Great Rift Valley and its many lakes, tropical rain forests, white-water rivers, and rock-climbing faces, savannahs, waterfalls, volcanic hot springs and volcanos.",
          },
          {
            type: "paragraph",
            text: "These are supplemented by a wealth of historic, cultural, religious, archaeological, and anthropological sites, including the northern “historic route” which incorporates Fasil Castle, the former capitals of Gondar (17and 18th centuries), Axum (1st-8th centuries), and Lalibela (12th-13th centuries) with its spectacular rock-hewn churches, as well as the monasteries on Lake Tana, the Blue Nile falls, and the numerous rock churches of Tigray region, many dating back to the 14-16th centuries, or even earlier.",
          },
          {
            type: "paragraph",
            text: "The National Museum of Ethiopia holds the earliest hominid skeletons of Lucy (3.4 million years old) and Ramidus (4.4 million years old), as well as jewellery, costumes, paintings, and sculptures. The Ethnographic Museum of the Institute of Ethiopian Studies is on the site of the former imperial palace of Emperor Haile Selassie and is now part of Addis Ababa University. The Zoological Natural History Museum has displays of Ethiopia’s wealth of wildlife, including many examples of the country’s endemic species of rodents, bats, carnivores, primates, birds, snakes, lizards, amphibians, fishes, and invertebrates. There are a number of church museums in the city with fascinating wall paintings.",
          },
          {
            type: "paragraph",
            text: "The Ethiopian Postal Museum has a collection of the country’s stamps, the Addis Ababa Museum in the former palace of Ras Biru built at the turn of the 19th century has a collection of photographs depicting the development of the city, and the nearby Red Terror Museum contains details of the disastrous Red Terror conducted from 1977-78. The city has a number of parks including the Lion Park with its rare Black-maned Lions near Addis Ababa University, the country’s oldest University at Sedist Kilo.",
          },
          {
            type: "paragraph",
            text: "Ethiopia has been expanding its offerings for tourists, blending its rich historical heritage with new attractions that cater to both local and international visitors. Several tourist destination development programs have been initiated by His Excellency Dr. Abiy Ahmed (PhD), the Prime Minister of Ethiopia, both in Addis Ababa and across the regions. In Addis Ababa, some key projects include Unity Park, Entoto Park, Friendship Park I, Friendship Park II, the Ethiopian Science Museum, and the Adwa Victory Memorial. In the Amhara region, the Gorgora Eco Resort is a significant development, while the Southwest Region boasts the Halala Kella Eco Lodge and Chebera Elephant Paw Lodge, and the Oromia region features the Wanchi Ija Eco Lodge. These are just a few examples, as many more destinations are under construction in regions such as Somali, Tigray, and Sidama, further enhancing Ethiopia’s tourism infrastructure.",
          },
        ],
      },
      {
        heading: "World Heritage Sites",
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia now has twelve UNESCO recognized World Heritage Sites, reflecting the country’s rich historical, cultural and natural heritage potential. With 12 UNESCO World Heritage Site, Ethiopia is among the countries with the most recognised sites in Africa. These sites span a wide range of interests, from ancient civilizations and religious significance to unique landscape and biodiversity.",
          },
          {
            type: "paragraph",
            text: "Some Cultural and Natural Tourist sites (Tangible Heritages) include:",
          },
          {
            type: "bullets",
            items: [
              "Aksum (1980)",
              "Simien National Park (1978)",
              "Fasil Ghebbi, Gondar Region (1979)",
              "Harar Jugol, the Fortified Historic Town (2006)",
              "Konso Cultural Landscape (2011)",
              "Lower Valley of the Awash (1980)",
              "Lower Valley of the Omo (1980)",
              "Melka Kunture and Balchit: Archaeological and Palaeontological Sites in the Highland Area of Ethiopia (2024)",
              "Rock-Hewn Churches, Lalibela (1978)",
              "The Gedeo Cultural Landscape (2023)",
              "Tiya (1980)",
              "Bale Mountains National Park (2023)",
            ],
          },
          {
            type: "paragraph",
            text: "There are a lot of intangible heritages recognized by UNESCO, like:",
          },
          {
            type: "bullets",
            items: [
              "Fichee-Chambalaalla, New Year festival of the Sidama people (2015)",
              "Ethiopian epiphany (Timket) (2019)",
              "Commemoration feast of the finding of the True Holy Cross of Christ (Meskel) (2013)",
              "Gada system, an indigenous democratic socio-political system of the Oromo (2016)",
              "Shuwalid festival (2023)",
            ],
          },
        ],
      },
    ],
  },
  "diplomatic-hub-of-africa": {
    slug: "diplomatic-hub-of-africa",
    title: "Diplomatic Hub of Africa",
    pageTitle: "Addis Ababa: Diplomatic Hub of Africa",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia is often referred to as the “Diplomatic Hub of Africa,” a title that reflects its significant role in regional and international diplomacy. This status is largely centred around its capital, Addis Ababa, which hosts numerous key diplomatic institutions and organizations. Key Reasons for the Title “Diplomatic Hub of Africa”, among others include:",
          },
          {
            type: "bullets",
            items: [
              "Headquarters of the African Union (AU): Addis Ababa is the home of the African Union, the premier continental organization that plays a crucial role in promoting unity and cooperation among African states.",
              "United Nations Economic Commission for Africa (UNECA): UNECA is headquartered in Addis Ababa and serves as the UN’s regional body focused on promoting economic and social development across Africa.",
              "Diplomatic Presence: Ethiopia hosts one of the largest diplomatic communities in the world, with embassies and consulates from countries across the globe. These dense diplomatic network supports Ethiopia’s role as a centre for international relations and negotiations in Africa.",
              "International Conferences and Summits: Addis Ababa regularly hosts high-level international meetings, including AU summits, UN conferences, and other regional and global forums. These events reinforce its role as a centre for diplomatic activity on the continent.",
            ],
          },
        ],
      },
    ],
  },
  "the-embassy-profile": {
    slug: "the-embassy-profile",
    title: "The Embassy Profile",
    pageTitle: "The Embassy Profile",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "The Embassy of the Federal Democratic Republic of Ethiopia in London represents Ethiopia in the United Kingdom. It works to strengthen political, economic, cultural, and people-to-people ties between Ethiopia and the UK.",
          },
          {
            type: "paragraph",
            text: "Located at 17 Princes Gate, London SW7 1PZ, the mission provides consular services for Ethiopian nationals and partners of Ethiopia, while promoting trade, investment, tourism, and diaspora engagement.",
          },
          {
            type: "paragraph",
            text: "The Embassy supports official visits, public diplomacy, and community outreach across the United Kingdom, and maintains close coordination with the Ministry of Foreign Affairs of Ethiopia.",
          },
        ],
      },
    ],
  },
  "diaspora-policy": {
    slug: "diaspora-policy",
    title: "Diaspora Policy",
    pageTitle: "Diaspora Policy",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Ethiopia’s diaspora policy encourages Ethiopians and foreign nationals of Ethiopian origin living abroad to contribute to national development through investment, knowledge transfer, cultural connection, and civic engagement.",
          },
          {
            type: "paragraph",
            text: "The London Embassy works closely with diaspora communities across the United Kingdom to facilitate consular services, partnerships, and opportunities that strengthen the bond between Ethiopia and its global citizens.",
          },
          {
            type: "paragraph",
            text: "Programmes linked to the diaspora agenda include support for the Ethiopian Origin ID Card (Yellow Card), investment facilitation, and community events that celebrate Ethiopian culture and identity in the UK.",
          },
        ],
      },
    ],
  },
  gerd: {
    slug: "gerd",
    title: "GERD",
    pageTitle: "Grand Ethiopian Renaissance Dam (GERD)",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "The Grand Ethiopian Renaissance Dam (GERD) is Ethiopia’s flagship hydropower project on the Blue Nile (Abay). With a planned generation capacity of approximately 5,150 MW, it is one of the largest hydroelectric schemes in Africa.",
          },
          {
            type: "paragraph",
            text: "GERD is central to Ethiopia’s renewable energy ambitions, poverty reduction goals, and regional economic integration — enabling clean power for domestic industry and households, and potential electricity trade with neighbouring countries.",
          },
          {
            type: "paragraph",
            text: "Financed primarily through domestic resources and public contribution, GERD symbolises national mobilisation for development. The Embassy provides information and updates on the project as part of its public diplomacy work in the United Kingdom.",
          },
        ],
      },
    ],
  },
  "yellow-card": {
    slug: "yellow-card",
    title: "Ethiopian Origin ID Card (Yellow Card)",
    pageTitle: "Ethiopian Origin ID Card (Yellow Card)",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "The Ethiopian Origin ID Card (Yellow Card) is issued through the Embassy of Ethiopia in London for foreign nationals of Ethiopian origin. Please read the requirements carefully and book an appointment before visiting.",
          },
        ],
      },
      {
        heading:
          "1. New Ethiopian Origin Identity Card (Including Those Who Have Previously Held a Yellow Card)",
        blocks: [
          {
            type: "bullets",
            items: [
              "Certified birth certificate from the Ministry of Foreign Affairs of Ethiopia (UK birth certificates must be certified by a UK-authorized document verification agency)",
              "Proof of immediate family relationship (unexpired parent’s Kebele ID, birth certificate, or other proof of relationship)",
              "Copy of the Ethiopian passport (if the applicant was a former Ethiopian citizen)",
              "Copy of current passport",
              "Death certificate certified by the Ministry of Foreign Affairs if the parent is deceased",
              "Proof of education (at least in one of the grades) in Ethiopia",
              "Two 3×4 photographs",
              "Applicant must appear in person",
              "Payment of service fee",
              "If applicant is a minor: certified birth certificate and evidence for parent’s identity",
              "If the applicant is adopted: adoption documents and appearance in person",
            ],
          },
        ],
      },
      {
        heading: "2. Ethiopian Origin Identity Card Renewal",
        blocks: [
          {
            type: "bullets",
            items: [
              "Applicant must appear in person and fill out the renewal form",
              "Copy of expired Ethiopian National Identity Card",
              "Copy of passport",
              "Two 3×4 photographs",
              "Payment of service fee",
            ],
          },
        ],
      },
      {
        heading: "3. Lost Ethiopian Origin Identity Card",
        blocks: [
          {
            type: "bullets",
            items: [
              "Police report",
              "Appearance in person",
              "Copy of passport",
              "Two 3×4 photographs",
              "If available, copy or identity number of the lost birth certificate",
            ],
          },
        ],
      },
      {
        heading: "4. Ethiopian Origin Identity Card Correction",
        blocks: [
          {
            type: "bullets",
            items: [
              "Appearance in person",
              "Copy of identity card",
              "Two 3×4 photographs",
              "Court decision for name changes or certified marriage certificate (if the name change was due to marriage)",
              "Copy of passport (denoting current nationality)",
              "Birth certificate certified by the Ministry of Foreign Affairs of Ethiopia for spelling, date, or place of birth correction",
            ],
          },
        ],
      },
      {
        heading: "5. Ethiopian Origin Identity Card for Spouse",
        blocks: [
          {
            type: "bullets",
            items: [
              "Certified marriage certificate by the Ministry of Foreign Affairs of Ethiopia",
              "Applicant’s passport",
              "Spouse’s Ethiopian Origin ID (unexpired)",
              "Two 3×4 photographs",
              "Application letter from the Ethiopian-origin spouse",
              "Both applicant and spouse must appear in person",
            ],
          },
        ],
      },
      {
        heading: "6. Ethiopian Identity Card for Those Under 18 Years",
        blocks: [
          {
            type: "bullets",
            items: [
              "Certified birth certificate from the Ministry of Foreign Affairs of Ethiopia",
              "Copy of parent’s valid Ethiopian identity card",
              "Copy of parent’s passport",
              "Two 3×4 photographs",
              "Applicant’s passport",
              "Copy of child’s valid Ethiopian passport or residence permit if the parent is Ethiopian",
            ],
          },
        ],
      },
    ],
  },
};
