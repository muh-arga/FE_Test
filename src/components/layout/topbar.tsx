import { LogOut, UserRound } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/auth/actions";
import { getCurrentUsername } from "@/lib/auth/session";
import { NavLinks } from "./nav-links";

export async function Topbar() {
  const username = await getCurrentUsername();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
        <Logo className="h-8 w-auto lg:hidden" />
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden items-center gap-2 text-sm text-muted sm:flex">
            <UserRound className="size-4" aria-hidden />
            {username ?? "Pengguna"}
          </span>
          <form action={logoutAction}>
            <Button type="submit" variant="secondary" size="sm">
              <LogOut className="size-4" aria-hidden />
              Keluar
            </Button>
          </form>
        </div>
      </div>
      <nav aria-label="Menu utama" className="border-t border-border px-4 py-2 lg:hidden">
        <NavLinks orientation="horizontal" />
      </nav>
    </header>
  );
}
