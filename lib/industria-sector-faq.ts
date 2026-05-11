import type { ServiceFaqItem } from "@/components/sections/servicio/service-faq-accordion";

export function getIndustriaSectorFaqs(sectorName: string): ServiceFaqItem[] {
  return [
    {
      question: `¿Cómo respalda Acogas proyectos en ${sectorName}?`,
      answer:
        "Partimos del diagnóstico en planta o de su requerimiento documentado, dimensionamos con criterio de ingeniería y proponemos equipos y servicios alineados a normativa aplicable (OSINERGMIN, NTP y estándares internacionales de referencia), sin aislar productos del contexto operativo.",
    },
    {
      question: `¿Qué marcas y tipo de equipamiento suelen aplicarse en ${sectorName}?`,
      answer:
        "Trabajamos con marcas líderes (Emerson / Fisher, Corken, Cavagna, Liquid Controls, entre otras) en regulación y control, seguridad, medición, vapor, bombas y compresores según fluido y presión. La selección depende de condiciones de proceso, no de un catálogo genérico.",
    },
    {
      question: "¿Ofrecen visita técnica o diagnóstico antes de cotizar?",
      answer:
        "Sí. Coordinamos visitas técnicas y diagnósticos para levantar información de campo, evaluar riesgos y priorizar inversiones. También podemos avanzar con información detallada si ya dispone de datos de proceso.",
    },
    {
      question: `¿La cobertura incluye soporte después del suministro en ${sectorName}?`,
      answer:
        "Sí: acompañamos puesta en marcha y damos soporte técnico y mantenimiento industrial según alcance acordado, con disponibilidad en las principales zonas industriales del país.",
    },
  ];
}
