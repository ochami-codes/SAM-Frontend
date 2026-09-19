import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteManagedContent,
  type ManagedContentIdentifier,
} from "@/src/lib/api/managedContent";

import { managedContentKeys } from "./useManagedContentList";

export function useDeleteManagedContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      identifier: ManagedContentIdentifier
    ) => deleteManagedContent(identifier),

    onSuccess: async (_data, identifier) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: managedContentKeys.lists(),
        }),

        queryClient.removeQueries({
          queryKey: [
            ...managedContentKeys.all,
            "detail",
            identifier,
          ],
        }),
      ]);
    },

    meta: {
      successMessage: "Managed content deleted successfully",
    },
  });
}