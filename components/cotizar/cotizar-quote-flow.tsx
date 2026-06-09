"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/domain/product";
import { useQuoteCart } from "@/contexts/quote-cart-context";
import { MAX_QTY_PER_LINE } from "@/lib/quote-cart-storage";
import {
  buildQuoteWhatsappMessage,
  quoteWhatsappHref,
} from "@/lib/quote-whatsapp";
import { Button } from "@/components/ui/button";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/default-images";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MacroCategoryIcon } from "@/lib/macro-category-icon";

const MIN_SEARCH_LEN = 2;

interface CotizarQuoteFlowProps {
  products: Product[];
}

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
}

type QuoteGuidedFilterKey = "marca" | "macroCategoria" | "categoria";

const quoteFilterLabels: Record<QuoteGuidedFilterKey, string> = {
  marca: "Marca",
  macroCategoria: "Macrocategoría",
  categoria: "Categoría",
};

function productValueForQuoteFilter(
  product: Product,
  key: QuoteGuidedFilterKey,
): string {
  return product[key]?.trim() ?? "";
}

function productMatchesQuoteSelection(
  product: Product,
  selected: Record<QuoteGuidedFilterKey, string[]>,
  exceptKey?: QuoteGuidedFilterKey,
): boolean {
  const keys: QuoteGuidedFilterKey[] = [
    "marca",
    "macroCategoria",
    "categoria",
  ];

  return keys.every((key) => {
    if (key === exceptKey || selected[key].length === 0) return true;
    return selected[key].includes(productValueForQuoteFilter(product, key));
  });
}

function uniqueSorted(values: Array<string | undefined>): string[] {
  return [...new Set(values.map((value) => value?.trim()).filter(Boolean))]
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => a.localeCompare(b, "es"));
}

