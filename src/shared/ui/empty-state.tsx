import { SearchX } from "lucide-react";
import { Card } from "@/shared/ui/card";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <Card className="flex flex-col items-center justify-center p-10 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-black">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
}
