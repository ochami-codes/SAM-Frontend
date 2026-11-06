import { useQuery } from "@tanstack/react-query";

import { getAuditLogById } from "@/src/lib/api/audit";
import { auditKeys } from "./useAuditLogs";

export function useAuditLog(auditLogId: string) {
  return useQuery({
    queryKey: auditKeys.detail(auditLogId),
    queryFn: () => getAuditLogById(auditLogId),
    enabled: Boolean(auditLogId),
    staleTime: 30 * 1000,
  });
}