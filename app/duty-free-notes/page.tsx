import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import { consularPages } from "@/lib/content/consular";

const page = consularPages["duty-free-notes"];

export const metadata = makeConsularMetadata(page.title);

export default function DutyFreeNotesPage() {
  return <ConsularPageShell page={page} currentHref="/duty-free-notes" />;
}
