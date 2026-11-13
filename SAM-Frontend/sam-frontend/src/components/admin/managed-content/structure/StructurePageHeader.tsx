import Link from "next/link";

interface StructurePageHeaderProps {
  onCreateSection: () => void;
}

export function StructurePageHeader({
  onCreateSection,
}: StructurePageHeaderProps) {
  return (
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
          onClick={onCreateSection}
          className="rounded-md bg-sam-blue px-4 py-2 text-sm font-medium text-white hover:bg-sam-blue-dark"
        >
          Add Section
        </button>
      </div>
    </header>
  );
}