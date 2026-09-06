// src/hooks/auth/useForgotPassword.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "@/src/lib/api/auth";

interface ForgotPasswordInput {
  email: string;
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: ({ email }: ForgotPasswordInput) =>
      forgotPassword(email),
  });
}