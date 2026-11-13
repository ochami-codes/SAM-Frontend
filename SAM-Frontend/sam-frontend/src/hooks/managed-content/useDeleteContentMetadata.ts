import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteContentMetadata,
} from "@/src/lib/api/contentMetadata";

interface DeleteContentMetadataInput {
  type: "section" | "category";
  slug: string;
  sectionSlug?: string;
}

export function useDeleteContentMetadata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      slug,
      sectionSlug,
    }: DeleteContentMetadataInput) =>
      deleteContentMetadata(type, slug, sectionSlug),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin-content-metadata"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["public-content-metadata"],
      });
    },

    meta: {
      successMessage: "Content structure deleted successfully",
    },
  });
}