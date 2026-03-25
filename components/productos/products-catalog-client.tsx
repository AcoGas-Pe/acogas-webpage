"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/domain/product";
import { cn } from "@/lib/utils";
import {
  type CatalogFilters,
  type ProductCatalogFacets,
  buildSearchSuggestions,
  emptyCatalogFilters,
  filterAndSearchProducts,
} from "@/lib/product-catalog";

type ViewMode = "grid" | "list";

interface ProductsCatalogClientProps {
  products: Product[];
  facets: ProductCatalogFacets;
}

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
}

function FilterSection({
  sectionId,
  title,
  values,
  selected,
  onToggle,
}: {
  sectionId: string;
  title: string;
  values: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  if (values.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </h3>
      <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
        {values.map((v) => {
          const id = `${sectionId}-${v}`.replace(/[^a-zA-Z0-9_-]/g, "_");
          const checked = selected.includes(v);
          return (
            <li key={v}>
              <label
                htmlFor={id}
                className="flex cursor-pointer items-start gap-2 rounded-md px-1 py-0.5 text-sm hover:bg-muted/80"
              >
                <input
                  id={id}
                  type="checkbox"
                  className="mt-0.5 rounded border-border"
                  checked={checked}
                  onChange={() => onToggle(v)}
                />
                <span className="leading-snug text-foreground">{v}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FilterPanel({
  facets,
  filters,
  setFilters,
  onClear,
  activeFilterCount,
}: {
  facets: ProductCatalogFacets;
  filters: CatalogFilters;
  setFilters: React.Dispatch<React.SetStateAction<CatalogFilters>>;
  onClear: () => void;
  activeFilterCount: number;
}) {
  const patch = useCallback(
    (key: keyof CatalogFilters, value: string) => {
      setFilters((prev) => ({
        ...prev,
        [key]: toggleInArray(prev[key], value),
      }));
    },
    [setFilters],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">Filtros</p>
        {activeFilterCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-primary hover:underline"
          >
            Limpiar ({activeFilterCount})
          </button>
        ) : null}
      </div>
      <FilterSection
        sectionId="marca"
        title="Marca"
        values={facets.marcas}
        selected={filters.marcas}
        onToggle={(v) => patch("marcas", v)}
      />
      <FilterSection
        sectionId="grupo"
        title="Grupo empresarial"
        values={facets.gruposEmpresariales}
        selected={filters.gruposEmpresariales}
        onToggle={(v) => patch("gruposEmpresariales", v)}
      />
      <FilterSection
        sectionId="macro"
        title="Macrocategoría"
        values={facets.macroCategorias}
        selected={filters.macroCategorias}
        onToggle={(v) => patch("macroCategorias", v)}
      />
      <FilterSection
        sectionId="cat"
        title="Categoría"
        values={facets.categorias}
        selected={filters.categorias}
        onToggle={(v) => patch("categorias", v)}
      />
      <FilterSection
        sectionId="brochure"
        title="Tipo de brochure"
        values={facets.tiposBrochure}
        selected={filters.tiposBrochure}
        onToggle={(v) => patch("tiposBrochure", v)}
      />
      <FilterSection
        sectionId="fluido"
        title="Fluido o gas"
        values={facets.fluidos}
        selected={filters.fluidos}
        onToggle={(v) => patch("fluidos", v)}
      />
    </div>
  );
}

function ProductPills({ product }: { product: Product }) {
  const brochure = product.tipoBrochure?.trim();
  const marca = product.marca?.trim();
  return (
    <div className="flex flex-wrap gap-1.5">
      {brochure ? (
        <span className="inline-flex max-w-full items-center rounded-full bg-primary/12 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary truncate">
          {brochure}
        </span>
      ) : null}
      {marca ? (
        <span className="inline-flex max-w-full items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground truncate">
          {marca}
        </span>
      ) : null}
    </div>
  );
}

export function ProductsCatalogClient({ products, facets }: ProductsCatalogClientProps) {
  const [filters, setFilters] = useState<CatalogFilters>(emptyCatalogFilters);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("grid");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    (Object.keys(filters) as (keyof CatalogFilters)[]).forEach((k) => {
      n += filters[k].length;
    });
    return n;
  }, [filters]);

  const filtered = useMemo(
    () => filterAndSearchProducts(products, filters, search),
    [products, filters, search],
  );

  const suggestions = useMemo(
    () => buildSearchSuggestions(products, search, 8),
    [products, search],
  );

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!searchWrapRef.current?.contains(e.target as Node)) setSuggestOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(emptyCatalogFilters());
  }, []);

  const applySuggestion = useCallback((slug: string) => {
    const p = products.find((x) => x.slug === slug);
    setSearch(p?.modelo ?? slug);
    setSuggestOpen(false);
  }, [products]);

  return (
    <section className="section py-10 sm:py-14 md:py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <aside className="hidden w-full shrink-0 lg:block lg:w-72">
            <div className="sticky top-24 space-y-4">
              <FilterPanel
                facets={facets}
                filters={filters}
                setFilters={setFilters}
                onClear={clearFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-6">
            <details className="group rounded-xl border border-border bg-card p-4 shadow-sm lg:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-foreground">
                <SlidersHorizontal className="h-4 w-4 shrink-0" />
                Filtros
                {activeFilterCount > 0 ? (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {activeFilterCount}
                  </span>
                ) : null}
                <span className="ml-auto text-muted-foreground transition group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="mt-4 border-t border-border pt-4">
                <FilterPanel
                  facets={facets}
                  filters={filters}
                  setFilters={setFilters}
                  onClear={clearFilters}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </details>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div ref={searchWrapRef} className="relative w-full sm:max-w-xl">
                <label htmlFor="catalog-search" className="sr-only">
                  Buscar productos
                </label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <input
                    id="catalog-search"
                    type="text"
                    inputMode="search"
                    enterKeyHint="search"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="catalog-search-suggestions"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSuggestOpen(true);
                    }}
                    onFocus={() => setSuggestOpen(true)}
                    placeholder="Buscar por nombre, marca, fluido…"
                    className={cn(
                      "w-full rounded-lg border border-border bg-background py-3 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      search ? "pr-10" : "pr-3",
                    )}
                  />
                  {search ? (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => {
                        setSearch("");
                        setSuggestOpen(false);
                      }}
                      aria-label="Limpiar búsqueda"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
                {suggestOpen && suggestions.length > 0 ? (
                  <ul
                    id="catalog-search-suggestions"
                    className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-border bg-background py-1 shadow-md ring-1 ring-border/80"
                    role="listbox"
                  >
                    {suggestions.map((s) => (
                      <li key={s.slug} role="option">
                        <button
                          type="button"
                          className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm hover:bg-muted"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => applySuggestion(s.slug)}
                        >
                          <span className="font-medium text-foreground line-clamp-2">{s.label}</span>
                          {s.subtitle ? (
                            <span className="text-xs text-muted-foreground">{s.subtitle}</span>
                          ) : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div
                className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-muted/30 p-1"
                role="group"
                aria-label="Vista de resultados"
              >
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                    view === "grid"
                      ? "bg-background text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={view === "grid"}
                  aria-label="Vista cuadrícula"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                    view === "list"
                      ? "bg-background text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={view === "list"}
                  aria-label="Vista lista"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {filtered.length === products.length
                ? `${products.length} producto${products.length === 1 ? "" : "s"}`
                : `${filtered.length} de ${products.length} producto${products.length === 1 ? "" : "s"}`}
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
                <p className="text-foreground font-medium">No hay resultados con estos criterios.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pruebe a limpiar filtros o ajustar la búsqueda.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clearFilters();
                    setSearch("");
                  }}
                  className="mt-4 text-sm font-semibold text-primary hover:underline"
                >
                  Restablecer filtros y búsqueda
                </button>
              </div>
            ) : view === "grid" ? (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <li key={p.slug}>
                    <ProductCardGrid product={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-3">
                {filtered.map((p) => (
                  <li key={p.slug}>
                    <ProductCardList product={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCardGrid({ product }: { product: Product }) {
  const img = product.imagen ?? "/assets/config/placeholder-image.png";
  const title = product.modelo ?? product.slug;
  return (
    <Link
      href={`/productos/${product.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {title}
        </h2>
        <ProductPills product={product} />
      </div>
    </Link>
  );
}

function ProductCardList({ product }: { product: Product }) {
  const img = product.imagen ?? "/assets/config/placeholder-image.png";
  const title = product.modelo ?? product.slug;
  return (
    <Link
      href={`/productos/${product.slug}/`}
      className="group flex gap-4 overflow-hidden rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-28">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <h2 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary sm:text-lg">
          {title}
        </h2>
        <div className="mt-2">
          <ProductPills product={product} />
        </div>
      </div>
    </Link>
  );
}
