import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteContent,
  type ContentIdentifier,
  type DeleteContentData,
} from "@/src/lib/api/content";
import { contentListQueryKey } from "./useContentList";

interface DeleteContentVariables {
  identifier: ContentIdentifier;
  data: DeleteContentData;
}

interface DeleteContentResponse {
  path: string;
  commitSha: string;
}

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteContentResponse,
    Error,
    DeleteContentVariables
  >({
    mutationFn: ({ identifier, data }) =>
      deleteContent(identifier, data),

    onSuccess: (_, { identifier }) => {
      queryClient.removeQueries({
        queryKey: ["admin", "content", identifier],
      });

      queryClient.invalidateQueries({
        queryKey: contentListQueryKey,
      });
    },

    meta: {
      successMessage: "Content deleted successfully",
    },
  });
}