/**
 * Client-only: forces a file download instead of opening PDFs in the browser tab.
 * Same-origin URLs (e.g. /assets/...) use fetch + blob for reliable behavior.
 */

function resolveAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (typeof window === "undefined") return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${window.location.origin}${path}`;
}

function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").trim();
  return cleaned || "download";
}

function fallbackFilenameFromUrl(url: string): string {
  try {
    const path = url.split("?")[0] ?? url;
    const segment = path.split("/").pop();
    return segment ? decodeURIComponent(segment) : "download";
  } catch {
    return "download";
  }
}

export async function triggerFileDownload(
  url: string,
  filenameHint?: string
): Promise<void> {
  if (typeof window === "undefined") return;

  const filename = sanitizeFilename(
    filenameHint?.trim() || fallbackFilenameFromUrl(url)
  );
  const absoluteUrl = resolveAbsoluteUrl(url);

  try {
    const res = await fetch(absoluteUrl, { credentials: "same-origin" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    const a = document.createElement("a");
    a.href = absoluteUrl;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
