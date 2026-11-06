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

interface ConfirmUploadResponse {
  success: boolean;
  message: string;
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
    throw new Error("Unable to initialize image upload.");
  }

  return response.data;
}

export async function confirmCloudinaryUpload(
  assetId: string
): Promise<void> {
  const response = await api<ConfirmUploadResponse>(
    "/api/media/confirm-upload",
    {
      method: "POST",
      body: JSON.stringify({ assetId }),
    }
  );

  if (!response.success) {
    throw new Error("Unable to confirm image upload.");
  }
}