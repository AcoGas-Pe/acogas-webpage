"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  InfiniteCarousel,
  InfiniteCarouselItem,
} from "@/components/ui/infinite-carousel";

interface Client {
  name: string;
  image: string;
}

interface ClientsProps {
  title?: string;
  subtitle?: string;
  clients?: Client[];
  className?: string;
}

const defaultClients: Client[] = [
  { name: "Emerson", image: "/assets/images/emerson.png" },
  { name: "Corken", image: "/assets/images/corken.png" },
  { name: "Cavagna Group", image: "/assets/images/cavagna.png" },
  { name: "Liquid Controls", image: "/assets/images/liquid-controls.png" },
  { name: "Fisher", image: "/assets/images/emerson.png" },
  { name: "Tartarini", image: "/assets/images/corken.png" },
];

export function Clients({
  title = "Marcas Que Representamos",
  subtitle = "Socios Estratégicos",
  clients = defaultClients,
  className,
}: ClientsProps) {
  return (
    <section
      className={cn(
        "section py-12 sm:py-16 md:py-20 bg-background border-y border-border",
        className
      )}
    >
      <div className="container mb-8 sm:mb-10">
        <div className="text-center">
          {subtitle && (
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
        </div>
      </div>

      <InfiniteCarousel
        speed={30}
        gap="gap-8"
        pauseOnHover
        className="py-2"
      >
        {clients.map((client) => (
          <InfiniteCarouselItem
            key={client.name}
            className="flex items-center justify-center px-6 sm:px-8 py-4 sm:py-6 min-w-[160px] sm:min-w-[200px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={client.image}
              alt={client.name}
              width={140}
              height={60}
              className="w-auto h-8 sm:h-10 md:h-12 object-contain"
            />
          </InfiniteCarouselItem>
        ))}
      </InfiniteCarousel>
    </section>
  );
}
