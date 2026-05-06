"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { Product } from "@/domain/product";
import { cn } from "@/lib/utils";
import {
  type CatalogFilters,
  type ProductCatalogFacets,
  buildSearchSuggestions,
  catalogFiltersFromSearchParams,
  emptyCatalogFilters,
  filterAndSearchProducts,
} from "@/lib/product-catalog";

const PRODUCTS_PER_PAGE = 9;

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
  expandList = false,
}: {
  sectionId: string;
  title: string;
  values: string[];
  selected: string[];
  onToggle: (v: string) => void;
  /** Sin límite de altura ni scroll interno */
  expandList?: boolean;
}) {
  if (values.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </h3>
      <ul
        className={cn(
          "space-y-1.5 pr-1",
          expandList ? "" : "max-h-48 overflow-y-auto",
        )}
      >
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
        expandList
      />
      <FilterSection
        sectionId="brochure"
        title="Tipo de brochure"
        values={facets.tiposBrochure}
        selected={filters.tiposBrochure}
        onToggle={(v) => patch("tiposBrochure", v)}
      />
      
    </div>
  );
}

function CatalogPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (p: number) => void;
}) {
  if (totalItems === 0) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const showPager = totalPages > 1;

  return (
    <nav
      className={cn(
        "flex flex-col gap-4 border-t border-border pt-8",
        showPager ? "sm:flex-row sm:items-center sm:justify-between" : "",
      )}
      aria-label="Paginación del catálogo"
    >
      <p className="text-sm text-muted-foreground">
        Mostrando{" "}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{" "}
        de <span className="font-medium text-foreground">{totalItems}</span>
        {showPager ? (
          <>
            {" "}
            · Página <span className="font-medium text-foreground">{page}</span> de{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </>
        ) : null}
      </p>
      {showPager ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-40"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
            Anterior
          </button>
          {totalPages <= 8 ? (
            <div className="flex flex-wrap items-center gap-1" role="list">
              {Array.from({ length: totalPages }, (_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    type="button"
                    role="listitem"
                    onClick={() => onPageChange(n)}
                    className={cn(
                      "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                      n === page
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:bg-muted",
                    )}
                    aria-label={`Ir a página ${n}`}
                    aria-current={n === page ? "page" : undefined}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-40"
            aria-label="Página siguiente"
          >
            Siguiente
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        </div>
      ) : null}
    </nav>
  );
}

/** Paginación compacta junto al contador (solo flechas + X/Y). */
function CatalogPaginationMini({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div
      className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-border bg-card px-1 py-0.5 shadow-sm"
      role="navigation"
      aria-label="Paginación rápida"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      <span className="min-w-[3rem] px-1 text-center text-xs font-medium tabular-nums text-muted-foreground">
        {page}/{totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
        aria-label="Página siguiente"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

function ProductPills({ product }: { product: Product }) {
  const brochure = product.tipoBrochure?.trim();
  const marca = product.marca?.trim();
  const grupo = product.grupoEmpresarial?.trim();
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
      {grupo ? (
        <span className="inline-flex max-w-full items-center rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground truncate">
          {grupo}
        </span>
      ) : null}
    </div>
  );
}

export function ProductsCatalogClient({ products, facets }: ProductsCatalogClientProps) {
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const [filters, setFilters] = useState<CatalogFilters>(emptyCatalogFilters());
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("grid");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const catalogScrollAnchorRef = useRef<HTMLDivElement>(null);
  const [catalogPage, setCatalogPage] = useState(1);
  const filterSearchPrevRef = useRef<string | null>(null);

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

  const filterSearchKey = useMemo(
    () => `${JSON.stringify(filters)}\0${search.trim()}`,
    [filters, search],
  );

  useEffect(() => {
    if (filterSearchPrevRef.current === null) {
      filterSearchPrevRef.current = filterSearchKey;
      return;
    }
    if (filterSearchPrevRef.current !== filterSearchKey) {
      filterSearchPrevRef.current = filterSearchKey;
      setCatalogPage(1);
    }
  }, [filterSearchKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(catalogPage, totalPages);

  useEffect(() => {
    if (catalogPage !== safePage) setCatalogPage(safePage);
  }, [catalogPage, safePage]);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filtered.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filtered, safePage]);

  const handleCatalogPageChange = useCallback(
    (next: number) => {
      const p = Math.max(1, Math.min(next, totalPages));
      setCatalogPage(p);
      catalogScrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [totalPages],
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

  /** Cada cambio de query (navbar, enlaces internos) vuelve a sincronizar el sidebar */
  useEffect(() => {
    const fromUrl = catalogFiltersFromSearchParams(
      new URLSearchParams(queryKey),
    );
    setFilters(fromUrl ?? emptyCatalogFilters());
  }, [queryKey]);

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

          <div ref={catalogScrollAnchorRef} className="min-w-0 flex-1 scroll-mt-28 space-y-6">
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

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-1">
              <p className="text-sm text-muted-foreground">
                {filtered.length === products.length
                  ? `${products.length} producto${products.length === 1 ? "" : "s"}`
                  : `${filtered.length} de ${products.length} producto${products.length === 1 ? "" : "s"}`}
                {filtered.length > PRODUCTS_PER_PAGE
                  ? ` · ${PRODUCTS_PER_PAGE} por página`
                  : ""}
              </p>
              <CatalogPaginationMini
                page={safePage}
                totalPages={totalPages}
                onPageChange={handleCatalogPageChange}
              />
            </div>

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
                {paginated.map((p) => (
                  <li key={p.slug}>
                    <ProductCardGrid product={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-3">
                {paginated.map((p) => (
                  <li key={p.slug}>
                    <ProductCardList product={p} />
                  </li>
                ))}
              </ul>
            )}

            <CatalogPagination
              page={safePage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={PRODUCTS_PER_PAGE}
              onPageChange={handleCatalogPageChange}
            />
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
