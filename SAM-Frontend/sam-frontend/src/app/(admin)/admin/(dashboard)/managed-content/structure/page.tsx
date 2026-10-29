"use client";

import { useState } from "react";
import Link from "next/link";

import { useAdminContentMetadata } from "@/src/hooks/content/useAdminContentMetadata";
import { useCreateContentMetadata } from "@/src/hooks/managed-content/useCreateContentMetadata";

import { CustomSectionForm } from "@/src/components/admin/managed-content/metadata/CustomSectionForm";
import { CustomCategoryForm } from "@/src/components/admin/managed-content/metadata/CustomCategoryForm";

export default function ManagedContentStructurePage() {
  const {
    data: sections = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useAdminContentMetadata();

  const createMutation = useCreateContentMetadata();

  const [selectedSectionSlug, setSelectedSectionSlug] = useState("");
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

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

  if (isLoading) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        Loading content structure...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-red-800">
          Unable to load content structure
        </h2>

        <p className="mt-1 text-sm text-red-700">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred."}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage Content Structure
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Organize your ministry content into sections and categories.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/managed-content"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Content
          </Link>

          <button
            type="button"
            onClick={() => setIsCreatingSection(true)}
            className="rounded-md bg-sam-blue px-4 py-2 text-sm font-medium text-white hover:bg-sam-blue-dark"
          >
            Add Section
          </button>
        </div>
      </header>

      {isCreatingSection && (
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <CustomSectionForm
            onSubmit={handleCreateSection}
            onCancel={() => setIsCreatingSection(false)}
          />
        </section>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <section className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold text-gray-900">
              Sections
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select a section to manage its categories.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {sections.length === 0 ? (
              <p className="p-5 text-sm text-gray-500">
                No sections found.
              </p>
            ) : (
              sections.map((section) => {
                const isSelected =
                  section.slug === selectedSectionSlug;

                return (
                  <button
                    key={section.slug}
                    type="button"
                    onClick={() => {
                      setSelectedSectionSlug(section.slug);
                      setIsCreatingCategory(false);
                    }}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition ${
                      isSelected
                        ? "bg-sam-blue/10"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">
                        {section.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {section.slug}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      {section.categories.length}{" "}
                      {section.categories.length === 1
                        ? "category"
                        : "categories"}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white">
          {!selectedSection ? (
            <div className="flex min-h-64 items-center justify-center p-8 text-center">
              <div>
                <h2 className="font-medium text-gray-900">
                  Select a section
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose a section on the left to view and manage its
                  categories.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {selectedSection.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Categories in this section
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreatingCategory(true)}
                  className="rounded-md bg-sam-blue px-3 py-2 text-sm font-medium text-white hover:bg-sam-blue-dark"
                >
                  Add Category
                </button>
              </div>

              {isCreatingCategory && (
                <div className="border-b border-gray-200 p-5">
                  <CustomCategoryForm
                    key={selectedSection.slug}
                    sectionName={selectedSection.name}
                    sectionSlug={selectedSection.slug}
                    onSubmit={handleCreateCategory}
                    onCancel={() => setIsCreatingCategory(false)}
                  />
                </div>
              )}

              <div className="divide-y divide-gray-100">
                {selectedSection.categories.length === 0 ? (
                  <p className="p-5 text-sm text-gray-500">
                    This section has no categories yet.
                  </p>
                ) : (
                  selectedSection.categories.map((category) => (
                    <div
                      key={category.slug}
                      className="flex items-center justify-between gap-4 px-5 py-4"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">
                          {category.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {category.slug}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}