"use client";

import { useQuery } from "@tanstack/react-query";

import { getTwoFactorStatus } from "@/src/lib/api/twoFactor";

export const TWO_FACTOR_STATUS_KEY = ["two-factor-status"];

export function useTwoFactorStatus() {
  return useQuery({
    queryKey: TWO_FACTOR_STATUS_KEY,
    queryFn: getTwoFactorStatus,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}