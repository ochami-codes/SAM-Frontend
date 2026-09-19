"use client";

interface ManagedContentFormActionsProps {
  mode: "create" | "edit";
  isSubmitting: boolean;
  onCancel: () => void;
}

export function ManagedContentFormActions({
  mode,
  isSubmitting,
  onCancel,
}: ManagedContentFormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-sam-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-sam-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Saving..."
          : mode === "create"
            ? "Create Content"
            : "Save Changes"}
      </button>
    </div>
  );
}