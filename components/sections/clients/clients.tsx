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

/** Uniform logo tile: fixed width so every brand reads at similar horizontal size */
const logoTileClasses =
  "relative h-14 w-[8.75rem] shrink-0 sm:h-[4.5rem] sm:w-40 rounded-md border border-black/10 bg-white px-2 py-2 shadow-sm ring-1 ring-black/[0.04]";

export function Clients({
  title = "Marcas que representamos",
  subtitle = "Socios estratégicos",
  className,
}: ClientsProps) {
  return (
    <section
      aria-label={`${subtitle} — ${title}`}
      className={cn(
        "relative z-10 border-y border-border bg-background-alt",
        className,
      )}
    >
      <InfiniteCarousel
        speed={28}
        gap="gap-6 sm:gap-8"
        pauseOnHover
        className="py-4 sm:py-6"
      >
        {STRATEGIC_BRANDS.filter((brand) => brand.logo).map((brand) => (
          <InfiniteCarouselItem key={brand.slug} className="flex shrink-0">
            <div className={logoTileClasses}>
              <Image
                src={brand.logo as string}
                alt={
                  brand.line
                    ? `Logo ${brand.name} (${brand.line})`
                    : `Logo ${brand.name}`
                }
                fill
                className="object-contain object-center p-0.5"
                sizes="(max-width: 640px) 140px, 160px"
              />
            </div>
          </InfiniteCarouselItem>
        ))}
      </InfiniteCarousel>
    </section>
  );
}
