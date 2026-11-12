import { ShieldCheck, ShieldAlert } from "lucide-react";

import type { TwoFactorStatusProps } from "./types";

export default function TwoFactorStatus({
  status,
}: TwoFactorStatusProps) {
  if (status.enabled) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={24}
            className="mt-0.5 shrink-0 text-green-600"
          />

          <div>
            <h3 className="font-semibold text-green-800">
              Two-factor authentication is enabled
            </h3>

            <p className="mt-1 text-sm text-green-700">
              Your account is protected with an additional
              authentication layer.
            </p>

            {status.enabledAt && (
              <p className="mt-2 text-xs text-green-700">
                Enabled on{" "}
                {new Date(status.enabledAt).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <ShieldAlert
          size={24}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <div>
          <h3 className="font-semibold text-amber-800">
            Two-factor authentication is disabled
          </h3>

          <p className="mt-1 text-sm text-amber-700">
            Enable two-factor authentication to add another
            layer of protection to your administrator account.
          </p>
        </div>
      </div>
    </div>
  );
}