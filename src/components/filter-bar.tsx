import { Filter, Search } from "lucide-react";
import Form from "next/form";
import { FilterResetLink } from "@/components/filter-reset-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildHref } from "@/lib/search-params";

type FilterBarProps = {
  pathname: string;
  query: string;
  searchPlaceholder: string;
  showDate?: boolean;
  date?: string;
  keepParams?: Record<string, string>;
};

export function FilterBar({
  pathname,
  query,
  searchPlaceholder,
  showDate = false,
  date = "",
  keepParams = {},
}: FilterBarProps) {
  return (
    <Form action={pathname} className="flex flex-col gap-3 md:flex-row md:items-end">
      {Object.entries(keepParams).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="flex-1 space-y-1.5">
        <label htmlFor="filter-q" className="block text-sm font-medium">
          Cari
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <Input id="filter-q" key={query} type="search" name="q" defaultValue={query} placeholder={searchPlaceholder} className="pl-9" />
        </div>
      </div>

      {showDate && (
        <div className="space-y-1.5 md:w-48">
          <label htmlFor="filter-tanggal" className="block text-sm font-medium">
            Tanggal
          </label>
          <Input id="filter-tanggal" key={date} type="date" name="tanggal" defaultValue={date} />
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit">
          <Filter className="size-4" aria-hidden />
          Terapkan
        </Button>
        <FilterResetLink href={buildHref(pathname, keepParams, {})} />
      </div>
    </Form>
  );
}
