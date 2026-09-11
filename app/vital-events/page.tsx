import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import { consularPages } from "@/lib/content/consular";

const page = consularPages["vital-events"];

export const metadata = makeConsularMetadata(page.title);

export default function VitalEventsPage() {
  return <ConsularPageShell page={page} currentHref="/vital-events" />;
}
