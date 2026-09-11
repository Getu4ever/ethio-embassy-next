import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages.government;

export const metadata = makeAboutMetadata(page.title);

export default function GovernmentPage() {
  return <AboutEthiopiaShell page={page} currentHref="/government" />;
}
