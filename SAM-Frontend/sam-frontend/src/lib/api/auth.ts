// src/lib/api/auth.ts

import { api } from "./client";

export type UserRole = "super_admin" | "admin";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  mustChangePassword: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken: string;
}

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
 * The backend sets the refresh token as an HttpOnly cookie
 * and returns the access token in the response body.
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