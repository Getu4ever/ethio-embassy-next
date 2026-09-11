import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages.economy;

export const metadata = makeAboutMetadata(page.title);

export default function EconomyPage() {
  return <AboutEthiopiaShell page={page} currentHref="/economy" />;
}
