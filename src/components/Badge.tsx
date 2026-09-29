import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "muted";
  className?: string;
}) {
  const tones = {
    brand: "border-brand-500/30 bg-brand-50 text-brand-700",
    muted: "border-line bg-surface-2 text-muted",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
