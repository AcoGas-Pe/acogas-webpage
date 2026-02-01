"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const slides = [
  "/assets/images/refinery.webp",
  "/assets/images/refiner2.jpg",
];

const FADE_DURATION_MS = 2000;
const SLIDE_INTERVAL_MS = 6000;

export function Slideshow() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  return (
    <div className="relative h-full w-full overflow-hidden z-0">
      {slides.map((image, idx) => (
        <Image
        width={100000}
        height={100000}
          key={idx}
          src={image}
          alt={`Slide ${idx + 1}`}
          className="absolute inset-0 h-full w-full size-full object-fit"
          aria-hidden={idx !== active}
          style={{
            opacity: idx === active ? 1 : 0,
            zIndex: idx === active ? 10 : 0,
            pointerEvents: idx === active ? "auto" : "none",
            transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
          }}
          sizes="100vw"
          priority={idx === 0}
          loading={idx === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}