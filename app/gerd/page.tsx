import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages.gerd;

export const metadata = makeAboutMetadata(page.title);

export default function GerdPage() {
  return <AboutEthiopiaShell page={page} currentHref="/gerd" />;
}
