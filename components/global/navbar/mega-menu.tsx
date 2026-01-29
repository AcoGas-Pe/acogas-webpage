"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { NavMenuConfig, NavMenuColumn, NavMenuCategory } from "./nav-config";

interface MegaMenuProps {
  config: NavMenuConfig;
  isOpen: boolean;
}

function ColumnBlock({ column, hideTitle }: { column: NavMenuColumn; hideTitle?: boolean }) {
  const hasCategories = !!column.categories?.length;

  if (hasCategories) {
    return (
      <div className={cn("space-y-4 min-w-0", hideTitle && "pt-8")}>
        {!hideTitle && (
          <p className="text-xs font-semibold text-primary uppercase tracking-wider pb-2 border-b border-border">
            {column.title}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 h-full min-w-0">
          {column.categories!.map((cat, i) => (
            <CategoryBlock key={i} category={cat} />
          ))}
        </div>
      </div>
    );
  }

  const items = column.items ?? [];
  return (
    <div className={cn("space-y-1", hideTitle && "pt-1")}>
      {!hideTitle && (
        <Link href={column.href ?? ""} className="flex pb-2 border-b border-border">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {column.title}
          </span>
        </Link>
      )}
      <ul className="space-y-0.5">
        {items.map((item, itemIndex) => (
          <li key={itemIndex}>
            <Link
              href={item.href}
              className="group flex flex-col py-1.5 px-2 -mx-2 hover:bg-primary/10 rounded transition-colors"
            >
              <span
                className={cn(
                  "text-sm w-full transition-colors",
                  item.description
                    ? "text-foreground group-hover:text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
              {item.description && (
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {item.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategoryBlock({ category }: { category: NavMenuCategory }) {
  return (
    <div className="space-y-1 min-w-0">
      <Link
        href={category.href}
        className="text-sm font-semibold text-foreground hover:text-primary hover:bg-primary/10 rounded-md px-1 block break-words"
      >
        {category.label}
      </Link>
      <div className="space-y-1.5 pl-0 flex flex-col gap-0.1">
        {category.sections.map((sec, i) => (
          <Link
            href={`${category.href}/${sec.title.toLowerCase().replace(/ /g, "-")}`}
            key={i}
            className="text-xs font-medium text-muted-foreground tracking-wider hover:text-primary hover:bg-primary/10 rounded-md p-0.5 px-1 break-words"
          >
            {sec.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MegaMenu({ config, isOpen }: MegaMenuProps) {
  const layout = config.layout ?? "default";
  const stacked = layout === "stackedProducts";
  const hasImage = !stacked && !!config.image;
  const columnCount = config.columns.length;

  // stackedProducts: [Marcas, Industrias] stacked | [Tipo] single col
  const leftColumns = stacked && columnCount >= 3 ? config.columns.slice(0, 2) : [];
  const productsColumn = stacked && columnCount >= 3 ? config.columns[2] : null;

  const isLargeMenu = stacked ? true : columnCount >= 3 || (hasImage && columnCount >= 2);
  const menuWidth = stacked
    ? "w-[min(720px,calc(100vw-1.5rem))] max-w-[calc(100vw-1.5rem)]"
    : isLargeMenu
      ? "w-[min(700px,calc(100vw-1.5rem))] max-w-[calc(100vw-1.5rem)]"
      : hasImage
        ? "w-[min(520px,calc(100vw-1.5rem))] max-w-[calc(100vw-1.5rem)]"
        : "w-[min(320px,calc(100vw-1.5rem))] max-w-[calc(100vw-1.5rem)]";

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 top-16 z-50 bg-navbar-background border border-border rounded-lg shadow-xl",
        "transition-all duration-200 ease-out",
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2 pointer-events-none",
        menuWidth
      )}
    >
      <div className="p-4 md:p-5 max-h-[min(70vh,calc(100svh-5rem))] overflow-y-auto overscroll-contain">
        {stacked ? (
          /* Option B: no image, stacked Marcas+Industrias | single col Tipo productos */
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 md:gap-6 min-w-0">
            <div className="space-y-1 min-w-0">
              {leftColumns.map((col, i) => (
                <ColumnBlock key={i} column={col} />
              ))}
            </div>
            {productsColumn && (
              <div className="min-w-0">
                <ColumnBlock column={productsColumn} />
              </div>
            )}
          </div>
        ) : (
          <div className={cn("grid gap-4 md:gap-6", hasImage ? "grid-cols-1 md:grid-cols-[200px_1fr]" : "grid-cols-1")}>
            {config.image && (
              <Link
                href={config.image.href}
                className="group relative bg-muted overflow-hidden rounded-lg  hidden md:flex flex-col justify-end"
              >
                <Image
                  src={config.image.src}
                  alt={config.image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{config.image.title}</h3>
                  {config.image.description && (
                    <p className="text-xs text-white/80 line-clamp-2">{config.image.description}</p>
                  )}
                </div>
              </Link>
            )}
            <div
              className={cn(
                "grid gap-4 md:gap-6 min-w-0",
                columnCount === 1 && "grid-cols-1",
                columnCount === 2 && "grid-cols-1 md:grid-cols-2",
                columnCount >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {config.columns.map((col, i) => (
                <ColumnBlock key={i} column={col} />
              ))}
            </div>
          </div>
        )}

        {config.mainLink && (
          <div className="mt-4 pt-3 border-t border-border shrink-0">
            <Link
              href={config.mainLink.href}
              className="inline-flex items-center text-sm text-primary font-semibold"
            >
              {config.mainLink.label}
              <svg className="ml-1.5 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
