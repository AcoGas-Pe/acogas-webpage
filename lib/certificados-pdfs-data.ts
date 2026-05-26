import type { CatalogoDocs, CertificadoDocumentoTipo } from "@/domain/product";
import { assetDoc } from "@/lib/asset-doc-url";

/** Gate HubSpot compartido al descargar desde páginas `/marcas/[slug]` */
export const MARCAS_CERTIFICADOS_DOWNLOAD_GATE_SLUG = "marcas-certificados";

/** Gate para la página hub `/recursos-tecnicos/certificados/` */
export const CERTIFICADOS_DOWNLOAD_GATE_SLUG = "recursos-tecnicos-certificados";

/**
 * Pestañas del bloque multipágina (sin `brandSlug`): solo marcas con certificados
 * típicamente usados desde producto / recurso técnico.
 * @deprecated Preferir `CERTIFICADOS_MARCA_TAB_ORDER` + agrupación completa en el hub.
 */
export const CERTIFICADO_BRAND_SLUGS = ["fisher", "tartarini", "spence"] as const;

/** Orden de pestañas en “Certificados de marca” */
export const CERTIFICADOS_MARCA_TAB_ORDER = [
  "Cavagna",
  "Corken",
  "Fisher",
  "Spence",
  "Tartarini",
  "Acogas",
] as const;

const m = {
  cavagna: "Cavagna",
  corken: "Corken",
  emerson: "Acogas",
  fisher: "Fisher",
  spence: "Spence",
  tartarini: "Tartarini",
} as const;

const CERT_TAB_SET = new Set<string>(CERTIFICADOS_MARCA_TAB_ORDER);

export function groupCertificadosByMarca(): Map<string, CatalogoDocs[]> {
  const groups = new Map<string, CatalogoDocs[]>();
  for (const doc of certificadosMarcaDocs) {
    const list = groups.get(doc.categoria) ?? [];
    list.push(doc);
    groups.set(doc.categoria, list);
  }
  return groups;
}

/** Pestañas visibles: orden fijo + cualquier marca extra en datos */
export function getCertificadoMarcaTabs(): string[] {
  const byMarca = groupCertificadosByMarca();
  const ordered = CERTIFICADOS_MARCA_TAB_ORDER.filter(
    (marca) => (byMarca.get(marca)?.length ?? 0) > 0,
  );
  const extra = Array.from(byMarca.keys())
    .filter((k) => !CERT_TAB_SET.has(k))
    .sort((a, b) => a.localeCompare(b, "es"));
  return [...ordered, ...extra];
}

export function resolveCertificadoTipo(
  doc: CatalogoDocs,
): CertificadoDocumentoTipo {
  return doc.tipo ?? "certificado";
}

/**
 * Certificados en `public/assets/docs/certificados/` (subcarpetas por marca cuando aplica).
 * `categoria` = pestaña visible.
 * `tipo` = filtro UX (certificado / garantía / respaldo comercial / otro).
 */
