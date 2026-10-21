import { api } from "./client";

export interface ContentMetadataItem {
  name: string;
  slug: string;
}

export interface ManagedContentMetadata {
  sections: ContentMetadataItem[];
  categories: {
    section: string;
    categories: ContentMetadataItem[];
  }[];
}

interface MetadataApiResponse {
  success: boolean;
  data: ManagedContentMetadata;
}

export async function fetchPublishedContentMetadata(): Promise<ManagedContentMetadata> {
  const response = await api<MetadataApiResponse>(
    "/api/content/metadata",
    {
      method: "GET",
    }
  );

  if (!response.success || !response.data) {
    throw new Error(
      "Invalid content metadata response."
    );
  }

  return response.data;
}