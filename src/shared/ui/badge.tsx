import { cn } from "@/shared/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-sm bg-primary/10 px-2 py-1 text-xs font-bold text-primary", className)}>{children}</span>;
}
