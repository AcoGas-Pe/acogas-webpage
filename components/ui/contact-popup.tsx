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

  const handleClose = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
  }, [isExiting]);

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
        entering && "animate-in fade-in duration-300 ease-in-out",
        exiting && "animate-out fade-out duration-300 ease-in-out"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
          entering && "animate-in fade-in duration-300 ease-in-out",
          exiting && "animate-out fade-out duration-300 ease-in-out"
        )}
        onClick={handleClose}
        aria-hidden
      />
      <div
        className={cn(
          "relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-card border border-border shadow-xl transition-all duration-300 ease-in-out",
          entering && "animate-in fade-in zoom-in-95 duration-300 ease-in-out",
          exiting && "animate-out fade-out zoom-out-95 duration-300 ease-in-out"
        )}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-card z-10">
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
        <div
          className={cn(
            "p-4 sm:p-6 transition-all duration-300 ease-in-out",
            entering && "animate-in fade-in slide-in-from-bottom-2 duration-300 ease-in-out delay-75 fill-mode-both",
            exiting && "animate-out fade-out slide-out-to-bottom-2 duration-300 ease-in-out fill-mode-both"
          )}
        >
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
