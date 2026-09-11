import {
  InvestmentSectorPage,
  makeInvestmentMetadata,
} from "@/components/InvestmentPageShell";
import { getInvestmentSector } from "@/lib/content/investment";
import { notFound } from "next/navigation";

const sector = getInvestmentSector("mining");

export const metadata = makeInvestmentMetadata(sector?.title ?? "Mining");

export default function MiningPage() {
  if (!sector) notFound();
  return <InvestmentSectorPage sector={sector} />;
}
