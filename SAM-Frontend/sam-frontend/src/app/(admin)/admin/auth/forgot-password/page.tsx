"use client";

import { useState } from "react";
import Link from "next/link";

import AuthLayout from "@/src/components/layouts/AuthLayout";
import Button from "@/src/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // Password reset request will be connected to the backend later.
    setSubmitted(true);
  }

  return (
    <AuthLayout
      title="Forgot Password?"
      description="Enter your administrator email address and we'll send instructions to reset your password."
    >
      {submitted ? (
        <div className="space-y-5">
          <div className="rounded-xl bg-sam-blue/10 p-4">
            <p className="text-sm leading-6 text-sam-deep-blue">
              If an administrator account exists for this email,
              password reset instructions have been sent.
            </p>
          </div>

          <Link
            href="/admin/auth/login"
            className="
              block text-center text-sm font-medium
              text-sam-deep-blue hover:underline
            "
          >
            Return to Admin Login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
              onChange={(event) => setEmail(event.target.value)}
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

          <Button
            type="submit"
            className="w-full"
          >
            Send Reset Instructions
          </Button>

          <Link
            href="/auth/admin-login"
            className="
              block text-center text-sm font-medium
              text-sam-muted hover:text-sam-deep-blue
            "
          >
            ← Back to Admin Login
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}