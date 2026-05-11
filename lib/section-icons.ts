import {
  Activity,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Cog,
  Compass,
  Factory,
  FileSearch,
  FlaskConical,
  Gauge,
  Handshake,
  HardHat,
  Layers,
  Lightbulb,
  PackageSearch,
  Ruler,
  Settings2,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Wrench,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** Pool por defecto: secuencia visualmente diversa para tarjetas industriales. */
const DEFAULT_POOL: LucideIcon[] = [
  Cog,
  Ruler,
  Gauge,
  ShieldCheck,
  Wrench,
  PackageSearch,
  FlaskConical,
  Settings2,
  Workflow,
  Layers,
  HardHat,
  Compass,
];

const BENEFIT_POOL: LucideIcon[] = [
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  Handshake,
  Lightbulb,
  Activity,
  Users,
  ClipboardCheck,
];

const APPLICATION_POOL: LucideIcon[] = [
  Factory,
  Building2,
  Truck,
  FlaskConical,
  HardHat,
  Layers,
  PackageSearch,
  Workflow,
];

/** Mapeo por palabras clave en el título: garantiza iconos coherentes. */
const KEYWORD_ICON: { match: RegExp; icon: LucideIcon }[] = [
  { match: /ingenier[ií]a|dimensi/i, icon: Ruler },
  { match: /selecci[óo]n|equipo/i, icon: PackageSearch },
  { match: /diagn[óo]stico|inspecc/i, icon: FileSearch },
  { match: /soporte|servicio t[éeè]cnico/i, icon: Handshake },
  { match: /mantenimi|repuest/i, icon: Wrench },
  { match: /seguridad|certif|normat|cumplim/i, icon: ShieldCheck },
  { match: /medici[óo]n|gauge|presi[óo]n/i, icon: Gauge },
  { match: /v[áa]lvul|regulaci[óo]n|control/i, icon: Settings2 },
  { match: /vapor|caldera/i, icon: Activity },
  { match: /qu[íi]mic|farma/i, icon: FlaskConical },
  { match: /aliment|bebid/i, icon: Factory },
  { match: /miner[ií]a|construcc/i, icon: HardHat },
  { match: /papel|cart[óo]n|textil/i, icon: Layers },
  { match: /transport|log[íi]stic/i, icon: Truck },
  { match: /innovaci[óo]n|nuevo|i\+d/i, icon: Lightbulb },
  { match: /cliente|equipo humano/i, icon: Users },
  { match: /propuest|cotizaci[óo]n|documenta/i, icon: ClipboardCheck },
  { match: /aplicaci[óo]n|sector|industri/i, icon: Factory },
  { match: /procesos|workflow|flujo/i, icon: Workflow },
];

function pickFromPool(pool: LucideIcon[], index: number): LucideIcon {
  return pool[index % pool.length];
}

function pickByKeyword(label: string): LucideIcon | null {
  for (const { match, icon } of KEYWORD_ICON) {
    if (match.test(label)) return icon;
  }
  return null;
}

export function getFeatureIcon(label: string, index: number): LucideIcon {
  return pickByKeyword(label) ?? pickFromPool(DEFAULT_POOL, index);
}

export function getBenefitIcon(label: string, index: number): LucideIcon {
  return pickByKeyword(label) ?? pickFromPool(BENEFIT_POOL, index);
}

export function getApplicationIcon(label: string, index: number): LucideIcon {
  return pickByKeyword(label) ?? pickFromPool(APPLICATION_POOL, index);
}
