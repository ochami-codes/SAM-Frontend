"use client";

import { useState } from "react";
import { ContentHeroImageField } from "./ContentHeroImageField";
export interface CreateCustomCategoryInput {
  name: string;
  sectionSlug: string;
  heroImage?: string;
}

interface CustomCategoryFormProps {
  sectionName: string;
  sectionSlug: string;
  onSubmit: (input: CreateCustomCategoryInput) => Promise<void>;
  onCancel: () => void;
}

export function CustomCategoryForm({
  sectionName,
  sectionSlug,
  onSubmit,
  onCancel,
}: CustomCategoryFormProps) {
  const [name, setName] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedName = name.trim();

    if (!normalizedName) {
      setError("Category name is required.");
      return;
    }

    if (!sectionSlug.trim()) {
      setError("Select a valid section first.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name: normalizedName,
        sectionSlug,
        ...(heroImage.trim()
          ? { heroImage: heroImage.trim() }
          : {}),
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create category."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Add Custom Category</h3>

        <p className="mt-1 text-sm text-gray-500">
          Adding a category under{" "}
          <span className="font-medium">{sectionName}</span>.
        </p>
      </div>

      <div>
        <label
          htmlFor="custom-category-name"
          className="mb-1 block text-sm font-medium"
        >
          Category Name
        </label>

        <input
          id="custom-category-name"
          type="text"
          value={name}
          onChange={(event) => {
            const nextName = event.target.value;
            setName(nextName);

          }}
          placeholder="e.g. Daniel's Visions"
          required
          maxLength={100}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="custom-category-image"
          className="mb-1 block text-sm font-medium"
        >
          Hero Image URL (Optional)
        </label>

        <ContentHeroImageField
  value={heroImage}
  onChange={setHeroImage}
  disabled={isSubmitting}
/>

        <p className="mt-1 text-xs text-gray-500">
          We can connect this field to your existing Cloudinary uploader.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Category"}
        </button>
      </div>
    </form>
  );
}