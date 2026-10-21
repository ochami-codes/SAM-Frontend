"use client";

import { useRouter } from "next/navigation";

import { ManagedContentForm, type ManagedContentFormData } from "@/src/components/admin/managed-content/ManagedContentForm";
import { useCreateManagedContent } from "@/src/hooks/managed-content/useCreateManagedContent";

export default function NewManagedContentPage() {
  const router = useRouter();

  const createMutation = useCreateManagedContent();

  function handleSubmit(data: ManagedContentFormData) {
  createMutation.mutate(data);
}

  function handleCancel() {
    router.push("/admin/managed-content");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Create Managed Content
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create new content that can be managed and published
          from the database.
        </p>
      </div>

      <ManagedContentForm
        mode="create"
        isSubmitting={createMutation.isPending}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}