"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WhatsAppButtonProps {
  /** Phone number to contact (with country code) */
  phoneNumber?: string;
  /** Pre-filled message for WhatsApp */
  message?: string;
  /** Additional CSS classes */
  className?: string;
  /** Button variant - floating (fixed position) or inline */
  variant?: "default" | "floating" | "inline";
  /** Button size */
  size?: "sm" | "default" | "lg";
  /** Show on mobile devices */
  showOnMobile?: boolean;
  /** Show on desktop devices */
  showOnDesktop?: boolean;
}

// Simplified bot detection for better performance
const isBot = (): boolean => {
  if (typeof window === "undefined") return false;
  const userAgent = navigator.userAgent;
  return /bot|crawler|spider|scraper|curl|wget|python|java|php|headless|puppet|selenium|phantom|lighthouse/i.test(
    userAgent,
  );
};

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "+51998345895",
  message = "Hola, necesito información sobre sus servicios. ¿Pueden ayudarme?",
  className,
  variant = "floating",
  size = "default",
  showOnMobile = true,
  showOnDesktop = false,
}) => {
  // Memoize expensive computations
  const isMobile = React.useMemo(
    () => typeof window !== "undefined" && window.innerWidth <= 768,
    [],
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Simplified human detection with reduced intervals
  const handleUserInteraction = useCallback(() => {
    if (!isHuman) {
      setIsHuman(true);
      setIsVisible(true);
    }
  }, [isHuman]);

  // Bot detection and human verification - optimized for performance
  useEffect(() => {
    if (isBot()) {
      // Hide the entry point for bots before registering interaction listeners.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(false);
      return;
    }

    // Reduced event listeners for better performance
    const events = ["mousedown", "touchstart", "scroll"];

    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, {
        once: true,
        passive: true,
      });
    });

    // Show after 3 seconds if no interaction (increased from 2s for better UX)
    const timer = setTimeout(() => {
      if (!isHuman) {
        setIsVisible(true);
      }
    }, 3000);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
      clearTimeout(timer);
    };
  }, [handleUserInteraction, isHuman]);

  // Optimized click handler with security best practices
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodedMessage}`;

      // Use a single approach to prevent double opening
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    },
    [phoneNumber, message],
  );

  // Don't render if not visible or on wrong device
  if (!isVisible) return null;

  // Device detection (using memoized value)
  if (isMobile && !showOnMobile) return null;
  if (!isMobile && !showOnDesktop) return null;

  const buttonContent = (
    <>
      <span className="relative hidden cursor-pointer flex-row items-center gap-2 sm:flex">
        <Image
          src="/assets/images/whatsapp.svg"
          alt="WhatsApp"
          width={56}
          height={56}
          className="h-14 w-14"
        />
        <span className="absolute inset-0 rounded-full bg-green-500/35 animate-ping"></span>
      </span>
      <span className="relative flex items-center justify-center sm:hidden">
        <Image
          src="/assets/images/whatsapp.svg"
          alt="WhatsApp"
          width={44}
          height={44}
          className="h-11 w-11"
        />
        <span className="absolute inset-0 rounded-full bg-green-500/35 animate-ping"></span>
      </span>
    </>
  );

  // Floating variant (fixed position) - Fixed sizing issues
  if (variant === "floating") {
    return (
      <>
        {/* Honeypot element for bot detection */}
        <div
          className="fixed top-0 left-0 w-4 h-4 opacity-0 pointer-events-none z-[-1]"
          aria-hidden="true"
        />

        <Button
          ref={buttonRef}
          onClick={handleClick}
          className={cn(
            "fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "h-16 w-16 rounded-full p-2 sm:h-[4.75rem] sm:w-[4.75rem]",
            "shadow-[0_16px_45px_rgba(22,163,74,0.32)] hover:shadow-[0_20px_55px_rgba(22,163,74,0.42)]",
            "transition-all duration-200 ease-in-out",
            "animate-in slide-in-from-bottom-2 fade-in duration-300",
            "border border-white/70",
            "font-medium",
            className,
          )}
          size={size}
          aria-label="Contactanos en WhatsApp"
          title="Contactanos en WhatsApp"
        >
          {buttonContent}
        </Button>
      </>
    );
  }

  // Inline variant
  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "shadow-md hover:shadow-lg",
        "transition-all duration-200 ease-in-out",
        "rounded-lg",
        "font-medium",
        className,
      )}
      size={size}
      aria-label="Contactanos en WhatsApp"
    >
      {buttonContent}
    </Button>
  );
};

export { WhatsAppButton };
export type { WhatsAppButtonProps };
