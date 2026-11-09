import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("rounded-xl border border-border bg-surface", className)} {...props} />;
}
