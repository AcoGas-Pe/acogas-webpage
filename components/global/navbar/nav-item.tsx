"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
  /** When false (scrolled), navbar uses dark bar — links stay light for contrast */
  isAtTop?: boolean;
}

export function NavItem({ label, href, isActive, isAtTop = true }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-3 py-2 text-sm font-medium transition-colors focus:outline-none",
        isAtTop
          ? isActive
            ? "text-primary"
            : "text-primary hover:text-[hsl(var(--primary-light))]"
          : isActive
            ? "text-white"
            : "text-white/90 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}
