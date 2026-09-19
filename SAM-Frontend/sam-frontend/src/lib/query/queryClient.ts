import {
  MutationCache,
  QueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { getErrorMessage } from "@/src/lib/errors/messageErrors";
import type { ApiError } from "@/src/lib/errors/ApiError";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      const message =
        mutation.meta?.successMessage;

      if (typeof message === "string") {
        toast.success(message);
      }
    },

    onError: (error) => {
      const message = getErrorMessage(
        error as ApiError
      );

      toast.error(message);
    },
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