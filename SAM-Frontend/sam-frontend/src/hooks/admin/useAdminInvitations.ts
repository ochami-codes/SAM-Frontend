"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminInvitations } from "@/src/lib/api/admin";

export const ADMIN_INVITATIONS_QUERY_KEY = [
  "admin-invitations",
];

export function useAdminInvitations() {
  return useQuery({
    queryKey: ADMIN_INVITATIONS_QUERY_KEY,
    queryFn: getAdminInvitations,
    staleTime: 1000 * 60,
  });
}