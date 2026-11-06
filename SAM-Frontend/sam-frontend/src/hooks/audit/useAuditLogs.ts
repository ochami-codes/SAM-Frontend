import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { getAuditLogs } from "@/src/lib/api/audit";
import type { AuditLogFilters } from "@/src/types/audit";

export const auditKeys = {
  all: ["audit"] as const,
  lists: () => [...auditKeys.all, "list"] as const,
  list: (filters: AuditLogFilters) =>
    [...auditKeys.lists(), filters] as const,
  details: () => [...auditKeys.all, "detail"] as const,
  detail: (id: string) => [...auditKeys.details(), id] as const,
};

export function useAuditLogs(filters: AuditLogFilters = {}) {
  return useQuery({
    queryKey: auditKeys.list(filters),
    queryFn: () => getAuditLogs(filters),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
}