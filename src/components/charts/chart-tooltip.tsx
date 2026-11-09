"use client";

import { formatNumber, formatPercent } from "@/lib/format";
import type { ChartDatum } from "@/lib/lalin/dashboard";

type ChartTooltipProps = {
  total: number;
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: ChartDatum }>;
};

export function ChartTooltip({ active, payload, total }: ChartTooltipProps) {
  const datum = payload?.[0]?.payload;
  if (!active || !datum) return null;

  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow-lg">
      <p className="font-semibold text-ink">{datum.name}</p>
      {datum.detail && <p className="text-xs text-muted">{datum.detail}</p>}
      <p className="mt-1 tabular-nums">{formatNumber(datum.value)} kendaraan</p>
      <p className="text-xs text-muted">{formatPercent(datum.value, total)} dari total grafik ini</p>
    </div>
  );
}
