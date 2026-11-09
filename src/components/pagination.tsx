import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { getPageNumbers, type Paginated } from "@/lib/paginate";
import { buildHref, type SearchParams } from "@/lib/search-params";

type PaginationProps = {
  pagination: Paginated<unknown>;
  pathname: string;
  searchParams: SearchParams;
};

export function Pagination({ pagination, pathname, searchParams }: PaginationProps) {
  const { page, totalPages, totalItems, from, to } = pagination;
  const hrefFor = (target: number) =>
    buildHref(pathname, searchParams, { page: target === 1 ? undefined : target });

  return (
    <nav aria-label="Navigasi halaman" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">
        Menampilkan <span className="font-medium text-ink">{from}-{to}</span> dari{" "}
        <span className="font-medium text-ink">{formatNumber(totalItems)}</span> data
      </p>

      {totalPages > 1 && (
        <ul className="flex items-center gap-1">
          <li>
            <PageLink href={hrefFor(page - 1)} disabled={page === 1} label="Halaman sebelumnya">
              <ChevronLeft className="size-4" aria-hidden />
            </PageLink>
          </li>
          {getPageNumbers(page, totalPages).map((item, index) =>
            item === "ellipsis" ? (
              <li key={`ellipsis-${index}`} aria-hidden className="px-2 text-muted">
                …
              </li>
            ) : (
              <li key={item}>
                <PageLink href={hrefFor(item)} active={item === page} label={`Halaman ${item}`}>
                  {item}
                </PageLink>
              </li>
            ),
          )}
          <li>
            <PageLink href={hrefFor(page + 1)} disabled={page === totalPages} label="Halaman berikutnya">
              <ChevronRight className="size-4" aria-hidden />
            </PageLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

type PageLinkProps = {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

function PageLink({ href, label, active = false, disabled = false, children }: PageLinkProps) {
  const className = cn(
    "flex size-9 items-center justify-center rounded-lg text-sm font-medium tabular-nums",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    active ? "bg-primary text-white" : "text-ink hover:bg-canvas",
    disabled && "pointer-events-none opacity-40",
  );

  if (disabled) {
    return (
      <span role="link" aria-disabled="true" aria-label={label} className={className}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} aria-current={active ? "page" : undefined} className={className}>
      {children}
    </Link>
  );
}
