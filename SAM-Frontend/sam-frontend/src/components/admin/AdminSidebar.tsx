"use client";

import Link from "next/link";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Layers,
  Users,
  ShieldCheck,
  Settings,
  Image,
  ScrollText,
  LogOut,
  ExternalLink,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

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
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ["super_admin", "admin"] },

  {
    label: "Content",
    href: "/admin/content",
    icon: FileText,
    roles: ["super_admin", "admin"],
    children: [
      { label: "Default Content", href: "/admin/default-content", icon: FileText, roles: ["super_admin", "admin"] },
      { label: "Managed Content", href: "/admin/managed-content", icon: Layers, roles: ["super_admin"] },
    ],
  },

  { label: "Media", href: "/admin/media", icon: Image, roles: ["super_admin", "admin"] },
  { label: "Contact Messages", href: "/admin/contact-messages", icon: Users, roles: ["super_admin", "admin"] },

  { label: "Administrators", href: "/admin/administrators", icon: ShieldCheck, roles: ["super_admin"] },
  { label: "Audit Log", href: "/admin/audit-log", icon: ScrollText, roles: ["super_admin"] },
  { label: "Settings", href: "/admin/settings", icon: Settings, roles: ["super_admin"] },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const role = user?.role as AdminRole;
  const visibleItems = navigation.filter((item) => item.roles.includes(role));

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-sam-deep-blue/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          overflow-y-auto bg-sam-surface shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0
          lg:border-r lg:border-sam-border lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Branding */}
        <div className="sticky top-0 z-10 bg-sam-deep-blue px-5 py-4 text-white shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-sam-yellow">SAM Admin</h2>
            <p className="text-xs text-sam-blue">
              {role === "super_admin" ? "Control Center" : "Admin Center"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-sam-muted">
            Admin Navigation
          </p>

          <ul className="space-y-1">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              if (item.children) {
                const isOpenSection = openSections[item.label] ?? false;
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => toggleSection(item.label)}
                      className={`
                        group flex items-center gap-3 w-full rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200
                        ${isActive ? "bg-sam-blue text-white" : "text-sam-muted hover:bg-sam-blue/10 hover:text-sam-deep-blue"}
                      `}
                    >
                      <span
                        className={`
                          flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200
                          ${isActive ? "bg-sam-blue text-white" : "bg-slate-100 text-sam-muted group-hover:bg-sam-blue group-hover:text-white"}
                        `}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isOpenSection ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    {isOpenSection && (
                      <ul className="ml-12 mt-1 space-y-1">
                        {item.children
                          .filter((child) => child.roles.includes(role))
                          .map((child) => {
                            const ChildIcon = child.icon;
                            const childActive = pathname.startsWith(child.href);
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className={`
                                    group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200
                                    ${childActive ? "bg-sam-blue text-white" : "text-sam-muted hover:bg-sam-blue/10 hover:text-sam-deep-blue"}
                                  `}
                                >
                                  <ChildIcon className="h-4 w-4" />
                                  <span>{child.label}</span>
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200
                      ${isActive ? "bg-sam-blue text-white" : "text-sam-muted hover:bg-sam-blue/10 hover:text-sam-deep-blue"}
                    `}
                  >
                    <span
                      className={`
                        flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200
                        ${isActive ? "bg-sam-blue text-white" : "bg-slate-100 text-sam-muted group-hover:bg-sam-blue group-hover:text-white"}
                      `}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="space-y-3 px-4 pb-5 border-t border-sam-border">
          <Link
            href="/"
            onClick={onClose}
            className="group flex items-center justify-center gap-2 rounded-xl border border-sam-border px-4 py-2.5 text-sm font-medium text-sam-muted transition-all duration-200 hover:border-sam-blue hover:bg-sam-blue/10 hover:text-sam-deep-blue"
          >
            <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            <span>View Website</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-sam-border px-4 py-2.5 text-sm font-medium text-sam-muted transition-all duration-200 hover:border-sam-blue hover:bg-sam-blue/10 hover:text-sam-deep-blue"
          >
            <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
