/** Client-only: one successful HubSpot submit per product page skips the gate for this long */
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

const STORAGE_PREFIX = "acogas:downloadGate:v1:";

function keyForSlug(productSlug: string): string {
  return `${STORAGE_PREFIX}${encodeURIComponent(productSlug)}`;
}

type StoredPayload = { grantedAt: number };

function parsePayload(raw: string | null): StoredPayload | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (
      data &&
      typeof data === "object" &&
      "grantedAt" in data &&
      typeof (data as StoredPayload).grantedAt === "number"
    ) {
      return data as StoredPayload;
    }
    return null;
  } catch {
    return null;
  }
}

/** Whether the user already completed the download form on this product page within the TTL window */
export function isProductDownloadGateSatisfied(productSlug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const key = keyForSlug(productSlug);
    const payload = parsePayload(localStorage.getItem(key));
    if (!payload) return false;
    if (Date.now() - payload.grantedAt >= TTL_MS) {
      localStorage.removeItem(key);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/** Call after HubSpot confirms submission so subsequent downloads on this product skip the form */
export function markProductDownloadGateSatisfied(productSlug: string): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredPayload = { grantedAt: Date.now() };
    localStorage.setItem(keyForSlug(productSlug), JSON.stringify(payload));
  } catch {
    // Quota, private mode, or disabled storage — gate still works, just no persistence
  }
}
