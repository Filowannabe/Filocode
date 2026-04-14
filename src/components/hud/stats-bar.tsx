"use client";

import { HudPanel } from "./hud-panel";

const STATS = [
  { label: "AÑOS EXP", value: "5+" },
  { label: "PROYECTOS", value: "24" },
  { label: "MENTORÍAS", value: "12" },
  { label: "COMMITS", value: "2.5K" },
];

/**
 * StatsBar - Fila de indicadores cuantitativos.
 * Utiliza HudPanel para mantener la coherencia visual.
 */
export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {STATS.map((stat, index) => (
        <HudPanel
          key={stat.label}
          delay={0.1 * (index + 1)}
          className="flex flex-col items-center justify-center py-6 text-center"
        >
          <span className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
            {stat.value}
          </span>
          <span className="mt-1 font-mono text-[10px] tracking-widest text-white/40">
            {stat.label}
          </span>
        </HudPanel>
      ))}
    </div>
  );
}
