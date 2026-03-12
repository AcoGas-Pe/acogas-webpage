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
        "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out",
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
          "relative flex w-full max-w-lg flex-col rounded-lg bg-card border border-border shadow-xl transition-all duration-300 ease-in-out",
          entering && !isFadedIn && "opacity-0 scale-95",
          entering && isFadedIn && "opacity-100 scale-100",
          exiting && "opacity-0 scale-95"
        )}
      >
        <div className="flex shrink-0 items-center justify-between p-4 border-b border-border bg-card">
          <h2 id="contact-popup-title" className="text-lg font-bold text-foreground">
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
        <div className="min-h-0 max-h-[85vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          <HubSpotForm
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
