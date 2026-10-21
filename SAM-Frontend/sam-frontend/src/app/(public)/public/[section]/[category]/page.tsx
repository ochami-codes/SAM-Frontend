import { notFound } from "next/navigation";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";
import StudyIndexList from "@/src/components/content/StudyIndexList";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";
import { getPublicContentList } from "@/src/lib/content/getPublicContentList";
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
.map(
(word) =>
word.charAt(0).toUpperCase() + word.slice(1)
)
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

const theme = sectionThemes[section];

if (!theme) {
notFound();
}

const metadata = contentCategoryMetadata[section]?.[category];

const studies = await getPublicContentList({
section: section as ManagedContentSection,
category,
});

// Unknown categories without published content are not valid pages.
if (!metadata && studies.length === 0) {
notFound();
}

const title = metadata?.title ?? formatCategoryTitle(category);
const heroImage =
metadata?.heroImage ?? getDefaultHeroImage(section);

return (
<StudyIndexLayout
title={title}
heroImage={heroImage}
theme={metadata?.theme ?? theme}
heroQuote={metadata?.heroQuote}
> <StudyIndexList
     studies={studies}
     section={section}
     category={category}
   /> </StudyIndexLayout>
);
}
