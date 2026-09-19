import { api } from "./client";

export type ContentSection =
| "articles"
| "bible-study"
| "family"
| "health";

export type ContentIdentifier =
| {
section: "articles";
slug: string;
}
| {
section: "bible-study" | "family" | "health";
category: string;
slug: string;
};

export interface ContentListItem {
section: ContentSection;
category?: string;
slug: string;
path: string;
sha: string;
}

export interface Content {
path: string;
sha: string;
content: string;
}

export interface UpdateContentData {
content: string;
sha: string;
message: string;
}

export interface DeleteContentData {
sha: string;
message: string;
}

interface ApiResponse<T> {
success: boolean;
data: T;
}

function getContentPath(
identifier: ContentIdentifier
): string {
if (identifier.section === "articles") {
return `/api/admin/content/${identifier.section}/${identifier.slug}`;
}

return `/api/admin/content/${identifier.section}/${identifier.category}/${identifier.slug}`;
}

export async function getContentList(): Promise<ContentListItem[]> {
const response = await api<ApiResponse<ContentListItem[]>>(
"/api/admin/content"
);

return response.data;
}

export async function getContent(
identifier: ContentIdentifier
): Promise<Content> {
const response = await api<ApiResponse<Content>>(
getContentPath(identifier)
);

return response.data;
}

export async function updateContent(
identifier: ContentIdentifier,
data: UpdateContentData
): Promise<Content> {
const response = await api<ApiResponse<Content>>(
getContentPath(identifier),
{
method: "PUT",
body: JSON.stringify(data),
}
);

return response.data;
}

export async function deleteContent(
identifier: ContentIdentifier,
data: DeleteContentData
): Promise<{ path: string; commitSha: string }> {
const response = await api<
ApiResponse<{ path: string; commitSha: string }>

> (getContentPath(identifier), {
 method: "DELETE",
 body: JSON.stringify(data),
});

return response.data;
}
