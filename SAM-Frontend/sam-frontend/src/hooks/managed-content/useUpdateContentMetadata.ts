import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateContentMetadata,
  type UpdateContentMetadataInput,
} from "@/src/lib/api/contentMetadata";

interface UpdateContentMetadataVariables {
  type: "section" | "category";
  slug: string;
  sectionSlug?: string;
  input: UpdateContentMetadataInput;
}

export function useUpdateContentMetadata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      slug,
      sectionSlug,
      input,
    }: UpdateContentMetadataVariables) =>
      updateContentMetadata(type, slug, input, sectionSlug),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin-content-metadata"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["public-content-metadata"],
      });
    },

    meta: {
      successMessage: "Content structure updated successfully",
    },
  });
}