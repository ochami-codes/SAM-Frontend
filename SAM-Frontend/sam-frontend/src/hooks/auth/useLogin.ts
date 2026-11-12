"use client";

import { useMutation } from "@tanstack/react-query";

import {
  login as loginRequest,
} from "@/src/lib/api/auth";

import type {
  LoginResponse,
} from "@/src/lib/api/auth";

interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async ({ email, password }) => {
      const result = await loginRequest({
        email,
        password,
      });

      return result;
    },
  });
}