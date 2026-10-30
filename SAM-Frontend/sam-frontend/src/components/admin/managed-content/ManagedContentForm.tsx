"use client";

import { useEffect, useState } from "react";

import { DEFAULT_CONTENT_METADATA } from "@/src/config/contentMetadata";
import { useAdminContentMetadata } from "@/src/hooks/content/useAdminContentMetadata";

import type {
  ManagedContent,
  ManagedContentSection,
  ManagedContentStatus,
} from "@/src/lib/api/managedContent";

import {
  ManagedContentMetadata,
  type ManagedContentMetadataValues,
} from "./ManagedContentMetadata";

import { ManagedContentEditor } from "./ManagedContentEditor";
import { ManagedContentFormActions } from "./ManagedContentFormActions";
import { ManagedContentMdxPreview } from "./ManagedContentMdxPreview";

export interface ManagedContentFormData {
  title: string;
  slug: string;
  section: ManagedContentSection;
  category?: string;
  description?: string;
  content: string;
  heroImage?: string;
  order?: number;
  status?: ManagedContentStatus;
}

interface ManagedContentFormProps {
  mode: "create" | "edit";
  initialData?: ManagedContent;
  isSubmitting: boolean;
  onSubmit: (data: ManagedContentFormData) => void;
  onCancel: () => void;
}

function createInitialValues(
  data?: ManagedContent
): ManagedContentMetadataValues {
  return {
    title: data?.title ?? "",
    slug: data?.slug ?? "",
    section: data?.section ?? "articles",
    category: data?.category ?? "",
    description: data?.description ?? "",
    heroImage: data?.heroImage ?? "",
    order: data?.order,
    status: data?.status ?? "draft",
  };
}

export function ManagedContentForm({
  mode,
  initialData,
  isSubmitting,
  onSubmit,
  onCancel,
}: ManagedContentFormProps) {
  const {
    data: sections = DEFAULT_CONTENT_METADATA,
  } = useAdminContentMetadata();

  const [metadata, setMetadata] =
    useState<ManagedContentMetadataValues>(
      () => createInitialValues(initialData)
    );

  const [content, setContent] = useState(
    initialData?.content ?? ""
  );

  useEffect(() => {
    if (!initialData) return;

    setMetadata(createInitialValues(initialData));
    setContent(initialData.content);
  }, [initialData]);

  function handleMetadataChange<
    K extends keyof ManagedContentMetadataValues
  >(
    field: K,
    value: ManagedContentMetadataValues[K]
  ) {
    setMetadata((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const category = metadata.category.trim();
    const description = metadata.description.trim();

    onSubmit({
      title: metadata.title.trim(),
      slug: metadata.slug.trim().toLowerCase(),
      section: metadata.section,

      ...(metadata.section !== "articles" &&
        category && {
          category: category.toLowerCase(),
        }),

      ...(metadata.section === "articles" &&
        description && {
          description,
        }),

      content,

      ...(metadata.heroImage.trim() && {
        heroImage: metadata.heroImage.trim(),
      }),

      ...(metadata.order !== undefined && {
        order: metadata.order,
      }),

      ...(mode === "create" && {
        status: metadata.status,
      }),
    });
  }

  const preview = (
    <ManagedContentMdxPreview
      title={metadata.title}
      heroImage={metadata.heroImage}
      section={metadata.section}
      category={metadata.category}
      content={content}
    />
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <ManagedContentMetadata
        values={metadata}
        mode={mode}
        sections={sections}
        onChange={handleMetadataChange}
      />

      <ManagedContentEditor
        value={content}
        onChange={setContent}
        preview={preview}
      />

      <ManagedContentFormActions
        mode={mode}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
      />
    </form>
  );
}
