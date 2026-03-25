import { siteConfig } from "@/lib/seo-config";

export type QuoteWhatsappItem = {
  slug: string;
  modelo: string;
  marca?: string;
  quantity: number;
};

/** Digits only, no + (wa.me format) */
export const WHATSAPP_QUOTE_PHONE_DIGITS = "51998345895";

export function productPageAbsoluteUrl(slug: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}/productos/${slug}/`;
}

export function buildQuoteWhatsappMessage(items: QuoteWhatsappItem[]): string {
  const header = "Hola, solicito cotización de los siguientes productos:";
  const body = items.map((it, i) => {
    const name = [it.marca, it.modelo].filter(Boolean).join(" — ");
    const url = productPageAbsoluteUrl(it.slug);
    return `${i + 1}. ${name}\n   Cantidad: ${it.quantity}\n   ${url}`;
  });
  return [header, "", ...body, "", "Gracias."].join("\n");
}

export function quoteWhatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_QUOTE_PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
}
