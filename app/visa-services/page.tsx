import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import { consularPages } from "@/lib/content/consular";

const page = consularPages["visa-services"];

export const metadata = makeConsularMetadata(page.title);

export default function VisaServicesPage() {
  return <ConsularPageShell page={page} currentHref="/visa-services" />;
}
