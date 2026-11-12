"use client";

import {
  useEffect,
  useState,
  type SyntheticEvent,
} from "react";

import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import AuthLayout from "@/src/components/layouts/AuthLayout";
import Button from "@/src/components/ui/Button";

import { useVerifyTwoFactorLogin } from "@/src/hooks/security/useVerifyTwoFactorLogin";
import { useAuth } from "@/src/hooks/auth/useAuth";

import { getCurrentUser } from "@/src/lib/api/auth";

import {
  setAccessToken as setApiAccessToken,
} from "@/src/lib/api/client";

export default function VerifyTwoFactorPage() {
  const router = useRouter();

  const { setAuthenticated } = useAuth();

  const verificationMutation = useVerifyTwoFactorLogin();

  const [code, setCode] = useState("");
  const [challengeToken, setChallengeToken] = useState<string | null>(null);
  const [isCheckingChallenge, setIsCheckingChallenge] = useState(true);

  useEffect(() => {
    const storedChallenge = sessionStorage.getItem(
      "twoFactorChallengeToken"
    );

    if (!storedChallenge) {
      router.replace("/admin/auth/login");
      return;
    }

    setChallengeToken(storedChallenge);
    setIsCheckingChallenge(false);
  }, [router]);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!challengeToken) {
      toast.error("Your verification session has expired. Please sign in again.");
      router.replace("/admin/auth/login");
      return;
    }

    verificationMutation.mutate(
      {
        challengeToken,
        code,
      },
      {
        onSuccess: async (result) => {
          try {
            // Store the newly issued authenticated access token.
            setApiAccessToken(result.accessToken);

            // Retrieve the authenticated administrator.
            const user = await getCurrentUser();

            // Establish the authenticated frontend session.
            setAuthenticated(
              user,
              result.accessToken
            );

            // Remove temporary login credentials.
            sessionStorage.removeItem(
              "twoFactorChallengeToken"
            );

            sessionStorage.removeItem(
              "twoFactorMustChangePassword"
            );

            toast.success("Authentication successful.");

            // Enforce mandatory password change.
            router.replace(
              user.mustChangePassword
                ? "/admin/auth/change-password"
                : "/admin"
            );
          } catch {
            setApiAccessToken(null);

            toast.error(
              "Unable to complete authentication. Please sign in again."
            );

            router.replace("/admin/auth/login");
          }
        },
        onError: (error) => {
          toast.error(error.message || "Invalid verification code.");
        },
      }
    );
  }

  if (isCheckingChallenge || !challengeToken) {
    return (
      <AuthLayout
        title="Verifying Session"
        description="Preparing your two-factor authentication."
      >
        <div className="py-8 text-center text-sm text-sam-muted">
          Please wait...
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Two-Factor Verification"
      description="Enter the six-digit code from your authenticator app."
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sam-blue/10 text-sam-deep-blue">
          <ShieldCheck size={32} />
        </div>

        <p className="max-w-sm text-sm leading-6 text-sam-muted">
          Open your authenticator application and enter
          the verification code associated with your
          SAM administrator account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="code"
            className="mb-2 block text-sm font-medium text-sam-text"
          >
            Authentication code
          </label>

          <input
            id="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(event) =>
              setCode(
                event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6)
              )
            }
            placeholder="000000"
            required
            autoFocus
            className="
              w-full rounded-xl border border-sam-border
              bg-sam-surface px-4 py-4
              text-center text-2xl font-semibold
              tracking-[0.5em] text-sam-text
              outline-none transition
              placeholder:text-sam-muted
              focus:border-sam-blue
              focus:ring-2 focus:ring-sam-blue/20
            "
          />

          <p className="mt-2 text-xs text-sam-muted">
            Enter the six-digit code displayed in your authenticator app.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={
            verificationMutation.isPending ||
            code.length !== 6
          }
        >
          {verificationMutation.isPending
            ? "Verifying..."
            : "Verify & Sign In"}
        </Button>
      </form>

      <div className="mt-6 border-t border-sam-border pt-5">
        <Link
          href="/admin/auth/login"
          onClick={() => {
            sessionStorage.removeItem(
              "twoFactorChallengeToken"
            );

            sessionStorage.removeItem(
              "twoFactorMustChangePassword"
            );
          }}
          className="
            flex items-center justify-center gap-2
            text-sm font-medium text-sam-deep-blue
            hover:underline
          "
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}