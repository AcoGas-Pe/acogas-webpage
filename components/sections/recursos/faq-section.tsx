"use client";

import { cn } from "@/lib/utils";
import { SITE_FAQ_ITEMS } from "@/lib/site-faq-data";
import { SiteFaqAccordion } from "@/components/sections/recursos/site-faq-accordion";

interface FAQSectionProps {
  className?: string;
}

export function FAQSection({ className }: FAQSectionProps) {
  return (
    <section
      className={cn(
        "section bg-background-alt py-16 sm:py-20 md:py-24",
        className,
      )}
    >
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-sm">
              FAQ
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Preguntas Frecuentes
            </h2>
          </div>

          <SiteFaqAccordion items={SITE_FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}
