"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  adminInvitations,
  type InviteAdminData,
  type InviteAdminResponse,
} from "@/src/lib/api/admin";

import { ADMIN_INVITATIONS_QUERY_KEY } from "./useAdminInvitations";

export function useInviteAdmin() {
  const queryClient = useQueryClient();

  return useMutation<
    InviteAdminResponse,
    Error,
    InviteAdminData
  >({
    mutationFn: adminInvitations,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_INVITATIONS_QUERY_KEY,
      });
    },

    meta: {
      successMessage:
        "Administrator invitation sent successfully.",
    },
  });
}