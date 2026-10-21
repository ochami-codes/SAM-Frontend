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
categories: [...section.categories],
}));
}

export async function getPublicContentMetadata(): Promise<
ContentSection[]

> {
 try {
 const managed = await fetchPublishedContentMetadata();

const sections: ContentSection[] = [];

// Keep default sections that contain actual static MDX content.
for (const defaultSection of DEFAULT_CONTENT_METADATA) {
  const staticContent = await getStaticContentList({
    section: defaultSection.slug as ContentSection["slug"],
  });

  if (staticContent.length > 0) {
    sections.push({
      ...defaultSection,
      categories: [...defaultSection.categories],
    });
  }
}

// Add managed sections containing published content.
for (const managedSection of managed.sections) {
  const slug = normalizeSlug(managedSection.slug);

  if (!slug) {
    continue;
  }

  const existingSection = sections.find(
    (section) =>
      normalizeSlug(section.slug) === slug
  );

  if (!existingSection) {
    const defaultSection = DEFAULT_CONTENT_METADATA.find(
      (section) =>
        normalizeSlug(section.slug) === slug
    );

    sections.push({
      name: defaultSection?.name ?? managedSection.name,
      slug,
      categories: defaultSection
        ? [...defaultSection.categories]
        : [],
    });
  }
}

// Merge categories containing published managed content.
for (const group of managed.categories) {
  const sectionSlug = normalizeSlug(group.section);

  if (!sectionSlug) {
    continue;
  }

  let section = sections.find(
    (item) =>
      normalizeSlug(item.slug) === sectionSlug
  );

  if (!section) {
    const defaultSection = DEFAULT_CONTENT_METADATA.find(
      (item) =>
        normalizeSlug(item.slug) === sectionSlug
    );

    section = {
      name: defaultSection?.name ?? formatSectionName(sectionSlug),
      slug: sectionSlug,
      categories: defaultSection
        ? [...defaultSection.categories]
        : [],
    };

    sections.push(section);
  }

  for (const category of group.categories) {
    const categorySlug = normalizeSlug(category.slug);

    if (!categorySlug) {
      continue;
    }

    const exists = section.categories.some(
      (item) =>
        normalizeSlug(item.slug) === categorySlug
    );

    if (!exists) {
      section.categories.push({
        name: category.name,
        slug: categorySlug,
      });
    }
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
