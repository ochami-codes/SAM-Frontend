import "server-only";

import { contentOrder } from "@/src/config/contentOrder";

interface OrderedContentItem {
  slug: string;
  title?: string;
  order?: number | null;
}

interface StaticNavigationItem {
  slug: string;
  href: string;
  order?: number;
}

type StaticOrderGroup = Record<
  string,
  readonly StaticNavigationItem[] | undefined
>;

interface SortContentOptions {
  section: string;
  category?: string | null;
}

export function sortContentByOrder<
  T extends OrderedContentItem
>(
  items: T[],
  { section, category }: SortContentOptions
): T[] {
  const sectionOrders = contentOrder[
    section as keyof typeof contentOrder
  ] as StaticOrderGroup | undefined;

  const orderKey = category ?? (
    section === "articles" ? "articles" : ""
  );

  const configuredItems = orderKey
    ? sectionOrders?.[orderKey] ?? []
    : [];

  const configuredBySlug = new Map(
    configuredItems.map((item, index) => [
      item.slug,
      {
        order: item.order ?? index + 1,
        configuredIndex: index,
      },
    ])
  );

  return [...items].sort((a, b) => {
    const aConfigured = configuredBySlug.get(a.slug);
    const bConfigured = configuredBySlug.get(b.slug);

    const aOrder = aConfigured?.order ?? a.order;
    const bOrder = bConfigured?.order ?? b.order;

    const aHasOrder = aOrder != null;
    const bHasOrder = bOrder != null;

    if (aHasOrder && !bHasOrder) return -1;
    if (!aHasOrder && bHasOrder) return 1;

    if (
      aHasOrder &&
      bHasOrder &&
      aOrder !== bOrder
    ) {
      return aOrder! - bOrder!;
    }

    if (aConfigured && bConfigured) {
      return (
        aConfigured.configuredIndex -
        bConfigured.configuredIndex
      );
    }

    if (Boolean(aConfigured) !== Boolean(bConfigured)) {
      return aConfigured ? -1 : 1;
    }

    return a.slug.localeCompare(b.slug);
  });
}