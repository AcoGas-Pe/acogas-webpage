"use client";

import { Slideshow } from "./slideshow";

/**
 * Full-width carousel section to be placed below the hero on the homepage.
 */
export function HeroCarousel() {
  return (
    <section className="relative w-full h-[40vh] min-h-[240px] max-h-[420px] overflow-hidden" aria-label="Galería">
      <Slideshow />
      <div className="absolute inset-0 bg-gradient-to-t from-background/75 to-transparent pointer-events-none" aria-hidden />
    </section>
  );
}
