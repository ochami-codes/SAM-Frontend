"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAdministratorStatus } from "@/src/lib/api/admin";

import { ADMINISTRATORS_QUERY_KEY } from "./useAdministrators";

interface UpdateAdminStatusInput {
  adminId: string;
  isActive: boolean;
}

export function useUpdateAdminStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      adminId,
      isActive,
    }: UpdateAdminStatusInput) =>
      updateAdministratorStatus(adminId, isActive),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMINISTRATORS_QUERY_KEY,
      });
    },

    meta: {
      successMessage: "Administrator status updated successfully.",
    },
  });
}