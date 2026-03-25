"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
  className?: string;
  onFormReady?: () => void;
  /** Runs before the submission is sent to HubSpot */
  onFormSubmit?: () => void;
  /** Runs after HubSpot accepts the submission (use for post-success actions, e.g. downloads) */
  onFormSubmitted?: () => void;
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region?: string;
          target: string;
          onFormReady?: () => void;
          onFormSubmit?: () => void;
          onFormSubmitted?: () => void;
        }) => void;
      };
    };
  }
}

export function HubSpotForm({
  portalId,
  formId,
  region = "na1",
  className,
  onFormReady,
  onFormSubmit,
  onFormSubmitted,
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formCreated = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const handleFormReady = () => {
    setIsReady(true);
    onFormReady?.();
  };

  useEffect(() => {
    setIsReady(false);
    const loadForm = () => {
      if (formCreated.current || !containerRef.current) return;

      if (window.hbspt) {
        formCreated.current = true;
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#hubspot-form-${formId}`,
          onFormReady: handleFormReady,
          onFormSubmit,
          onFormSubmitted,
        });
      }
    };

    const existingScript = document.querySelector(
      'script[src*="js.hsforms.net/forms/embed"]'
    );

    if (existingScript) {
      if (window.hbspt) {
        loadForm();
      } else {
        existingScript.addEventListener("load", loadForm);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.async = true;
    script.onload = loadForm;
    document.body.appendChild(script);

    return () => {
      formCreated.current = false;
    };
  }, [portalId, formId, region, onFormSubmit, onFormSubmitted]);

  return (
    <div
      className={cn(
        "relative min-h-[min(12rem,38dvh)] sm:min-h-[200px] max-w-full",
        className
      )}
    >
      {/* Loader: shown until HubSpot form is ready */}
      {!isReady && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-muted/30"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2
            className="h-10 w-10 animate-spin text-primary"
            aria-hidden
          />
          <p className="text-sm font-medium text-muted-foreground">
            Cargando formulario…
          </p>
          <div className="flex gap-1">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_0.6s_ease-in-out_infinite]"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_0.6s_ease-in-out_infinite]"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_0.6s_ease-in-out_infinite]"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        id={`hubspot-form-${formId}`}
        className={cn(
          "hubspot-form-container max-w-full overflow-x-hidden transition-all duration-300",
          isReady
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        )}
      />
    </div>
  );
}
