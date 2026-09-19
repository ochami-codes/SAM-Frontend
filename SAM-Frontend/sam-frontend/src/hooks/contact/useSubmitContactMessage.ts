"use client";

import { useMutation } from "@tanstack/react-query";

import {
  submitContactMessage,
  type SubmitContactMessageData,
  type SubmitContactMessageResponse,
} from "@/src/lib/api/contact";

export function useSubmitContactMessage() {
  return useMutation<
    SubmitContactMessageResponse,
    Error,
    SubmitContactMessageData
  >({
    mutationFn: submitContactMessage,

    meta: {
      successMessage:
        "Your message has been sent successfully.",
    },
  });
}