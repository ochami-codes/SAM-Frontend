"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelAdminInvitation } from "@/src/lib/api/admin";

import { ADMIN_INVITATIONS_QUERY_KEY } from "./useAdminInvitations";

export function useCancelAdminInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAdminInvitation,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_INVITATIONS_QUERY_KEY,
      });
    },

    meta: {
      successMessage: "Invitation cancelled successfully.",
    },
  });
}