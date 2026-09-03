// src/components/admin/AdminSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  HeartPulse,
  Users,
  ShieldCheck,
  Settings,
  Image,
  ScrollText,
  LogOut,
  ExternalLink,
  X,
} from "lucide-react";

type AdminRole = "super_admin" | "admin";

interface AdminSidebarProps {
  role: AdminRole;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: AdminRole[];
}

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["super_admin", "admin"],
  },

  // Content
  {
    label: "Articles",
    href: "/admin/articles",
    icon: FileText,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Bible Studies",
    href: "/admin/bible-study",
    icon: BookOpen,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Health",
    href: "/admin/health",
    icon: HeartPulse,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: Image,
    roles: ["super_admin", "admin"],
  },

  // Super admin only
  {
    label: "Administrators",
    href: "/admin/administrators",
    icon: ShieldCheck,
    roles: ["super_admin"],
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["super_admin"],
  },
  {
    label: "Audit Log",
    href: "/admin/audit-log",
    icon: ScrollText,
    roles: ["super_admin"],
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["super_admin"],
  },
];

export default function AdminSidebar({
  role,
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const visibleItems = navigation.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-sam-border
          bg-sam-surface
          transition-transform duration-300 ease-in-out

          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Branding */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-sam-border px-6">
          <div>
            <h1 className="text-lg font-bold text-sam-deep-blue">
              SAM
            </h1>

            <p className="text-xs text-sam-muted">
              {role === "super_admin"
                ? "Control Center"
                : "Admin Center"}
            </p>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-sam-muted transition-colors hover:bg-sam-background hover:text-sam-text lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {visibleItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 rounded-lg
                    px-3 py-2.5
                    text-sm font-medium
                    transition-colors
                    ${
                      isActive
                        ? "bg-sam-blue text-white"
                        : "text-sam-muted hover:bg-sam-background hover:text-sam-text"
                    }
                  `}
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="shrink-0 border-t border-sam-border p-4">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sam-muted transition-colors hover:bg-sam-background hover:text-sam-text"
            >
              <ExternalLink className="h-5 w-5" />

              <span>View Website</span>
            </Link>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sam-muted transition-colors hover:bg-sam-background hover:text-sam-text"
            >
              <LogOut className="h-5 w-5" />

              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
