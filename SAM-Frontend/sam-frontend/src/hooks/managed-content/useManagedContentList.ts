import { useQuery } from "@tanstack/react-query";

import {
  getManagedContentList,
} from "@/src/lib/api/managedContent";

export const managedContentKeys = {
  all: ["managed-content"] as const,
  lists: () => [...managedContentKeys.all, "list"] as const,
};

export function useManagedContentList() {
  return useQuery({
    queryKey: managedContentKeys.lists(),
    queryFn: getManagedContentList,
  });
}