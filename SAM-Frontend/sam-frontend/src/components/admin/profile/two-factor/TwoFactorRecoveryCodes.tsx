"use client";

import { Check, Copy, Download, KeyRound, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import type { TwoFactorRecoveryCodesProps } from "./types";

export default function TwoFactorRecoveryCodes({
  recoveryCodes,
  hasCopiedCodes,
  onCopy,
  onFinish,
  mode,
}: TwoFactorRecoveryCodesProps) {
  const handleDownload = () => {
    const content = [
      "SECOND ADVENT MINISTRIES",
      "TWO-FACTOR AUTHENTICATION RECOVERY CODES",
      "",
      "Keep these codes somewhere safe.",
      "Each code can only be used once.",
      "",
      ...recoveryCodes,
    ].join("\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "sam-recovery-codes.txt";
    link.click();

    URL.revokeObjectURL(url);

    toast.success("Recovery codes downloaded.");
  };

  return (
    <div className="space-y-6 rounded-xl border border-green-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-green-50 p-2">
          <ShieldCheck size={24} className="text-green-600" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            Two-factor authentication enabled!
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Your account is now protected with two-factor
            authentication.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-2">
          <KeyRound
            size={19}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <h4 className="font-semibold text-amber-800">
              Save your recovery codes
            </h4>

            <p className="mt-1 text-sm text-amber-700">
              These codes are displayed only once. Each code can
              be used once if you lose access to your
              authenticator app.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {recoveryCodes.map((code, index) => (
          <div
            key={`${code}-${index}`}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-center"
          >
            <code className="text-sm font-semibold tracking-wide text-gray-800">
              {code}
            </code>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          {hasCopiedCodes ? (
            <>
              <Check size={17} className="text-green-600" />
              Copied
            </>
          ) : (
            <>
              <Copy size={17} />
              Copy codes
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Download size={17} />
          Download
        </button>
      </div>

      <div className="border-t border-gray-200 pt-5">
        <p className="mb-4 text-sm text-gray-600">
          Confirm that you have saved your recovery codes in a
          secure location before continuing.
        </p>

        <button
          type="button"
          onClick={onFinish}
          className="w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          I have saved my recovery codes
        </button>

        {mode === "required" && (
          <p className="mt-3 text-center text-xs text-gray-500">
            You must confirm that your recovery codes are saved
            before accessing the administrator dashboard.
          </p>
        )}
      </div>
    </div>
  );
}