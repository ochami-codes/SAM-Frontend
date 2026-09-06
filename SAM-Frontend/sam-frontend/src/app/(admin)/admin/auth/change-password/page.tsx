"use client";

import { useState } from "react";

import AuthLayout from "@/src/components/layouts/AuthLayout";
import Button from "@/src/components/ui/Button";

import { useChangePassword } from "@/src/hooks/auth/useChangePassword";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const changePasswordMutation =
    useChangePassword();

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (newPassword.length < 8) {
      return;
    }

    if (newPassword !== confirmPassword) {
      return;
    }

    if (currentPassword === newPassword) {
      return;
    }

    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
    });
  }

  return (
    <AuthLayout
      title="Change Password"
      description="Update your administrator account password."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Current password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="mb-2 block text-sm font-medium text-sam-text"
          >
            Current password
          </label>

          <input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) =>
              setCurrentPassword(event.target.value)
            }
            placeholder="Enter current password"
            required
            disabled={
              changePasswordMutation.isPending
            }
            className="
              w-full rounded-xl border border-sam-border
              bg-sam-surface px-4 py-3
              text-sm text-sam-text
              outline-none
              transition
              placeholder:text-sam-muted
              focus:border-sam-blue
              focus:ring-2 focus:ring-sam-blue/20
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* New password */}
        <div>
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium text-sam-text"
          >
            New password
          </label>

          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) =>
              setNewPassword(event.target.value)
            }
            placeholder="Enter new password"
            required
            minLength={8}
            maxLength={128}
            disabled={
              changePasswordMutation.isPending
            }
            className="
              w-full rounded-xl border border-sam-border
              bg-sam-surface px-4 py-3
              text-sm text-sam-text
              outline-none
              transition
              placeholder:text-sam-muted
              focus:border-sam-blue
              focus:ring-2 focus:ring-sam-blue/20
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-sam-text"
          >
            Confirm new password
          </label>

          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            placeholder="Confirm new password"
            required
            minLength={8}
            maxLength={128}
            disabled={
              changePasswordMutation.isPending
            }
            className="
              w-full rounded-xl border border-sam-border
              bg-sam-surface px-4 py-3
              text-sm text-sam-text
              outline-none
              transition
              placeholder:text-sam-muted
              focus:border-sam-blue
              focus:ring-2 focus:ring-sam-blue/20
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* Client-side validation */}
        {newPassword.length > 0 &&
          newPassword.length < 8 && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              New password must be at least 8
              characters long.
            </p>
          )}

        {confirmPassword.length > 0 &&
          newPassword !== confirmPassword && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              New passwords do not match.
            </p>
          )}

        {currentPassword.length > 0 &&
          currentPassword === newPassword && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              Your new password must be different
              from your current password.
            </p>
          )}

        <Button
          type="submit"
          className="w-full"
          disabled={
            changePasswordMutation.isPending ||
            newPassword.length < 8 ||
            newPassword !== confirmPassword ||
            currentPassword === newPassword
          }
        >
          {changePasswordMutation.isPending
            ? "Changing Password..."
            : "Change Password"}
        </Button>
      </form>
    </AuthLayout>
  );
}