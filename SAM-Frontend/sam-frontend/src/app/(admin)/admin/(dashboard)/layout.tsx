// src/app/(admin)/admin/(dashboard)/layout.tsx

import type { ReactNode } from "react";
import AdminLayout from "@/src/components/layouts/AdminLayout";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminLayout
      role="super_admin"
      name="Administrator"
    >
      {children}
    </AdminLayout>
  );
}