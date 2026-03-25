"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { useQuoteCart } from "@/contexts/quote-cart-context";
import { getProductBySlug } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuoteCartSidebar() {
  const router = useRouter();
  const { lines, isOpen, close, setLineQuantity, removeLine, totalQuantity } =
    useQuoteCart();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] md:z-[100]",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={close}
        aria-label="Cerrar cotización"
      />

      <aside
        className={cn(
          "absolute top-0 right-0 h-full w-[min(400px,92vw)] bg-background border-l border-border shadow-xl flex flex-col",
          "transform transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-cart-title"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <h2 id="quote-cart-title" className="text-lg font-semibold tracking-tight">
            Cotización ({totalQuantity})
          </h2>
          <button
            type="button"
            className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors"
            onClick={close}
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
          {lines.length === 0 ? (
            <p className="text-sm text-muted-foreground px-1 py-6 text-center">
              Aún no ha agregado productos. Use &quot;Agregar a cotización&quot; en la ficha del
              producto o busque en la página de cotizar.
            </p>
          ) : (
            lines.map((line) => {
              const p = getProductBySlug(line.slug);
              const title = p?.modelo ?? line.slug;
              const marca = p?.marca;
              const img = p?.imagen ?? "/assets/config/placeholder-image.png";
              return (
                <div
                  key={line.slug}
                  className="flex gap-3 rounded-lg border border-border p-3 bg-muted/30"
                >
                  <Link
                    href={`/productos/${line.slug}/`}
                    onClick={close}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted"
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/productos/${line.slug}/`}
                      onClick={close}
                      className="text-sm font-semibold text-foreground hover:text-primary line-clamp-2"
                    >
                      {title}
                    </Link>
                    {marca ? (
                      <p className="text-xs text-muted-foreground mt-0.5">{marca}</p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center rounded-md border border-border bg-background">
                        <button
                          type="button"
                          className="px-2 py-1 text-xs font-medium hover:bg-muted"
                          onClick={() =>
                            setLineQuantity(line.slug, line.quantity - 1)
                          }
                          aria-label="Disminuir cantidad"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs tabular-nums min-w-[2ch] text-center">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-1 text-xs font-medium hover:bg-muted"
                          onClick={() =>
                            setLineQuantity(line.slug, line.quantity + 1)
                          }
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs text-destructive hover:underline"
                        onClick={() => removeLine(line.slug)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <Button
            type="button"
            size="lg"
            className="w-full min-h-12"
            onClick={() => {
              close();
              router.push("/cotizar/");
            }}
          >
            Ir a cotizar
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            En cotizar podrá completar la lista y enviarla por WhatsApp.
          </p>
        </div>
      </aside>
    </div>
  );
}
