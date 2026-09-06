import {
  MutationCache,
  QueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { getErrorMessage } from "@/src/lib/errors/messageErrors";
import type { ApiError } from "@/src/lib/errors/ApiError";

function handleMutationError(error: Error): void {
  const message = getErrorMessage(
    error as ApiError
  );

  toast.error(message);
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: handleMutationError,
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },

    mutations: {
      retry: false,
    },
  },
});