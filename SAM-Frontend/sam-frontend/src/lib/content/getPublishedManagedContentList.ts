import "server-only";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PublishedManagedContentListItem {
  id: string;
  title: string;
  slug: string;
  section: ManagedContentSection;
  description?: string;
  heroImage?: string;
  category?: string;
  order?: number;
  status: "published";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface PublishedManagedContentListResponse {
  success: boolean;
  data: PublishedManagedContentListItem[];
}

interface GetPublishedManagedContentListOptions {
  section: ManagedContentSection;
  category?: string;
}

export async function getPublishedManagedContentList({
  section,
  category,
}: GetPublishedManagedContentListOptions): Promise<
  PublishedManagedContentListItem[]
> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const endpoint = category
    ? `/api/content/${section}/${category}`
    : `/api/content/${section}`;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch published ${section} content: ${response.status}`
    );
  }

  const result =
    (await response.json()) as PublishedManagedContentListResponse;

  if (!result.success) {
    throw new Error(
      `Failed to fetch published ${section} content`
    );
  }

  return result.data;
}