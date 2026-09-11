import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages.history;

export const metadata = makeAboutMetadata(page.title);

export default function HistoryPage() {
  return <AboutEthiopiaShell page={page} currentHref="/history" />;
}
