import { notFound } from "next/navigation";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";
import StudyIndexList from "@/src/components/content/StudyIndexList";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";
import { getPublicContentList } from "@/src/lib/content/getPublicContentList";
import { getPublicContentMetadata } from "@/src/lib/content/getPublicContentMetadata";
import { contentCategoryMetadata } from "@/src/config/contentCategoryMetadata";

type StudyTheme = "bible" | "health" | "family";

const sectionThemes: Record<string, StudyTheme> = {
  "bible-study": "bible",
  health: "health",
  family: "family",
};

function formatCategoryTitle(category: string): string {
  return category
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getDefaultHeroImage(section: string): string {
  return `/images/${section}/default.jpg`;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    section: string;
    category: string;
  }>;
}) {
  const { section, category } = await params;

  const normalizedSection = section.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();

  const [publicMetadata, studies] = await Promise.all([
    getPublicContentMetadata(),
    getPublicContentList({
      section: normalizedSection as ManagedContentSection,
      category: normalizedCategory,
    }),
  ]);

  const sectionMetadata = publicMetadata.find(
    (item) => item.slug.trim().toLowerCase() === normalizedSection,
  );

  const managedCategory = sectionMetadata?.categories.find(
    (item) => item.slug.trim().toLowerCase() === normalizedCategory,
  );

  const staticMetadata =
    contentCategoryMetadata[normalizedSection]?.[normalizedCategory];

  // Only render categories that exist in metadata or have published content.
  if (!managedCategory && !staticMetadata && studies.length === 0) {
    notFound();
  }

  const title =
    staticMetadata?.title ??
    managedCategory?.name ??
    formatCategoryTitle(normalizedCategory);

  const heroImage =
    managedCategory?.heroImage ??
    staticMetadata?.heroImage ??
    getDefaultHeroImage(normalizedSection);

  // Preserve built-in themes and use the Bible theme for custom sections.
  const categoryTheme = staticMetadata?.theme ??
    sectionThemes[normalizedSection] ??
    "bible";

  return (
    <StudyIndexLayout
      title={title}
      heroImage={heroImage}
      theme={categoryTheme}
      heroQuote={staticMetadata?.heroQuote}
    >
      <StudyIndexList
        studies={studies}
        section={normalizedSection}
        category={normalizedCategory}
      />
    </StudyIndexLayout>
  );
}