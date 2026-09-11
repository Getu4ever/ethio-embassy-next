import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import { consularPages } from "@/lib/content/consular";

const page = consularPages["criminal-record"];

export const metadata = makeConsularMetadata(page.title);

export default function CriminalRecordPage() {
  return <ConsularPageShell page={page} currentHref="/criminal-record" />;
}
