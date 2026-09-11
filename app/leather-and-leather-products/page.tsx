import {
  InvestmentSectorPage,
  makeInvestmentMetadata,
} from "@/components/InvestmentPageShell";
import { getInvestmentSector } from "@/lib/content/investment";
import { notFound } from "next/navigation";

const sector = getInvestmentSector("leather-and-leather-products");

export const metadata = makeInvestmentMetadata(
  sector?.title ?? "Leather Products",
);

export default function LeatherPage() {
  if (!sector) notFound();
  return <InvestmentSectorPage sector={sector} />;
}
