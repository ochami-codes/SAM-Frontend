import { useQuery } from "@tanstack/react-query";

import { getActiveSessions } from "@/src/lib/api/sessions";

export const activeSessionsQueryKey = ["auth", "active-sessions"] as const;

/**
 * Retrieve the authenticated administrator's active sessions.
 */
export function useActiveSessions() {
  return useQuery({
    queryKey: activeSessionsQueryKey,
    queryFn: getActiveSessions,
    staleTime: 30 * 1000,
  });
}