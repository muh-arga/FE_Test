export default function Loading() {
  return (
    <div role="status" className="space-y-6">
      <span className="sr-only">Memuat data…</span>
      <div aria-hidden className="h-8 w-64 animate-pulse rounded-lg bg-border/60" />
      <div aria-hidden className="h-20 animate-pulse rounded-xl bg-border/40" />
      <div aria-hidden className="h-96 animate-pulse rounded-xl bg-border/40" />
    </div>
  );
}
