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
    "health",
    "bible-sop",
    article
  );

  if (!content) {
    notFound();
  }

  const navigation = getArticleNavigation(
    "health",
    "bible-sop",
    article
  );

  return (
    <StudyLayout
      title={content.title ?? ""}
      heroImage={content.heroImage ?? ""}
      theme="health"
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