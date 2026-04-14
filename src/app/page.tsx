import { HeroDashboard } from "@/components/hud/hero-dashboard";
import { StatsBar } from "@/components/hud/stats-bar";
import { HudPanel } from "@/components/hud/hud-panel";
import { ProjectCard } from "@/components/hud/project-card";
import { SkillsPanel } from "@/components/hud/skills-panel";
import { getTopRepos } from "@/lib/github";

/**
 * Home Page - Async Server Component para la FASE 4.
 * Orquestación de animaciones en cascada y nuevos módulos de perfil.
 */
export default async function Home() {
  // Obtención de datos del motor de GitHub
  const repos = await getTopRepos();

  return (
    <main className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
        
        {/* HERO DASHBOARD - Delay 0.1 */}
        <HeroDashboard className="md:col-span-8 h-full" delay={0.1} />

        {/* SKILLS PANEL - Delay 0.2 (Sustituye al System Status previo) */}
        <SkillsPanel className="md:col-span-4" delay={0.2} />

        {/* STATS BAR - Delay 0.3 */}
        <StatsBar className="md:col-span-12 mt-4" delay={0.3} />

        {/* SECCIÓN DE PROYECTOS - Inyección con delay dinámico */}
        <div className="md:col-span-12 mt-8 space-y-4">
          <div className="border-b border-white/10 pb-2">
            <h2 className="text-xs font-mono tracking-[0.4em] text-[var(--color-primary)] uppercase">
              {">"} repositorios_desplegados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.length > 0 ? (
              repos.map((repo, index) => (
                <ProjectCard 
                  key={repo.id} 
                  repo={repo} 
                  delay={0.4 + (index * 0.05)} 
                />
              ))
            ) : (
              <div className="col-span-full font-mono text-xs text-red-500/60 border border-red-500/20 p-8 text-center uppercase tracking-widest bg-red-500/5">
                [ SYSTEM_ERROR: NO_DATA_FOUND_OR_MISSING_CREDENTIALS ]
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Footer minimalista */}
      <footer className="mt-24 border-t border-white/5 pt-8">
        <div className="flex justify-between items-center font-mono text-[9px] tracking-widest text-white/10 uppercase">
          <span>© 2026 // FILOCODE</span>
          <span>ESTADO: {repos.length > 0 ? "ESTABLE" : "NOMINAL"}</span>
        </div>
      </footer>
    </main>
  );
}
