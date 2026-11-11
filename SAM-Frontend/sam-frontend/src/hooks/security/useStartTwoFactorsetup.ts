"use client";

import { useMutation } from "@tanstack/react-query";

import { startTwoFactorSetup } from "@/src/lib/api/twoFactor";

export function useStartTwoFactorSetup() {
  return useMutation({
    mutationFn: (password: string) =>
      startTwoFactorSetup(password),
  });
}