import { useQuery } from "@tanstack/react-query";

import {
  getManagedContent,
  type ManagedContentIdentifier,
} from "@/src/lib/api/managedContent";

import { managedContentKeys } from "./useManagedContentList";

export function useManagedContent(
  identifier: ManagedContentIdentifier
) {
  return useQuery({
    queryKey: [
      ...managedContentKeys.all,
      "detail",
      identifier,
    ],
    queryFn: () => getManagedContent(identifier),
  });
}