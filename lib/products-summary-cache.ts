import { getWordPressRevalidateSeconds } from "@/lib/wordpress/cache-revalidate";

export type ProductSummary = {
  slug: string;
  modelo?: string;
  marca?: string;
  imagen?: string;
  macroCategoria?: string;
};

export const PRODUCTS_SUMMARY_STORAGE_KEY = "acogas:products-summary:v1";

export function productsSummaryCacheTtlMs(): number {
  return getWordPressRevalidateSeconds() * 1000;
}

type CachedPayload = { ts: number; data: ProductSummary[] };

function readStorage(): CachedPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PRODUCTS_SUMMARY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload;
    if (!Array.isArray(parsed.data) || typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > productsSummaryCacheTtlMs()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readProductsSummaryBrowserCache(): ProductSummary[] | null {
  return readStorage()?.data ?? null;
}

export function writeProductsSummaryBrowserCache(data: ProductSummary[]): void {
  if (typeof window === "undefined" || data.length === 0) return;
  try {
    const payload: CachedPayload = { ts: Date.now(), data };
    localStorage.setItem(PRODUCTS_SUMMARY_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}
