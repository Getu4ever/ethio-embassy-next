import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages["the-embassy-profile"];

export const metadata = makeAboutMetadata(page.title);

export default function TheEmbassyProfilePage() {
  return (
    <AboutEthiopiaShell page={page} currentHref="/the-embassy-profile" />
  );
}
