import { api } from "./client";

export interface CloudinaryUploadSignature {
  timestamp: number;
  signature: string;
  cloudName: string;
  apiKey: string;
  folder: string;
}

interface CloudinarySignatureResponse {
  success: boolean;
  data: CloudinaryUploadSignature;
}

export async function getCloudinaryUploadSignature(): Promise<CloudinaryUploadSignature> {
  const response =
    await api<CloudinarySignatureResponse>(
      "/api/media/upload-signature",
      {
        method: "POST",
      }
    );

  if (!response.success || !response.data) {
    throw new Error(
      "Unable to initialize image upload."
    );
  }

  return response.data;
}