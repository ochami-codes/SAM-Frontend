import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateContent,
  type Content,
  type ContentIdentifier,
  type UpdateContentData,
} from "@/src/lib/api/content";
import { contentListQueryKey } from "./useContentList";

interface UpdateContentVariables {
  identifier: ContentIdentifier;
  data: UpdateContentData;
}

export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation<Content, Error, UpdateContentVariables>({
    mutationFn: ({ identifier, data }) =>
      updateContent(identifier, data),

    onSuccess: (updatedContent, { identifier }) => {
      queryClient.setQueryData(
        ["admin", "content", identifier],
        updatedContent
      );

      queryClient.invalidateQueries({
        queryKey: contentListQueryKey,
      });
    },

    meta: {
      successMessage: "Content updated successfully",
    },
  });
}