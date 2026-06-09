"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  catalogFiltersToSearchParams,
  emptyCatalogFilters,
  filterAndSearchProducts,
} from "@/lib/product-catalog";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/default-images";
import { MacroCategoryIcon } from "@/lib/macro-category-icon";

const PRODUCTS_PER_PAGE = 9;

type ViewMode = "grid" | "list";

interface ProductsCatalogClientProps {
  products: Product[];
  facets: ProductCatalogFacets;
}

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
}

type GuidedFilterKey = "marcas" | "macroCategorias" | "categorias";

const guidedFilterLabels: Record<GuidedFilterKey, string> = {
  marcas: "Marca",
  macroCategorias: "Macrocategoría",
  categorias: "Categoría",
};

function productValueForFilter(product: Product, key: GuidedFilterKey): string {
  if (key === "marcas") return product.marca?.trim() ?? "";
  if (key === "macroCategorias") return product.macroCategoria?.trim() ?? "";
  return product.categoria?.trim() ?? "";
}

function productMatchesGuidedFilters(
  product: Product,
  filters: CatalogFilters,
  exceptKey?: GuidedFilterKey,
): boolean {
  const guidedKeys: GuidedFilterKey[] = [
    "marcas",
    "macroCategorias",
    "categorias",
  ];

  for (const key of guidedKeys) {
    if (key === exceptKey) continue;
    const selected = filters[key];
    if (selected.length === 0) continue;
    if (!selected.includes(productValueForFilter(product, key))) return false;
  }

  return true;
}

