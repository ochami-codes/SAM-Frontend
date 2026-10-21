"use client";

import { useQuery } from "@tanstack/react-query";

import {
DEFAULT_CONTENT_METADATA,
} from "@/src/config/contentMetadata";

import {
fetchPublishedContentMetadata,
} from "@/src/lib/api/contentMetadata";

export function useAdminContentMetadata() {
return useQuery({
queryKey: ["admin-content-metadata"],

queryFn: async () => {
  const managed = await fetchPublishedContentMetadata();

  const sections = DEFAULT_CONTENT_METADATA.map(
    (section) => ({
      ...section,
      categories: section.categories.map(
        (category) => ({ ...category })
      ),
    })
  );

  for (const managedSection of managed.sections) {
    const slug = managedSection.slug.trim().toLowerCase();

    if (
      !slug ||
      sections.some(
        (section) =>
          section.slug.trim().toLowerCase() === slug
      )
    ) {
      continue;
    }

    sections.push({
      name: managedSection.name,
      slug,
      categories: [],
    });
  }

  for (const group of managed.categories) {
    const sectionSlug = group.section.trim().toLowerCase();

    let section = sections.find(
      (item) =>
        item.slug.trim().toLowerCase() === sectionSlug
    );

    if (!section) {
      section = {
        name: sectionSlug
          .split("-")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() +
              word.slice(1)
          )
          .join(" "),
        slug: sectionSlug,
        categories: [],
      };

      sections.push(section);
    }

    for (const category of group.categories) {
      const slug = category.slug.trim().toLowerCase();

      if (
        !slug ||
        section.categories.some(
          (item) =>
            item.slug.trim().toLowerCase() === slug
        )
      ) {
        continue;
      }

      section.categories.push({
        name: category.name,
        slug,
      });
    }
  }

  return sections;
},

staleTime: 5 * 60 * 1000,

});
}
