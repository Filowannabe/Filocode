import { getTopRepos } from "@/lib/github";
import { ProjectGallery } from "@/components/hud/project-gallery";

/**
 * Server Component que envuelve el fetch de repositorios.
 * Al estar separado, permite a la página principal usar React Suspense
 * para renderizar Skeletons mientras la API responde.
 */
export async function ProjectSection() {
  const initialRepos = await getTopRepos();

  if (initialRepos.length === 0) {
    return (
      <div className="col-span-full font-mono text-xs text-red-500/60 border border-red-500/20 p-8 text-center uppercase tracking-widest bg-red-500/5">
        [ SYSTEM_ERROR: NO_DATA_FOUND_OR_MISSING_CREDENTIALS ]
      </div>
    );
  }

  return (
    <>
      {/* Dynamic Header focused on recruiters */}
      <div className="flex flex-col gap-3 border-b border-white/10 pb-6 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
          Open Source <span className="text-(--color-primary)">Arsenal</span>
        </h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl">
          Mi compromiso con la comunidad tecnológica y la ingeniería de software. Aquí puedes auditar la arquitectura, 
          calidad de código e impacto (estrellas y visualizaciones) de mis <strong>{initialRepos.length}</strong> proyectos, 
          sincronizados dinámicamente con GitHub.
        </p>
      </div>
      <ProjectGallery initialRepos={initialRepos} />
    </>
  );
}
