// src/lib/api/users.ts

import { api } from "./client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  avatar?: string;
}

export function getProfile() {
  return api<UserProfile>("/users/me");
}

export function updateProfile(data: UpdateProfileData) {
  return api<UserProfile>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function getUserById(userId: string) {
  return api<UserProfile>(`/users/${userId}`);
}

export function changePassword(
  currentPassword: string,
  newPassword: string
) {
  return api<{ message: string }>("/users/me/password", {
    method: "PATCH",
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });
}