import type { CatalogoDocs } from "@/domain/product";

/** Gate para la página dedicada de certificados */
export const CERTIFICADOS_DOWNLOAD_GATE_SLUG = "recursos-tecnicos-certificados";

/** Gate compartido entre /marcas y /marcas/[slug] para descargas de certificados */
export const MARCAS_CERTIFICADOS_DOWNLOAD_GATE_SLUG = "marcas-certificados";

function certUrl(brandFolder: string, fileName: string): string {
  const enc = encodeURIComponent(fileName);
  return `/assets/docs/certificados/${brandFolder}/${enc}`;
}

const fisher = "Fisher" as const;
const tartarini = "Tartarini" as const;
const spence = "Spence" as const;

/** Slug de carpeta bajo `public/assets/docs/certificados/` */
export type CertificadoBrandFolder = "fisher" | "tartarini" | "spence";

export const CERTIFICADO_BRAND_SLUGS: CertificadoBrandFolder[] = [
  "fisher",
  "tartarini",
  "spence",
];

export const certificadosFisher: CatalogoDocs[] = [
  {
    categoria: fisher,
    nombre: "Certificado FISHER (ISO)",
    url: certUrl("fisher", "Certificado FISHER (ISO).pdf"),
    paginas: "PDF",
  },
  {
    categoria: fisher,
    nombre: "Certificado FISHER (SIL)",
    url: certUrl("fisher", "Certificado FISHER (SIL).pdf"),
    paginas: "PDF",
  },
  {
    categoria: fisher,
    nombre: "Certificado FISHER (UL 1)",
    url: certUrl("fisher", "Certificado FISHER (UL 1).pdf"),
    paginas: "PDF",
  },
  {
    categoria: fisher,
    nombre: "Certificado FISHER (UL 2)",
    url: certUrl("fisher", "Certificado FISHER (UL 2).pdf"),
    paginas: "PDF",
  },
  {
    categoria: fisher,
    nombre: "Certificado FISHER (UL 3)",
    url: certUrl("fisher", "Certificado FISHER (UL 3).pdf"),
    paginas: "PDF",
  },
  {
    categoria: fisher,
    nombre: "Certificado FISHER (UL 4)",
    url: certUrl("fisher", "Certificado FISHER (UL 4).pdf"),
    paginas: "PDF",
  },
  {
    categoria: fisher,
    nombre: "Cuadro comparativo certificados FISHER",
    url: certUrl("fisher", "Cuadro comparativo certificados FISHER.xlsx"),
    paginas: "XLSX",
  },
];

export const certificadosTartarini: CatalogoDocs[] = [
  {
    categoria: tartarini,
    nombre: "Certificado TARTARINI",
    url: certUrl("tartarini", "Certificado TARTARINI.pdf"),
    paginas: "PDF",
  },
  {
    categoria: tartarini,
    nombre: "Certificado TARTARINI (ISO 9001)",
    url: certUrl("tartarini", "Certificado TARTARINI (ISO 9001).pdf"),
    paginas: "PDF",
  },
  {
    categoria: tartarini,
    nombre: "Certificado TARTARINI (ISO 14001)",
    url: certUrl("tartarini", "Certificado TARTARINI (ISO 14001).pdf"),
    paginas: "PDF",
  },
  {
    categoria: tartarini,
    nombre: "Certificado TARTARINI (ISO 50001)",
    url: certUrl("tartarini", "Certificado TARTARINI (ISO 50001).pdf"),
    paginas: "PDF",
  },
];

export const certificadosSpence: CatalogoDocs[] = [
  {
    categoria: spence,
    nombre: "Certificado SPENCE",
    url: certUrl("spence", "Certificado SPENCE.pdf"),
    paginas: "PDF",
  },
];

const DOCS_BY_BRAND_SLUG: Record<CertificadoBrandFolder, CatalogoDocs[]> = {
  fisher: certificadosFisher,
  tartarini: certificadosTartarini,
  spence: certificadosSpence,
};

export function getCertificadosForStrategicBrandSlug(
  slug: string
): CatalogoDocs[] {
  const key = slug.toLowerCase();
  if (key in DOCS_BY_BRAND_SLUG) {
    return DOCS_BY_BRAND_SLUG[key as CertificadoBrandFolder];
  }
  return [];
}

export function strategicBrandHasCertificados(slug: string): boolean {
  return getCertificadosForStrategicBrandSlug(slug).length > 0;
}
