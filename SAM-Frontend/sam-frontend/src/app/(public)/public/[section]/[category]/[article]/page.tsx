import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import StudyLayout from "@/src/components/layouts/StudyLayout";
import Quote from "@/src/components/ui/Quote";
import PrayerRequestForm from "@/src/components/forms/PrayerRequestForm";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";
import { getArticle } from "@/src/lib/content/getArticle";
import { getArticleNavigation } from "@/src/lib/content/getArticleNavigation";

type StudyTheme = "bible" | "health" | "family";

const sectionThemes: Record<string, StudyTheme> = {
  "bible-study": "bible",
  health: "health",
  family: "family",
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{
    section: string;
    category: string;
    article: string;
  }>;
}) {
  const { section, category, article } = await params;

  const normalizedSection = section.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedArticle = article.trim().toLowerCase();

  const theme = sectionThemes[normalizedSection] ?? "bible";

  const content = await getArticle(
    normalizedSection as ManagedContentSection,
    normalizedCategory,
    normalizedArticle,
  );

  if (!content) {
    notFound();
  }

  const navigation = await getArticleNavigation(
    normalizedSection,
    normalizedCategory,
    normalizedArticle,
  );

  return (
    <StudyLayout
      title={content.title ?? ""}
      heroImage={content.heroImage ?? ""}
      theme={theme}
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