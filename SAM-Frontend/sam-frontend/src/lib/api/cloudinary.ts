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

// Content image upload.
export async function getCloudinaryUploadSignature(): Promise<CloudinaryUploadSignature> {
  const response = await api<CloudinarySignatureResponse>(
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

// Profile photo upload.
export async function getProfileUploadSignature(): Promise<CloudinaryUploadSignature> {
  const response = await api<CloudinarySignatureResponse>(
    "/api/profile/upload-signature",
    {
      method: "POST",
    }
  );

  if (!response.success || !response.data) {
    throw new Error("Unable to initialize profile photo upload.");
  }

  return response.data;
}

// Confirm content image upload.
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

// Confirm profile photo upload.
export async function confirmProfilePhotoUpload(
  assetId: string
): Promise<void> {
  const response = await api<ConfirmUploadResponse>(
    "/api/profile/confirm-upload",
    {
      method: "POST",
      body: JSON.stringify({ assetId }),
    }
  );

  if (!response.success) {
    throw new Error("Unable to confirm profile photo upload.");
  }
}