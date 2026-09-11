import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import { consularPages } from "@/lib/content/consular";

const page = consularPages["shipping-human-remains"];

export const metadata = makeConsularMetadata(page.title);

export default function ShippingHumanRemainsPage() {
  return (
    <ConsularPageShell page={page} currentHref="/shipping-human-remains" />
  );
}
