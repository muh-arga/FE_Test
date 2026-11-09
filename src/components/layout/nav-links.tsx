"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "./nav-items";

export function NavLinks({ orientation }: { orientation: "vertical" | "horizontal" }) {
  const pathname = usePathname();

  return (
    <ul className={orientation === "vertical" ? "space-y-1" : "grid grid-cols-3 gap-1"}>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center rounded-lg font-medium whitespace-nowrap transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                orientation === "vertical"
                  ? "gap-3 px-3 py-2 text-sm"
                  : "flex-col justify-center gap-1 px-2 py-1.5 text-xs",
                isActive ? "bg-primary-soft text-primary" : "text-muted hover:bg-canvas hover:text-ink",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
