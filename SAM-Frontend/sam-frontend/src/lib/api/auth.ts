// src/lib/api/auth.ts

import { api } from "./client";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export function login(data: LoginData) {
  return api<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function logout() {
  return api<{ message: string }>("/auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser() {
  return api<User>("/auth/me");
}

export function refreshSession() {
  return api<AuthResponse>("/auth/refresh", {
    method: "POST",
  });
}

export function forgotPassword(email: string) {
  return api<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, password: string) {
  return api<{ message: string }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      token,
      password,
    }),
  });
}