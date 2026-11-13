import type { AdminContentMetadataSection } from "@/src/lib/api/contentMetadata";

import { CustomCategoryForm } from "@/src/components/admin/managed-content/metadata/CustomCategoryForm";
import { isDefaultContentCategory } from "@/src/config/contentMetadata";

import { MetadataActions } from "./MetadataActions";

interface CategoriesPanelProps {
  section: AdminContentMetadataSection | undefined;
  isCreatingCategory: boolean;
  onCreateCategory: () => void;
  onCancelCreate: () => void;
  onSubmit: (input: {
    name: string;
    sectionSlug: string;
    heroImage?: string;
  }) => Promise<void>;
  onRenameCategory?: (
    category: AdminContentMetadataSection["categories"][number],
    sectionSlug: string
  ) => void;
  onDeleteCategory?: (
    category: AdminContentMetadataSection["categories"][number],
    sectionSlug: string
  ) => void;
  deletingCategorySlug?: string | null;
}

export function CategoriesPanel({
  section,
  isCreatingCategory,
  onCreateCategory,
  onCancelCreate,
  onSubmit,
  onRenameCategory,
  onDeleteCategory,
  deletingCategorySlug,
}: CategoriesPanelProps) {
  if (!section) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white">
        <div className="flex min-h-64 items-center justify-center p-8 text-center">
          <div>
            <h2 className="font-medium text-gray-900">Select a section</h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose a section on the left to view and manage its categories.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">{section.name}</h2>
          <p className="mt-1 text-sm text-gray-500">
            Categories in this section
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateCategory}
          className="rounded-md bg-sam-blue px-3 py-2 text-sm font-medium text-white hover:bg-sam-blue-dark"
        >
          Add Category
        </button>
      </div>

      {isCreatingCategory && (
        <div className="border-b border-gray-200 p-5">
          <CustomCategoryForm
            key={section.slug}
            sectionName={section.name}
            sectionSlug={section.slug}
            onSubmit={onSubmit}
            onCancel={onCancelCreate}
          />
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {section.categories.length === 0 ? (
          <p className="p-5 text-sm text-gray-500">
            This section has no categories yet.
          </p>
        ) : (
          section.categories.map((category) => {
            const isDefault = isDefaultContentCategory(
              section.slug,
              category.slug
            );

            return (
              <div
                key={category.slug}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">{category.name}</p>
                  <p className="mt-1 truncate text-xs text-gray-500">
                    {category.slug}
                  </p>
                </div>

                {!isDefault && onRenameCategory && onDeleteCategory && (
                  <MetadataActions
                    onRename={() => onRenameCategory(category, section.slug)}
                    onDelete={() => onDeleteCategory(category, section.slug)}
                    isDeleting={deletingCategorySlug === category.slug}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}