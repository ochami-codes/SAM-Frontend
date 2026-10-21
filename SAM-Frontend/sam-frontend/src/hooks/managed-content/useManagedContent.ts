"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getManagedContent,
  type ManagedContentIdentifier,
} from "@/src/lib/api/managedContent";

export function useManagedContent(
  identifier: ManagedContentIdentifier | null
) {
  return useQuery({
    queryKey: [
      "managed-content",
      identifier,
    ],
    queryFn: () => {
      if (!identifier) {
        throw new Error("Managed content identifier is required.");
      }

      return getManagedContent(identifier);
    },
    enabled: identifier !== null,
  });
}