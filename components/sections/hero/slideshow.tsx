"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type Slide = { type: "image"; src: string } | { type: "video"; src: string };

const slides: Slide[] = [
  { type: "video", src: "/assets/videos/acogas-video-1.mp4" },
  { type: "video", src: "/assets/videos/acogas-video-2.mp4" },
];

const FADE_DURATION_MS = 2000;
const SLIDE_INTERVAL_MS = 6000;

export function Slideshow() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === active) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  return (
    <div className="relative h-full w-full overflow-hidden z-0">
      {slides.map((slide, idx) => {
        const isActive = idx === active;
        const style = {
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 10 : 0,
          pointerEvents: isActive ? "auto" as const : "none" as const,
          transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
        };

        if (slide.type === "video") {
          return (
            <video
              key={idx}
              ref={(el) => { videoRefs.current[idx] = el; }}
              src={slide.src}
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden={!isActive}
              style={style}
              muted
              loop
              playsInline
              preload="metadata"
            />
          );
        }

        return (
          <Image
            width={100000}
            height={100000}
            key={idx}
            src={slide.src}
            alt={`Slide ${idx + 1}`}
            className="absolute inset-0 h-full w-full size-full object-cover"
            aria-hidden={!isActive}
            style={style}
            sizes="100vw"
            priority={idx === 0}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        );
      })}
    </div>
  );
}