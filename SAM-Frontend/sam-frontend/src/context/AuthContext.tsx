"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  refreshAccessToken,
} from "@/src/lib/api/auth";

import {
  setAccessToken as setApiAccessToken,
} from "@/src/lib/api/client";

export type UserRole = "super_admin" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  mustChangePassword: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setAuthenticated: (
  user: AuthUser,
  accessToken: string
) => void;
}

export const AuthContext =
  createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [accessToken, setAccessToken] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const router = useRouter();

  const refreshAuth = useCallback(
    async (): Promise<void> => {
      try {
        const result = await refreshAccessToken();

        setAccessToken(result.accessToken);
        setApiAccessToken(result.accessToken);

        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch {
        setAccessToken(null);
        setApiAccessToken(null);
        setUser(null);
      }
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        await refreshAuth();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [refreshAuth]);

  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<AuthUser> => {
      const result = await loginRequest({
        email,
        password,
      });

      setAccessToken(result.accessToken);
      setApiAccessToken(result.accessToken);

      const currentUser = await getCurrentUser();

      setUser(currentUser);

      return currentUser;
    },
    []
  );

  const logout = useCallback(
    async (): Promise<void> => {
      try {
        await logoutRequest();
      } finally {
        setAccessToken(null);
        setApiAccessToken(null);
        setUser(null);

        router.replace("/admin/auth/login");
      }
    },
    [router]
  );
  const setAuthenticated = useCallback(
  (
    user: AuthUser,
    accessToken: string
  ): void => {
    setAccessToken(accessToken);
    setApiAccessToken(accessToken);
    setUser(user);
  },
  []
);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        isLoading,
        setAuthenticated,
        refreshAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}