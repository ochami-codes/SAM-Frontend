import { useMutation, useQueryClient } from "@tanstack/react-query";

import { revokeSession } from "@/src/lib/api/sessions";
import { activeSessionsQueryKey } from "./useActiveSessions";

export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => revokeSession(sessionId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: activeSessionsQueryKey,
      });
    },
  });
}