import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Quote from "@/src/components/ui/Quote";
import ArticleLayout from "@/src/components/layouts/ArticleLayout";

import { getArticleBySlug } from "@/src/lib/content/getArticleBySlug";
import { getArticleNavigation } from "@/src/lib/content/getArticleNavigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{
    article: string;
  }>;
}) {
  const { article } = await params;

  const content = await getArticleBySlug(article);

  if (!content) {
    notFound();
  }

  const navigation = getArticleNavigation("articles", article);

  return (
    <ArticleLayout
      title={content.title ?? ""}
      heroImage={content.heroImage ?? ""}
      category={content.category ?? undefined}
      theme="default"
      previous={navigation.previous}
      next={navigation.next}
    >
      <MDXRemote source={content.source}
      components={{Quote}} />
    </ArticleLayout>
  );
}