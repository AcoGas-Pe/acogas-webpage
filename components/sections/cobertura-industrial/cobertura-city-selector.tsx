"use client";

import type { City } from "@/domain/city";
import { cn } from "@/lib/utils";
import { MapPinned, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useId } from "react";

export type CoberturaCitySelectorItem = Pick<City, "slug" | "name" | "region">;

export interface CoberturaCitySelectorProps {
  cities: CoberturaCitySelectorItem[];
  className?: string;
  /** Ancla útil para `#hash` desde la página. */
  id?: string;
}

/** Orden: región → nombre (es-PE). */
function sortForSelector(items: CoberturaCitySelectorItem[]) {
  return [...items].sort((a, b) => {
    const reg = (a.region ?? "").localeCompare(b.region ?? "", "es");
    if (reg !== 0) return reg;
    return a.name.localeCompare(b.name, "es");
  });
}

export function CoberturaCitySelector({
  cities,
  className,
  id,
}: CoberturaCitySelectorProps) {
  const router = useRouter();
  const sorted = sortForSelector(cities);
  const selectId = useId();

  const onSelect = useCallback(
    (slug: string) => {
      if (!slug.trim()) return;
      router.push(`/cobertura-industrial/${slug}/`);
    },
    [router],
  );

  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl border border-border/50 bg-card p-4 shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)] sm:flex sm:flex-wrap sm:items-end sm:gap-4 md:p-5",
        className,
      )}
    >
      <div className="mb-3 flex items-start gap-3 sm:mb-0 sm:min-w-0 sm:flex-1">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/18">
          <MapPinned className="h-[1.15rem] w-[1.15rem] text-primary" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Navegar por ciudad
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            Elegí una ciudad para ver cobertura, sectores y contacto específicos.
          </p>
        </div>
      </div>

      <div className="relative sm:w-[min(100%,20rem)] sm:shrink-0 md:w-[min(100%,22rem)]">
        <label htmlFor={selectId} className="sr-only">
          Seleccionar ciudad de cobertura
        </label>
        <select
          id={selectId}
          defaultValue=""
          onChange={(e) => {
            const slug = e.target.value;
            e.currentTarget.selectedIndex = 0;
            onSelect(slug);
          }}
          className={cn(
            "focus-visible:border-ring focus-visible:ring-ring/35 h-12 w-full cursor-pointer appearance-none rounded-lg border border-border/60 bg-background px-4 pr-10 text-sm font-medium text-foreground shadow-[0_10px_24px_-22px_hsl(var(--primary)_/_0.30)] outline-none transition",
            "focus-visible:ring-[3px]",
            "disabled:opacity-60",
          )}
        >
          <option value="">Todas las ciudades — ir al detalle…</option>
          {sorted.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.region ? `${c.name} (${c.region})` : c.name}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    </div>
  );
}
