import Button from "@/src/components/ui/Button";

import type { AdminUser } from "@/src/lib/api/admin";

import { useUpdateAdminStatus } from "@/src/hooks/admin/useUpdateAdminStatus";

interface AdministratorsSectionProps {
  administrators: AdminUser[];
}

export default function AdministratorsSection({
  administrators,
}: AdministratorsSectionProps) {
  const updateStatusMutation = useUpdateAdminStatus();

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  }

  function handleStatusChange(administrator: AdminUser) {
    updateStatusMutation.mutate({
      adminId: administrator.id,
      isActive: !administrator.isActive,
    });
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-sam-text">
          Administrator Accounts
        </h2>

        <p className="mt-1 text-sm text-sam-muted">
          Users who currently have administrator access.
        </p>
      </div>

      {administrators.length === 0 ? (
        <div className="rounded-2xl border border-sam-border bg-white p-6 shadow-sm">
          <div className="py-8 text-center">
            <p className="text-sm text-sam-muted">
              No administrator accounts found.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {administrators.map((administrator) => (
            <div
              key={administrator.id}
              className="rounded-2xl border border-sam-border bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-sam-text">
                      {administrator.fullName}
                    </p>

                    <p className="mt-1 break-all text-sm text-sam-muted">
                      {administrator.email}
                    </p>

                    <p className="mt-1 text-xs text-sam-muted">
                      Administrator
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      administrator.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {administrator.isActive ? "Active" : "Suspended"}
                  </span>
                </div>

                <div className="border-t border-sam-border pt-4">
                  <p className="text-xs text-sam-muted">
                    Account created
                  </p>

                  <p className="mt-1 text-sm text-sam-text">
                    {formatDate(administrator.createdAt)}
                  </p>
                </div>

                <div>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    disabled={updateStatusMutation.isPending}
                    onClick={() => handleStatusChange(administrator)}
                  >
                    {updateStatusMutation.isPending
                      ? "Updating..."
                      : administrator.isActive
                        ? "Deactivate"
                        : "Activate"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}