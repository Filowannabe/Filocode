"use client";

import { HudPanel } from "./hud-panel";
import { cn } from "@/lib/utils";

interface HeroDashboardProps {
  className?: string;
}

/**
 * HeroDashboard - El núcleo de identidad visual con estética HUD.
 * Tipografía masiva y stats RPG con bordes afilados.
 */
export function HeroDashboard({ className }: HeroDashboardProps) {
  return (
    <HudPanel className={cn("flex flex-col justify-between p-6 md:p-8", className)}>
      <div className="space-y-4">
        {/* Títulos Identitarios */}
        <div className="space-y-1">
          <h1 className="text-6xl font-bold tracking-tight md:text-7xl">
            FILOCODE
          </h1>
          <p className="text-xs font-medium tracking-widest text-[var(--color-primary)]/80 uppercase">
            Senior Software Engineer | 5 Years Experience
          </p>
        </div>

        {/* RPG Stats / Terminal Style */}
        <div className="mt-2 border-t border-white/10 pt-4 font-mono text-xs text-white/40">
          <span className="mr-4">[CLASS: FULLSTACK]</span>
          <span className="mr-4">[WEAPON: NODE.JS]</span>
          <span>[MASTERY: NEXT.JS]</span>
        </div>
      </div>

      {/* Acción Principal */}
      <div className="mt-8">
        <button className="group relative w-fit border border-[var(--color-primary)] bg-transparent px-6 py-2 text-sm font-bold tracking-wider text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 uppercase active:scale-95">
          EXPLORAR PROYECTOS
        </button>
      </div>
    </HudPanel>
  );
}
