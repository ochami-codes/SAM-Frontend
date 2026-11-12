"use client";

import { KeyRound, LoaderCircle, X } from "lucide-react";

import type { TwoFactorPasswordFormProps } from "./types";

export default function TwoFactorPasswordForm({
  password,
  isLoading,
  onPasswordChange,
  onSubmit,
  onCancel,
  mode,
}: TwoFactorPasswordFormProps) {
  const isRequired = mode === "required";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-5 rounded-xl border border-gray-200 bg-white p-5"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <KeyRound className="text-blue-600" size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            Verify your identity
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Enter your current password to continue with
            two-factor authentication setup.
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="two-factor-password"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Current password
        </label>

        <input
          id="two-factor-password"
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          placeholder="Enter your current password"
          autoComplete="current-password"
          required
          disabled={isLoading}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        {!isRequired && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <X size={16} />
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading || !password.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              Verifying...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </form>
  );
}