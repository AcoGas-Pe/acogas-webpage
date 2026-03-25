"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { useContactPopup } from "@/contexts/contact-popup-context";

const HUBSPOT_PORTAL_ID = "50826545";
const HUBSPOT_REGION = "na1";
const CONTACT_FORM_ID = "c2e45d2b-814d-4871-9c28-35cef611b42b";
const POPUP_DURATION_MS = 300;

export function ContactPopup() {
  const ctx = useContactPopup();
  const [isExiting, setIsExiting] = useState(false);
  const [isFadedIn, setIsFadedIn] = useState(false);

  const handleClose = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
  }, [isExiting]);

  // Fade in: start at opacity 0, then transition to 1 after mount
  useEffect(() => {
    if (!ctx?.isOpen || isExiting) {
      setIsFadedIn(false);
      return;
    }
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsFadedIn(true);
      });
    });
    return () => cancelAnimationFrame(t);
  }, [ctx?.isOpen, isExiting]);

  useEffect(() => {
    if (!isExiting) return;
    const t = setTimeout(() => {
      ctx?.close();
      setIsExiting(false);
    }, POPUP_DURATION_MS);
    return () => clearTimeout(t);
  }, [isExiting, ctx]);

  useEffect(() => {
    if (!ctx?.isOpen || isExiting) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [ctx?.isOpen, isExiting, handleClose]);

  if (!ctx) return null;
  const { isOpen } = ctx;
  const visible = isOpen || isExiting;
  if (!visible) return null;

  const entering = isOpen && !isExiting;
  const exiting = isExiting;

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex items-start justify-center overflow-y-auto overflow-x-hidden p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:overflow-hidden sm:p-4 transition-opacity duration-300 ease-in-out",
        entering && !isFadedIn && "opacity-0",
        entering && isFadedIn && "opacity-100",
        exiting && "opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
          entering && !isFadedIn && "opacity-0",
          entering && isFadedIn && "opacity-100",
          exiting && "opacity-0"
        )}
        onClick={handleClose}
        aria-hidden
      />
      <div
        className={cn(
          "relative my-auto flex w-full max-w-lg min-h-0 max-h-[min(92dvh,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl transition-all duration-300 ease-in-out sm:max-h-[min(90dvh,calc(100dvh-2rem))]",
          entering && !isFadedIn && "opacity-0 scale-95",
          entering && isFadedIn && "opacity-100 scale-100",
          exiting && "opacity-0 scale-95"
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border bg-card p-3 sm:p-4">
          <h2
            id="contact-popup-title"
            className="min-w-0 text-base font-bold text-foreground sm:text-lg"
          >
            Contáctanos
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain p-3 sm:p-6">
          <HubSpotForm
            className="max-w-full"
            portalId={HUBSPOT_PORTAL_ID}
            formId={CONTACT_FORM_ID}
            region={HUBSPOT_REGION}
            onFormSubmit={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
