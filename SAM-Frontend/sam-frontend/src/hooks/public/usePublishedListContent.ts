"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getPublishedContentList,
} from "@/src/lib/api/publicContent";

import type {
  ManagedContentSection,
} from "@/src/lib/api/managedContent";

export function usePublishedContentList(
  section: ManagedContentSection
) {
  return useQuery({
    queryKey: ["published-content", section],
    queryFn: () => getPublishedContentList(section),
  });
}