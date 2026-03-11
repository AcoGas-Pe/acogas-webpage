import type { Product } from "@/domain/product";

/**
 * Data layer: productos para la página de detalle.
 * Puede reemplazarse por CMS o API; la interfaz ProductPage se mantiene.
 */
const PRODUCTS: Product[] = [
  {
    slug: "bombas-paletas-deslizantes-serie-z",
    modelo: "Bombas de Paletas Deslizantes Serie Z (Z2000; Z3200; Z3500; Z4200 y Z4500)",
    marca: "Corken",
    descripcion: "Bombas de paletas deslizantes para aplicaciones de alta presión (hasta 400 psi). Diseño de montaje con pie, construcción con junta tórica y sin juntas. Ideales para GLP, amoníaco agrícola y otros gases licuados.",
    caracteristicas: [
      "Las paletas deslizantes autoajustables maximizan el rendimiento.",
      "Las levas y placas laterales son reemplazables y reversibles.",
      "Al retirar el cabezal de la bomba se obtiene acceso completo a las piezas internas sin alterar las tuberías.",
      "Puede manejar pequeñas cantidades de vapor, lo que lo hace ideal para gases licuados.",
      "Su excelente altura de succión es ideal para limpiar las líneas de succión y descarga.",
      "La válvula de alivio interna viene preajustada de fábrica, por lo que no es necesario realizar ajustes en el campo.",
    ],
    especificaciones: [
      { nombre: "Presión máxima de trabajo", valor: "400 psi (27,6 bar)" },
      { nombre: "Caudal", valor: "Hasta 385 gpm (1457 l/min)" },
      { nombre: "Presión diferencial", valor: "Hasta 125 psi (8,6 bar)" },
      { nombre: "Rango de temperatura", valor: "De -25 a 225 °F (de -32 a 107 °C)" },
      { nombre: "Viscosidad", valor: "Hasta 20 000 SSU (4250 cSt)" },
      { nombre: "Diseño", valor: "Diez paletas sin accionadores; sello mecánico con asiento de carburo de silicio" },
      { nombre: "Conexiones", valor: "NPT" },
      { nombre: "Aprobación", valor: "UL para servicio de GLP y amoníaco agrícola" },
    ],
    fluidosYGases: [
      { valor: "Amoníaco agrícola" },
      { valor: "Butano" },
      { valor: "Propano" },
      { valor: "Líquidos de gas natural" },
      { valor: "Refrigerantes" },
      { valor: "CO2" },
      { valor: "Otros gases licuados" },
    ],
    catalogoDocs: [
      // Generales
      {
        categoria: "Generales",
        url: "/assets/docs/Installation-Operation-Maintenance-Manual-Z-Series.pdf",
        nombre: "Installation, Operation & Maintenance Manual (Z-Series).pdf",
        paginas: "Todo",
      },
      {
        categoria: "Generales",
        url: "/assets/docs/Repair-Rebuild-Kits-Z-Series.pdf",
        nombre: "Repair/Rebuild Kits (Z Series).pdf",
        paginas: "Todo",
      },
      {
        categoria: "Generales",
        url: "/assets/docs/Parts-Details-Z-Series.pdf",
        nombre: "Parts Details (Z Series).pdf",
        paginas: "Todo",
      },
      {
        categoria: "Generales",
        url: "/assets/docs/Manual-Instalacion-Operacion-Mantenimiento-Serie-Z.pdf",
        nombre: "Manual de Instalación, Operación y Mantenimiento (Serie Z).pdf",
        paginas: "Todo",
      },
      {
        categoria: "Generales",
        url: "/assets/docs/Juegos-Reparacion-Reconstruccion-Serie-Z.pdf",
        nombre: "Juegos de Reparación/Reconstrucción (Serie Z).pdf",
        paginas: "Todo",
      },
      {
        categoria: "Generales",
        url: "/assets/docs/Parts-Details-Z-Series.pdf",
        nombre: "Parts Details (Z Series).pdf",
        paginas: "Todo",
      }, // Repetido por requerimiento
      {
        categoria: "Generales",
        url: "/assets/docs/Z3500-Pump.pdf",
        nombre: "Z3500 Pump.pdf",
        paginas: "Todo",
      },
      {
        categoria: "Generales",
        url: "/assets/docs/Z4500-Stationary-Pump.pdf",
        nombre: "Z4500 Stationary Pump.pdf",
        paginas: "Todo",
      },

      // Específicos
      {
        categoria: "Específicos",
        url: "/assets/docs/Serie-Z.pdf",
        nombre: "Serie Z.pdf",
        paginas: "Página 3 - 7",
      },
      {
        categoria: "Específicos",
        url: "/assets/docs/Z-Series.pdf",
        nombre: "Z Series.pdf",
        paginas: "Página 3-7 y 9",
      },
      {
        categoria: "Específicos",
        url: "/assets/docs/Serie-GLP.pdf",
        nombre: "Serie GLP.pdf",
        paginas: "Página 10 y 11",
      },
      {
        categoria: "Específicos",
        url: "/assets/docs/LPG-Series.pdf",
        nombre: "LPG Series.pdf",
        paginas: "Página 10 y 11",
      },
    ],
    macroCategoria: "",
    categoria: "",
    tipoBrochure: "",
    itemId: ""
  },
  {
    slug: "reguladores-ezh-ezhso",
    modelo: "Series EZH y EZHSO",
    marca: "Fisher",
    grupoEmpresarial: "Emerson",
    descripcion: "Reguladores reductores de presión de las series EZH y EZHSO. Ideales para transmisión y distribución de gas, con control operado por piloto, cierre hermético y opciones de modo de fallas (resorte a abierto o a cerrado).",
    caracteristicas: [
      "Absolutamente sin pérdida atmosférica: Elimina el gas purgado a la atmósfera mediante un sistema de control operado por piloto que purga el 100 % del gas al sistema aguas abajo.",
      "Cierre hermético a prueba de burbujas: Tapón de metal con filo de cuchillas y asiento blando para cierre positivo (sistemas sin retorno).",
      "Larga vida útil en servicio severo: El diseño del tapón desvía partículas y desechos del asiento blando, con excelente resistencia a la erosión.",
      "Opciones del modo de fallas: EZHSO (resorte a abierto) para maximizar tiempo de funcionamiento; EZH (resorte a cerrado) para proteger activos aguas abajo. Combinación trabajador EZHSO + monitor EZH disponible.",
      "Control de presión preciso: Control estable aguas abajo ante cambios de carga o variaciones de presión de entrada.",
      "Funcionamiento silencioso: Opción Whisper Trim™ reduce el ruido hasta 8 dBa en la fuente.",
      "Clasificación de presión máxima: Igualdad de entrada y salida 103 bar/1500 psig; selección sencilla sin procedimientos especiales de arranque o parada.",
      "Configuraciones de corte integral: Tipos EZHOSX y EZHSO-OSX interrumpen el servicio ante sobrepresión o subpresión.",
    ],
    especificaciones: [
      { nombre: "Configuraciones", valor: "Tipo EZH (resorte a cerrado) y EZHSO (resorte a abierto): rango de control 1 a 80 bar/14,5 a 1160 psig; Tipo EZHOSX y EZHSO-OSX con dispositivo de corte integrado tipo OS2" },
      { nombre: "Tamaños del cuerpo", valor: "NPS 1, 2, 3, 4 / DN 25, 50, 80, 100" },
      { nombre: "Conexiones finales", valor: "NPT, CL150 RF, CL300 RF, CL600 RF, BWE, SWE" },
      { nombre: "Presión de entrada máxima", valor: "103 bar / 1500 psig" },
      { nombre: "Presión de salida (caja) máxima", valor: "103 bar / 1500 psig" },
      { nombre: "Rango de presión de salida", valor: "1,0 a 80,0 bar / 14,5 a 1160 psig" },
      { nombre: "Capacidades térmicas (NBR)", valor: "-29 a 82 °C / -20 a 180 °F" },
      { nombre: "Capacidades térmicas (FKM)", valor: "-18 a 82 °C / 0 a 180 °F" },
    ],
    fluidosYGases: [
      { valor: "Gas natural" },
      { valor: "Aire" },
      { valor: "Propano" },
      { valor: "Butano" },
      { valor: "GLP" },
      { valor: "Gas ciudad" },
      { valor: "Nitrógeno" },
      { valor: "Dióxido de carbono" },
      { valor: "Hidrógeno" },
    ],
    catalogoDocs: [
      { categoria: "Generales", url: "/assets/docs/Brochure-General-FISHER-2.pdf", nombre: "Brochure General FISHER 2.pdf", paginas: "Página 17" },
      { categoria: "Generales", url: "/assets/docs/Reguladores-presion-Tipo-EZH-EZHSO.pdf", nombre: "Reguladores de presión (Tipo EZH y EZHSO).pdf", paginas: "Todo" },
      { categoria: "Generales", url: "/assets/docs/Soluciones-de-refino.pdf", nombre: "Soluciones de refino.pdf", paginas: "Página 6" },
      { categoria: "Generales", url: "/assets/docs/Pressure-regulators-Type-EZH-EZHO.pdf", nombre: "Pressure regulators (Type EZH and EZHO).pdf", paginas: "Todo" },
      { categoria: "Generales", url: "/assets/docs/Refining-solutions.pdf", nombre: "Refining solutions.pdf", paginas: "Página 6" },
      { categoria: "Específicos", url: "/assets/docs/Bulletin-71.2-EZH-EZHSO-Series.pdf", nombre: "Bulletin 71.2 (EZH and EZHSO Series Pressure Reducing Regulators).pdf", paginas: "Todo" },
      { categoria: "Específicos", url: "/assets/docs/Application-Guide-Industrial-Regulators.pdf", nombre: "Application Guide Industrial Regulators.pdf", paginas: "Página 226" },
      { categoria: "Específicos", url: "/assets/docs/Manual-instalacion-Serie-EZH-EZHO.pdf", nombre: "Manual de instalación (Serie EZH y EZHO).pdf", paginas: "Todo" },
      { categoria: "Específicos", url: "/assets/docs/Application-Guide-Natural-Gas.pdf", nombre: "Application Guide Natual Gas.pdf", paginas: "Página 375 - 389" },
      { categoria: "Específicos", url: "/assets/docs/Instruction-manual-EZH-EZHSO-Series.pdf", nombre: "Instruction manual (EZH and EZHSO Series).pdf", paginas: "Todo" },
      { categoria: "Específicos", url: "/assets/docs/The-Industry-Standard-Pressure-Regulators.pdf", nombre: "The Industry Standard for  Pressure Regulators.pdf", paginas: "Página 21" },
      { categoria: "Específicos", url: "/assets/docs/Instruction-Manual-Type-EZH-EZHSO.pdf", nombre: "Instruction Manual (Type EZH and EZHSO).pdf", paginas: "Todo" },
      { categoria: "Específicos", url: "/assets/docs/Natural-Gas-Technologies.pdf", nombre: "Natural Gas Technologies.pdf", paginas: "Página 11" },
      { categoria: "Específicos", url: "/assets/docs/High-Pressure-Transmission-Distribution-EZH-EZHSO.pdf", nombre: "High Pressure Transmission and Distribution Pressure Control (EZH and EZHSO Series) .pdf", paginas: "Todo" },
      { categoria: "Específicos", url: "/assets/docs/Fuel-Gas-Pressure-Control-Fired-Heaters-Boilers.pdf", nombre: "Fuel Gas Pressure Control Solutions for Fired Heaters and Boilers.pdf", paginas: "Página 10" },
      { categoria: "Específicos", url: "/assets/docs/Eliminating-Natural-Gas-Emissions.pdf", nombre: "Eliminating Natural Gas Emissions Reduces Operating Costs.pdf", paginas: "Todo" },
      { categoria: "Específicos", url: "/assets/docs/We-believe-regulators-seen-not-heard.pdf", nombre: "We believe regulators should be seen and not heard.pdf", paginas: "Todo" },
      { categoria: "Específicos", url: "/assets/docs/Transmission-Distribution-Technology.pdf", nombre: "Transmission and Distribution Technology.pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZH-6350-Series-Pilot-161EB.pdf", nombre: "Schematic (Type EZH* with 6350 Series Pilot  / 161EB Pilot Supply).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Types-EZHSO-EZH-Wide-Open-Monitor.pdf", nombre: "Schematic (Types EZHSO and EZH Wide-Open Monitor).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Types-EZHOSX-EZHSO-Wide-Open-Monitor.pdf", nombre: "Schematic (Types EZHOSX and EZHSO Wide-Open Monitor).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZHSO-Spring-to-Open-Pilot-Operated.pdf", nombre: "Schematic (Type EZHSO (Spring-to-Open) Pilot-Operated Regulator (1, 2 or 3 In. / DN 25, 50 or 80)).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZH-Pilot-Operated-Regulator-1-2-3.pdf", nombre: "Schematic (Type EZH Pilot-Operated Regulator (1, 2 or 3 In. / DN 25, 50 or 80)).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZH-Wide-Open-Monitor.pdf", nombre: "Schematic (Type EZH Wide-Open Monitor).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Types-EZH-EZHSO-Wide-Open-Monitor.pdf", nombre: "Schematic (Types EZH and EZHSO Wide-Open Monitor).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZH-EZHSO-Working-Monitor.pdf", nombre: "Schematic (Type EZH-EZHSO Working Monitor).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZH-Type-32A-Pilot.pdf", nombre: "Schematic (Type EZH with Type 32A Pilot).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZH-Working-Monitor.pdf", nombre: "Schematic (Type EZH Working Monitor).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZH-Wide-Open-Monitor-PRX-131-Booster.pdf", nombre: "Schematic (Type EZH Wide-Open Monitor with Type PRX/131 Booster).pdf", paginas: "Todo" },
      { categoria: "Esquemáticos", url: "/assets/docs/Schematic-Type-EZH-Pilot-Operated-Regulator-4-6-8-12x6.pdf", nombre: "Schematic (Type EZH Pilot Operated Regulator (4, 6, 8 or 12 x 6 in.  DN 100, 150, 200 or 300 x 150)).pdf", paginas: "Todo" },
    ],
    macroCategoria: "Regulación y control de presión",
    categoria: "Válvulas y Reguladores de Presión",
    tipoBrochure: "Reguladores reductores de presión",
    itemId: "9"
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
