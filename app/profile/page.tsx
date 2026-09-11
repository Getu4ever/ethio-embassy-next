import {
  AboutEthiopiaShell,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";

const page = aboutEthiopiaPages.profile;

export const metadata = makeAboutMetadata(page.title);

export default function ProfilePage() {
  return <AboutEthiopiaShell page={page} currentHref="/profile" />;
}
