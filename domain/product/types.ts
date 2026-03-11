/**
 * Product domain types – página de producto.
 * Clean architecture: domain layer, no framework dependencies.
 */

/** Especificación técnica: nombre del parámetro y valor */
export interface EspecificacionItem {
  nombre: string;
  valor: string;
}

/** Material compatible con el producto */
export interface MaterialItem {
  pieza: string;
  material: string;
}

export interface FluidoGasItem {
  valor: string;
}

export interface AplicacionItem {
  aplicacion: string;
}

export interface Mercados {
  mercado: string;
}

/** 
 * Beneficios económicos relacionados con el producto 
 */
export interface BeneficioEconomico {
  beneficio: string;
}

/**
 * Datos de rendimiento relevantes del producto
 */
export interface DatoRendimiento {
  nombre: string;
  valor: string;
}

/**
 * Opciones y accesorios disponibles para el producto
 */
export interface OpcionAccesorio {
  nombre: string;
  descripcion?: string;
}

/**
 * Exactitud: especificación sobre precisión del producto
 */
export interface ExactitudItem {
  descripcion: string;
  valor: string;
}

/**
 * Nuevas funciones o funcionalidades destacables del producto
 */
export interface NuevaFuncion {
  funcion: string;
  descripcion?: string;
}

/**
 * Entrada y visualización de usuario (HMI, displays, etc)
 */
export interface EntradaVisualizacionUsuario {
  tipo: string;
  descripcion?: string;
}

/**
 * Compatible con combustibles refinados / GLP
 */
export interface CombustibleCompatible {
  combustible: string;
}

/**
 * Conectividad y E/S (Entradas/Salidas físicas o digitales)
 */
export interface ConectividadES {
  tipo: string;
  descripcion?: string;
}

/**
 * Controles disponibles para el usuario/facilidad de operación
 */
export interface ControlItem {
  tipo: string;
  descripcion?: string;
}

/**
 * Versatilidad del producto (adaptabilidad, rangos de operación, etc)
 */
export interface VersatilidadItem {
  descripcion: string;
}

/**
 * Regulador (si aplica, para productos tipo regulador)
 */
export interface ReguladorInfo {
  modelo: string;
  descripcion?: string;
  rangoOperacion?: string;
}

export interface CatalogoDocs {
  categoria: string;
  url: string;
  /** Display name of the document (e.g. "Manual de Instalación (Serie Z).pdf") */
  nombre: string;
  /** Optional note: page range or "Todo" for full document */
  paginas?: string;
}

/**
 * Modelo simplificado de producto para la página de detalle (datos en lib/products-data).
 * Usado por la página de producto y el componente principal.
 */
export interface ProductPage {
  slug: string;
  modelo: string;
  marca: string;
  descripcion?: string;
  imagen?: string;
  caracteristicas: string[];
  especificaciones: EspecificacionItem[];
  fluidosYGases: string[];
}

/**
 * Modelo de producto para la página de detalle.
 * - Modelo: título del producto
 * - Marca: fabricante
 * - Características: lista de características
 * - Especificaciones: tabla/lista de especificaciones técnicas
 * - Fluidos y gases: fluidos y gases con los que trabaja el producto
 */
export interface Product {
  /** Slug para la URL (ej: gas-natural, regulador-xyz) */
  slug: string;

  macroCategoria: string;

  categoria: string;

  tipoBrochure: string;

  itemId: string;

  /** Modelo – título del producto en la página */
  modelo?: string;
  submodelo?: string;
  /** Marca del producto */
  marca?: string;
  grupoEmpresarial?: string;
  /** Descripción corta opcional */
  descripcion?: string;
  /** Imagen principal opcional */
  imagen?: string;
  /** Características del producto */
  caracteristicas?: string[];
  /** Especificaciones técnicas (nombre / valor) */
  especificaciones?: EspecificacionItem[];
  /** Fluidos y gases con los que trabaja el producto */
  materiales?: MaterialItem[];
  /** Fluidos y gases con los que trabaja el producto */
  fluidosYGases?: FluidoGasItem[];
  /** Aplicaciones del producto */
  aplicaciones?: AplicacionItem[];
  /** Mercados del producto */
  mercados?: Mercados[];
  /** Beneficios económicos del producto */
  beneficiosEconomicos?: BeneficioEconomico[];
  /** Datos de rendimiento del producto */
  datosRendimiento?: DatoRendimiento[];
  /** Opciones y accesorios del producto */
  opcionesAccesorios?: OpcionAccesorio[];
  /** Exactitud del producto */
  exactitud?: ExactitudItem[];
  /** Nuevas funciones del producto */
  nuevasFunciones?: NuevaFuncion[];
  /** Entrada y visualización de usuario del producto */
  entradaVisualizacionUsuario?: EntradaVisualizacionUsuario[];
  /** Compatible con combustibles refinados / GLP */
  combustibleCompatible?: CombustibleCompatible[];
  /** Conectividad y E/S del producto */
  conectividadES?: ConectividadES[];
  /** Controles del producto */
  controles?: ControlItem[];
  /** Versatilidad del producto */
  versatilidad?: VersatilidadItem[];
  /** Regulador del producto */
  regulador?: ReguladorInfo[];
  /** Catálogo de documentos del producto */
  catalogoDocs?: CatalogoDocs[];
}
