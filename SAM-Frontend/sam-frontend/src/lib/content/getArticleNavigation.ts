// getArticleNavigation.ts
import "server-only";

import { contentOrder } from "@/src/config/contentOrder";
import type { ManagedContentSection } from "@/src/lib/api/managedContent";
import { getPublicContentList } from "./getPublicContentList";
import { sortContentByOrder } from "@/src/utils/sortContentByOrder";

interface ContentNavigationItem {
  slug: string;
  href: string;
  order?: number;
}

interface ArticleNavigation {
  previous: ContentNavigationItem | null;
  next: ContentNavigationItem | null;
}

type StaticNavigationItem = {
  slug: string;
  href: string;
  order?: number;
};

type StaticOrderGroup = Record<string, readonly StaticNavigationItem[] | undefined>;

export async function getArticleNavigation(
  section: string,
  studyOrSlug: string,
  currentSlug?: string
): Promise<ArticleNavigation> {
  const isStandaloneArticle = section === "articles";

  if (!isStandaloneArticle && !currentSlug) {
    return { previous: null, next: null };
  }

  const category = isStandaloneArticle ? undefined : studyOrSlug;
  const slug = isStandaloneArticle ? studyOrSlug : currentSlug!;

  const publicContent = await getPublicContentList({
    section: section as ManagedContentSection,
    category,
  });

  // Sort using shared logic
  const sorted = sortContentByOrder(publicContent, {
    section,
    category: category ?? null,
  });

  // Build href map once
  const sectionOrders = contentOrder[section as keyof typeof contentOrder] as StaticOrderGroup | undefined;
  const configuredItems = isStandaloneArticle
    ? sectionOrders?.articles ?? []
    : sectionOrders?.[studyOrSlug] ?? [];

  const configuredByHref = new Map(configuredItems.map((i) => [i.slug, i.href]));

  const navigationItems: ContentNavigationItem[] = sorted.map((item) => ({
    slug: item.slug,
    order: item.order ?? undefined,
    href:
      configuredByHref.get(item.slug) ??
      (isStandaloneArticle
        ? `/public/articles/${item.slug}`
        : `/public/${section}/${category}/${item.slug}`),
  }));

  const currentIndex = navigationItems.findIndex((i) => i.slug === slug);
  if (currentIndex === -1) return { previous: null, next: null };

  return {
    previous: navigationItems[currentIndex - 1] ?? null,
    next: navigationItems[currentIndex + 1] ?? null,
  };
}
