"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resendAdminInvitation } from "@/src/lib/api/admin";

import { ADMIN_INVITATIONS_QUERY_KEY } from "./useAdminInvitations";

export function useResendAdminInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resendAdminInvitation,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_INVITATIONS_QUERY_KEY,
      });
    },

    meta: {
      successMessage: "Invitation resent successfully.",
    },
  });
}