// src/app/(public)/public/layout.tsx

import type { ReactNode } from "react";
import Sidebar from "@/src/components/Sidebar";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1 lg:ml-1">
        {children}
      </main>
    </div>
  );
}