function QuoteFilterCheckboxSection({
  filterKey,
  values,
  selected,
  products,
  onToggle,
  initialVisible = 8,
}: {
  filterKey: QuoteGuidedFilterKey;
  values: string[];
  selected: Record<QuoteGuidedFilterKey, string[]>;
  products: Product[];
  onToggle: (value: string) => void;
  initialVisible?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const selectedValues = selected[filterKey];
  const options = values.map((value) => {
    const checked = selectedValues.includes(value);
    const matchesOtherFilters = products.some(
      (product) =>
        productValueForQuoteFilter(product, filterKey) === value &&
        productMatchesQuoteSelection(product, selected, filterKey),
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
    const id = `quote-${filterKey}-${value}`.replace(
      /[^a-zA-Z0-9_-]/g,
      "_",
    );
    return (
      <li
        key={`quote-${filterKey}-${value}-${checked ? "on" : "off"}-${enabled ? "enabled" : "disabled"}`}
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
            {filterKey === "macroCategoria" ? (
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
    <div className="rounded-2xl border border-border bg-card p-3 text-sm font-semibold text-foreground shadow-sm">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {quoteFilterLabels[filterKey]}
      </span>
      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-1">
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
            <ul className="min-h-0 grid grid-cols-1 gap-1.5 pt-1.5 sm:grid-cols-2 xl:grid-cols-1">
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

export function CotizarQuoteFlow({ products }: CotizarQuoteFlowProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<QuoteGuidedFilterKey, string[]>>({
    marca: [],
    macroCategoria: [],
    categoria: [],
  });
  const { lines, addProduct, totalQuantity } = useQuoteCart();

  const productsBySlug = useMemo(
    () => new Map(products.map((product) => [product.slug, product])),
    [products],
  );

  const marcas = useMemo(
    () => uniqueSorted(products.map((product) => product.marca)),
    [products],
  );
  const macroCategorias = useMemo(
    () => uniqueSorted(products.map((product) => product.macroCategoria)),
    [products],
  );
  const categorias = useMemo(
    () => uniqueSorted(products.map((product) => product.categoria)),
    [products],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasHierarchyFilter = Object.values(selected).some(
      (values) => values.length > 0,
    );
    if (q.length < MIN_SEARCH_LEN && !hasHierarchyFilter) return [];
    return products.filter((p) => {
      if (!productMatchesQuoteSelection(p, selected)) {
        return false;
      }
      if (q.length < MIN_SEARCH_LEN) return true;
      const hay = [
        p.modelo,
        p.marca,
        p.slug,
        p.descripcion,
        p.submodelo,
        p.grupoEmpresarial,
        p.macroCategoria,
        p.categoria,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [products, query, selected]);

  const resultAnimationKey = useMemo(
    () => `${query.trim()}\0${JSON.stringify(selected)}`,
    [query, selected],
  );

  const trimmed = query.trim();
  const searching = trimmed.length >= MIN_SEARCH_LEN;

  const sendWhatsapp = () => {
    if (lines.length === 0) return;
    const items = lines.map((line) => {
      const p = productsBySlug.get(line.slug);
      return {
        slug: line.slug,
        modelo: p?.modelo ?? line.slug,
        marca: p?.marca,
        quantity: line.quantity,
      };
    });
    const msg = buildQuoteWhatsappMessage(items);
    window.open(quoteWhatsappHref(msg), "_blank", "noopener,noreferrer");
  };

  let listEmptyMessage: string | null = null;
  if (trimmed.length === 0) {
    listEmptyMessage = Object.values(selected).some((values) => values.length > 0)
      ? null
      : "Escriba al menos dos letras o seleccione una marca, macrocategoría o categoría.";
  } else if (
    trimmed.length < MIN_SEARCH_LEN &&
    !Object.values(selected).some((values) => values.length > 0)
  ) {
    listEmptyMessage = `Siga escribiendo: faltan ${MIN_SEARCH_LEN - trimmed.length} carácter${MIN_SEARCH_LEN - trimmed.length === 1 ? "" : "es"}.`;
  } else if (filtered.length === 0) {
    listEmptyMessage =
      "No hay productos que coincidan con la búsqueda. Pruebe con otra palabra (modelo o marca).";
  }

  return (
    <section className="section border-y border-border bg-muted/30 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-4xl space-y-8 px-4">
        <div className="rounded-[1.5rem] border border-border bg-background p-5 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Buscar productos
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Filtre primero por macrocategoría y luego por categoría hija. La
            búsqueda por modelo o marca queda acotada a esa jerarquía.
          </p>
          <div className="mb-4 grid gap-3 lg:grid-cols-3">
            <QuoteFilterCheckboxSection
              filterKey="marca"
              values={marcas}
              selected={selected}
              products={products}
              onToggle={(value) =>
                setSelected((prev) => ({
                  ...prev,
                  marca: toggleInArray(prev.marca, value),
                }))
              }
            />
            <QuoteFilterCheckboxSection
              filterKey="macroCategoria"
              values={macroCategorias}
              selected={selected}
              products={products}
              initialVisible={6}
              onToggle={(value) =>
                setSelected((prev) => ({
                  ...prev,
                  macroCategoria: toggleInArray(prev.macroCategoria, value),
                }))
              }
            />
            <QuoteFilterCheckboxSection
              filterKey="categoria"
              values={categorias}
              selected={selected}
              products={products}
              initialVisible={8}
              onToggle={(value) =>
                setSelected((prev) => ({
                  ...prev,
                  categoria: toggleInArray(prev.categoria, value),
                }))
              }
            />
          </div>
          <label htmlFor="cotizar-search" className="sr-only">
            Buscar producto
          </label>
          <input
            id="cotizar-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej. Fisher, modelo, marca..."
            autoComplete="off"
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {searching ? (
            <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
              {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
            </p>
          ) : null}
        </div>

        <div className="rounded-[1.5rem] border border-border bg-background shadow-sm">
          <div
            className="max-h-[min(28rem,50dvh)] min-h-[8rem] overflow-y-auto overscroll-y-contain"
            aria-label="Resultados de búsqueda de productos"
          >
            {listEmptyMessage !== null ? (
              <div className="flex min-h-[8rem] items-center justify-center px-4 py-10 text-center text-sm text-muted-foreground">
                {listEmptyMessage}
              </div>
            ) : (
              <ul className="divide-y divide-border" role="list">
                {filtered.map((product) => (
                  <li
                    key={`${product.slug}-${resultAnimationKey}`}
                    className="animate-soft-fade-in"
                  >
                    <ProductQuoteCompactRow
                      product={product}
                      onAdd={(qty) => addProduct(product.slug, qty)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-5 rounded-[1.5rem] border border-border bg-background p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold">Enviar cotización</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalQuantity === 0
                ? "Agregue al menos un producto desde el buscador para enviar por WhatsApp."
                : `Revise su lista (${totalQuantity} unidad${totalQuantity === 1 ? "" : "es"}) y envíe por WhatsApp.`}
            </p>
          </div>

          {lines.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Vista previa
              </p>
              <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-muted/20">
                {lines.map((line) => (
                  <QuoteSendPreviewRow
                    key={line.slug}
                    product={productsBySlug.get(line.slug)}
                    slug={line.slug}
                    quantity={line.quantity}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/10 px-4 py-8 text-center text-sm text-muted-foreground">
              Su cotización aparecerá aquí con foto, nombre y cantidad.
            </div>
          )}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              size="lg"
              className="min-h-12 w-full shrink-0 sm:w-auto"
              disabled={lines.length === 0}
              onClick={sendWhatsapp}
            >
              Enviar por WhatsApp
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Se abrirá WhatsApp con los productos, cantidades y enlaces a cada ficha del sitio.
          </p>
        </div>
      </div>
    </section>
  );
}

function QuoteSendPreviewRow({
  product,
  slug,
  quantity,
}: {
  product?: Product;
  slug: string;
  quantity: number;
}) {
  const img = product?.imagen ?? PRODUCT_IMAGE_FALLBACK;
  const title = product?.modelo ?? slug;
  const marca = product?.marca;

  return (
    <li className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
      <Link
        href={`/productos/${slug}/`}
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border/60 sm:h-16 sm:w-16"
      >
        <Image
          src={img}
          alt={title}
          fill
          className="object-contain p-1"
          sizes="64px"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {title}
          </p>
          {marca ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{marca}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs text-muted-foreground sm:hidden">Cantidad</span>
          <span className="inline-flex min-w-11 items-center justify-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-bold tabular-nums text-primary">
            {quantity}
          </span>
        </div>
      </div>
    </li>
  );
}

function ProductQuoteCompactRow({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  const bump = (delta: number) => {
    setQty((q) => Math.min(MAX_QTY_PER_LINE, Math.max(1, q + delta)));
  };

  const title = product.modelo?.trim() || product.slug;
  const subtitle = [product.marca, product.categoria]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex flex-col gap-3 px-3 py-3.5 transition-colors hover:bg-muted/35 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4">
      <div className="min-w-0 flex-1">
        <Link
          href={`/productos/${product.slug}/`}
          className="text-sm font-semibold text-foreground hover:text-primary sm:text-[0.9375rem]"
        >
          {title}
        </Link>
        {subtitle ? (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <div className="inline-flex items-center rounded-md border border-border bg-background">
          <button
            type="button"
            className="px-3 py-2 text-sm font-medium hover:bg-muted"
            onClick={() => bump(-1)}
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="min-w-[2.5ch] px-2 text-center text-sm tabular-nums">{qty}</span>
          <button
            type="button"
            className="px-3 py-2 text-sm font-medium hover:bg-muted"
            onClick={() => bump(1)}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-h-9 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={() => onAdd(qty)}
        >
          Agregar
        </Button>
        <Link
          href={`/productos/${product.slug}/`}
          className="text-xs font-medium text-primary underline-offset-4 hover:underline max-sm:hidden"
        >
          Ficha
        </Link>
      </div>
    </div>
  );
}
