"use client";

import { HeroDashboard } from "@/components/hud/hero-dashboard";
import { StatsBar } from "@/components/hud/stats-bar";
import { HudPanel } from "@/components/hud/hud-panel";

/**
 * Home Page - Ensamblaje de la Fase 2 con Estructura Bento.
 * Organiza los componentes en una grilla brutalista de 12 columnas.
 */
export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-6 md:p-12">
      {/* Bento Grid Principal */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        
        {/* HERO DASHBOARD - Gran impacto visual */}
        <div className="md:col-span-8 md:row-span-2">
          <HeroDashboard />
        </div>

        {/* SIDEBAR PANEL 1 - Info rápida (Placeholder para Fase 3) */}
        <div className="md:col-span-4">
          <HudPanel className="flex h-full flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-[var(--color-primary)]">
                {">"} SYSTEM_STATUS
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Núcleo operacional activo. Interfaz HUD optimizada para 
                exploración de arquitectura y desarrollo fullstack.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-[10px] font-mono text-green-500/80 uppercase">
                Online - v2.0.1
              </span>
            </div>
          </HudPanel>
        </div>

        {/* SIDEBAR PANEL 2 - Navegación (Placeholder para Fase 3) */}
        <div className="md:col-span-4">
          <HudPanel className="h-full">
            <h3 className="text-xs font-mono tracking-widest text-white/40 uppercase">
              Recursos_Externos
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-xs">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>GITHUB</span>
                <span className="text-[var(--color-primary)]">LINK_01</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>LINKEDIN</span>
                <span className="text-[var(--color-primary)]">LINK_02</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>TWITTER</span>
                <span className="text-[var(--color-primary)]">LINK_03</span>
              </li>
            </ul>
          </HudPanel>
        </div>

        {/* STATS BAR - Toda la anchura inferior */}
        <div className="md:col-span-12">
          <StatsBar />
        </div>
        
      </div>

      {/* Footer minimalista */}
      <footer className="mt-24 border-t border-white/5 pt-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase">
          Filocode.dev // Distributed Systems Architecture // 2026
        </p>
      </footer>
    </main>
  );
}
