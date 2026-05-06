import type { CatalogoDocs, MaterialItem, Product } from "@/domain/product";
import { getWpProductsGraphqlRootField } from "@/lib/wordpress/graphql/queries/soluciones-productos";

export type WpSolucionNode = {
  databaseId?: number | null;
  slug?: string | null;
  /** String o en algunos esquemas objeto con rendered */
  title?: string | { rendered?: string | null } | null;
  datosProducto?: DatosProductoGql | null;
};

type DatosProductoGql = {
  clasificacion?: {
    macroCategoria?: string | null;
    categoriaProducto?: string | null;
  } | null;
  producto?: {
    modelo?: unknown;
    submodelo?: unknown;
    grupoEmpresarial?: unknown;
    /** A menudo texto; a veces ACF devuelve lista u objeto */
    marcas?: unknown;
  } | null;
  imagen?: { node?: { mediaItemUrl?: string | null } | null } | null;
  detalles?: DetallesGql | null;
  catalogo?: Record<string, CatalogoPdfSlot | null | undefined> | null;
};

type DetallesGql = {
  /** Nombre GraphQL en WP (ACF field name): suele ser `applicaciones` con doble p */
  applicaciones?: string | null;
  aplicaciones?: string | null;
  beneficiosEconomicos?: string | null;
  controles?: string | null;
  caracteristicas?: string | null;
  combustiblesRefinadosGlp?: string | null;
  conectividadES?: string | null;
  datosDeRendimiento?: string | null;
  entradaVisualizacionUsuario?: string | null;
  especificaciones?: string | null;
  exactitud?: string | null;
  fluidosYGases?: string | null;
  materiales?: string | null;
  mercados?: string | null;
  nuevasFunciones?: string | null;
  opcionesAccesorios?: string | null;
  regulador?: string | null;
  versatilidad?: string | null;
};

type CatalogoPdfSlot = {
  archivo?: { node?: { mediaItemUrl?: unknown } | null } | null;
  categoria?: unknown;
  nombreVisible?: unknown;
  paginas?: unknown;
};

function readTitle(n: WpSolucionNode): string {
  const t = n.title;
  if (typeof t === "string") return t;
  if (t && typeof t === "object" && "rendered" in t && t.rendered) return String(t.rendered);
  return "";
}

/** Título/valor ACF en GraphQL: string, número, selección múltiple (array) u objeto con label/title. */
function acfTextoPlano(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "string") {
    const t = value.trim();
    return t || undefined;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).trim() || undefined;
  }
  if (Array.isArray(value)) {
    const parts = value
      .map((item) => acfTextoPlano(item))
      .filter((x): x is string => Boolean(x));
    return parts.length ? parts.join(", ") : undefined;
  }
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.rendered === "string") return o.rendered.trim() || undefined;
    if (typeof o.label === "string") return o.label.trim() || undefined;
    if (typeof o.title === "string") return o.title.trim() || undefined;
    if (typeof o.name === "string") return o.name.trim() || undefined;
  }
  return undefined;
}

/** Quita `<br>`, párrafos típicos de ACF y entidades básicas antes de partir el texto. */
function normalizeAcfRichText(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*/gi, "\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\r\n/g, "\n")
    .trim();
}

