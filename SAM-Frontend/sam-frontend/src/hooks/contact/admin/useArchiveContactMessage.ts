"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  archiveContactMessage,
} from "@/src/lib/api/contact";

export function useArchiveContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) =>
      archiveContactMessage(messageId),

    meta: {
      successMessage:
        "Contact message archived successfully.",
    },

    onSuccess: (_data, messageId) => {
      queryClient.invalidateQueries({
        queryKey: ["contact-messages"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "contact-message",
          messageId,
        ],
      });
    },
  });
}