"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatNumber, formatPercent } from "@/lib/format";
import type { ChartDatum } from "@/lib/lalin/dashboard";
import { ChartTooltip } from "./chart-tooltip";

type DonutChartCardProps = { title: string; description: string; data: ChartDatum[] };

const COLORS = [1, 2, 3, 4, 5, 6, 7].map((index) => `var(--color-chart-${index})`);

export function DonutChartCard({ title, description, data }: DonutChartCardProps) {
  const total = data.reduce((sum, datum) => sum + datum.value, 0);

  return (
    <Card className="p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-muted">{description}</p>

      {total === 0 ? (
        <EmptyState title="Belum ada data" description="Tidak ada lalin pada filter ini." />
      ) : (
        <div className="mt-4 grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="h-60" role="img" aria-label={`${title}: ${data.map((d) => `${d.name} ${formatPercent(d.value, total)}`).join(", ")}`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="90%" paddingAngle={2} stroke="var(--color-surface)">
                  {data.map((datum, index) => (
                    <Cell key={`${index}-${datum.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip total={total} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="space-y-2 text-sm">
            {data.map((datum, index) => (
              <li key={`${index}-${datum.name}`} className="flex items-center gap-3">
                <span aria-hidden className="size-3 shrink-0 rounded-sm" style={{ background: COLORS[index % COLORS.length] }} />
                <span className="flex-1">{datum.name}</span>
                <span className="tabular-nums text-muted">{formatNumber(datum.value)}</span>
                <span className="w-14 text-right font-medium tabular-nums">{formatPercent(datum.value, total)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
