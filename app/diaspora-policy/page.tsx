import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages["diaspora-policy"];

export const metadata = makeAboutMetadata(page.title);

export default function DiasporaPolicyPage() {
  return <AboutEthiopiaShell page={page} currentHref="/diaspora-policy" />;
}
