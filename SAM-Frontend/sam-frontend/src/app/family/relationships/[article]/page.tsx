import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import StudyLayout from "../../../../components/layouts/StudyLayout";
import Quote from "../../../../components/ui/Quote";
import PrayerRequestForm from "@/src/components/forms/PrayerRequestForm";

import { getArticle } from "../../../../lib/content/getArticle";
import { getArticleNavigation } from "../../../../lib/content/getArticleNavigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{
    article: string;
  }>;
}) {
  const { article } = await params;

  const content = await getArticle(
    "family",
    "relationships",
    article
  );

  if (!content) {
    notFound();
  }

  const navigation = getArticleNavigation(
    "family",
    "relationships",
    article
  );

  return (
    <StudyLayout
      title={content.title ?? ""}
      heroImage={content.heroImage ?? ""}
      theme="family"
      previous={navigation.previous}
      next={navigation.next}
    >
      <MDXRemote
        source={content.source}
        components={{
          Quote,
          PrayerRequestForm,
        }}
      />
    </StudyLayout>
  );
}