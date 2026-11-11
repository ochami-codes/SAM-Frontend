"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Camera, ImagePlus, LoaderCircle, UserRound } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/src/hooks/auth/useAuth";

import {
  uploadToCloudinary,
  validateImageFile,
} from "@/src/lib/api/uploadToCloudinary";

import { confirmProfilePhotoUpload } from "@/src/lib/api/cloudinary";

interface ProfilePhotoUploaderProps {
  currentImage: string | null;
  onUploaded?: (imageUrl: string) => void;
}

export default function ProfilePhotoUploader({
  currentImage,
  onUploaded,
}: ProfilePhotoUploaderProps) {
  const { refreshAuth } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [preview, setPreview] = useState<string | null>(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isUploading) {
      setPreview(currentImage);
    }
  }, [currentImage, isUploading]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  function clearObjectUrl() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const validationError = validateImageFile(file);

    if (validationError) {
      toast.error(validationError);
      event.target.value = "";
      return;
    }

    clearObjectUrl();

    const localPreview = URL.createObjectURL(file);
    objectUrlRef.current = localPreview;

    setPreview(localPreview);
    setProgress(0);
    setIsUploading(true);

    try {
      const uploadedAsset = await uploadToCloudinary({
        file,
        purpose: "profile",
        onProgress: setProgress,
      });

      await confirmProfilePhotoUpload(uploadedAsset.asset_id);

      clearObjectUrl();

      setPreview(uploadedAsset.secure_url);

      onUploaded?.(uploadedAsset.secure_url);

      await refreshAuth();

      toast.success("Profile photo updated successfully.");
    } catch (error) {
      clearObjectUrl();
      setPreview(currentImage);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update your profile photo.",
      );
    } finally {
      setIsUploading(false);
      setProgress(0);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      {/* Profile photo */}
      <div className="relative">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-sm">
          {preview ? (
            <img
              src={preview}
              alt="Profile photo"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound className="h-12 w-12 text-gray-400" />
          )}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          aria-label="Change profile photo"
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-sam-blue text-white shadow-sm transition hover:bg-sam-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Upload controls */}
      <div className="flex flex-col items-center gap-2 sm:items-start">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Profile photo
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            JPEG, PNG or WebP. Maximum size: 5 MB.
          </p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <ImagePlus className="h-4 w-4" />
              Change photo
            </>
          )}
        </button>

        {isUploading && (
          <div className="w-full min-w-40">
            <div className="mb-1 flex justify-between text-xs text-gray-500">
              <span>Uploading</span>
              <span>{progress}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-sam-blue transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />
    </div>
  );
}