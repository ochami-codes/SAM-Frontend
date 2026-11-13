"use client";

import { useState } from "react";

import { useAdminContentMetadata } from "@/src/hooks/content/useAdminContentMetadata";
import { useCreateContentMetadata } from "@/src/hooks/managed-content/useCreateContentMetadata";

import { CustomSectionForm } from "@/src/components/admin/managed-content/metadata/CustomSectionForm";

import { StructurePageHeader } from "@/src/components/admin/managed-content/structure/StructurePageHeader";
import { SectionsPanel } from "@/src/components/admin/managed-content/structure/SectionsPanel";
import { CategoriesPanel } from "@/src/components/admin/managed-content/structure/CategoriesPanel";
import { StructurePageState } from "@/src/components/admin/managed-content/structure/StructurePageState";
import { useUpdateContentMetadata } from "@/src/hooks/managed-content/useUpdateContentMetadata";
import { useDeleteContentMetadata } from "@/src/hooks/managed-content/useDeleteContentMetadata";
import { RenameMetadataDialog } from "@/src/components/admin/managed-content/structure/RenameMetadataDialog";
import { DeleteMetadataDialog } from "@/src/components/admin/managed-content/structure/DeleteMetadataDialog";

export default function ManagedContentStructurePage() {
  const {
    data: sections = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useAdminContentMetadata();

  const createMutation = useCreateContentMetadata();
  const deleteMutation = useDeleteContentMetadata();
  const updateMutation = useUpdateContentMetadata();
  const [selectedSectionSlug, setSelectedSectionSlug] = useState("");
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [renameTarget, setRenameTarget] = useState<{
  type: "section" | "category";
  slug: string;
  name: string;
  sectionSlug?: string;
} | null>(null);
const [deleteTarget, setDeleteTarget] = useState<{
  type: "section" | "category";
  slug: string;
  name: string;
  sectionSlug?: string;
} | null>(null);

  const selectedSection = sections.find(
    (section) => section.slug === selectedSectionSlug
  );

  async function handleCreateSection(input: {
    name: string;
    heroImage?: string;
  }) {
    await createMutation.mutateAsync({
      name: input.name,
      type: "section",
      ...(input.heroImage
        ? { heroImage: input.heroImage }
        : {}),
    });

    setIsCreatingSection(false);
    await refetch();
  }

  async function handleCreateCategory(input: {
    name: string;
    sectionSlug: string;
    heroImage?: string;
  }) {
    await createMutation.mutateAsync({
      name: input.name,
      type: "category",
      sectionSlug: input.sectionSlug,
      ...(input.heroImage
        ? { heroImage: input.heroImage }
        : {}),
    });

    setIsCreatingCategory(false);
    await refetch();
  }

  function handleRenameSection(
  section: (typeof sections)[number]
) {
  setRenameTarget({
    type: "section",
    slug: section.slug,
    name: section.name,
  });
}
function handleDeleteSection(
  section: (typeof sections)[number]
) {
  setDeleteTarget({
    type: "section",
    slug: section.slug,
    name: section.name,
  });
}

function handleRenameCategory(
  category: (typeof sections)[number]["categories"][number],
  sectionSlug: string
) {
  setRenameTarget({
    type: "category",
    slug: category.slug,
    name: category.name,
    sectionSlug,
  });
}

async function handleSubmitRename(newName: string) {
  if (!renameTarget) return;

  await updateMutation.mutateAsync({
    type: renameTarget.type,
    slug: renameTarget.slug,
    sectionSlug: renameTarget.sectionSlug,
    input: {
      name: newName,
    },
  });

  setRenameTarget(null);
}

function handleDeleteCategory(
  category: (typeof sections)[number]["categories"][number],
  sectionSlug: string
) {
  setDeleteTarget({
    type: "category",
    slug: category.slug,
    name: category.name,
    sectionSlug,
  });
}
async function handleConfirmDelete() {
  if (!deleteTarget) return;

  await deleteMutation.mutateAsync({
    type: deleteTarget.type,
    slug: deleteTarget.slug,
    sectionSlug: deleteTarget.sectionSlug,
  });

  if (
    deleteTarget.type === "section" &&
    selectedSectionSlug === deleteTarget.slug
  ) {
    setSelectedSectionSlug("");
    setIsCreatingCategory(false);
  }

  setDeleteTarget(null);
}
  const pageState = (
    <StructurePageState
      isLoading={isLoading}
      isError={isError}
      error={error}
      onRetry={() => refetch()}
    />
  );

  if (isLoading || isError) {
    return pageState;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <StructurePageHeader
        onCreateSection={() => setIsCreatingSection(true)}
      />

      {isCreatingSection && (
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <CustomSectionForm
            onSubmit={handleCreateSection}
            onCancel={() => setIsCreatingSection(false)}
          />
        </section>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <SectionsPanel
  sections={sections}
  selectedSectionSlug={selectedSectionSlug}
  onSelectSection={(slug) => {
    setSelectedSectionSlug(slug);
    setIsCreatingCategory(false);
  }}
  onRenameSection={handleRenameSection}
  onDeleteSection={handleDeleteSection}
  deletingSectionSlug={
    deleteMutation.isPending &&
    deleteMutation.variables?.type === "section"
      ? deleteMutation.variables.slug
      : null
  }
/>

        <CategoriesPanel
  section={selectedSection}
  isCreatingCategory={isCreatingCategory}
  onCreateCategory={() => setIsCreatingCategory(true)}
  onCancelCreate={() => setIsCreatingCategory(false)}
  onSubmit={handleCreateCategory}
  onRenameCategory={handleRenameCategory}
  onDeleteCategory={handleDeleteCategory}
  deletingCategorySlug={
    deleteMutation.isPending &&
    deleteMutation.variables?.type === "category"
      ? deleteMutation.variables.slug
      : null
  }
/>
{renameTarget && (
  <RenameMetadataDialog
    type={renameTarget.type}
    currentName={renameTarget.name}
    isPending={updateMutation.isPending}
    onSubmit={handleSubmitRename}
    onClose={() => setRenameTarget(null)}
  />
)}
{deleteTarget && (
  <DeleteMetadataDialog
    type={deleteTarget.type}
    name={deleteTarget.name}
    isPending={deleteMutation.isPending}
    onConfirm={handleConfirmDelete}
    onClose={() => setDeleteTarget(null)}
  />
)}
      </div>
    </div>
  );
}