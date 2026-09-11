import {
  InvestmentSectorPage,
  makeInvestmentMetadata,
} from "@/components/InvestmentPageShell";
import { getInvestmentSector } from "@/lib/content/investment";
import { notFound } from "next/navigation";

const sector = getInvestmentSector("invest-in-ethiopia");

export const metadata = makeInvestmentMetadata(
  sector?.title ?? "Invest in Ethiopia",
);

export default function InvestInEthiopiaPage() {
  if (!sector) notFound();
  return <InvestmentSectorPage sector={sector} />;
}
