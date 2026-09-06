"use client";

import { useMutation } from "@tanstack/react-query";

import {
  getCurrentUser,
  login as loginRequest,
} from "@/src/lib/api/auth";

import {
  setAccessToken as setApiAccessToken,
} from "@/src/lib/api/client";

import { useAuth } from "@/src/hooks/auth/useAuth";

import type { AuthUser } from "@/src/context/AuthContext";

interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  const { setAuthenticated } = useAuth();

  return useMutation<AuthUser, Error, LoginInput>({
    mutationFn: async ({
      email,
      password,
    }) => {
      const result = await loginRequest({
        email,
        password,
      });

      setApiAccessToken(result.accessToken);

      const user = await getCurrentUser();

      setAuthenticated(
        user,
        result.accessToken
      );

      return user;
    },
  });
}