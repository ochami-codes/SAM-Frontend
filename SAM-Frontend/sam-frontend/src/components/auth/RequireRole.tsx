"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { useAuth } from "@/src/hooks/auth/useAuth";
import type { UserRole } from "@/src/lib/api/auth";

interface RequireRoleProps {
  roles: UserRole[];
  children: ReactNode;
}

export default function RequireRole({
  roles,
  children,
}: RequireRoleProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const hasRequiredRole = user
    ? roles.includes(user.role)
    : false;

  useEffect(() => {
    if (isLoading) return;

    if (!hasRequiredRole) {
      router.replace("/admin/access-denied");
    }
  }, [isLoading, hasRequiredRole, router]);

  if (isLoading || !hasRequiredRole) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle
          size={28}
          className="animate-spin text-sam-blue"
        />
      </div>
    );
  }

  return <>{children}</>;
}