import { api } from "./client";

export interface GlobalTwoFactorSettings {
  requireTwoFactor: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Retrieve global security settings.
 */
export async function getGlobalTwoFactorSettings(): Promise<GlobalTwoFactorSettings> {
  const response = await api<ApiResponse<GlobalTwoFactorSettings>>(
    "/api/admin/security-settings/2fa"
  );

  return response.data;
}

/**
 * Update global 2FA enforcement.
 */
export async function updateGlobalTwoFactorEnforcement(
  requireTwoFactor: boolean
): Promise<GlobalTwoFactorSettings> {
  const response = await api<ApiResponse<GlobalTwoFactorSettings>>(
    "/api/admin/security-settings/2fa",
    {
      method: "PATCH",
      body: JSON.stringify({ requireTwoFactor }),
    }
  );

  return response.data;
}