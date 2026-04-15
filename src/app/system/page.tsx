import { RepoFetcher } from "@/components/RepoFetcher";

/**
 * System Page - Ruta Privada/Oculta para administración de datos.
 * Exclusivo para extracción de métricas y auditoría de la API.
 */
export default function SystemPage() {
  return (
    <main className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 border-b border-white/10 pb-4">
        <h1 className="text-xs font-mono tracking-[0.5em] text-white/30 uppercase">
          [ system_administration_module ]
        </h1>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <section>
          <RepoFetcher initialLimit={100} />
        </section>
        
        <section className="border border-white/5 bg-white/[0.02] p-6 rounded font-mono text-[10px] text-white/20">
          <h3 className="mb-2 text-white/40 uppercase tracking-widest text-[9px]">instrucciones_de_uso:</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>Activar [ infinity_mode ] para mapear la cuenta completa.</li>
            <li>Usar export_excel para reportes de KPIs mensuales.</li>
            <li>El botón purge_memory limpia la caché local del navegador.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
