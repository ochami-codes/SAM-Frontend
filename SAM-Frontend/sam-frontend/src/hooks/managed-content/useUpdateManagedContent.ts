import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateManagedContent,
  type ManagedContentIdentifier,
  type UpdateManagedContentData,
} from "@/src/lib/api/managedContent";

import { managedContentKeys } from "./useManagedContentList";

interface UpdateManagedContentVariables {
  identifier: ManagedContentIdentifier;
  data: UpdateManagedContentData;
}

export function useUpdateManagedContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      identifier,
      data,
    }: UpdateManagedContentVariables) =>
      updateManagedContent(identifier, data),

    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: managedContentKeys.lists(),
        }),

        queryClient.invalidateQueries({
          queryKey: [
            ...managedContentKeys.all,
            "detail",
            variables.identifier,
          ],
        }),
      ]);
    },

    meta: {
      successMessage: "Managed content updated successfully",
    },
  });
}