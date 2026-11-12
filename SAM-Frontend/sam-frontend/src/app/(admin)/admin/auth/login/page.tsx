"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AuthLayout from "@/src/components/layouts/AuthLayout";
import Button from "@/src/components/ui/Button";

import { useLogin } from "@/src/hooks/auth/useLogin";
import { useAuth } from "@/src/hooks/auth/useAuth";

import {
  getCurrentUser,
} from "@/src/lib/api/auth";

import {
  setAccessToken as setApiAccessToken,
} from "@/src/lib/api/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const { setAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: async (result) => {
          // 1. Two-factor enrollment required.
          if (
            "requiresTwoFactorEnrollment" in result &&
            result.requiresTwoFactorEnrollment
          ) {
            sessionStorage.setItem(
              "twoFactorEnrollmentToken",
              result.accessToken
            );

            sessionStorage.setItem(
              "twoFactorMustChangePassword",
              String(result.user.mustChangePassword)
            );

            setApiAccessToken(result.accessToken);

            router.push("/admin/security/enroll-2fa");

            return;
          }

          // 2. Two-factor verification required.
          if (
            "requiresTwoFactor" in result &&
            result.requiresTwoFactor
          ) {
            sessionStorage.setItem(
              "twoFactorChallengeToken",
              result.challengeToken
            );

            sessionStorage.setItem(
              "twoFactorMustChangePassword",
              String(result.user.mustChangePassword)
            );

            router.push("/admin/security/verify-2fa");

            return;
          }

          // 3. Normal authenticated login.
          setApiAccessToken(result.accessToken);

          const user = await getCurrentUser();

          setAuthenticated(
            user,
            result.accessToken
          );

          router.push(
            user.mustChangePassword
              ? "/admin/auth/change-password"
              : "/admin"
          );
        },
      }
    );
  }

  return (
    <AuthLayout
      title="Admin Login"
      description="Sign in to access the Second Advent Ministries Control Center."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-sam-text"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
            className="
              w-full rounded-xl border border-sam-border
              bg-sam-surface px-4 py-3
              text-sm text-sam-text
              outline-none
              transition
              placeholder:text-sam-muted
              focus:border-sam-blue
              focus:ring-2 focus:ring-sam-blue/20
            "
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-sam-text"
            >
              Password
            </label>

            <Link
              href="/admin/auth/forgot-password"
              className="text-xs font-medium text-sam-deep-blue hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="
              w-full rounded-xl border border-sam-border
              bg-sam-surface px-4 py-3
              text-sm text-sam-text
              outline-none
              transition
              placeholder:text-sam-muted
              focus:border-sam-blue
              focus:ring-2 focus:ring-sam-blue/20
            "
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending
            ? "Signing In..."
            : "Sign In"}
        </Button>
      </form>
    </AuthLayout>
  );
}