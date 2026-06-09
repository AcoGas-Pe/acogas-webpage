import {
  Cog,
  Filter,
  Fuel,
  Gauge,
  Layers,
  Shield,
  SlidersHorizontal,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MACRO_ICON_MAP: Record<string, LucideIcon> = {
  "Regulación y control de presión": SlidersHorizontal,
  "Seguridad, Alivio y Vacío": Shield,
  "Equipo de bombeo y compresión": Wrench,
  "Control de Temperatura y Vapor": Waves,
  "Control de Flujo, Filtración y Ruido": Filter,
  "Inertización, Recuperación de vapor y Tanques": Layers,
  "Automatización, Medición y Control": Gauge,
  "Sistemas, Estaciones y Soluciones Integrales": Cog,
  "Accesorios y otros componentes": Cog,
  "Autogas y Aplicaciones Especiales": Fuel,
};

export function getMacroCategoryIcon(macro?: string): LucideIcon {
  if (!macro?.trim()) return Cog;
  return MACRO_ICON_MAP[macro.trim()] ?? Cog;
}

export function MacroCategoryIcon({
  macro,
  className,
  title,
}: {
  macro?: string;
  className?: string;
  title?: string;
}) {
  if (!macro?.trim()) return null;
  const Icon = getMacroCategoryIcon(macro);
  return (
    <span title={title ?? macro} className="inline-flex shrink-0">
      <Icon
        className={cn("text-primary/70", className)}
        aria-hidden
      />
    </span>
  );
}
