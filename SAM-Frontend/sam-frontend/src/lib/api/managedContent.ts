import { api } from "./client";

export type ManagedContentSection = string;

export type ManagedContentStatus =
  | "draft"
  | "published";

export type ManagedContentIdentifier =
  | {
      section: "articles";
      slug: string;
    }
  | {
      section: "bible-study" | "family" | "health";
      category: string;
      slug: string;
    };

export interface ManagedContentListItem {
  id: string;
  title: string;
  slug: string;
  section: ManagedContentSection;
  category?: string;
  description?: string;
  heroImage?: string;
  order?: number;
  status: ManagedContentStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ManagedContent {
  id: string;
  title: string;
  slug: string;
  section: ManagedContentSection;
  category?: string;
  description?: string;
  content: string;
  heroImage?: string;
  order?: number;
  status: ManagedContentStatus;
  createdBy: string;
  updatedBy: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateManagedContentData {
  title: string;
  slug: string;
  section: ManagedContentSection;
  category?: string;
  content: string;
  heroImage?: string;
  order?: number;
  status?: ManagedContentStatus;
}

export interface UpdateManagedContentData {
  title: string;
  slug: string;
  section: ManagedContentSection;
  category?: string;
  content: string;
  heroImage?: string;
  order?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiMessageResponse {
  success: boolean;
  message: string;
}

function getManagedContentPath(
  identifier: ManagedContentIdentifier
): string {
  if (identifier.section === "articles") {
    return `/api/admin/managed-content/${identifier.section}/${identifier.slug}`;
  }

  return `/api/admin/managed-content/${identifier.section}/${identifier.category}/${identifier.slug}`;
}

export async function getManagedContentList(): Promise<
  ManagedContentListItem[]
> {
  const response = await api<
    ApiResponse<ManagedContentListItem[]>
  >("/api/admin/managed-content");

  return response.data;
}

export async function getManagedContent(
  identifier: ManagedContentIdentifier
): Promise<ManagedContent> {
  const response = await api<ApiResponse<ManagedContent>>(
    getManagedContentPath(identifier)
  );

  return response.data;
}

export async function createManagedContent(
  data: CreateManagedContentData
): Promise<ManagedContent> {
  const response = await api<ApiResponse<ManagedContent>>(
    "/api/admin/managed-content",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  return response.data;
}

export async function updateManagedContent(
  identifier: ManagedContentIdentifier,
  data: UpdateManagedContentData
): Promise<ManagedContent> {
  const response = await api<ApiResponse<ManagedContent>>(
    getManagedContentPath(identifier),
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

  return response.data;
}

export async function deleteManagedContent(
  identifier: ManagedContentIdentifier
): Promise<void> {
  await api<ApiMessageResponse>(
    getManagedContentPath(identifier),
    {
      method: "DELETE",
    }
  );
}

export async function publishManagedContent(
  identifier: ManagedContentIdentifier
): Promise<ManagedContent> {
  const response = await api<ApiResponse<ManagedContent>>(
    `${getManagedContentPath(identifier)}/publish`,
    {
      method: "PATCH",
    }
  );

  return response.data;
}

export async function unpublishManagedContent(
  identifier: ManagedContentIdentifier
): Promise<ManagedContent> {
  const response = await api<ApiResponse<ManagedContent>>(
    `${getManagedContentPath(identifier)}/unpublish`,
    {
      method: "PATCH",
    }
  );

  return response.data;
}