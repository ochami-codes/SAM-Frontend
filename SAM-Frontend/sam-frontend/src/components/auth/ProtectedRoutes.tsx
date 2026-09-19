"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/src/hooks/auth/useAuth";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export default function ProtectedRoutes({
  children,
}: ProtectedRoutesProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      const loginUrl = new URL(
        "/admin/auth/login",
        window.location.origin
      );

      if (pathname) {
        loginUrl.searchParams.set("redirect", pathname);
      }

      router.replace(loginUrl.pathname + loginUrl.search);
      return;
    }

    if (
      user?.mustChangePassword &&
      pathname !== "/admin/auth/change-password"
    ) {
      router.replace("/admin/auth/change-password");
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    pathname,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-gray-500">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (
    user?.mustChangePassword &&
    pathname !== "/admin/auth/change-password"
  ) {
    return null;
  }

  return <>{children}</>;
}