"use client";

import { useMutation } from "@tanstack/react-query";

import { verifyTwoFactorSetup } from "@/src/lib/api/twoFactor";

export function useVerifyTwoFactorSetup() {
  return useMutation({
    mutationFn: (token: string) =>
      verifyTwoFactorSetup(token),
  });
}