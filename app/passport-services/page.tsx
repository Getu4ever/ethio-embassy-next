import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import { consularPages } from "@/lib/content/consular";

const page = consularPages["passport-services"];

export const metadata = makeConsularMetadata(page.title);

export default function PassportServicesPage() {
  return <ConsularPageShell page={page} currentHref="/passport-services" />;
}
