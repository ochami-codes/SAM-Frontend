// src/lib/api/auth.ts

import { api } from "./client";

export type UserRole = "super_admin" | "admin";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  profileImage: string | null;
  role: UserRole;
  mustChangePassword: boolean;
}

interface LoginResponseBase {
  success: boolean;
  message: string;
  user: User;
}

/**
 * Normal login response.
 * The administrator has completed authentication.
 */
export interface LoginSuccessResponse extends LoginResponseBase {
  accessToken: string;
  requiresTwoFactor?: false;
  requiresTwoFactorEnrollment?: false;
}

/**
 * The administrator must enroll in 2FA.
 *
 * accessToken is a temporary enrollment token,
 * not a normal authenticated access token.
 */
export interface TwoFactorEnrollmentRequiredResponse
  extends LoginResponseBase {
  requiresTwoFactorEnrollment: true;
  accessToken: string;
}

/**
 * The administrator must verify an authenticator code.
 *
 * challengeToken is temporary and must only be used
 * for the 2FA login verification endpoint.
 */
export interface TwoFactorRequiredResponse extends LoginResponseBase {
  requiresTwoFactor: true;
  challengeToken: string;
  expiresAt: string;
}

export type LoginResponse =
  | LoginSuccessResponse
  | TwoFactorEnrollmentRequiredResponse
  | TwoFactorRequiredResponse;

export interface RefreshResponse {
  success: boolean;
  accessToken: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

/**
 * Login
 *
 * The backend may return:
 * 1. Normal authenticated access.
 * 2. A temporary 2FA enrollment token.
 * 3. A temporary 2FA verification challenge.
 *
 * The refresh token is set as an HttpOnly cookie
 * only after authentication is completed.
 */
export function login(data: LoginData) {
  return api<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get the currently authenticated user.
 *
 * Requires a valid access token.
 */
export function getCurrentUser() {
  return api<User>("/api/auth/me", {
    method: "GET"
    });
}

/**
 * Refresh the access token.
 *
 * The refresh token is automatically sent as an HttpOnly cookie.
 */
export function refreshAccessToken() {
  return api<RefreshResponse>("/api/auth/refresh", {
    method: "POST",
  });
}

/**
 * Logout
 *
 * The backend removes the refresh session and clears
 * the refresh-token cookie.
 */
export function logout() {
  return api<MessageResponse>("/api/auth/logout", {
    method: "POST",
  });
}

/**
 * Request a password reset email.
 */
export function forgotPassword(email: string) {
  return api<MessageResponse>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/**
 * Reset a password using a reset token.
 */
export function resetPassword(
  token: string,
  password: string
) {
  return api<MessageResponse>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      token,
      password,
    }),
  });
}
  export function changePassword(
    currentPassword: string,
    newPassword: string
  ) {
    return api<MessageResponse>("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
  }
  export function acceptInvitation(
    token: string,
    password: string
  ) {
    return api<MessageResponse>("/api/auth/accept-invitation", {
      method: "POST",
      body: JSON.stringify({
        token,
        password,
      }),
    });
  }