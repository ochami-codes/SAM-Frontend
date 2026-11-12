"use client";

import { CheckCircle2, LoaderCircle, ShieldCheck } from "lucide-react";

import type { TwoFactorVerificationProps } from "./types";

export default function TwoFactorVerification({
  verificationCode,
  isVerifying,
  onVerificationCodeChange,
  onVerify,
}: TwoFactorVerificationProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onVerify();
      }}
      className="space-y-5 rounded-xl border border-gray-200 bg-white p-5"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-green-50 p-2">
          <ShieldCheck size={22} className="text-green-600" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            Verify your authenticator
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Open your authenticator app and enter the six-digit
            verification code displayed for your SAM account.
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="two-factor-verification-code"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Verification code
        </label>

        <input
          id="two-factor-verification-code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          pattern="[0-9]{6}"
          value={verificationCode}
          onChange={(event) =>
            onVerificationCodeChange(
              event.target.value.replace(/\D/g, "").slice(0, 6)
            )
          }
          placeholder="000000"
          required
          disabled={isVerifying}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl font-semibold tracking-[0.5em] text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
        />

        <p className="mt-2 text-xs text-gray-500">
          Enter the current six-digit code. Codes usually refresh
          every 30 seconds.
        </p>
      </div>

      <button
        type="submit"
        disabled={isVerifying || verificationCode.length !== 6}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isVerifying ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <CheckCircle2 size={18} />
            Verify and enable 2FA
          </>
        )}
      </button>
    </form>
  );
}