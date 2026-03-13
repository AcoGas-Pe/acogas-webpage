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
            "w-4 h-4",
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
    <div className="card-base relative p-5 sm:p-6 flex flex-col h-full min-h-[220px] w-[300px] sm:w-[340px]">
      {/* Header with avatar and info */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 ring-2 ring-primary/10">
          <span className="text-sm font-bold text-primary">
            {testimonial.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {testimonial.name}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {testimonial.isLocalGuide && (
              <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
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
        <Image src="/assets/images/google-logo.png" alt="Google" width={20} height={20} className="w-5 h-5 shrink-0" />
      </div>

      {/* Star rating */}
      <div className="mb-3">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Content */}
      <blockquote className="text-sm text-foreground/80 leading-relaxed flex-1">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>
    </div>
  );
}

export function Testimonials({
  title = "Testimonios de nuestros clientes",
  subtitle = "Satisfacion garantizada",
  testimonials = defaultTestimonials,
  className,
}: TestimonialsProps) {
  return (
    <section
      className={cn("section py-16 sm:py-20 md:py-24 bg-muted/30", className)}
    >
      <div className="container mb-10 sm:mb-14">
        <div className="text-center">
          {subtitle && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <Image src="/assets/images/google-logo.png" alt="Google" width={20} height={20} className="w-5 h-5 shrink-0" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent">
                {subtitle}
              </p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
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
        className="py-4"
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
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Image src="/assets/images/google-logo.png" alt="Google" width={20} height={20} className="w-4 h-4 shrink-0" />
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
