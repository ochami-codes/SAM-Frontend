"use client";

import {
useMutation,
useQueryClient,
} from "@tanstack/react-query";

import { deleteCloudinaryMedia } from "@/src/lib/api/media";

export function useDeleteCloudinaryMedia() {
const queryClient = useQueryClient();

return useMutation({
mutationFn: deleteCloudinaryMedia,

meta: {
  successMessage: "Image deleted successfully",
},

onSuccess: async () => {
  await queryClient.invalidateQueries({
    queryKey: ["cloudinary-media"],
  });
},

});
}

