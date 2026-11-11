import { api } from "./client";

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  profileImage: string | null;
  role: "super_admin" | "admin";
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: Profile;
}

export interface UpdateProfileInput {
  fullName: string;
}

export async function updateProfile(
  input: UpdateProfileInput,
): Promise<Profile> {
  const response = await api<UpdateProfileResponse>("/api/profile", {
    method: "PATCH",
    body: JSON.stringify(input),
  });

  if (!response.success || !response.data) {
    throw new Error(response.message || "Unable to update profile.");
  }

  return response.data;
}