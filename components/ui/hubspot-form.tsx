"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
  className?: string;
  onFormReady?: () => void;
  onFormSubmit?: () => void;
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
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formCreated = useRef(false);

  useEffect(() => {
    const loadForm = () => {
      if (formCreated.current || !containerRef.current) return;

      if (window.hbspt) {
        formCreated.current = true;
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#hubspot-form-${formId}`,
          onFormReady,
          onFormSubmit,
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
  }, [portalId, formId, region, onFormReady, onFormSubmit]);

  return (
    <div
      ref={containerRef}
      id={`hubspot-form-${formId}`}
      className={cn("hubspot-form-container", className)}
    />
  );
}
