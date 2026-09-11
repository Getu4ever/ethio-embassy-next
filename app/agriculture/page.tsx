import {
  InvestmentSectorPage,
  makeInvestmentMetadata,
} from "@/components/InvestmentPageShell";
import { getInvestmentSector } from "@/lib/content/investment";
import { notFound } from "next/navigation";

const sector = getInvestmentSector("agriculture");

export const metadata = makeInvestmentMetadata(sector?.title ?? "Agriculture");

export default function AgriculturePage() {
  if (!sector) notFound();
  return <InvestmentSectorPage sector={sector} />;
}
