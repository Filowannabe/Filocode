"use client";

import { HeroDashboard } from "@/components/hud/hero-dashboard";
import { StatsBar } from "@/components/hud/stats-bar";
import { HudPanel } from "@/components/hud/hud-panel";

/**
 * Home Page - Estructura Bento final para la FASE 2.
 * Utiliza una grilla de 12 columnas para un diseño asimétrico y brutalista.
 */
export default function Home() {
  return (
    <main className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
        
        {/* HERO DASHBOARD - Spans 8 columns */}
        <HeroDashboard className="md:col-span-8 h-full" />

        {/* SYSTEM STATUS PANEL - Spans 4 columns */}
        <HudPanel className="md:col-span-4 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-mono tracking-widest text-[var(--color-primary)] uppercase">
              {">"} SYSTEM_STATUS
            </h3>
            <div className="mt-4 flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">
                ONLINE // V2.0.1
              </span>
            </div>
          </div>
          <div className="mt-8 border-t border-white/5 pt-4 font-mono text-[9px] text-white/20">
            ENCRYPTION: ACTIVE<br />
            HUD_CORE: LOADED
          </div>
        </HudPanel>

        {/* STATS BAR - Spans 12 columns */}
        <StatsBar className="md:col-span-12 mt-4" />

        {/* Espacio reservado para Fase 3 (Galería) */}
        <div className="md:col-span-12 mt-8">
          <div className="border-b border-white/10 pb-2">
            <h2 className="text-xs font-mono tracking-[0.5em] text-white/30 uppercase">
              Despliegue_de_Proyectos
            </h2>
          </div>
        </div>

      </div>

      {/* Footer minimalista */}
      <footer className="mt-24 border-t border-white/5 pt-8">
        <div className="flex justify-between items-center font-mono text-[9px] tracking-widest text-white/10 uppercase">
          <span>© 2026 // FILOCODE</span>
          <span>ESTADO: ESTABLE</span>
        </div>
      </footer>
    </main>
  );
}
