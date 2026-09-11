import {
  InvestmentSectorPage,
  makeInvestmentMetadata,
} from "@/components/InvestmentPageShell";
import { getInvestmentSector } from "@/lib/content/investment";
import { notFound } from "next/navigation";

const sector = getInvestmentSector("textiles");

export const metadata = makeInvestmentMetadata(
  sector?.title ?? "Textile & Garment",
);

export default function TextilesPage() {
  if (!sector) notFound();
  return <InvestmentSectorPage sector={sector} />;
}
