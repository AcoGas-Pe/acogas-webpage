"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import {
  InfiniteCarousel,
  InfiniteCarouselItem,
} from "@/components/ui/infinite-carousel";
import Image from "next/image";

interface Testimonial {
  name: string;
  isLocalGuide?: boolean;
  reviewCount?: number;
  content: string;
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Roy Navarro",
    reviewCount: 8,
    rating: 5,
    content:
      "Es una empresa pionera del gas y crece a paso a paso de gigante, ya será noticia pronto.",
  },
  {
    name: "J OLL",
    isLocalGuide: true,
    reviewCount: 124,
    rating: 5,
    content: "Tocar el timbre para ingresar. Buena atención.",
  },
  {
    name: "Eduars Yabar Gamarra",
    isLocalGuide: true,
    reviewCount: 31,
    rating: 5,
    content: "Una gran variedad de válvulas para gas GLP y GN.",
  },
  {
    name: "JPC",
    reviewCount: 2,
    rating: 5,
    content: "Excelente.",
  },
  {
    name: "Gabriel Lizama Celi",
    isLocalGuide: true,
    reviewCount: 418,
    rating: 5,
    content: "Un buen servicio.",
  },
  {
    name: "Jose Luis Melendrez",
    rating: 5,
    content: "Muy buen servicio y atención al cliente.",
  },
  {
    name: "Edgar Alberto",
    isLocalGuide: true,
    reviewCount: 86,
    rating: 5,
    content: "Recomendado, buen servicio.",
  },
];

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-5 w-5 drop-shadow-sm",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}



function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card-base relative flex h-full min-h-[220px] w-[310px] flex-col rounded-[1.75rem] bg-card p-5 sm:w-[360px] sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {testimonial.name}
          </p>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            {testimonial.isLocalGuide && (
              <span className="rounded-md bg-primary/8 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Guía Local
              </span>
            )}
            {testimonial.reviewCount && (
              <span className="text-[10px] text-muted-foreground">
                {testimonial.reviewCount} reseñas
              </span>
            )}
          </div>
        </div>
        <Image src="/assets/images/google-logo.webp" alt="Google" width={28} height={28} className="h-7 w-7 shrink-0" />
      </div>

      {/* Star rating */}
      <div className="mb-3">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Content */}
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground/82">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>
    </div>
  );
}

export function Testimonials({
  title = "Testimonios de nuestros clientes",
  subtitle = "Satisfacción garantizada",
  testimonials = defaultTestimonials,
  className,
}: TestimonialsProps) {
  return (
    <section
      className={cn("section bg-background-alt py-16 sm:py-20 md:py-24", className)}
    >
      <div className="container mb-10 sm:mb-14">
        <div className="text-center">
          {subtitle && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <Image src="/assets/images/google-logo.webp" alt="Google" width={28} height={28} className="h-7 w-7 shrink-0" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent">
                {subtitle}
              </p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Más de cincuenta años ofreciendo soluciones confiables y eficientes en gases industriales a clientes satisfechos en todo el Perú.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <InfiniteCarousel
        speed={40}
        direction="left"
        pauseOnHover={true}
        gap="gap-4 sm:gap-6"
        className="py-5"
      >
        {testimonials.map((testimonial, index) => (
          <InfiniteCarouselItem key={index}>
            <TestimonialCard testimonial={testimonial} />
          </InfiniteCarouselItem>
        ))}
      </InfiniteCarousel>

      {/* CTA to Google Reviews */}
      <div className="container mt-10 sm:mt-14">
        <div className="text-center">
          <a
            href="https://maps.app.goo.gl/J2kVQba4oCjYXBuE7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Image src="/assets/images/google-logo.webp" alt="Google" width={20} height={20} className="h-5 w-5 shrink-0" />
            Ver todas las reseñas en Google
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24" />
          </a>
        </div>
      </div>
    </section>
  );
}
