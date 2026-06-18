import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("inline-flex rounded-sm bg-secondary px-2 py-1 text-xs font-bold text-secondary-foreground", className)}>{children}</span>;
}
