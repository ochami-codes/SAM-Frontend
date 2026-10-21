"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";

import {
  ManagedContentForm,
  type ManagedContentFormData,
} from "@/src/components/admin/managed-content/ManagedContentForm";

import type {
  ManagedContentIdentifier,
} from "@/src/lib/api/managedContent";

import { useManagedContent } from "@/src/hooks/managed-content/useManagedContent";
import { useUpdateManagedContent } from "@/src/hooks/managed-content/useUpdateManagedContent";

interface EditManagedContentPageProps {
  params: Promise<{
    segments: string[];
  }>;
}

function getIdentifier(
  segments: string[]
): ManagedContentIdentifier | null {
  if (segments.length === 2 && segments[0] === "articles") {
    return {
      section: "articles",
      slug: segments[1],
    };
  }

  if (
    segments.length === 3 &&
    (
      segments[0] === "bible-study" ||
      segments[0] === "family" ||
      segments[0] === "health"
    )
  ) {
    return {
      section: segments[0],
      category: segments[1],
      slug: segments[2],
    };
  }

  return null;
}

export default function EditManagedContentPage({
  params,
}: EditManagedContentPageProps) {
  const router = useRouter();
  const { segments } = use(params);

  const identifier = useMemo(
    () => getIdentifier(segments),
    [segments]
  );

  const contentQuery = useManagedContent(identifier);
  const updateMutation = useUpdateManagedContent();

  function handleSubmit(data: ManagedContentFormData) {
    if (!identifier) {
      return;
    }

    updateMutation.mutate({
      identifier,
      data,
    });
  }

  function handleCancel() {
    router.push("/admin/managed-content");
  }

  if (!identifier) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h1 className="text-lg font-semibold text-red-800">
            Invalid content URL
          </h1>

          <p className="mt-1 text-sm text-red-700">
            The managed content path is not valid.
          </p>
        </div>
      </div>
    );
  }

  if (contentQuery.isLoading) {
    return (
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-gray-500">
          Loading content...
        </p>
      </div>
    );
  }

  if (contentQuery.isError || !contentQuery.data) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h1 className="text-lg font-semibold text-red-800">
            Content not found
          </h1>

          <p className="mt-1 text-sm text-red-700">
            The requested managed content could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Managed Content
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update the content and save your changes.
        </p>
      </div>

      <ManagedContentForm
        mode="edit"
        initialData={contentQuery.data}
        isSubmitting={updateMutation.isPending}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}