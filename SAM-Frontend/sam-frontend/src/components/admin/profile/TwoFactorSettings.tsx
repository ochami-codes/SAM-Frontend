"use client";

import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Copy,
  Check,
  LoaderCircle,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";

import { useTwoFactorStatus } from "@/src/hooks/security/useTwoFactorStatus";
import { useStartTwoFactorSetup } from "@/src/hooks/security/useStartTwoFactorsetup";
import { useVerifyTwoFactorSetup } from "@/src/hooks/security/useVerifyTwoFactorSetup";

export default function TwoFactorSettings() {
  const {
    data: status,
    isLoading,
    isError,
    refetch,
  } = useTwoFactorStatus();

  const setupMutation = useStartTwoFactorSetup();
  const verifyMutation = useVerifyTwoFactorSetup();

  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);
  const [hasCopiedCodes, setHasCopiedCodes] = useState(false);

  const setup = setupMutation.data;

  async function handleStartSetup(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim()) {
      toast.error("Enter your current password.");
      return;
    }

    try {
      await setupMutation.mutateAsync(password);

      setPassword("");
      setShowPasswordForm(false);
      toast.success("Scan the QR code with your authenticator app.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to start two-factor authentication setup."
      );
    }
  }

  async function handleVerifySetup(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{6}$/.test(verificationCode)) {
      toast.error("Enter a valid six-digit authenticator code.");
      return;
    }

    try {
      const result = await verifyMutation.mutateAsync(verificationCode);

      setRecoveryCodes(result.recoveryCodes);
      setVerificationCode("");
      setupMutation.reset();
      verifyMutation.reset();

      toast.success("Two-factor authentication enabled successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to verify your authenticator code."
      );
    }
  }

  async function handleCopyRecoveryCodes() {
    if (!recoveryCodes) return;

    try {
      await navigator.clipboard.writeText(recoveryCodes.join("\n"));
      setHasCopiedCodes(true);
      toast.success("Recovery codes copied.");
    } catch {
      toast.error("Unable to copy recovery codes. Copy them manually.");
    }
  }

  async function handleFinishRecoveryCodes() {
    setRecoveryCodes(null);
    setHasCopiedCodes(false);
    await refetch();
  }

  function handleCancelSetup() {
    setupMutation.reset();
    verifyMutation.reset();
    setVerificationCode("");
  }

  if (isLoading) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3 text-gray-500">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          <p className="text-sm">Loading two-factor authentication status...</p>
        </div>
      </section>
    );
  }

  if (isError || !status) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          <div>
            <h3 className="font-semibold text-gray-900">
              Unable to load security status
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              We could not retrieve your two-factor authentication status.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Try again
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-50 p-3">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Two-factor authentication
            </h2>

            <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
              Add another layer of security to your account by requiring an
              authenticator code when signing in.
            </p>
          </div>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            status.enabled
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status.enabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      {status.enabled && (
        <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

            <div>
              <p className="font-medium text-green-800">
                Your account is protected.
              </p>

              <p className="mt-1 text-sm text-green-700">
                You will need an authenticator code or an unused recovery code
                when signing in.
              </p>

              {status.enabledAt && (
                <p className="mt-2 text-xs text-green-700">
                  Enabled on{" "}
                  {new Date(status.enabledAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {!status.enabled && !setup && (
        <div className="mt-5">
          {!showPasswordForm ? (
            <button
              type="button"
              onClick={() => setShowPasswordForm(true)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Enable two-factor authentication
            </button>
          ) : (
            <form onSubmit={handleStartSetup} className="max-w-md space-y-4">
              <div>
                <label
                  htmlFor="two-factor-password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm your current password
                </label>

                <input
                  id="two-factor-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your current password"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={setupMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {setupMutation.isPending && (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  )}
                  Continue
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPassword("");
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {!status.enabled && setup && !recoveryCodes && (
        <div className="mt-6 space-y-6 border-t border-gray-100 pt-6">
          <div>
            <h3 className="font-semibold text-gray-900">
              Set up your authenticator
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Open your authenticator app and scan the QR code below. If you
              cannot scan it, enter the setup key manually.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="rounded-lg border border-gray-200 bg-white p-3">
              {/* QR code is generated by the backend as a data URL. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={setup.qrCode}
                alt="Two-factor authentication setup QR code"
                width={220}
                height={220}
                className="h-52 w-52 object-contain"
              />
            </div>

            <div className="w-full max-w-md text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Manual setup key
              </p>

              <code className="mt-2 block break-all rounded-lg border border-gray-200 bg-white p-3 text-sm font-semibold tracking-wider text-gray-800">
                {setup.secret}
              </code>

              <p className="mt-2 text-xs text-gray-500">
                Keep this key private. Anyone with it could generate your
                authenticator codes.
              </p>
            </div>
          </div>

          <div className="max-w-md space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">
                Verify your authenticator
              </h4>
            </div>

            <p className="text-sm text-gray-500">
              Enter the six-digit code currently displayed in your
              authenticator app.
            </p>

            <form onSubmit={handleVerifySetup} className="space-y-3">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                pattern="[0-9]{6}"
                value={verificationCode}
                onChange={(event) =>
                  setVerificationCode(
                    event.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                required
                aria-label="Authenticator verification code"
                placeholder="000000"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl font-semibold tracking-[0.5em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={
                    verifyMutation.isPending || verificationCode.length !== 6
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {verifyMutation.isPending && (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  )}
                  Verify and enable
                </button>

                <button
                  type="button"
                  onClick={handleCancelSetup}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <p className="text-xs text-gray-500">
            Setup key expires at{" "}
            {new Date(setup.expiresAt).toLocaleTimeString()}.
          </p>
        </div>
      )}

      {recoveryCodes && (
        <div className="mt-6 space-y-5 border-t border-gray-100 pt-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-amber-50 p-3">
              <KeyRound className="h-6 w-6 text-amber-600" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Save your recovery codes
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Two-factor authentication is enabled. Store these recovery
                codes somewhere safe. Each code can only be used once if you
                lose access to your authenticator.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:grid-cols-2">
            {recoveryCodes.map((code) => (
              <code
                key={code}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-center text-sm font-semibold tracking-wider text-gray-800"
              >
                {code}
              </code>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopyRecoveryCodes}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {hasCopiedCodes ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {hasCopiedCodes ? "Copied" : "Copy recovery codes"}
          </button>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-800">
              Important: These codes will not be displayed again.
            </p>

            <p className="mt-1 text-sm text-amber-700">
              Make sure you have saved them before continuing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleFinishRecoveryCodes()}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            I have saved my recovery codes
          </button>
        </div>
      )}
    </section>
  );
}