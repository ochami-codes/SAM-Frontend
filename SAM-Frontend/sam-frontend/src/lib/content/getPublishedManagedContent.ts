import "server-only";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PublishedManagedContent {
id: string;
title: string;
slug: string;
section: ManagedContentSection;
category?: string;
content: string;
description?: string;
heroImage?: string;
order?: number;
status: "published";
publishedAt: string;
createdAt: string;
updatedAt: string;
}

interface PublishedManagedContentResponse {
success: boolean;
data: PublishedManagedContent;
}

export async function getPublishedManagedContent(
section: ManagedContentSection,
category: string,
slug: string
): Promise<PublishedManagedContent | null> {
if (!API_URL) {
console.error("NEXT_PUBLIC_API_URL is not configured.");
return null;
}

try {
const endpoint = [
"api",
"content",
section,
category,
slug,
]
.map(encodeURIComponent)
.join("/");

const response = await fetch(`${API_URL}/${endpoint}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  cache: "no-store",
});

if (response.status === 404) {
  return null;
}

if (!response.ok) {
  console.error(
    `Failed to fetch managed content: ${response.status}`
  );
  return null;
}

const result =
  (await response.json()) as PublishedManagedContentResponse;

if (!result.success || !result.data) {
  return null;
}

return result.data;

} catch (error) {
console.error("Failed to retrieve managed content:", error);
return null;
}
}
