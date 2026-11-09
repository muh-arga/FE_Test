import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

type StatTileProps = { label: string; value: number; highlight?: boolean };

export function StatTile({ label, value, highlight = false }: StatTileProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight ? "col-span-2 border-primary bg-primary text-white lg:col-span-1" : "border-border bg-surface",
      )}
    >
      <p className={cn("text-xs font-medium", highlight ? "text-white/80" : "text-muted")}>{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{formatNumber(value)}</p>
    </div>
  );
}
