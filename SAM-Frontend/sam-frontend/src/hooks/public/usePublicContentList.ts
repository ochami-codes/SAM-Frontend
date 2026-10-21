"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getPublishedManagedContentList} from "@/src/lib/content/getPublishedManagedContentList";

import type {
  ManagedContentSection,
} from "@/src/lib/api/managedContent";

interface UsePublicContentListOptions {
  section: ManagedContentSection;
  category?: string;
}

export function usePublicContentList({
  section,
  category,
}: UsePublicContentListOptions) {
  return useQuery({
    queryKey: ["public-content", section, category],
    queryFn: () =>
      getPublishedManagedContentList({
        section,
        category,
      }),
  });
}