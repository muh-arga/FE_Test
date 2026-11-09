import { cn } from "@/lib/cn";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-ink",
        "placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none",
        "read-only:bg-canvas read-only:text-muted aria-[invalid=true]:border-danger",
        "disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
