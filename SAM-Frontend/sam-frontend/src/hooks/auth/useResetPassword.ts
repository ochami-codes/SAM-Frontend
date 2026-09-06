// src/hooks/auth/useResetPassword.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/src/lib/api/auth";

interface ResetPasswordInput {
  token: string;
  password: string;
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      token,
      password,
    }: ResetPasswordInput) =>
      resetPassword(token, password),
  });
}