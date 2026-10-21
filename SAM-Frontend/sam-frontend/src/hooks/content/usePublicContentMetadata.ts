"use client";

import { useQuery } from "@tanstack/react-query";

import { getPublicContentMetadata } from "@/src/lib/content/getPublicContentMetadata";

export function usePublicContentMetadata() {
  return useQuery({
    queryKey: ["public-content-metadata"],
    queryFn: getPublicContentMetadata,
    staleTime: 5 * 60 * 1000,
  });
}