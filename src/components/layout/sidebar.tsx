import { Logo } from "@/components/logo";
import { NavLinks } from "./nav-links";

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Logo className="h-9 w-auto" />
      </div>
      <nav aria-label="Menu utama" className="flex-1 p-4">
        <NavLinks orientation="vertical" />
      </nav>
    </aside>
  );
}
