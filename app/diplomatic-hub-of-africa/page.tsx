import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages["diplomatic-hub-of-africa"];

export const metadata = makeAboutMetadata(page.title);

export default function DiplomaticHubPage() {
  return (
    <AboutEthiopiaShell page={page} currentHref="/diplomatic-hub-of-africa" />
  );
}