function splitSemicolons(s: string | null | undefined | unknown): string[] {
  const str = typeof s === "string" ? s : acfTextoPlano(s) ?? "";
  if (!str.trim()) return [];
  const normalized = normalizeAcfRichText(str);
  if (normalized.includes("\n")) {
    return normalized
      .split(/\n+/)
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return normalized
    .split(/\s*;\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
}

/**
 * Blocos nombre:valor separados por `;` (un solo párrafo).
 * El primer `:` separa nombre y valor (valores pueden contener `:`, poco frecuente).
 */
function parseNombreValorSemicolonOnly(
  normalizedSingleParagraph: string,
): { nombre: string; valor: string }[] {
  const parts = normalizedSingleParagraph
    .split(/\s*;\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
  const out: { nombre: string; valor: string }[] = [];
  for (const p of parts) {
    const idx = p.indexOf(":");
    if (idx > 0 && idx < p.length - 1) {
      out.push({
        nombre: p.slice(0, idx).trim(),
        valor: p.slice(idx + 1).trim(),
      });
    } else {
      out.push({ nombre: "Detalle", valor: p });
    }
  }
  return out;
}

/**
 * Texto multilínea con HTML (`<br />`) o saltos: listas `- sección:` / `-- sub: valor`.
 * Ej.: `- Presión:<br />-- Enardo A: 2, 4…` → filas "Presión – Enardo A" / valor.
 */
function parseNombreValorMultiline(normalized: string): { nombre: string; valor: string }[] {
  const lines = normalized
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  const out: { nombre: string; valor: string }[] = [];
  let group = "";

  for (let rawLine of lines) {
    let line = rawLine;
    const isSub = /^\s*--\s*/.test(line);
    if (isSub) {
      line = line.replace(/^\s*--\s*/, "").trim();
    } else if (/^\s*-\s*/.test(line)) {
      line = line.replace(/^\s*-\s*/, "").trim();
    }

    const idx = line.indexOf(":");
    if (idx <= 0) {
      if (out.length) {
        out[out.length - 1].valor = `${out[out.length - 1].valor} ${line}`.trim();
      } else {
        out.push({ nombre: "Detalle", valor: line });
      }
      continue;
    }

    const name = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();

    if (isSub && group) {
      out.push({ nombre: `${group} – ${name}`, valor: val });
      continue;
    }
    if (isSub && !group) {
      out.push({ nombre: name, valor: val });
      continue;
    }

    if (!val) {
      group = name;
      continue;
    }

    group = "";
    out.push({ nombre: name, valor: val });
  }

  return out;
}

function parseNombreValorBlocks(s: string | null | undefined | unknown): { nombre: string; valor: string }[] {
  const str = typeof s === "string" ? s : acfTextoPlano(s) ?? "";
  if (!str.trim()) return [];
  const normalized = normalizeAcfRichText(str);
  if (normalized.includes("\n")) {
    return parseNombreValorMultiline(normalized);
  }
  return parseNombreValorSemicolonOnly(normalized);
}

function parseMaterialesBlocks(s: string | null | undefined | unknown): MaterialItem[] {
  const str = typeof s === "string" ? s : acfTextoPlano(s) ?? "";
  if (!str.trim()) return [];
  const parts = splitSemicolons(str);
  const out: MaterialItem[] = [];
  for (const p of parts) {
    const idx = p.indexOf(":");
    if (idx > 0) {
      out.push({ pieza: p.slice(0, idx).trim(), material: p.slice(idx + 1).trim() });
    } else {
      out.push({ pieza: p, material: "" });
    }
  }
  return out;
}

function normalizeCatalogTab(c: unknown): string {
  const raw = acfTextoPlano(c) ?? "Otros";
  const map: Record<string, string> = {
    Generales: "Generales",
    Especificos: "Específicos",
    Esquematicos: "Esquemáticos",
    Otros: "Otros",
  };
  return map[raw] || raw;
}

function collectCatalog(
  catalogo: Record<string, CatalogoPdfSlot | null | undefined> | null | undefined,
): CatalogoDocs[] {
  if (!catalogo) return [];
  const out: CatalogoDocs[] = [];
  for (let i = 1; i <= 18; i++) {
    const slot = catalogo[`catalogoPdf${i}` as keyof typeof catalogo] as CatalogoPdfSlot | undefined;
    if (!slot) continue;
    const url = acfTextoPlano(slot.archivo?.node?.mediaItemUrl) ?? "";
    const nombre = acfTextoPlano(slot.nombreVisible) ?? "";
    if (!url && !nombre) continue;
    out.push({
      categoria: normalizeCatalogTab(slot.categoria),
      url: url || "#",
      nombre: nombre || "Documento",
      paginas: acfTextoPlano(slot.paginas),
    });
  }
  return out;
}

export function mapWpSolucionNodeToProduct(node: WpSolucionNode): Product | null {
  let slugRaw = node.slug?.trim();
  if (!slugRaw && node.databaseId != null) {
    slugRaw = `producto-${node.databaseId}`;
  }
  if (!slugRaw) return null;

  const slug = slugRaw;
  const datos = node.datosProducto;
  const clas = datos?.clasificacion;
  const prod = datos?.producto;
  const det = datos?.detalles;
  const imgUrl = acfTextoPlano(datos?.imagen?.node?.mediaItemUrl);

  const modelo = acfTextoPlano(prod?.modelo) || readTitle(node) || slug;
  const descRaw = acfTextoPlano(det?.caracteristicas);
  const descripcion = descRaw?.slice(0, 280);

  return {
    slug,
    macroCategoria: acfTextoPlano(clas?.macroCategoria) ?? "",
    categoria: acfTextoPlano(clas?.categoriaProducto) ?? "",
    tipoBrochure: "",
    itemId: node.databaseId != null ? String(node.databaseId) : "",
    modelo,
    submodelo: acfTextoPlano(prod?.submodelo),
    marca: acfTextoPlano(prod?.marcas),
    grupoEmpresarial: acfTextoPlano(prod?.grupoEmpresarial),
    descripcion: descripcion?.trim() || undefined,
    imagen: imgUrl || undefined,
    caracteristicas: splitSemicolons(det?.caracteristicas),
    especificaciones: parseNombreValorBlocks(det?.especificaciones),
    materiales: parseMaterialesBlocks(det?.materiales),
    fluidosYGases: splitSemicolons(det?.fluidosYGases).map((valor) => ({ valor })),
    aplicaciones: splitSemicolons(det?.applicaciones ?? det?.aplicaciones).map((aplicacion) => ({
      aplicacion,
    })),
    mercados: splitSemicolons(det?.mercados).map((mercado) => ({ mercado })),
    beneficiosEconomicos: splitSemicolons(det?.beneficiosEconomicos).map((b) => ({ beneficio: b })),
    datosRendimiento: parseNombreValorBlocks(det?.datosDeRendimiento),
    opcionesAccesorios: parseNombreValorBlocks(det?.opcionesAccesorios).map(({ nombre, valor }) => ({
      nombre,
      descripcion: valor?.trim() || undefined,
    })),
    exactitud: parseNombreValorBlocks(det?.exactitud).map(({ nombre, valor }) => ({
      descripcion: nombre,
      valor,
    })),
    nuevasFunciones: splitSemicolons(det?.nuevasFunciones).map((funcion) => ({ funcion })),
    entradaVisualizacionUsuario: parseNombreValorBlocks(det?.entradaVisualizacionUsuario).map(
      ({ nombre, valor }) => ({ tipo: nombre, descripcion: valor || undefined }),
    ),
    combustibleCompatible: splitSemicolons(det?.combustiblesRefinadosGlp).map((combustible) => ({
      combustible,
    })),
    conectividadES: parseNombreValorBlocks(det?.conectividadES).map(({ nombre, valor }) => ({
      tipo: nombre,
      descripcion: valor || undefined,
    })),
    controles: parseNombreValorBlocks(det?.controles).map(({ nombre, valor }) => ({
      tipo: nombre,
      descripcion: valor || undefined,
    })),
    versatilidad: splitSemicolons(det?.versatilidad).map((descripcion) => ({ descripcion })),
    regulador: parseNombreValorBlocks(det?.regulador).map(({ nombre, valor }) => ({
      modelo: nombre,
      descripcion: valor || undefined,
    })),
    catalogoDocs: collectCatalog(datos?.catalogo ?? null),
  };
}

export function mapWpSolucionesToProducts(data: Record<string, unknown>): Product[] {
  const root = getWpProductsGraphqlRootField();
  const conn = data[root] as { nodes?: WpSolucionNode[] | null } | undefined;
  const nodes = conn?.nodes;
  if (!nodes?.length) return [];

  const products: Product[] = [];
  for (const n of nodes) {
    const p = mapWpSolucionNodeToProduct(n);
    if (p) products.push(p);
  }
  return products;
}
