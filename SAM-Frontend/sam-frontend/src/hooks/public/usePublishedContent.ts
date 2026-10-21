"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getPublishedContent,
} from "@/src/lib/api/publicContent";

import type {
  ManagedContentIdentifier,
} from "@/src/lib/api/managedContent";

export function usePublishedContent(
  identifier: ManagedContentIdentifier | null
) {
  return useQuery({
    queryKey: [
      "published-content",
      identifier,
    ],
    queryFn: () => {
      if (!identifier) {
        throw new Error(
          "Published content identifier is required."
        );
      }

      return getPublishedContent(identifier);
    },
    enabled: identifier !== null,
  });
}