export const certificadosMarcaDocs: CatalogoDocs[] = [
  {
    categoria: m.cavagna,
    tipo: "certificado",
    nombre: "Cavagna — Certificado 902",
    url: assetDoc("certificados", "CAVAGNA CERTIFICADO 902.pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.cavagna,
    tipo: "certificado",
    nombre: "Cavagna — Certificado (1)",
    url: assetDoc("certificados", "CERTIFICADO CAVAGNA 1.pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.cavagna,
    tipo: "certificado",
    nombre: "Cavagna — Certificado (2)",
    url: assetDoc("certificados", "CERTIFICADO CAVAGNA 2.pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.cavagna,
    tipo: "certificado",
    nombre: "Cavagna — Certificado (3)",
    url: assetDoc("certificados", "CERTIFICADO CAVAGNA 3.pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.cavagna,
    tipo: "garantia",
    nombre: "Cavagna — Garantía 10 años",
    url: assetDoc("certificados", "CAVAGNA GARANTIA 10 AÑOS.pdf"),
    paginas: "PDF · Garantía",
  },
  {
    categoria: m.corken,
    tipo: "certificado",
    nombre: "Corken — Certificado",
    url: assetDoc("certificados", "CERTIFICADO CORKEN.pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.corken,
    tipo: "certificado",
    nombre: "Corken — Certificado (2)",
    url: assetDoc("certificados", "CERTIFICADO CORKEN 2.pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.corken,
    tipo: "certificado",
    nombre: "Corken — ISO 9001 (2022)",
    url: assetDoc("certificados", "CORKEN CERT 9001 - 2022.pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.emerson,
    tipo: "respaldo_comercial",
    nombre: "Acogas — Respaldo comercial Emerson (1)",
    url: assetDoc("certificados", "EMERSON RESPALDO COMERCIAL 1 ACOGAS.pdf"),
    paginas: "PDF · Respaldo",
  },
  {
    categoria: m.emerson,
    tipo: "respaldo_comercial",
    nombre: "Acogas — Respaldo comercial Emerson (2)",
    url: assetDoc("certificados", "EMERSON RESPALDO COMERCIAL 2 ACOGAS.pdf"),
    paginas: "PDF · Respaldo",
  },
  {
    categoria: m.emerson,
    tipo: "certificado",
    nombre:
      "Acogas — Certificado SPA Emerson México (vigencia hasta ago. 2027)",
    url: assetDoc(
      "certificados",
      "CERT-0121215_SPA_FROMEX S.A. EMERSON DE C.V_ Vigencia hasta 09-Agosto-2027.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: m.fisher,
    tipo: "certificado",
    nombre: "Fisher — Certificado SIL",
    url: assetDoc("certificados", "fisher", "Certificado FISHER (SIL).pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.fisher,
    tipo: "certificado",
    nombre: "Fisher — Certificado ISO",
    url: assetDoc("certificados", "fisher", "Certificado FISHER (ISO).pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.fisher,
    tipo: "certificado",
    nombre: "Fisher — Certificado UL (1)",
    url: assetDoc("certificados", "fisher", "Certificado FISHER (UL 1).pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.fisher,
    tipo: "certificado",
    nombre: "Fisher — Certificado UL (2)",
    url: assetDoc("certificados", "fisher", "Certificado FISHER (UL 2).pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.fisher,
    tipo: "certificado",
    nombre: "Fisher — Certificado UL (3)",
    url: assetDoc("certificados", "fisher", "Certificado FISHER (UL 3).pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.fisher,
    tipo: "certificado",
    nombre: "Fisher — Certificado UL (4)",
    url: assetDoc("certificados", "fisher", "Certificado FISHER (UL 4).pdf"),
    paginas: "PDF",
  }, 
  {
    categoria: m.spence,
    tipo: "certificado",
    nombre: "Spence — Certificado",
    url: assetDoc("certificados", "spence", "Certificado SPENCE.pdf"),
    paginas: "PDF",
  },
  {
    categoria: m.tartarini,
    tipo: "certificado",
    nombre: "Tartarini — Certificado",
    url: assetDoc(
      "certificados",
      "tartarini",
      "Certificado TARTARINI.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: m.tartarini,
    tipo: "certificado",
    nombre: "Tartarini — ISO 9001",
    url: assetDoc(
      "certificados",
      "tartarini",
      "Certificado TARTARINI (ISO 9001).pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: m.tartarini,
    tipo: "certificado",
    nombre: "Tartarini — ISO 14001",
    url: assetDoc(
      "certificados",
      "tartarini",
      "Certificado TARTARINI (ISO 14001).pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: m.tartarini,
    tipo: "certificado",
    nombre: "Tartarini — ISO 50001",
    url: assetDoc(
      "certificados",
      "tartarini",
      "Certificado TARTARINI (ISO 50001).pdf",
    ),
    paginas: "PDF",
  },
];

const STRATEGIC_SLUG_TO_CATEGORIA: Record<string, string> = {
  corken: m.corken,
  cavagna: m.cavagna,
  fisher: m.fisher,
  spence: m.spence,
  tartarini: m.tartarini,
};

/** Certificados para una página `/marcas/[slug]` cuando el slug coincide con la carpeta de marca */
export function getCertificadosForStrategicBrandSlug(
  slug: string,
): CatalogoDocs[] {
  const catName = STRATEGIC_SLUG_TO_CATEGORIA[slug.trim().toLowerCase()];
  if (!catName) return [];
  return certificadosMarcaDocs.filter((d) => d.categoria === catName);
}

export function strategicBrandHasCertificados(slug: string): boolean {
  return getCertificadosForStrategicBrandSlug(slug).length > 0;
}

function docsEnCategoria(catName: string): CatalogoDocs[] {
  return certificadosMarcaDocs.filter((d) => d.categoria === catName);
}

export const certificadosFisher = docsEnCategoria(m.fisher);

export const certificadosSpence = docsEnCategoria(m.spence);

export const certificadosTartarini = docsEnCategoria(m.tartarini);
