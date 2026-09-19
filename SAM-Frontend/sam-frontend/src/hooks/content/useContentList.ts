import { useQuery } from "@tanstack/react-query";
import {
getContentList,
type ContentListItem,
} from "@/src/lib/api/content";

export const contentListQueryKey = ["admin", "content"] as const;

export function useContentList() {
return useQuery<ContentListItem[]>({
queryKey: contentListQueryKey,
queryFn: getContentList,
});
}
