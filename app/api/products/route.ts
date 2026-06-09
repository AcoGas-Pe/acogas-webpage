import { resolveAllProducts } from "@/lib/products-resolve";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Resumen ligero para carrito de cotización y cliente (WP con fallback estático). */
export async function GET() {
  const products = await resolveAllProducts();
  const summary = products.map((p) => ({
    slug: p.slug,
    modelo: p.modelo,
    marca: p.marca,
    imagen: p.imagen,
    macroCategoria: p.macroCategoria,
  }));
  return NextResponse.json(summary);
}
