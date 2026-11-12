"use client";

import { useMutation } from "@tanstack/react-query";

import {
  verifyTwoFactorLogin,
} from "@/src/lib/api/twoFactor";

import type {
  TwoFactorLoginResponse,
} from "@/src/lib/api/twoFactor";

interface VerifyTwoFactorLoginInput {
  challengeToken: string;
  code: string;
}

export function useVerifyTwoFactorLogin() {
  return useMutation<
    TwoFactorLoginResponse,
    Error,
    VerifyTwoFactorLoginInput
  >({
    mutationFn: async ({
      challengeToken,
      code,
    }) => {
      return verifyTwoFactorLogin(
        challengeToken,
        code
      );
    },
  });
}