"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { setAccessToken as setApiAccessToken } from "@/src/lib/api/client";

import { useTwoFactorStatus } from "@/src/hooks/security/useTwoFactorStatus";
import { useStartTwoFactorSetup } from "@/src/hooks/security/useStartTwoFactorsetup";
import { useVerifyTwoFactorSetup } from "@/src/hooks/security/useVerifyTwoFactorSetup";

import type {
  TwoFactorMode,
} from "./two-factor/types";

import TwoFactorStatus from "./two-factor/TwoFactorStatus";
import TwoFactorPasswordForm from "./two-factor/TwoFactorPasswordForm";
import TwoFactorSetup from "./two-factor/TwoFactorSetup";
import TwoFactorVerification from "./two-factor/TwoFactorVerification";
import TwoFactorRecoveryCodes from "./two-factor/TwoFactorRecoveryCodes";

interface TwoFactorSettingsProps {
  mode?: TwoFactorMode;
}

export default function TwoFactorSettings({
  mode = "profile",
}: TwoFactorSettingsProps) {
  const router = useRouter();

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
  const [showPasswordForm, setShowPasswordForm] = useState(
    mode === "required"
  );

  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(
    null
  );

  const [hasCopiedCodes, setHasCopiedCodes] = useState(false);

  const setup = setupMutation.data;

  const handleStartSetup = async () => {
    if (!password.trim()) {
      toast.error("Please enter your current password.");
      return;
    }

    try {
      await setupMutation.mutateAsync(password);

      setPassword("");
      setShowPasswordForm(false);

      toast.success("Authenticator setup initiated.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to initiate two-factor setup."
      );
    }
  };

  const handleVerifySetup = async () => {
    if (!/^\d{6}$/.test(verificationCode)) {
      toast.error("Enter a valid six-digit verification code.");
      return;
    }

    try {
      const result = await verifyMutation.mutateAsync(
        verificationCode
      );

      setRecoveryCodes(result.recoveryCodes);
      setVerificationCode("");

      toast.success("Two-factor authentication enabled.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Two-factor verification failed."
      );
    }
  };

  const handleCopyRecoveryCodes = async () => {
    if (!recoveryCodes) return;

    try {
      await navigator.clipboard.writeText(
        recoveryCodes.join("\n")
      );

      setHasCopiedCodes(true);
      toast.success("Recovery codes copied.");
    } catch {
      toast.error("Unable to copy recovery codes.");
    }
  };

  const handleFinishRecoveryCodes = async () => {
    setRecoveryCodes(null);
    setHasCopiedCodes(false);

    if (mode === "required") {
      // Enrollment tokens cannot access the normal dashboard.
      sessionStorage.removeItem("twoFactorEnrollmentToken");
      sessionStorage.removeItem("twoFactorMustChangePassword");

      setApiAccessToken(null);

      toast.success(
        "Enrollment complete. Please sign in using your authenticator."
      );

      router.replace("/admin/login");
      return;
    }

    setupMutation.reset();
    verifyMutation.reset();

    await refetch();
  };

  const handleCancelSetup = () => {
    setupMutation.reset();
    verifyMutation.reset();

    setPassword("");
    setVerificationCode("");
    setShowPasswordForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoaderCircle
          size={28}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  if (isError || !status) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <p className="text-sm text-red-700">
          Unable to retrieve your two-factor authentication status.
          Please try again.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 text-sm font-semibold text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (status.enabled && mode === "required") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-green-600" size={24} />

          <p className="font-medium text-green-800">
            Two-factor authentication is already enabled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {mode === "required" && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Secure your administrator account
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Two-factor authentication is required by your
            organization's security policy. Complete enrollment
            before accessing the administrator dashboard.
          </p>
        </div>
      )}

      <TwoFactorStatus status={status} />

      {recoveryCodes ? (
        <TwoFactorRecoveryCodes
          recoveryCodes={recoveryCodes}
          hasCopiedCodes={hasCopiedCodes}
          onCopy={handleCopyRecoveryCodes}
          onFinish={handleFinishRecoveryCodes}
          mode={mode}
        />
      ) : status.enabled ? (
        null
      ) : setup ? (
        <>
          <TwoFactorSetup
            setup={setup}
            mode={mode}
          />

          <TwoFactorVerification
            verificationCode={verificationCode}
            isVerifying={verifyMutation.isPending}
            onVerificationCodeChange={setVerificationCode}
            onVerify={handleVerifySetup}
          />
        </>
      ) : showPasswordForm ? (
        <TwoFactorPasswordForm
          password={password}
          isLoading={setupMutation.isPending}
          onPasswordChange={setPassword}
          onSubmit={handleStartSetup}
          onCancel={handleCancelSetup}
          mode={mode}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowPasswordForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <ShieldCheck size={18} />
          Enable two-factor authentication
        </button>
      )}
    </div>
  );
}