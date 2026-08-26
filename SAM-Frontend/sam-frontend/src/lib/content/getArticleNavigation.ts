// src/lib/content/getArticleNavigation.ts

import { contentOrder } from "@/src/config/contentOrder";

interface ContentNavigationItem {
  slug: string;
  href: string;
}

interface ArticleNavigation {
  previous: ContentNavigationItem | null;
  next: ContentNavigationItem | null;
}

export function getArticleNavigation(
  section: string,
  study: string,
  currentSlug: string
): ArticleNavigation {
  const sectionOrders = contentOrder[
    section as keyof typeof contentOrder
  ];

  if (!sectionOrders) {
    return {
      previous: null,
      next: null,
    };
  }

  const articles = sectionOrders[study as keyof typeof sectionOrders] as
    | readonly ContentNavigationItem[]
    | undefined;

  if (!articles) {
    return {
      previous: null,
      next: null,
    };
  }

  const currentIndex = articles.findIndex(
    (article) => article.slug === currentSlug
  );

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: articles[currentIndex - 1] ?? null,
    next: articles[currentIndex + 1] ?? null,
  };
}