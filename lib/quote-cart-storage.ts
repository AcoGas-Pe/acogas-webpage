/** Client-only: quote cart lines persisted in localStorage */

export type QuoteCartLine = { slug: string; quantity: number };

const STORAGE_KEY = "acogas:quoteCart:v1";

const MAX_QTY_PER_LINE = 10;

function parse(raw: string | null): QuoteCartLine[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is QuoteCartLine =>
        row &&
        typeof row === "object" &&
        typeof (row as QuoteCartLine).slug === "string" &&
        typeof (row as QuoteCartLine).quantity === "number" &&
        (row as QuoteCartLine).quantity > 0,
    );
  } catch {
    return [];
  }
}

export function loadQuoteCart(): QuoteCartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveQuoteCart(lines: QuoteCartLine[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // quota / private mode
  }
}

export function clampQuantity(n: number): number {
  return Math.min(MAX_QTY_PER_LINE, Math.max(1, Math.floor(n)));
}

export { MAX_QTY_PER_LINE };
