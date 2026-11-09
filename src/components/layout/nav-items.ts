import { FileSpreadsheet, LayoutDashboard, MapPinned, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/laporan-lalin", label: "Laporan Lalin", icon: FileSpreadsheet },
  { href: "/master-gerbang", label: "Master Gerbang", icon: MapPinned },
];
