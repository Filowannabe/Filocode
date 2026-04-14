"use client";

import { HudPanel } from "./hud-panel";

/**
 * HeroDashboard - Componente central que presenta la identidad principal.
 * Estética minimalista con tipografía impactante.
 */
export function HeroDashboard() {
  return (
    <HudPanel className="flex h-full min-h-[400px] flex-col justify-center px-8 md:px-16">
      <div className="space-y-6">
        {/* Identidad */}
        <div className="space-y-1">
          <h1 className="text-6xl font-bold tracking-tighter md:text-8xl">
            FILOCODE
          </h1>
          <p className="text-lg font-medium tracking-wide text-white/60 md:text-xl">
            SENIOR SOFTWARE ENGINEER | 5 YEARS EXPERIENCE
          </p>
        </div>

        {/* Stats Estilo RPG / Terminal */}
        <div className="flex flex-wrap gap-4 font-mono text-xs text-[var(--color-primary)]/80">
          <span className="border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-2 py-1">
            [CLASS: FULLSTACK]
          </span>
          <span className="border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-2 py-1">
            [WEAPON: NODE.JS]
          </span>
          <span className="border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-2 py-1">
            [MASTERY: NEXT.JS]
          </span>
        </div>

        {/* Call to Action Brutalista */}
        <div className="pt-8">
          <button className="group relative border border-[var(--color-primary)] bg-transparent px-8 py-4 font-bold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)] hover:text-black active:scale-95">
            EXPLORAR PROYECTOS
            <div className="absolute -right-2 -top-2 size-2 bg-[var(--color-primary)] opacity-50" />
            <div className="absolute -bottom-2 -left-2 size-2 bg-[var(--color-primary)] opacity-50" />
          </button>
        </div>
      </div>
    </HudPanel>
  );
}
