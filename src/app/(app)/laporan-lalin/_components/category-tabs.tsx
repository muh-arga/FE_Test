import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import type { CategorySummary, PaymentCategoryKey } from "@/lib/lalin/payment";
import { buildHref, type SearchParams } from "@/lib/search-params";

type CategoryTabsProps = {
  summary: CategorySummary[];
  activeKey: PaymentCategoryKey;
  pathname: string;
  searchParams: SearchParams;
};

export function CategoryTabs({ summary, activeKey, pathname, searchParams }: CategoryTabsProps) {
  return (
    <nav aria-label="Jenis pembayaran">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {summary.map(({ category, total }) => {
          const isActive = category.key === activeKey;
          return (
            <li key={category.key}>
              <Link
                href={buildHref(pathname, searchParams, { metode: category.key, page: undefined })}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block h-full rounded-xl border p-4 transition-colors",
                  isActive
                    ? "border-primary bg-primary-soft ring-1 ring-primary"
                    : "border-border bg-surface hover:border-primary/40",
                )}
              >
                <span className={cn("block text-xs font-medium", isActive ? "text-primary" : "text-muted")}>
                  {category.label}
                </span>
                <span className="mt-1 block text-xl font-semibold tabular-nums">{formatNumber(total)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
