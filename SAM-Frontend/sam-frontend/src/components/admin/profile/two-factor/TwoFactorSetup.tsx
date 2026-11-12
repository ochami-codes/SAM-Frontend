"use client";

import { Copy, Smartphone } from "lucide-react";
import { toast } from "sonner";

import type { TwoFactorSetupProps } from "./types";

export default function TwoFactorSetup({
  setup,
  mode,
}: TwoFactorSetupProps) {
  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(setup.secret);
      toast.success("Authenticator secret copied.");
    } catch {
      toast.error("Unable to copy the authenticator secret.");
    }
  };

  return (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <Smartphone size={22} className="text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            Set up your authenticator app
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Scan the QR code using an authenticator app such as
            Google Authenticator, Microsoft Authenticator, or
            Authy.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <img
            src={setup.qrCode}
            alt="Two-factor authentication setup QR code"
            className="h-52 w-52 object-contain"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">
          Can't scan the QR code?
        </p>

        <p className="text-sm text-gray-600">
          Enter this secret manually in your authenticator app.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <code className="break-all text-sm font-semibold tracking-wider text-gray-800">
            {setup.secret}
          </code>

          <button
            type="button"
            onClick={handleCopySecret}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <Copy size={15} />
            Copy
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          Once your authenticator app is configured, enter the
          six-digit verification code it generates to complete
          enrollment.
        </p>
      </div>

      {mode === "required" && (
        <p className="text-xs text-gray-500">
          Two-factor authentication enrollment is required before
          you can access the administrator dashboard.
        </p>
      )}
    </div>
  );
}