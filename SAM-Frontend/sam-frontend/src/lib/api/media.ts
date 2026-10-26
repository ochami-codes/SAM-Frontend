import { api } from "@/src/lib/api/client";

export interface CloudinaryMediaReference {
  id: string;
  title: string;
  slug: string;
  section: string;
  category?: string;
}

export interface CloudinaryMediaItem {
  asset_id: string;
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  resource_type: string;
  usedBy: CloudinaryMediaReference[];
}


export interface CloudinaryMediaResponse {
  success: boolean;
  data: {
    items: CloudinaryMediaItem[];
    nextCursor: string | null;
  };
}
export interface DeleteCloudinaryMediaResponse {
  success: boolean;
  message: string;
  data: {
    publicId: string;
  };
}
export async function getCloudinaryMedia(): Promise<CloudinaryMediaResponse> {
  return api<CloudinaryMediaResponse>("/api/media", {
    method: "GET",
  });
}
export async function deleteCloudinaryMedia(
  publicId: string
): Promise<DeleteCloudinaryMediaResponse> {
  return api<DeleteCloudinaryMediaResponse>("/api/media", {
    method: "DELETE",
    body: JSON.stringify({ publicId }),
  });
}