import { X } from "lucide-react";
import { PlaceholderImage } from "@/components/PlaceholderImage";

interface ImageModalProps {
  open: boolean;
  label: string;
  onClose: () => void;
}

export function ImageModal({ open, label, onClose }: ImageModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center gap-4 rounded-xl bg-card p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <PlaceholderImage label={label} className="h-72 w-[26rem] max-w-full" />
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
