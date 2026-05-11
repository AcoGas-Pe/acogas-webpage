"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SiteFaqItem } from "@/lib/site-faq-data";

interface SiteFaqAccordionProps {
  items: SiteFaqItem[];
  className?: string;
}

export function SiteFaqAccordion({ items, className }: SiteFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="card-base overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left sm:p-5"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-foreground sm:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 sm:h-5 sm:w-5",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-96" : "max-h-0",
              )}
            >
              <p className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground sm:px-5 sm:pb-5 sm:text-sm">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
