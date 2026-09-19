"use client";

import { useMutation } from "@tanstack/react-query";

import {
  adminInvitations,
  type InviteAdminData,
  type InviteAdminResponse,
} from "@/src/lib/api/admin";

export function useInviteAdmin() {
  return useMutation<
    InviteAdminResponse,
    Error,
    InviteAdminData
  >({
    mutationFn: adminInvitations,

    meta: {
      successMessage:
        "Administrator invitation sent successfully.",
    },
  });
}