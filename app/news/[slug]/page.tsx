import { notFound } from "next/navigation";
import NewsArticleShell, {
  makeNewsMetadata,
} from "@/components/NewsArticleShell";
import {
  getNewsPostBySlug,
  listNewsPosts,
  toNewsArticle,
} from "@/lib/cms/news";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await listNewsPosts({ publishedOnly: true });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug, { publishedOnly: true });
  if (!post) return { title: "News" };
  return makeNewsMetadata(toNewsArticle(post));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug, { publishedOnly: true });
  if (!post) notFound();
  const article = toNewsArticle(post);
  const related = (await listNewsPosts({ publishedOnly: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
    .map(toNewsArticle);
  return <NewsArticleShell article={article} related={related} />;
}
