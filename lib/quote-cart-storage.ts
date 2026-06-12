/** Client-only: quote cart lines persisted in localStorage */

export type QuoteCartLine = { slug: string; quantity: number };

const STORAGE_KEY = "acogas:quoteCart:v2";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_QTY_PER_LINE = 10;

type StoredPayload = {
  lines: QuoteCartLine[];
  updatedAt: number;
};

function parseLines(raw: unknown): QuoteCartLine[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (row): row is QuoteCartLine =>
      row &&
      typeof row === "object" &&
      typeof (row as QuoteCartLine).slug === "string" &&
      typeof (row as QuoteCartLine).quantity === "number" &&
      (row as QuoteCartLine).quantity > 0,
  );
}

function parsePayload(raw: string | null): StoredPayload | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (
      data &&
      typeof data === "object" &&
      "lines" in data &&
      "updatedAt" in data &&
      Array.isArray((data as StoredPayload).lines) &&
      typeof (data as StoredPayload).updatedAt === "number"
    ) {
      return {
        lines: parseLines((data as StoredPayload).lines),
        updatedAt: (data as StoredPayload).updatedAt,
      };
    }

    if (Array.isArray(data)) {
      return { lines: parseLines(data), updatedAt: Date.now() };
    }

    return null;
  } catch {
    return null;
  }
}

export function loadQuoteCart(): QuoteCartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const payload = parsePayload(localStorage.getItem(STORAGE_KEY));
    if (!payload) return [];
    if (Date.now() - payload.updatedAt >= TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return payload.lines;
  } catch {
    return [];
  }
}

export function saveQuoteCart(lines: QuoteCartLine[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredPayload = { lines, updatedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // quota / private mode
  }
}

export function clampQuantity(n: number): number {
  return Math.min(MAX_QTY_PER_LINE, Math.max(1, Math.floor(n)));
}

export { MAX_QTY_PER_LINE, TTL_MS as QUOTE_CART_TTL_MS };
