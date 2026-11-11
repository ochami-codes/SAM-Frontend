"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { verifyTwoFactorSetup } from "@/src/lib/api/twoFactor";
import { TWO_FACTOR_STATUS_KEY } from "./useTwoFactorStatus";

export function useVerifyTwoFactorSetup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) =>
      verifyTwoFactorSetup(token),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: TWO_FACTOR_STATUS_KEY,
      });
    },
  });
}