"use client";

import { useState, type SyntheticEvent } from "react";
import { X } from "lucide-react";

interface RenameMetadataDialogProps {
  type: "section" | "category";
  currentName: string;
  isPending: boolean;
  onSubmit: (newName: string) => Promise<void>;
  onClose: () => void;
}

export function RenameMetadataDialog({
  type,
  currentName,
  isPending,
  onSubmit,
  onClose,
}: RenameMetadataDialogProps) {
  const [name, setName] = useState(currentName);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName || trimmedName === currentName) {
      return;
    }

    await onSubmit(trimmedName);
  }

  const title =
    type === "section" ? "Rename Section" : "Rename Category";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isPending) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rename-dialog-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2
            id="rename-dialog-title"
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close dialog"
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="metadata-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {type === "section" ? "Section name" : "Category name"}
            </label>

            <input
              id="metadata-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              autoFocus
              required
              disabled={isPending}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 disabled:bg-gray-100"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isPending ||
                !name.trim() ||
                name.trim() === currentName
              }
              className="rounded-md bg-sam-blue px-4 py-2 text-sm font-medium text-white hover:bg-sam-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}