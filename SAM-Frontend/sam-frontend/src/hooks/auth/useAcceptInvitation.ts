// src/hooks/auth/useAcceptInvitation.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { acceptInvitation } from "@/src/lib/api/auth";

interface AcceptInvitationInput {
  token: string;
  password: string;
}

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: ({
      token,
      password,
    }: AcceptInvitationInput) =>
      acceptInvitation(token, password),
  });
}