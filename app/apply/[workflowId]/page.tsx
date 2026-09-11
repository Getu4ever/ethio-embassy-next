import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocumentWorkflowWizard from "@/components/consular/DocumentWorkflowWizard";
import { getWorkflow, WORKFLOW_LIST } from "@/lib/consular/workflows";

type Props = { params: Promise<{ workflowId: string }> };

export function generateStaticParams() {
  return WORKFLOW_LIST.map((w) => ({ workflowId: w.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { workflowId } = await params;
  const workflow = getWorkflow(workflowId);
  return {
    title: workflow ? `${workflow.title} — Submit` : "Submit documents",
  };
}

export default async function ApplyWorkflowPage({ params }: Props) {
  const { workflowId } = await params;
  const workflow = getWorkflow(workflowId);
  if (!workflow) notFound();

  return (
    <main>
      <section className="diplomatic-mesh px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Document workflow
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {workflow.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            {workflow.description}{" "}
            <Link
              href={workflow.servicePageHref}
              className="underline decoration-gold/50 underline-offset-4"
            >
              Service guidance
            </Link>
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-3 py-8 sm:px-6 sm:py-12">
        <DocumentWorkflowWizard workflow={workflow} />
      </section>
    </main>
  );
}
