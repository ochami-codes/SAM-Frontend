"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteMetadataDialogProps {
  type: "section" | "category";
  name: string;
  isPending: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export function DeleteMetadataDialog({
  type,
  name,
  isPending,
  onConfirm,
  onClose,
}: DeleteMetadataDialogProps) {
  const title =
    type === "section" ? "Delete Section" : "Delete Category";

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
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-2.5 text-red-600">
              <AlertTriangle size={20} />
            </div>

            <h2
              id="delete-dialog-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
          </div>

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

        <div className="mt-5">
          <p
            id="delete-dialog-description"
            className="text-sm leading-6 text-gray-600"
          >
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              {name}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-red-600">
            This action cannot be undone. Metadata currently used by
            managed content cannot be deleted.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}