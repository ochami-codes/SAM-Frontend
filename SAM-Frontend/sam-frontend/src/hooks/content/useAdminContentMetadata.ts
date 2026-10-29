"use client";

import { useQuery } from "@tanstack/react-query";
import { DEFAULT_CONTENT_METADATA } from "@/src/config/contentMetadata";
import { fetchAllContentMetadata } from "@/src/lib/api/contentMetadata";

export function useAdminContentMetadata() {
  return useQuery({
    queryKey: ["admin-content-metadata"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      // Fetch all custom metadata, including unpublished sections
      const managed = await fetchAllContentMetadata();

      // Clone default sections
      const sections = DEFAULT_CONTENT_METADATA.map((section) => ({
        ...section,
        categories: section.categories.map((category) => ({ ...category })),
      }));

      // Merge custom sections & categories
      for (const managedSection of managed) {
        const slug = managedSection.slug.trim().toLowerCase();
        if (!slug) continue;

        let section = sections.find(
          (item) => item.slug.trim().toLowerCase() === slug
        );

        if (!section) {
          section = {
            name: managedSection.name,
            slug,
            ...(managedSection.heroImage
              ? { heroImage: managedSection.heroImage }
              : {}),
            categories: [],
          };
          sections.push(section);
        }

        // Merge categories into section (default or custom)
        for (const category of managedSection.categories) {
          const categorySlug = category.slug.trim().toLowerCase();
          if (
            !categorySlug ||
            section.categories.some(
              (item) => item.slug.trim().toLowerCase() === categorySlug
            )
          ) {
            continue;
          }

          section.categories.push({
            name: category.name,
            slug: categorySlug,
            ...(category.heroImage ? { heroImage: category.heroImage } : {}),
          });
        }
      }

      return sections;
    },
  });
}