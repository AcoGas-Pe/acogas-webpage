"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InfiniteCarouselDirection = "left" | "right";

export interface InfiniteCarouselProps {
  /** Content to scroll (will be duplicated for seamless loop) */
  children: React.ReactNode;
  /** Animation duration for one full cycle (seconds). Default 30. */
  speed?: number;
  /** Scroll direction. Default "left". */
  direction?: InfiniteCarouselDirection;
  /** Pause animation on hover. Default true. */
  pauseOnHover?: boolean;
  /** Gap between items (Tailwind gap class, e.g. "gap-4", "gap-8"). Default "gap-6". */
  gap?: string;
  /** Optional class for the outer wrapper. */
  className?: string;
  /** Respect prefers-reduced-motion (disable animation when user requests less motion). Default false so carousel runs; set true for stricter a11y. */
  respectReducedMotion?: boolean;
}

const KEYFRAMES_ID = "infinite-carousel-keyframes";

function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes infinite-carousel-scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `;
  document.head.appendChild(style);
}

export function InfiniteCarousel({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = false,
  gap = "gap-6",
  className,
  respectReducedMotion = false,
}: InfiniteCarouselProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    ensureKeyframes();
  }, []);

  React.useEffect(() => {
    if (!respectReducedMotion || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [respectReducedMotion]);

  const shouldAnimate = !prefersReducedMotion && !isPaused;

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      aria-hidden
    >
      <div
        className={cn("flex w-max", gap)}
        style={
          shouldAnimate
            ? {
                animationName: "infinite-carousel-scroll",
                animationDuration: `${speed}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDirection: direction === "right" ? "reverse" : "normal",
              }
            : {
                animation: "none",
              }
        }
      >
        <div className={cn("flex shrink-0", gap)}>{children}</div>
        <div className={cn("flex shrink-0", gap)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Wrapper for a single carousel item. Use when you need consistent width/height
 * so the duplicate set aligns correctly (e.g. cards, logos).
 */
export function InfiniteCarouselItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("shrink-0", className)}>
      {children}
    </div>
  );
}
