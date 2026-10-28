import { api } from "./client";

/* -------------------- Types -------------------- */

export interface ContentMetadataItem {
  name: string;
  slug: string;
  heroImage?: string;
}

/** Public metadata response */
export interface ManagedContentMetadata {
  sections: ContentMetadataItem[];
  categories: {
    section: string;
    categories: ContentMetadataItem[];
  }[];
}

/** Admin metadata response */
export interface AdminContentMetadataSection
  extends ContentMetadataItem {
  categories: ContentMetadataItem[];
}

export interface CreateContentMetadataInput {
  name: string;
  type: "section" | "category";
  sectionSlug?: string;
  heroImage?: string;
}

export interface UpdateContentMetadataInput {
  name?: string;
  heroImage?: string | null;
}

interface MetadataApiResponse<T> {
  success: boolean;
  data: T;
}

/* -------------------- Public Metadata -------------------- */

export async function fetchPublishedContentMetadata(): Promise<ManagedContentMetadata> {
  const response = await api<
    MetadataApiResponse<ManagedContentMetadata>
  >("/api/content/metadata", {
    method: "GET",
  });

  if (!response.success || !response.data) {
    throw new Error("Invalid content metadata response.");
  }

  return response.data;
}

/* -------------------- Admin Metadata -------------------- */

export async function fetchAllContentMetadata(): Promise<
  AdminContentMetadataSection[]
> {
  const response = await api<
    MetadataApiResponse<AdminContentMetadataSection[]>
  >("/api/managed-content/metadata", {
    method: "GET",
  });

  if (!response.success || !response.data) {
    throw new Error("Invalid admin content metadata response.");
  }

  return response.data;
}

export async function createContentMetadata(
  input: CreateContentMetadataInput
): Promise<AdminContentMetadataSection> {
  const response = await api<
    MetadataApiResponse<AdminContentMetadataSection>
  >("/api/admin/managed-content/metadata", {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!response.success || !response.data) {
    throw new Error("Failed to create content metadata.");
  }

  return response.data;
}

export async function updateContentMetadata(
  type: "section" | "category",
  slug: string,
  input: UpdateContentMetadataInput,
  sectionSlug?: string
): Promise<unknown> {
  const endpoint =
    type === "section"
      ? `/api/admin/managed-content/metadata/sections/${encodeURIComponent(slug)}`
      : `/api/admin/managed-content/metadata/sections/${encodeURIComponent(sectionSlug ?? "")}/categories/${encodeURIComponent(slug)}`;

  const response = await api<
    MetadataApiResponse<AdminContentMetadataSection>
  >(endpoint, {
    method: "PATCH",
    body: JSON.stringify(input),
  });

  if (!response.success || !response.data) {
    throw new Error("Failed to update content metadata.");
  }

  return response.data;
}