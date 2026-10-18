import type { LucideIcon } from "lucide-react";
import {
  FileText,
  LayoutDashboard,
  MessageSquareCode,
  Settings,
  User,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  tag: string;
  description: string;
}

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    tag: "// OVERVIEW",
    description: "Command center and active tracks",
  },
  {
    name: "Resume",
    href: "/resume",
    icon: FileText,
    tag: "// TRACK_01",
    description: "Evidence-backed resume builder",
  },
  {
    name: "Interview",
    href: "/interview",
    icon: MessageSquareCode,
    tag: "// TRACK_02",
    description: "AI technical interview arena",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    tag: "// PROFILE",
    description: "Developer identity and credentials",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    tag: "// SETTINGS",
    description: "Account and security preferences",
  },
];
