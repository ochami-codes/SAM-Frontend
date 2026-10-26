"use client";

import { useQuery } from "@tanstack/react-query";

import { getCloudinaryMedia } from "@/src/lib/api/media";

export function useCloudinaryMedia() {
  return useQuery({
    queryKey: ["cloudinary-media"],
    queryFn: getCloudinaryMedia,
    staleTime: 1000 * 60 * 5,
  });
}