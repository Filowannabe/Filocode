import { HeroDashboard } from "@/components/hud/hero-dashboard";
import { StatsBar } from "@/components/hud/stats-bar";
import { SkillsPanel } from "@/components/hud/skills-panel";
import { ProjectSection } from "@/components/hud/project-section";

/**
 * Home Page - Server Component con Streaming UI.
 * Orquestación de animaciones en cascada y soporte de React Suspense.
 */
export default function Home() {
  return (
    <main className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
        
        {/* HERO DASHBOARD - Delay 0.1 */}
        <HeroDashboard className="md:col-span-8 h-full" delay={0.1} />

        {/* SKILLS PANEL - Delay 0.2 */}
        <SkillsPanel className="md:col-span-4" delay={0.2} />

        {/* STATS BAR - Delay 0.3 */}
        <StatsBar className="md:col-span-12 mt-4" delay={0.3} />

        {/* SECCIÓN DE PROYECTOS - Client Component con Fetch (Issue #1 Compliance) */}
        <div className="md:col-span-12 mt-16 space-y-8">
          <ProjectSection />
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
