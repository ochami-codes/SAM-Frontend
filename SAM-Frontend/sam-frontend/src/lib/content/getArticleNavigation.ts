import "server-only";

import { contentOrder } from "@/src/config/contentOrder";
import type { ManagedContentSection } from "@/src/lib/api/managedContent";
import { getPublicContentList } from "./getPublicContentList";

interface ContentNavigationItem {
slug: string;
href: string;
order?: number;
}

interface ArticleNavigation {
previous: ContentNavigationItem | null;
next: ContentNavigationItem | null;
}

interface OrderedNavigationItem extends ContentNavigationItem {
configuredIndex: number;
isConfigured: boolean;
}

type StaticNavigationItem = {
slug: string;
href: string;
order?: number;
};

type StaticOrderGroup = Record<
string,
readonly StaticNavigationItem[] | undefined

> ;

export async function getArticleNavigation(
section: string,
studyOrSlug: string,
currentSlug?: string
): Promise<ArticleNavigation> {
const isStandaloneArticle = section === "articles";

if (!isStandaloneArticle && !currentSlug) {
return {
previous: null,
next: null,
};
}

const category = isStandaloneArticle ? undefined : studyOrSlug;
const slug = isStandaloneArticle ? studyOrSlug : currentSlug!;

const publicContent = await getPublicContentList({
section: section as ManagedContentSection,
category,
});

/*

* Retrieve the existing static ordering configuration.
* Articles use contentOrder.articles.articles.
* Other sections use contentOrder[section][category].
  */
  const sectionOrders = contentOrder[
  section as keyof typeof contentOrder
  ] as StaticOrderGroup | undefined;

const configuredItems = isStandaloneArticle
? sectionOrders?.articles ?? []
: sectionOrders?.[studyOrSlug] ?? [];

const configuredBySlug = new Map(
configuredItems.map((item, index) => [
item.slug,
{
...item,
order: item.order ?? index + 1,
configuredIndex: index,
},
])
);

/*

* Combine configured static entries and managed content.
* A managed item matching a configured slug inherits the
* configured position, preventing replacements from moving.
  */
  const navigationItems: OrderedNavigationItem[] =
  publicContent.map((item, index) => {
  const configured = configuredBySlug.get(item.slug);

  const href =
  configured?.href ??
  (isStandaloneArticle
  ? `/public/articles/${item.slug}`
  : `/public/${section}/${category}/${item.slug}`);

  return {
  slug: item.slug,
  href,
  order: configured?.order ?? item.order,
  configuredIndex: configured?.configuredIndex ?? index,
  isConfigured: Boolean(configured),
  };
  });

/*

* Explicit orders come first in ascending order.
* Configured static items retain their relative sequence
* when order values tie. Remaining ties are alphabetical.
  */
  navigationItems.sort((a, b) => {
  const aHasOrder = a.order !== undefined && a.order !== null;
  const bHasOrder = b.order !== undefined && b.order !== null;

if (aHasOrder && !bHasOrder) return -1;

if (!aHasOrder && bHasOrder) return 1;

if (
  aHasOrder &&
  bHasOrder &&
  a.order !== b.order
) {
  return a.order! - b.order!;
}

if (a.isConfigured && b.isConfigured) {
  return a.configuredIndex - b.configuredIndex;
}

if (a.isConfigured !== b.isConfigured) {
  return a.isConfigured ? -1 : 1;
}

return a.slug.localeCompare(b.slug);

});

const currentIndex = navigationItems.findIndex(
(item) => item.slug === slug
);

if (currentIndex === -1) {
return {
previous: null,
next: null,
};
}

const toNavigationItem = (
item: OrderedNavigationItem | undefined
): ContentNavigationItem | null => {
if (!item) {
return null;
}

return {
  slug: item.slug,
  href: item.href,
  order: item.order,
};
};

return {
previous: toNavigationItem(navigationItems[currentIndex - 1]),
next: toNavigationItem(navigationItems[currentIndex + 1]),
};
}
