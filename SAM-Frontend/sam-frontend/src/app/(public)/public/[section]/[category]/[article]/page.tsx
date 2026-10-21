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

const theme = sectionThemes[section];

// Only sections supported by StudyLayout are valid here.
if (!theme) {
notFound();
}

const content = await getArticle(
section as ManagedContentSection,
category,
article
);

if (!content) {
notFound();
}

const navigation = await getArticleNavigation(
section,
category,
article
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
/> </StudyLayout>
);
}
