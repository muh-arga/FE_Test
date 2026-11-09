"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatNumber } from "@/lib/format";
import type { ChartDatum } from "@/lib/lalin/dashboard";
import { ChartTooltip } from "./chart-tooltip";

type BarChartCardProps = { title: string; description: string; data: ChartDatum[] };

const AXIS_TICK = { fill: "var(--color-muted)", fontSize: 12 };

export function BarChartCard({ title, description, data }: BarChartCardProps) {
  const total = data.reduce((sum, datum) => sum + datum.value, 0);

  return (
    <Card className="p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-muted">{description}</p>

      {total === 0 ? (
        <EmptyState title="Belum ada data" description="Tidak ada lalin pada filter ini." />
      ) : (
        <div className="mt-4 h-72" role="img" aria-label={`${title}: ${data.map((d) => `${d.name} ${d.value}`).join(", ")}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={AXIS_TICK} interval={0} />
              <YAxis tickFormatter={(value: number) => formatNumber(value)} tickLine={false} axisLine={false} tick={AXIS_TICK} width={56} />
              <Tooltip cursor={{ fill: "var(--color-primary-soft)" }} content={<ChartTooltip total={total} />} />
              <Bar dataKey="value" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
