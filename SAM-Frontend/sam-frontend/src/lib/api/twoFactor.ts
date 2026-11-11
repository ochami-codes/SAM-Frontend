import { api } from "./client";

export interface TwoFactorStatus {
  enabled: boolean;
  enabledAt: string | null;
}

export interface TwoFactorSetup {
  qrCode: string;
  secret: string;
  expiresAt: string;
}

export interface EnableTwoFactorResponse {
  enabled: boolean;
  enabledAt: string;
  recoveryCodes: string[];
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Retrieve the authenticated administrator's 2FA status.
 */
export async function getTwoFactorStatus(): Promise<TwoFactorStatus> {
  const response = await api<ApiResponse<TwoFactorStatus>>(
    "/api/auth/2fa/status",
    {
      method: "GET",
    },
  );

  if (!response.success || !response.data) {
    throw new Error("Unable to retrieve two-factor authentication status.");
  }

  return response.data;
}

/**
 * Start personal 2FA enrollment.
 *
 * Requires the administrator's current password.
 */
export async function startTwoFactorSetup(
  password: string,
): Promise<TwoFactorSetup> {
  const response = await api<ApiResponse<TwoFactorSetup>>(
    "/api/auth/2fa/setup",
    {
      method: "POST",
      body: JSON.stringify({ password }),
    },
  );

  if (!response.success || !response.data) {
    throw new Error("Unable to start two-factor authentication setup.");
  }

  return response.data;
}

/**
 * Verify the authenticator code and enable 2FA.
 *
 * Returns recovery codes that must be securely saved.
 */
export async function verifyTwoFactorSetup(
  token: string,
): Promise<EnableTwoFactorResponse> {
  const response = await api<ApiResponse<EnableTwoFactorResponse>>(
    "/api/auth/2fa/verify-setup",
    {
      method: "POST",
      body: JSON.stringify({ token }),
    },
  );

  if (!response.success || !response.data) {
    throw new Error("Unable to verify two-factor authentication.");
  }

  return response.data;
}