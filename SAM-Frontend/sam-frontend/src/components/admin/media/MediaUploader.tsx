"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  ALLOWED_IMAGE_TYPES,
  type CloudinaryUploadResult,
  uploadToCloudinary,
  validateImageFile,
} from "@/src/lib/api/uploadToCloudinary";
import { confirmCloudinaryUpload } from "@/src/lib/api/cloudinary";

interface MediaUploaderProps {
  onUploaded: () => void;
}

export function MediaUploader({ onUploaded }: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pendingUpload, setPendingUpload] = useState<CloudinaryUploadResult | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  e.target.value = "";

  if (!file) return;

  if (pendingUpload) {
    toast.error("Please confirm the previous upload before uploading another.");
    return;
  }

  const error = validateImageFile(file);

  if (error) {
    toast.error(error);
    return;
  }

  setUploading(true);
  setProgress(0);

  try {
    const uploadedAsset = await uploadToCloudinary({
      file,
      onProgress: setProgress,
    });

    setPendingUpload(uploadedAsset);

    // Confirmation handles its own errors.
    await handleConfirmUpload(uploadedAsset);
  } catch (err) {
    toast.error(
      err instanceof Error
        ? err.message
        : "Unable to upload image."
    );
  } finally {
    setUploading(false);
    setProgress(0);
  }
}

  async function handleConfirmUpload(upload: CloudinaryUploadResult) {
    setConfirming(true);
    try {
      await confirmCloudinaryUpload(upload.asset_id);
      setPendingUpload(null);
      await queryClient.invalidateQueries({ queryKey: ["cloudinary-media"] });
      toast.success("Image uploaded successfully.");
      onUploaded();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Image uploaded, but confirmation failed."
      );
    } finally {
      setConfirming(false);
    }
  }

  const isBusy = uploading || confirming;

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        onChange={handleFileChange}
        disabled={isBusy}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isBusy || !!pendingUpload}
        className="flex min-h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition hover:border-sam-blue hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading ? (
          <>
            <Upload size={28} className="mb-3 animate-pulse text-sam-blue" />
            <span className="text-sm font-medium text-gray-800">Uploading image...</span>
          </>
        ) : (
          <>
            <ImagePlus size={32} className="mb-3 text-gray-500" />
            <span className="text-sm font-medium text-gray-800">Choose an image to upload</span>
            <span className="mt-1 text-xs text-gray-500">JPEG, PNG, or WebP · Maximum 5 MB</span>
          </>
        )}
      </button>

      {uploading && (
        <div className="space-y-1" role="status" aria-live="polite">
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-sam-blue transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">Upload progress: {progress}%</p>
        </div>
      )}

      {pendingUpload && !uploading && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm">
          <p className="text-amber-800">Image uploaded, but confirmation is pending.</p>
          <button
            type="button"
            onClick={() => handleConfirmUpload(pendingUpload)}
            disabled={confirming}
            className="mt-2 text-sm font-medium text-sam-blue hover:underline disabled:opacity-50"
          >
            {confirming ? "Confirming..." : "Retry confirmation"}
          </button>
        </div>
      )}
    </div>
  );
}