function GuidedFilterCheckboxSection({
  filterKey,
  values,
  filters,
  products,
  onToggle,
  initialVisible = 8,
}: {
  filterKey: GuidedFilterKey;
  values: string[];
  filters: CatalogFilters;
  products: Product[];
  onToggle: (value: string) => void;
  initialVisible?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const selectedValues = filters[filterKey];
  const options = values.map((value) => {
    const checked = selectedValues.includes(value);
    const matchesOtherFilters = products.some(
      (product) =>
        productValueForFilter(product, filterKey) === value &&
        productMatchesGuidedFilters(product, filters, filterKey),
    );
    return {
      value,
      checked,
      enabled: checked || (matchesOtherFilters && selectedValues.length === 0),
    };
  });
  const checkedOptions = options.filter((option) => option.checked);
  const enabledOptions = options.filter(
    (option) => option.enabled && !option.checked,
  );
  const disabledOptions = options.filter((option) => !option.enabled);
  const primaryOptions =
    selectedValues.length > 0
      ? checkedOptions
      : enabledOptions.slice(0, initialVisible);
  const extraOptions =
    selectedValues.length > 0
      ? [...enabledOptions, ...disabledOptions]
      : [...enabledOptions.slice(initialVisible), ...disabledOptions];

  const renderOption = ({ value, enabled, checked }: (typeof options)[number]) => {
    const disabled = !enabled && !checked;
    const id = `${filterKey}-${value}`.replace(/[^a-zA-Z0-9_-]/g, "_");
    return (
      <li
        key={`${filterKey}-${value}-${checked ? "on" : "off"}-${enabled ? "enabled" : "disabled"}`}
        className="animate-soft-fade-in"
      >
        <label
          htmlFor={id}
          className={cn(
            "flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted/80",
            checked && "bg-primary/8 text-primary",
            disabled &&
              "cursor-not-allowed text-muted-foreground/55 hover:bg-transparent",
          )}
        >
          <input
            id={id}
            type="checkbox"
            className="mt-0.5 rounded border-border"
            checked={checked}
            disabled={disabled}
            onChange={() => onToggle(value)}
          />
          <span className="flex min-w-0 flex-1 items-start gap-2 leading-snug">
            {filterKey === "macroCategorias" ? (
              <MacroCategoryIcon
                macro={value}
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              />
            ) : null}
            <span className="min-w-0">
              {value}
              {disabled ? (
                <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide">
                  No disponible
                </span>
              ) : null}
            </span>
          </span>
        </label>
      </li>
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {guidedFilterLabels[filterKey]}
      </span>
      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
        {primaryOptions.map(renderOption)}
      </ul>
      {extraOptions.length > 0 ? (
        <>
          <div
            className={cn(
              "grid overflow-hidden transition-all duration-300 ease-out",
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <ul className="min-h-0 grid grid-cols-1 gap-1.5 pt-1.5 sm:grid-cols-2 lg:grid-cols-1">
              {extraOptions.map(renderOption)}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:text-primary-light"
          >
            {expanded ? "Ver menos" : `Ver más (${extraOptions.length})`}
          </button>
        </>
      ) : null}
    </div>
  );
}

function FilterPanel({
  facets,
  filters,
  products,
  setFilters,
  onClear,
  activeFilterCount,
}: {
  facets: ProductCatalogFacets;
  filters: CatalogFilters;
  products: Product[];
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
      <GuidedFilterCheckboxSection
        filterKey="marcas"
        values={facets.marcas}
        filters={filters}
        products={products}
        onToggle={(value) => patch("marcas", value)}
      />
      <GuidedFilterCheckboxSection
        filterKey="macroCategorias"
        values={facets.macroCategorias}
        filters={filters}
        products={products}
        initialVisible={6}
        onToggle={(value) => patch("macroCategorias", value)}
      />
      <GuidedFilterCheckboxSection
        filterKey="categorias"
        values={facets.categorias}
        filters={filters}
        products={products}
        initialVisible={8}
        onToggle={(value) => patch("categorias", value)}
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
  const marca = product.marca?.trim();
  if (!marca) return null;
  return (
    <span className="inline-flex max-w-full items-center rounded-lg border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground truncate">
      {marca}
    </span>
  );
}

export function ProductsCatalogClient({ products, facets }: ProductsCatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const syncingFromUrlRef = useRef(false);
  const [filters, setFilters] = useState<CatalogFilters>(emptyCatalogFilters());
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("grid");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const catalogScrollAnchorRef = useRef<HTMLDivElement>(null);
  const [catalogPage, setCatalogPage] = useState(1);
  const filterSearchPrevRef = useRef<string | null>(null);

  const activeFilterCount = useMemo(
    () =>
      filters.marcas.length +
      filters.macroCategorias.length +
      filters.categorias.length,
    [filters],
  );

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
      // Reset pagination when the user changes filters/search.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCatalogPage(1);
    }
  }, [filterSearchKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(catalogPage, totalPages);

  useEffect(() => {
    // Keep the visible page inside bounds when filters reduce result count.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  /** Cada cambio de query (mega menú, enlaces internos) sincroniza el sidebar */
  useEffect(() => {
    const fromUrl = catalogFiltersFromSearchParams(
      new URLSearchParams(queryKey),
    );
    syncingFromUrlRef.current = true;
    // Sync filter UI with direct links from the navigation/query string.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters(fromUrl ?? emptyCatalogFilters());
  }, [queryKey]);

  /** Filtros del usuario → URL (canonical sigue siendo /productos/) */
  useEffect(() => {
    if (syncingFromUrlRef.current) {
      syncingFromUrlRef.current = false;
      return;
    }
    const params = catalogFiltersToSearchParams(filters);
    const qs = params.toString();
    const next = qs ? `${pathname}?${qs}` : pathname;
    const current = queryKey ? `${pathname}?${queryKey}` : pathname;
    if (next !== current) {
      router.replace(next, { scroll: false });
    }
  }, [filters, pathname, queryKey, router]);

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
                products={products}
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
                  <span className="rounded-md bg-primary px-2 py-0.5 text-xs text-primary-foreground">
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
                  products={products}
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
                      <li key={s.slug} role="option" aria-selected={false}>
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
                  <li key={`${p.slug}-${filterSearchKey}`} className="animate-soft-fade-in">
                    <ProductCardGrid product={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-3">
                {paginated.map((p) => (
                  <li key={`${p.slug}-${filterSearchKey}`} className="animate-soft-fade-in">
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
  const img = product.imagen ?? PRODUCT_IMAGE_FALLBACK;
  const title = product.modelo ?? product.slug;
  return (
    <Link
      href={`/productos/${product.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-square w-full bg-white">
        <Image
          src={img}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start gap-2">
          <h2 className="line-clamp-2 flex-1 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
            {title}
          </h2>
          <MacroCategoryIcon
            macro={product.macroCategoria}
            className="mt-0.5 h-4 w-4"
            title={product.macroCategoria}
          />
        </div>
        <ProductPills product={product} />
      </div>
    </Link>
  );
}

function ProductCardList({ product }: { product: Product }) {
  const img = product.imagen ?? PRODUCT_IMAGE_FALLBACK;
  const title = product.modelo ?? product.slug;
  return (
    <Link
      href={`/productos/${product.slug}/`}
      className="group flex gap-4 overflow-hidden rounded-[1.5rem] border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-xl sm:p-4"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-border/60 sm:h-28 sm:w-28">
        <Image
          src={img}
          alt={title}
          fill
          className="object-contain p-2"
          sizes="112px"
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-start gap-2">
          <h2 className="flex-1 text-base font-semibold leading-snug text-foreground group-hover:text-primary sm:text-lg">
            {title}
          </h2>
          <MacroCategoryIcon
            macro={product.macroCategoria}
            className="mt-1 h-4 w-4"
            title={product.macroCategoria}
          />
        </div>
        <div className="mt-2">
          <ProductPills product={product} />
        </div>
      </div>
    </Link>
  );
}
