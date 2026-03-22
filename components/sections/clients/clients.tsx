"use client";

import { cn } from "@/lib/utils";
import { STRATEGIC_BRANDS } from "@/lib/strategic-brands";
import Image from "next/image";
import {
  InfiniteCarousel,
  InfiniteCarouselItem,
} from "@/components/ui/infinite-carousel";

interface ClientsProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Clients({
  title = "Marcas que representamos",
  subtitle = "Socios estratégicos",
  className,
}: ClientsProps) {
  return (
    <section className={cn("relative z-10 bg-card border-y border-border", className)}>

      <InfiniteCarousel speed={28} gap="gap-10" pauseOnHover className="py-4 sm:py-6">
        {STRATEGIC_BRANDS.map((brand) => (
          <InfiniteCarouselItem
            key={brand.name}
            className="flex min-w-max items-center justify-center px-2 sm:px-4"
          ><Image
          src={brand.logo || ""}
          alt={brand.name || ""}
          width={140}
          height={60}
          className="w-auto h-8 sm:h-10 md:h-12 object-contain"
        />  
            <span className="whitespace-nowrap text-sm sm:text-base md:text-lg font-semibold tracking-wide text-partner-foreground/90">
              {brand.name}
              {brand.line && (
                <span className="font-normal text-muted-foreground"> · {brand.line}</span>
              )}
            </span>
          </InfiniteCarouselItem>
        ))}
      </InfiniteCarousel>
    </section>
  );
}
