import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import { consularPages } from "@/lib/content/consular";

const page = consularPages["lassiez-passer"];

export const metadata = makeConsularMetadata(page.title);

export default function LassiezPasserPage() {
  return <ConsularPageShell page={page} currentHref="/lassiez-passer" />;
}
