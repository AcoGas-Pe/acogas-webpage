"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavTriggerProps {
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
  isAtTop: boolean;
}

export function NavTrigger({
  label,
  isActive,
  onMouseEnter,
  isAtTop,
}: NavTriggerProps) {
  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
        "hover:text-primary-light focus:outline-none font-semibold",
        isActive
          ? "text-primary-light bg-primary/10 rounded-sm"
          : isAtTop
            ? "text-foreground"
            : "text-white/80",
      )}
    >
      {label}
      <ChevronDown
        className={cn(
          "w-4 h-4 transition-transform duration-200",
          isActive && "rotate-180",
        )}
      />
    </button>
  );
}
