"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

interface ServiceFaqAccordionProps {
  items: ServiceFaqItem[];
  className?: string;
}

/** Acordeón alineado con SiteFaqAccordion sin límite de altura oculto. */
export function ServiceFaqAccordion({ items, className }: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={`${faq.question}-${index}`}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:border-primary/20"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-foreground sm:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-accent transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <div className="border-t border-border/60 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
