"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getContactMessages,
  type ContactMessage,
} from "@/src/lib/api/contact";

export function useContactMessages() {
  return useQuery<ContactMessage[], Error>({
    queryKey: ["contact-messages"],
    queryFn: getContactMessages,
  });
}