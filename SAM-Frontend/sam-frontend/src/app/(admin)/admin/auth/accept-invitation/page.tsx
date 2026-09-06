"use client";

import { useRouter, useSearchParams } from "next/navigation";

import AuthLayout from "@/src/components/layouts/AuthLayout";
import Button from "@/src/components/ui/Button";
import Card from "@/src/components/ui/Card";

import { useAcceptInvitation } from "@/src/hooks/auth/useAcceptInvitation";

import { useState } from "react";

export default function AcceptInvitationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const acceptInvitationMutation =
    useAcceptInvitation();

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!token) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    acceptInvitationMutation.mutate(
      {
        token,
        password,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            router.push("/admin/auth/login");
          }, 1500);
        },
      }
    );
  }

  if (acceptInvitationMutation.isSuccess) {
    return (
      <AuthLayout
        title="Invitation accepted"
        description="Your administrator account has been created successfully."
      >
        <Card className="p-6">
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sam-blue/10">
              <span className="text-xl text-sam-deep-blue">
                ✓
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-sam-text">
                Account created successfully
              </h2>

              <p className="mt-2 text-sm text-sam-muted">
                You can now sign in with your new
                administrator account.
              </p>
            </div>
          </div>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Accept invitation"
      description="Create your administrator password to activate your account."
    >
      <Card className="p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-sam-text"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              disabled={
                acceptInvitationMutation.isPending
              }
              placeholder="Enter your password"
              className="w-full rounded-lg border border-sam-border bg-sam-surface px-4 py-3 text-sam-text outline-none transition focus:border-sam-blue-dark focus:ring-2 focus:ring-sam-blue/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-sam-text"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              disabled={
                acceptInvitationMutation.isPending
              }
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-sam-border bg-sam-surface px-4 py-3 text-sam-text outline-none transition focus:border-sam-blue-dark focus:ring-2 focus:ring-sam-blue/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Password mismatch */}
          {password !== confirmPassword &&
            confirmPassword.length > 0 && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                Passwords do not match.
              </div>
            )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={
              acceptInvitationMutation.isPending ||
              !token ||
              password !== confirmPassword
            }
            className="w-full"
          >
            {acceptInvitationMutation.isPending
              ? "Creating account..."
              : "Accept invitation"}
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}
