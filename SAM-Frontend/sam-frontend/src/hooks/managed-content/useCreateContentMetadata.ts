import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createContentMetadata,
  type CreateContentMetadataInput,
} from "@/src/lib/api/contentMetadata";

export function useCreateContentMetadata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateContentMetadataInput) =>
      createContentMetadata(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin-content-metadata"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["public-content-metadata"],
      });
    },

    meta: {
      successMessage: "Content structure created successfully",
    },
  });
}