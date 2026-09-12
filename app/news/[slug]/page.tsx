import { notFound } from "next/navigation";
import NewsArticleShell, {
  makeNewsMetadata,
} from "@/components/NewsArticleShell";
import {
  getAllNewsSlugs,
  getNewsArticle,
} from "@/lib/content/news";

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return { title: "News" };
  return makeNewsMetadata(article);
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();
  return <NewsArticleShell article={article} />;
}
