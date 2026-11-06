import "server-only";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";
import { sortContentByOrder } from "@/src/utils/sortContentByOrder";
import { getStaticContentList } from "./getStaticContentList";
import { getPublishedManagedContentList } from "./getPublishedManagedContentList";

export interface PublicContentListItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  heroImage: string | null;
  category: string | null;
  section: ManagedContentSection;
  order?: number;
  source: "static" | "managed";
}

interface GetPublicContentListOptions {
  section: ManagedContentSection;
  category?: string;
}

export async function getPublicContentList({
  section,
  category,
}: GetPublicContentListOptions): Promise<PublicContentListItem[]> {
  const staticContent = await getStaticContentList({
    section,
    category,
  });

  let managedContent: Awaited<
    ReturnType<typeof getPublishedManagedContentList>
  > = [];

  try {
    managedContent = await getPublishedManagedContentList({
      section,
      category,
    });
  } catch (error) {
    console.error(
      `Failed to fetch managed content for ${section}/${category ?? ""}.`,
      error
    );
  }

  // Managed content takes precedence over matching static content.
  const managedKeys = new Set(
    managedContent.map((content) =>
      createContentKey(
        content.section,
        content.category,
        content.slug
      )
    )
  );

  const normalizedStaticContent: PublicContentListItem[] =
    staticContent
      .filter((content) => {
        const key = createContentKey(
          content.section,
          content.category,
          content.slug
        );

        return !managedKeys.has(key);
      })
      .map((content) => ({
        id: content.id,
        slug: content.slug,
        title: content.title ?? content.slug,
        description: content.description,
        heroImage: content.heroImage,
        category: content.category,
        section: content.section,
        source: "static",
      }));

  const normalizedManagedContent: PublicContentListItem[] =
    managedContent.map((content) => ({
      id: content.id,
      slug: content.slug,
      title: content.title,
      description: content.description ?? null,
      heroImage: content.heroImage ?? null,
      category: content.category ?? null,
      section: content.section,
      order: content.order,
      source: "managed",
    }));

  return sortContentByOrder(
  [
    ...normalizedManagedContent,
    ...normalizedStaticContent,
  ],
  {
    section,
    category,
  }
);


function createContentKey(
  section: ManagedContentSection,
  category: string | null | undefined,
  slug: string
): string {
  return [
    section.trim().toLowerCase(),
    category?.trim().toLowerCase() ?? "",
    slug.trim().toLowerCase(),
  ].join(":");
}
}