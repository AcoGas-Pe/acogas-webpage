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
        "inline-flex text-md items-center gap-1 px-3 py-2 font-medium transition-colors",
        "focus:outline-none font-semibold",
        isActive
          ? isAtTop
            ? "text-white/80 bg-primary-light/80 rounded-sm"
            : "text-white bg-white/15 rounded-sm"
          : isAtTop
            ? "text-white hover:text-red-500"
            : "text-white/90 hover:text-white",
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
