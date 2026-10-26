import { getCloudinaryUploadSignature } from "@/src/lib/api/cloudinary";

export interface CloudinaryUploadResult {
public_id: string;
secure_url: string;
resource_type: string;
format: string;
bytes: number;
}

interface CloudinaryUploadResponse {
secure_url?: string;
public_id?: string;
resource_type?: string;
format?: string;
bytes?: number;
error?: {
message?: string;
};
}

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
"image/jpeg",
"image/png",
"image/webp",
] as const;

export function validateImageFile(file: File): string | null {
if (
!ALLOWED_IMAGE_TYPES.includes(
file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
)
) {
return "Choose a JPEG, PNG, or WebP image.";
}

if (file.size > MAX_IMAGE_SIZE) {
return "The image must not exceed 5 MB.";
}

return null;
}

export interface UploadToCloudinaryOptions {
file: File;
onProgress?: (progress: number) => void;
}

export async function uploadToCloudinary({
file,
onProgress,
}: UploadToCloudinaryOptions): Promise<CloudinaryUploadResult> {
const validationError = validateImageFile(file);

if (validationError) {
throw new Error(validationError);
}

const signature = await getCloudinaryUploadSignature();

const formData = new FormData();

formData.append("file", file);
formData.append("api_key", signature.apiKey);
formData.append("timestamp", String(signature.timestamp));
formData.append("signature", signature.signature);
formData.append("folder", signature.folder);

return new Promise<CloudinaryUploadResult>((resolve, reject) => {
const xhr = new XMLHttpRequest();

xhr.open(
  "POST",
  `https://api.cloudinary.com/v1_1/${encodeURIComponent(
    signature.cloudName
  )}/image/upload`
);

xhr.upload.onprogress = (event) => {
  if (event.lengthComputable) {
    const progress = Math.round(
      (event.loaded / event.total) * 100
    );

    onProgress?.(progress);
  }
};

xhr.onload = () => {
  let response: CloudinaryUploadResponse;

  try {
    response = JSON.parse(xhr.responseText);
  } catch {
    reject(new Error("Invalid response from Cloudinary."));
    return;
  }

  if (xhr.status < 200 || xhr.status >= 300) {
    reject(
      new Error(
        response.error?.message ?? "Image upload failed."
      )
    );
    return;
  }

  if (
    !response.secure_url ||
    !response.public_id ||
    response.resource_type !== "image" ||
    !response.format ||
    typeof response.bytes !== "number"
  ) {
    reject(
      new Error(
        "Cloudinary returned incomplete image details."
      )
    );
    return;
  }

  resolve({
    public_id: response.public_id,
    secure_url: response.secure_url,
    resource_type: response.resource_type,
    format: response.format,
    bytes: response.bytes,
  });
};

xhr.onerror = () => {
  reject(
    new Error("Network error while uploading the image.")
  );
};

xhr.onabort = () => {
  reject(new Error("Image upload was cancelled."));
};

xhr.send(formData);
});
}
