import RequireRole from "@/src/components/auth/RequireRole";
import { AuditDashboard } from "@/src/components/admin/audit/AuditDashboard";

export default function AuditPage() {
  return (
    <RequireRole roles={["super_admin"]}>
      <AuditDashboard />
    </RequireRole>
  );
}