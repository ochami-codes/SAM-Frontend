import { useQuery } from "@tanstack/react-query";
import {
getContent,
type Content,
type ContentIdentifier,
} from "@/src/lib/api/content";

export function useContent(identifier: ContentIdentifier) {
return useQuery<Content>({
queryKey: ["admin", "content", identifier],
queryFn: () => getContent(identifier),
enabled: Boolean(
identifier.slug &&
(identifier.section === "articles" || identifier.category)
),
});
}
