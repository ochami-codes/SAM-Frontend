import { useQuery } from "@tanstack/react-query";

import { getSystemHealth } from "@/src/lib/api/systemHealth";

export function useSystemHealth() {
  return useQuery({
    queryKey: ["system-health"],
    queryFn: getSystemHealth,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}