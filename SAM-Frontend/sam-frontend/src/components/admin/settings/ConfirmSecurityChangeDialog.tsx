"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmSecurityChangeDialogProps {
  isOpen: boolean;
  enabled: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmSecurityChangeDialog({
  isOpen,
  enabled,
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmSecurityChangeDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isLoading
        ) {
          onCancel();
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="security-dialog-title"
        aria-describedby="security-dialog-description"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Close dialog"
            className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h3
          id="security-dialog-title"
          className="mt-4 text-lg font-semibold text-gray-900"
        >
          {enabled
            ? "Enable global two-factor authentication?"
            : "Disable global two-factor authentication?"}
        </h3>

        <p
          id="security-dialog-description"
          className="mt-2 text-sm leading-6 text-gray-600"
        >
          {enabled
            ? "All administrators will be required to configure two-factor authentication before accessing protected administrative features. Existing sessions will be invalidated."
            : "Administrators will no longer be required to use two-factor authentication under the global policy. Existing sessions will also be invalidated."}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-sam-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-sam-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? "Updating..."
              : enabled
                ? "Enable enforcement"
                : "Disable enforcement"}
          </button>
        </div>
      </div>
    </div>
  );
}