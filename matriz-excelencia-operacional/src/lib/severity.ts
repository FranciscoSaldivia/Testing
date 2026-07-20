export type Severity = "none" | "low" | "high";

export function getSeverity(reclamos: number): Severity {
  if (reclamos === 0) return "none";
  if (reclamos <= 3) return "low";
  return "high";
}

export const severityConfig: Record<
  Severity,
  { fillVar: string; text: string; bg: string; border: string }
> = {
  none: {
    fillVar: "#10b981",
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    border: "border-emerald-200 dark:border-emerald-900",
  },
  low: {
    fillVar: "#f59e0b",
    text: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950",
    border: "border-amber-200 dark:border-amber-900",
  },
  high: {
    fillVar: "#ef4444",
    text: "text-red-700 dark:text-red-300",
    bg: "bg-red-50 dark:bg-red-950",
    border: "border-red-200 dark:border-red-900",
  },
};
