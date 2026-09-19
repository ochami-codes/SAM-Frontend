import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  unpublishManagedContent,
  type ManagedContentIdentifier,
} from "@/src/lib/api/managedContent";

import { managedContentKeys } from "./useManagedContentList";

export function useUnpublishManagedContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      identifier: ManagedContentIdentifier
    ) => unpublishManagedContent(identifier),

    onSuccess: async (_data, identifier) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: managedContentKeys.lists(),
        }),

        queryClient.invalidateQueries({
          queryKey: [
            ...managedContentKeys.all,
            "detail",
            identifier,
          ],
        }),
      ]);
    },

    meta: {
      successMessage: "Managed content unpublished successfully",
    },
  });
}