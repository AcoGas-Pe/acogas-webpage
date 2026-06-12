"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type VideoSlide = {
  type: "video";
  src: string;
  /** Segundo en que inicia el crossfade hacia el siguiente clip */
  fadeOutAt: number;
};

const SLIDES: VideoSlide[] = [
  { type: "video", src: "/assets/videos/acogas-video-2.mp4", fadeOutAt: 14 },
  { type: "video", src: "/assets/videos/acogas-video-1.mp4", fadeOutAt: 8 },
];

const CROSSFADE_MS = 1000;

interface SlideshowProps {
  className?: string;
}

export function Slideshow({ className }: SlideshowProps) {
  const [active, setActive] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [blend, setBlend] = useState(0);
  const transitioningRef = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const startCrossfade = useCallback((from: number) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    const to = (from + 1) % SLIDES.length;
    const nextVideo = videoRefs.current[to];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
    setIncoming(to);
    setBlend(0);
    requestAnimationFrame(() => setBlend(1));
    window.setTimeout(() => {
      setActive(to);
      setIncoming(null);
      setBlend(0);
      transitioningRef.current = false;
    }, CROSSFADE_MS);
  }, []);

  useEffect(() => {
    const video = videoRefs.current[active];
    if (!video) return;

    const onTimeUpdate = () => {
      const slide = SLIDES[active];
      if (
        !transitioningRef.current &&
        video.currentTime >= slide.fadeOutAt
      ) {
        startCrossfade(active);
      }
    };

    video.currentTime = 0;
    video.play().catch(() => {});
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [active, startCrossfade]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {SLIDES.map((slide, idx) => {
        const isActive = idx === active;
        const isIncoming = idx === incoming;
        let opacity = 0;
        if (isIncoming) opacity = blend;
        else if (isActive && incoming === null) opacity = 1;
        else if (isActive && incoming !== null) opacity = 1 - blend;

        return (
          <video
            key={slide.src}
            ref={(el) => {
              videoRefs.current[idx] = el;
            }}
            src={slide.src}
            className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
            aria-hidden={opacity < 0.5}
            style={{
              opacity,
              zIndex: isIncoming ? 12 : isActive ? 10 : 0,
              transition:
                incoming !== null
                  ? `opacity ${CROSSFADE_MS}ms ease-in-out`
                  : undefined,
            }}
            muted
            playsInline
            preload="metadata"
          />
        );
      })}
    </div>
  );
}
