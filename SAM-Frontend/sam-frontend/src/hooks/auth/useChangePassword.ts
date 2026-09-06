// src/hooks/auth/useChangePassword.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { changePassword } from "@/src/lib/api/auth";

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: ChangePasswordInput) =>
      changePassword(
        currentPassword,
        newPassword
      ),
  });
}