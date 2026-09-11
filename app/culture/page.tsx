import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages.culture;

export const metadata = makeAboutMetadata(page.title);

export default function CulturePage() {
  return <AboutEthiopiaShell page={page} currentHref="/culture" />;
}
