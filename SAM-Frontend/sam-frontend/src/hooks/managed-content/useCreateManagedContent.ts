import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createManagedContent,
  type CreateManagedContentData,
} from "@/src/lib/api/managedContent";

import { managedContentKeys } from "./useManagedContentList";

export function useCreateManagedContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateManagedContentData
    ) => createManagedContent(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: managedContentKeys.lists(),
      });
    },

    meta: {
      successMessage: "Managed content created successfully",
    },
  });
}