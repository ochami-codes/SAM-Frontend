"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  markContactMessageAsRead,
} from "@/src/lib/api/contact";

export function useMarkContactMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) =>
      markContactMessageAsRead(messageId),

    meta: {
      successMessage:
        "Contact message marked as read.",
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