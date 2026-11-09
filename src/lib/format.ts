const numberFormatter = new Intl.NumberFormat("id-ID");
const percentFormatter = new Intl.NumberFormat("id-ID", { style: "percent", maximumFractionDigits: 1 });
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const dayFormatter = new Intl.DateTimeFormat("id-ID", { weekday: "long", timeZone: "UTC" });

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatPercent(part: number, total: number): string {
  return percentFormatter.format(total === 0 ? 0 : part / total);
}

export function toDateKey(isoDate: string): string {
  return isoDate.slice(0, 10);
}

export function formatDate(dateKey: string): string {
  return dateFormatter.format(new Date(`${dateKey}T00:00:00Z`));
}

export function formatDayName(dateKey: string): string {
  return dayFormatter.format(new Date(`${dateKey}T00:00:00Z`));
}
