import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages.tourism;

export const metadata = makeAboutMetadata(page.title);

export default function TourismPage() {
  return <AboutEthiopiaShell page={page} currentHref="/tourism" />;
}
