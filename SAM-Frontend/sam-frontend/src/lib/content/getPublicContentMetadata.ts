import {
  DEFAULT_CONTENT_METADATA,
  type ContentSection,
} from "@/src/config/contentMetadata";

import {
  fetchPublishedContentMetadata,
} from "@/src/lib/api/contentMetadata";

import {
  getStaticContentList,
} from "@/src/lib/content/getStaticContentList";

function normalizeSlug(value: string): string {
  return value.trim().toLowerCase();
}

function formatSectionName(slug: string): string {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function cloneDefaultMetadata(): ContentSection[] {
  return DEFAULT_CONTENT_METADATA.map((section) => ({
    ...section,
    categories: section.categories.map((category) => ({
      ...category,
    })),
  }));
}

export async function getPublicContentMetadata(): Promise<
  ContentSection[]
> {
  try {
    const managed = await fetchPublishedContentMetadata();

    const sections: ContentSection[] = [];

    // Keep default sections containing static MDX content.
    for (const defaultSection of DEFAULT_CONTENT_METADATA) {
      const staticContent = await getStaticContentList({
        section: defaultSection.slug as ContentSection["slug"],
      });

      if (staticContent.length > 0) {
        sections.push({
          ...defaultSection,
          categories: defaultSection.categories.map((category) => ({
            ...category,
          })),
        });
      }
    }

    // Merge sections containing published managed content.
    for (const managedSection of managed.sections) {
      const slug = normalizeSlug(managedSection.slug);

      if (!slug) {
        continue;
      }

      let section = sections.find(
        (item) => normalizeSlug(item.slug) === slug
      );

      if (!section) {
        const defaultSection = DEFAULT_CONTENT_METADATA.find(
          (item) => normalizeSlug(item.slug) === slug
        );

        section = {
          ...(
            defaultSection ?? {
              name: managedSection.name,
              slug,
              categories: [],
            }
          ),
          categories: defaultSection
            ? defaultSection.categories.map((category) => ({
                ...category,
              }))
            : [],
        };

        sections.push(section);
      }

      // Prefer the image configured in managed metadata.
      if (managedSection.heroImage) {
        section.heroImage = managedSection.heroImage;
      }

      // Prefer the managed display name for custom sections.
      if (
        !DEFAULT_CONTENT_METADATA.some(
          (item) => normalizeSlug(item.slug) === slug
        )
      ) {
        section.name = managedSection.name;
      }
    }

    // Merge categories containing published managed content.
    for (const group of managed.categories) {
      const sectionSlug = normalizeSlug(group.section);

      if (!sectionSlug) {
        continue;
      }

      let section = sections.find(
        (item) => normalizeSlug(item.slug) === sectionSlug
      );

      if (!section) {
        const defaultSection = DEFAULT_CONTENT_METADATA.find(
          (item) => normalizeSlug(item.slug) === sectionSlug
        );

        section = {
          name:
            defaultSection?.name ?? formatSectionName(sectionSlug),
          slug: sectionSlug,
          ...(defaultSection?.heroImage
            ? { heroImage: defaultSection.heroImage }
            : {}),
          categories: defaultSection
            ? defaultSection.categories.map((category) => ({
                ...category,
              }))
            : [],
        };

        sections.push(section);
      }

      for (const category of group.categories) {
        const categorySlug = normalizeSlug(category.slug);

        if (!categorySlug) {
          continue;
        }

        const existingCategory = section.categories.find(
          (item) =>
            normalizeSlug(item.slug) === categorySlug
        );

        if (existingCategory) {
          // Preserve the configured default name but allow its
          // image to be overridden by managed metadata.
          if (category.heroImage) {
            existingCategory.heroImage = category.heroImage;
          }

          // Use the managed name for custom categories.
          const isDefaultCategory =
            DEFAULT_CONTENT_METADATA.some(
              (defaultSection) =>
                normalizeSlug(defaultSection.slug) === sectionSlug &&
                defaultSection.categories.some(
                  (defaultCategory) =>
                    normalizeSlug(defaultCategory.slug) ===
                    categorySlug
                )
            );

          if (!isDefaultCategory) {
            existingCategory.name = category.name;
          }

          continue;
        }

        section.categories.push({
          name: category.name,
          slug: categorySlug,
          ...(category.heroImage
            ? { heroImage: category.heroImage }
            : {}),
        });
      }
    }

    return sections;
  } catch (error) {
    console.error(
      "Failed to fetch public content metadata. Using default metadata.",
      error
    );

    // Preserve the existing static-site fallback.
    return cloneDefaultMetadata();
  }
}