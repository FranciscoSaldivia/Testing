import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label?: string;
  className?: string;
}

export function PlaceholderImage({ label, className }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed bg-muted/40 text-muted-foreground",
        className,
      )}
    >
      <ImageIcon className="h-6 w-6 opacity-60" />
      {label && <span className="text-[11px] text-center px-2">{label}</span>}
    </div>
  );
}
