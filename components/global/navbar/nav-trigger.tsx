"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavTriggerProps {
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
}

export function NavTrigger({ label, isActive, onMouseEnter }: NavTriggerProps) {
  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
        "hover:text-primary-light focus:outline-none",
        isActive ? "text-primary-light" : "text-foreground"
      )}
    >
      {label}
      <ChevronDown 
        className={cn(
          "w-4 h-4 transition-transform duration-200",
          isActive && "rotate-180"
        )} 
      />
    </button>
  );
}
