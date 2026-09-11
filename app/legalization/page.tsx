import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import { consularPages } from "@/lib/content/consular";

const page = consularPages.legalization;

export const metadata = makeConsularMetadata(page.title);

export default function LegalizationPage() {
  return <ConsularPageShell page={page} currentHref="/legalization" />;
}
