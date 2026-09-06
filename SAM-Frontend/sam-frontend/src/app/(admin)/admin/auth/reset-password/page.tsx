"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import AuthLayout from "@/src/components/layouts/AuthLayout";
import Button from "@/src/components/ui/Button";

import { useResetPassword } from "@/src/hooks/auth/useResetPassword";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const resetPasswordMutation =
    useResetPassword();

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!token) {
      return;
    }

    if (password.length < 8) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    resetPasswordMutation.mutate(
      {
        token,
        password,
      },
      {
        onSuccess: () => {
          router.push("/admin/auth/login");
        },
      }
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      description="Create a new password for your administrator account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* New password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-sam-text"
          >
            New password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter new password"
            required
            minLength={8}
            maxLength={128}
            disabled={
              resetPasswordMutation.isPending
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
              resetPasswordMutation.isPending
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
        {password.length > 0 &&
          password.length < 8 && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              Password must be at least 8
              characters long.
            </p>
          )}

        {confirmPassword.length > 0 &&
          password !== confirmPassword && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              Passwords do not match.
            </p>
          )}

        <Button
          type="submit"
          className="w-full"
          disabled={
            resetPasswordMutation.isPending ||
            !token ||
            password.length < 8 ||
            password !== confirmPassword
          }
        >
          {resetPasswordMutation.isPending
            ? "Resetting Password..."
            : "Reset Password"}
        </Button>
      </form>
    </AuthLayout>
  );
}
