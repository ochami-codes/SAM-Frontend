// src/lib/api/admin.ts

import { api } from "./client";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended";
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  status?: "active" | "suspended";
}

export function getUsers() {
  return api<AdminUser[]>("/admin/users");
}

export function getUser(userId: string) {
  return api<AdminUser>(`/admin/users/${userId}`);
}

export function createUser(data: CreateUserData) {
  return api<AdminUser>("/admin/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateUser(
  userId: string,
  data: UpdateUserData
) {
  return api<AdminUser>(`/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteUser(userId: string) {
  return api<{ message: string }>(`/admin/users/${userId}`, {
    method: "DELETE",
  });
}