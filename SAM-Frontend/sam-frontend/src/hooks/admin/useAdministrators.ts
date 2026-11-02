"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdministrators } from "@/src/lib/api/admin";

export const ADMINISTRATORS_QUERY_KEY = ["administrators"];

export function useAdministrators() {
  return useQuery({
    queryKey: ADMINISTRATORS_QUERY_KEY,
    queryFn: getAdministrators,
    staleTime: 1000 * 60 * 5,
  });
}