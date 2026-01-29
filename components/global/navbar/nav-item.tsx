"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}

export function NavItem({ label, href, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-3 py-2 text-sm font-medium transition-colors",
        "hover:text-primary focus:outline-none",
        isActive ? "text-primary" : "text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
