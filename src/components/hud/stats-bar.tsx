"use client";

import { HudPanel } from "./hud-panel";
import { cn } from "@/lib/utils";

interface StatsBarProps {
  className?: string;
  delay?: number;
}

const STATS = [
  { label: "AÑOS EXP", value: "5+" },
  { label: "PROYECTOS", value: "12" },
  { label: "HRS MENTORÍA", value: "200+" },
  { label: "COMMITS", value: "1.2k" },
];

/**
 * StatsBar - Fila de indicadores cuantitativos.
 * Ahora soporta orquestación de animaciones.
 */
export function StatsBar({ className, delay = 0 }: StatsBarProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {STATS.map((stat, index) => (
        <HudPanel 
          key={stat.label} 
          className="p-4 text-center"
          delay={delay + (index * 0.05)}
        >
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-(--color-primary)">
              {stat.value}
            </span>
            <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase">
              {stat.label}
            </span>
          </div>
        </HudPanel>
      ))}
    </div>
  );
}
