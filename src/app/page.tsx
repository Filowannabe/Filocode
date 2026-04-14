import { HeroDashboard } from "@/components/hud/hero-dashboard";
import { StatsBar } from "@/components/hud/stats-bar";
import { HudPanel } from "@/components/hud/hud-panel";
import { ProjectCard } from "@/components/hud/project-card";
import { getTopRepos } from "@/lib/github";

/**
 * Home Page - Async Server Component para la FASE 3.
 * Integra datos de GitHub con ISR (revalidate) y estética HUD.
 */
export default async function Home() {
  // Obtención de datos del motor de GitHub
  const repos = await getTopRepos();

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
            HUD_CORE: LOADED<br />
            GITHUB_SYNC: {repos.length > 0 ? "STABLE" : "OFFLINE"}
          </div>
        </HudPanel>

        {/* STATS BAR - Spans 12 columns */}
        <StatsBar className="md:col-span-12 mt-4" />

        {/* SECCIÓN DE PROYECTOS - Despliegue de Datos Reales */}
        <div className="md:col-span-12 mt-8 space-y-4">
          <div className="border-b border-white/10 pb-2">
            <h2 className="text-xs font-mono tracking-[0.4em] text-[var(--color-primary)] uppercase">
              {">"} repositorios_desplegados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.length > 0 ? (
              repos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
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
