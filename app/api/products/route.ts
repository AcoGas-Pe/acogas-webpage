import { resolveAllProducts } from "@/lib/products-resolve";
import { toProductSummaries } from "@/lib/products-summary";
import { getWordPressRevalidateSeconds } from "@/lib/wordpress/cache-revalidate";
import { NextResponse } from "next/server";

/** Alineado al cache de WordPress (default 5 min). */
export const revalidate = 300;

/** Resumen ligero para carrito (solo si el cliente no tiene datos SSR/cache). */
export async function GET() {
  const summary = toProductSummaries(await resolveAllProducts());

  return NextResponse.json(summary, {
    headers: {
      "Cache-Control": `public, s-maxage=${getWordPressRevalidateSeconds()}, stale-while-revalidate=${getWordPressRevalidateSeconds() * 2}`,
    },
  });
}
