export type FaqItem = {
  question: string;
  answer: string;
};

/** Homepage FAQs — keep answers accurate and visible on the page with matching FAQ schema. */
export const homepageFaqs: FaqItem[] = [
  {
    question: "Where is the Embassy of Ethiopia in London?",
    answer:
      "The Embassy is located at 17 Princes Gate, London SW7 1PZ, in Knightsbridge, United Kingdom.",
  },
  {
    question: "What are the Embassy office hours?",
    answer:
      "The Embassy is open Monday to Friday, 9:00AM–1:00PM and 2:00PM–5:00PM. The Embassy is closed on Saturdays, Sundays, and public holidays.",
  },
  {
    question: "How do I book a consular appointment?",
    answer:
      "You can book an appointment online through the Embassy website booking page for visa, passport, legalization, and other consular services.",
  },
  {
    question: "Which consular services does the Embassy provide?",
    answer:
      "Services include visas, Ethiopian passports, Ethiopian Origin ID (Yellow Card), document authentication and legalization, vital events, criminal record and TIN support, duty-free notes, and related consular assistance.",
  },
  {
    question: "How can I contact the Embassy?",
    answer:
      "You can email london.embassy@mfa.gov.et, call +44 20 7589 7212, or use the Contact Us page on the Embassy website.",
  },
];
