"use client";

import { useState, type SyntheticEvent } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  Save,
} from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/src/hooks/auth/useAuth";
import { useChangePassword } from "@/src/hooks/auth/useChangePassword";

export default function ChangePasswordForm() {
  const { logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const changePasswordMutation = useChangePassword();
  const isSaving = changePasswordMutation.isPending;

  function togglePasswordVisibility(field: keyof typeof showPasswords) {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please complete all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Your new password must contain at least 8 characters.");
      return;
    }

    if (newPassword.length > 128) {
      toast.error("Your new password cannot exceed 128 characters.");
      return;
    }

    if (newPassword === currentPassword) {
      toast.error("Your new password must differ from your current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("The passwords do not match.");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully. Please sign in again.");

      await logout();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to change your password."
      );
    }
  }

  function renderPasswordField(
    label: string,
    field: keyof typeof showPasswords,
    value: string,
    setter: (value: string) => void,
    autoComplete: string
  ) {
    return (
      <div>
        <label
          htmlFor={field}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        <div className="relative">
          <input
            id={field}
            type={showPasswords[field] ? "text" : "password"}
            value={value}
            onChange={(event) => setter(event.target.value)}
            autoComplete={autoComplete}
            disabled={isSaving}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/10 disabled:bg-gray-50"
          />

          <button
            type="button"
            onClick={() => togglePasswordVisibility(field)}
            disabled={isSaving}
            aria-label={showPasswords[field] ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-gray-700"
          >
            {showPasswords[field] ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sam-blue/10 text-sam-blue">
          <LockKeyhole className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">Change password</h2>
          <p className="text-sm text-gray-500">
            Update your password to keep your account secure.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {renderPasswordField(
          "Current password",
          "current",
          currentPassword,
          setCurrentPassword,
          "current-password"
        )}

        {renderPasswordField(
          "New password",
          "new",
          newPassword,
          setNewPassword,
          "new-password"
        )}

        {renderPasswordField(
          "Confirm new password",
          "confirm",
          confirmPassword,
          setConfirmPassword,
          "new-password"
        )}

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <KeyRound className="h-4 w-4 text-sam-blue" />
            Password requirements
          </div>

          <ul className="mt-2 space-y-1 text-xs text-gray-500">
            <li>• At least 8 characters.</li>
            <li>• No more than 128 characters.</li>
            <li>• Must differ from your current password.</li>
            <li>• Must match the confirmation field.</li>
          </ul>
        </div>

        <div className="flex justify-end border-t border-gray-100 pt-5">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-lg bg-sam-blue px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sam-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Update password
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}