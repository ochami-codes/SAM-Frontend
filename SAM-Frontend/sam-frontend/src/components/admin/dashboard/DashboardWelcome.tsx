import { ShieldCheck, UserCircle } from "lucide-react";

import type { AuthUser } from "@/src/context/AuthContext";

interface DashboardWelcomeProps {
  user: AuthUser;
}

export function DashboardWelcome({
  user,
}: DashboardWelcomeProps) {
  const isSuperAdmin = user.role === "super_admin";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-sam-blue-dark">
            Administration Center
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Welcome, {user.fullName.split(" ")[0]}
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Manage website content, communications and administrative
            activities from one central workspace.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sam-blue/10 text-sam-blue-dark">
            {isSuperAdmin ? (
              <ShieldCheck size={23} />
            ) : (
              <UserCircle size={23} />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {isSuperAdmin ? "Super Administrator" : "Administrator"}
            </p>

            <p className="mt-0.5 text-xs text-gray-500">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}