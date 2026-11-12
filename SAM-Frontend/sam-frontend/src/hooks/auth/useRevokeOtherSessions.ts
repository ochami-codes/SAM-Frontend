import { useMutation, useQueryClient } from "@tanstack/react-query";

import { revokeOtherSessions } from "@/src/lib/api/sessions";
import { activeSessionsQueryKey } from "./useActiveSessions";

export function useRevokeOtherSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeOtherSessions,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: activeSessionsQueryKey,
      });
    },
  });
}