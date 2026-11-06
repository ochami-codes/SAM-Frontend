import { useQuery } from "@tanstack/react-query";
import { getAuditStats } from "@/src/lib/api/audit";

export const auditStatsKey = ["audit", "stats"] as const;

export function useAuditStats() {
  return useQuery({
    queryKey: auditStatsKey,
    queryFn: getAuditStats,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  });
}