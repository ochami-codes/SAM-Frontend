import { api } from "./client";

import type {
  ManagedContent,
  ManagedContentIdentifier,
  ManagedContentListItem,
  ManagedContentSection,
} from "./managedContent";

/* -------------------- Types -------------------- */

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/* -------------------- Public Content -------------------- */

export async function getPublishedContentList(
  section: ManagedContentSection
): Promise<ManagedContentListItem[]> {
  const response = await api<ApiResponse<ManagedContentListItem[]>>(
    `/api/content/${section}`
  );

  return response.data;
}

export async function getPublishedContent(
  identifier: ManagedContentIdentifier
): Promise<ManagedContent> {
  const response = await api<ApiResponse<ManagedContent>>(
    getPublishedContentPath(identifier)
  );

  return response.data;
}

/* -------------------- Helpers -------------------- */

function getPublishedContentPath(
  identifier: ManagedContentIdentifier
): string {
  if (identifier.section === "articles") {
    return `/api/content/${identifier.section}/${identifier.slug}`;
  }

  return `/api/content/${identifier.section}/${identifier.category}/${identifier.slug}`;
}