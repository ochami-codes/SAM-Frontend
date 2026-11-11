"use client";

import { useState } from "react";
import {
  AlertCircle,
  Info,
  LockKeyhole,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";

import { useGlobalTwoFactorSettings } from "@/src/hooks/settings/useGlobalTwoFactorSettings";
import { useAuth } from "@/src/hooks/auth/useAuth";

import { ConfirmSecurityChangeDialog } from "./ConfirmSecurityChangeDialog";

interface GlobalSecuritySectionProps {
  canManage: boolean;
}

export function GlobalSecuritySection({
  canManage,
}: GlobalSecuritySectionProps) {
  const { logout } = useAuth();

  const {
    data,
    isLoading,
    isError,
    updateEnforcement,
    isUpdating,
    updateError,
  } = useGlobalTwoFactorSettings();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = async () => {
    if (!data || !canManage) return;

    try {
      await updateEnforcement(!data.requireTwoFactor);

      setIsDialogOpen(false);

      // The backend invalidates all administrator sessions
      // after changing the global security policy.
      await logout();
    } catch {
      // Keep the administrator on the page so the error
      // can be displayed and the operation retried if needed.
    }
  };

  return (
    <section className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <LockKeyhole
            className="h-5 w-5 text-sam-blue"
            aria-hidden="true"
          />

          <h2 className="text-lg font-semibold text-gray-900">
            Global Security
          </h2>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Manage security policies that apply across the
          administrative platform.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">
            Loading security settings...
          </p>
        </div>
      )}

      {isError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-medium text-red-800">
              Unable to load global security settings.
            </p>

            <p className="mt-1 text-sm text-red-700">
              Please refresh the page or try again later.
            </p>
          </div>
        </div>
      )}

      {data && (
        <>
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-lg p-3 ${
                    data.requireTwoFactor
                      ? "bg-green-50"
                      : "bg-gray-100"
                  }`}
                >
                  {data.requireTwoFactor ? (
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  ) : (
                    <ShieldOff className="h-6 w-6 text-gray-500" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Two-Factor Authentication
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {data.requireTwoFactor
                      ? "Global enforcement is currently enabled."
                      : "Global enforcement is currently disabled."}
                  </p>

                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      data.requireTwoFactor
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        data.requireTwoFactor
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />

                    {data.requireTwoFactor
                      ? "Enforced"
                      : "Optional"}
                  </span>
                </div>
              </div>

              {canManage && (
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(true)}
                  disabled={isUpdating}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    data.requireTwoFactor
                      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      : "bg-sam-blue text-white hover:bg-sam-blue-dark"
                  }`}
                >
                  {data.requireTwoFactor
                    ? "Disable enforcement"
                    : "Enable enforcement"}
                </button>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

            <div>
              <h4 className="text-sm font-semibold text-blue-900">
                About global enforcement
              </h4>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                When enabled, every administrator must enroll
                in two-factor authentication before accessing
                protected administrative features. Each
                administrator configures their own authenticator
                application and recovery codes.
              </p>
            </div>
          </div>

          {!canManage && (
            <p className="text-xs text-gray-500">
              Only Super Administrators can modify global
              security policies.
            </p>
          )}

          {updateError && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

              <p className="text-sm text-red-700">
                {updateError instanceof Error
                  ? updateError.message
                  : "Unable to update the security policy."}
              </p>
            </div>
          )}
        </>
      )}

      <ConfirmSecurityChangeDialog
        isOpen={isDialogOpen}
        enabled={!data?.requireTwoFactor}
        isLoading={isUpdating}
        onConfirm={handleConfirm}
        onCancel={() => setIsDialogOpen(false)}
      />
    </section>
  );
}