import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/src/context/AuthContext";

import {
  Users,
  MessageSquare,
  ShieldCheck,
  Images,
  FileText,
  Database,
} from "lucide-react";

export interface DashboardSection {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export const dashboardSections: DashboardSection[] = [
  {
    id: "administrators",
    title: "Manage Administrators",
    description:
      "Invite, activate, suspend and manage administrator accounts.",
    href: "/admin/administrators",
    icon: Users,
    roles: ["super_admin"],
  },
  {
    id: "contacts",
    title: "Contact Messages",
    description:
      "Review incoming messages and manage communication with visitors.",
    href: "/admin/contact-messages",
    icon: MessageSquare,
    roles: ["super_admin", "admin"],
  },
  {
    id: "audit",
    title: "Audit Logs",
    description:
      "Monitor administrative actions and review system activity.",
    href: "/admin/audit-log",
    icon: ShieldCheck,
    roles: ["super_admin"],
  },
  {
    id: "media",
    title: "Media Library",
    description:
      "Upload, browse and manage website images and media assets.",
    href: "/admin/media",
    icon: Images,
    roles: ["super_admin", "admin"],
  },
  {
    id: "default-content",
    title: "Default Content",
    description:
      "Manage the website's original static content and MDX files.",
    href: "/admin/default-content",
    icon: FileText,
    roles: ["super_admin"],
  },
  {
    id: "managed-content",
    title: "Managed Content",
    description:
      "Create, edit, publish and manage database-backed website content.",
    href: "/admin/managed-content",
    icon: Database,
    roles: ["super_admin", "admin"],
  },
];