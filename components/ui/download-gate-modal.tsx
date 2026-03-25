"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { markProductDownloadGateSatisfied } from "@/lib/download-gate-storage";
import { triggerFileDownload } from "@/lib/trigger-file-download";

const HUBSPOT_PORTAL_ID = "50826545";
const HUBSPOT_REGION = "na1";
/** Form shown before catalog / document download (HubSpot embed) */
const DOWNLOAD_FORM_ID = "c5c1d193-9457-4cab-9d41-d7bfd3e064c9";

const POPUP_DURATION_MS = 300;

interface DownloadGateModalProps {
  open: boolean;
  onClose: () => void;
  /** Product page slug — used to remember a successful gate for ~7 days */
  productSlug: string;
  /** Absolute or site-relative URL of the file to open after successful submit */
  downloadUrl: string;
  /** Document title for the dialog heading */
  documentTitle: string;
}

export function DownloadGateModal({
  open,
  onClose,
  productSlug,
  downloadUrl,
  documentTitle,
}: DownloadGateModalProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isFadedIn, setIsFadedIn] = useState(false);

  const handleClose = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
  }, [isExiting]);

  /** Runs after HubSpot confirms the lead capture — then download the file */
  const handleFormSubmitted = useCallback(async () => {
    markProductDownloadGateSatisfied(productSlug);
    if (downloadUrl) {
      await triggerFileDownload(downloadUrl, documentTitle);
    }
    handleClose();
  }, [productSlug, downloadUrl, documentTitle, handleClose]);

  useEffect(() => {
    if (!open || isExiting) {
      setIsFadedIn(false);
      return;
    }
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsFadedIn(true);
      });
    });
    return () => cancelAnimationFrame(t);
  }, [open, isExiting]);

  useEffect(() => {
    if (!isExiting) return;
    const t = setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, POPUP_DURATION_MS);
    return () => clearTimeout(t);
  }, [isExiting, onClose]);

  useEffect(() => {
    if (!open || isExiting) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [open, isExiting, handleClose]);

  const visible = open || isExiting;
  if (!visible) return null;

  const entering = open && !isExiting;
  const exiting = isExiting;

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex items-center justify-center overflow-hidden p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4 transition-opacity duration-300 ease-in-out",
        entering && !isFadedIn && "opacity-0",
        entering && isFadedIn && "opacity-100",
        exiting && "opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-gate-title"
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
          entering && !isFadedIn && "opacity-0",
          entering && isFadedIn && "opacity-100",
          exiting && "opacity-0",
        )}
        onClick={handleClose}
        aria-hidden
      />
      <div
        className={cn(
          "relative flex w-full max-w-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl transition-all duration-300 ease-in-out max-h-[min(92dvh,calc(100dvh-1.5rem))] sm:max-h-none sm:overflow-visible sm:w-[min(50dvw,42rem)]",
          entering && !isFadedIn && "opacity-0 scale-95",
          entering && isFadedIn && "opacity-100 scale-100",
          exiting && "opacity-0 scale-95"
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border bg-card p-3 sm:p-4">
          <h2 id="download-gate-title" className="min-w-0 pr-2 text-base font-bold text-foreground sm:text-lg">
            Descargar documento
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto overscroll-contain p-3 sm:flex-none sm:overflow-visible sm:overscroll-auto sm:p-6">
          <p className="shrink-0 text-sm leading-relaxed text-muted-foreground">
            Complete el formulario para acceder a{" "}
            <span className="wrap-break-word font-medium text-primary">
              {documentTitle}
            </span>
            .
          </p>
          <HubSpotForm
            className="max-w-full"
            portalId={HUBSPOT_PORTAL_ID}
            formId={DOWNLOAD_FORM_ID}
            region={HUBSPOT_REGION}
            onFormSubmitted={handleFormSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
