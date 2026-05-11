/**
 * Contenido FAQ del sitio (una fuente para la página dedicada y bloques reutilizables).
 */

export interface SiteFaqItem {
  question: string;
  answer: string;
}

export const SITE_FAQ_ITEMS: SiteFaqItem[] = [
  {
    question: "¿Qué marcas representan?",
    answer:
      "Representamos marcas líderes mundiales como Emerson (Fisher, Tartarini, Spence), Corken, Liquid Controls y Cavagna Group, garantizando equipos de la más alta calidad y respaldo técnico.",
  },
  {
    question: "¿Ofrecen visitas técnicas?",
    answer:
      "Sí, realizamos visitas técnicas sin compromiso para evaluar sus necesidades en planta. Nuestro equipo de ingenieros lo acompaña desde el diagnóstico hasta la puesta en marcha.",
  },
  {
    question: "¿Trabajan con normativas peruanas?",
    answer:
      "Absolutamente. Todas nuestras soluciones cumplen con las Normas Técnicas Peruanas (NTP) y estándares internacionales aplicables a GLP, Gas Natural y Vapor.",
  },
  {
    question: "¿Cuál es el tiempo de respuesta para cotizaciones?",
    answer:
      "Procesamos solicitudes de cotización en un plazo de 24-48 horas hábiles. Para proyectos que requieren ingeniería, el plazo depende de la complejidad de la evaluación.",
  },
  {
    question: "¿Ofrecen capacitación técnica?",
    answer:
      "Sí, brindamos capacitación al personal de planta sobre operación, mantenimiento y seguridad de los equipos que suministramos. También organizamos seminarios técnicos periódicos.",
  },
  {
    question: "¿Atienden fuera de Lima?",
    answer:
      "Sí. Tenemos cobertura en las principales zonas industriales del país; coordine visita o soporte según su ubicación desde Contacto o Cobertura industrial.",
  },
];
