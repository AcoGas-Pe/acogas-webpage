"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type MailtoLinkProps = {
  email: string;
  className?: string;
  /** Visible label before hydration (must not contain an email address). */
  placeholder?: string;
};

/**
 * Injects the address only after mount so Cloudflare email obfuscation
 * does not rewrite static HTML into `/cdn-cgi/l/email-protection` links.
 */
export function MailtoLink({
  email,
  className,
  placeholder = "Escribir correo",
}: MailtoLinkProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <span className={cn(className)}>{placeholder}</span>;
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
