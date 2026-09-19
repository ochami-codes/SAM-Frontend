"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getContactMessage,
  type ContactMessage,
} from "@/src/lib/api/contact";

export function useContactMessage(
  messageId: string | undefined
) {
  return useQuery<ContactMessage, Error>({
    queryKey: ["contact-message", messageId],
    queryFn: () => getContactMessage(messageId!),
    enabled: Boolean(messageId),
  });
}