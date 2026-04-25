import { Metadata } from "next";
import { notFound } from "next/navigation";
import collaborationsData from "@/data/collaborations.json";
import { Collaboration } from "@/types/collaboration";
import { ChevronRight, Star, Globe, Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { COLLABORATION_IMAGES } from "@/data/collaborationImages";
import { HudPanel } from "@/components/hud/hud-panel";

/**
 * generateStaticParams - Mandato GH Pages (Fase 3)
 * Pre-renderizado de las 4 rutas de colaboraciones en tiempo de build.
 */
export async function generateStaticParams() {
  const { collaborations } = collaborationsData as any;
  return collaborations.map((project: Collaboration) => ({
    id: project.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { collaborations } = collaborationsData as any;
  const project = collaborations.find((c: any) => c.id === id);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.company} // Tactical Dossier`,
    description: project.clientOverview,
  };
}

/**
 * CollaborationDetailPage - El Dossier Técnico.
 * v29: Estética de reporte confidencial y arquitectura 60/40.
 */
export default async function CollaborationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { collaborations } = collaborationsData as any;
  const project = collaborations.find((c: any) => c.id === id) as Collaboration;

  if (!project) notFound();

  return (
    <main className="min-h-screen text-white selection:bg-amber-500 selection:text-black relative z-10 flex flex-col gap-12 pb-20 pt-24">
      
      {/* A. HEADER (Terminal Status Bar) */}
      <div className="fixed top-4 left-4 right-4 md:left-16 md:right-16 z-50">
        <div className="relative overflow-hidden rounded-md transition-all duration-700 bg-[rgba(5,5,5,0.45)] backdrop-blur-3xl border border-white/10 border-b-white/5 border-r-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] group">
          {/* Ambient Glow Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Scanlines Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-5" />
          
          <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-white/[0.03]">
            <div className="font-mono text-[9px] font-black tracking-[0.3em] text-white/50 uppercase flex items-center gap-4">
              <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-2 group/link text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                <ArrowLeft size={12} className="group-hover/link:-translate-x-1 transition-transform" />
                <span>RETURN_TO_BASE</span>
              </Link>
              <div className="hidden lg:block h-3 w-[1px] bg-white/20 shrink-0" />
              <div className="hidden lg:flex gap-4 min-w-0">
                <span className="shrink-0 text-white/60">[ STATUS: COMPLETED ]</span>
                <span className="truncate max-w-[150px] xl:max-w-none text-white/60">[ COUNTRY: {project.country} ]</span>
                <span className="truncate max-w-[250px] xl:max-w-none text-white/60">[ MODEL: {project.engagementModel} ]</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 font-mono text-[9px] font-black tracking-[0.3em] text-white/50 uppercase shrink-0">
              {project.budget && <span className="hidden xl:block">[ BUDGET: {project.budget} ]</span>}
              {project.duration && <span className="hidden xl:block">[ DURATION: {project.duration} ]</span>}
              <div className="w-8 h-[1px] bg-amber-500/40" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-16 w-full space-y-12">
        {/* B. HERO PANEL (Impact & Atmosphere) */}
        <HudPanel title="INTELLIGENCE_REPORT // COLLABORATION" className="w-full">
          <div className="p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:items-center">
            
            {/* 1. Visual Intelligence (Prominent in all breakpoints) */}
            <div className="w-full relative h-[280px] sm:h-[400px] md:h-[450px] lg:h-[550px] lg:flex-1 rounded-3xl overflow-hidden border border-white/10 bg-black group shadow-2xl">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image 
                  src={COLLABORATION_IMAGES[project.id]} 
                  alt={project.company} 
                  fill 
                  priority
                  className="object-cover object-top grayscale sepia-[.7] contrast-125 brightness-75 transition-all duration-1000 ease-out group-hover:scale-105" 
                />
              </div>
              
              {/* Standardized Overlay Logic (Amber Filter 100% Dashboard Match) */}
              <div className="absolute inset-0 bg-amber-600/50 mix-blend-multiply shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none transition-opacity duration-1000 group-hover:opacity-80" />
              
              {/* Vignette Edge (Subtle) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
            </div>

            {/* 2. Project Identity */}
            <div className="space-y-6 md:space-y-8 w-full lg:flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-amber-500 font-bold tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-sm uppercase">
                  [ {project.id.replace(/-/g, '_').toUpperCase()} ]
                </span>
                <div className="h-[1px] w-6 bg-white/10 shrink-0" />
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{project.country}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                {project.company}
              </h1>
              <p className="text-lg md:text-xl text-white/50 font-mono tracking-tight uppercase">
                {project.title}
              </p>
            </div>
          </div>
        </HudPanel>

        {/* C. GRID DE DATOS (Layout 60/40) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* MAIN COLUMN (Left - 60%) */}
          <div className="lg:col-span-7 flex flex-col gap-12 self-start">
            
            <HudPanel title="CLIENT_OVERVIEW">
              <div className="p-6 md:p-12 space-y-16">
                {/* Client Overview */}
                <div className="space-y-6">
                  <div className="text-base md:text-xl text-white/90 font-light leading-relaxed">
                    {project.clientOverview}
                  </div>
                </div>

                {/* Results (Success Metrics) */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-amber-500" />
                    <h2 className="font-mono text-sm font-black text-amber-500 uppercase tracking-widest">Tactical_Outcomes</h2>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 items-start">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-4 group">
                        <div className="mt-1.5 w-2 h-2 bg-amber-500/40 border border-amber-500 group-hover:scale-125 transition-transform shrink-0" />
                        <span className="text-white/80 font-mono text-xs leading-tight uppercase tracking-tight group-hover:text-white transition-colors">
                          {result}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Feedback */}
                {project.clientFeedback && project.clientFeedback.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-[2px] w-12 bg-amber-500" />
                      <h2 className="font-mono text-sm font-black text-amber-500 uppercase tracking-widest">Authorized_Feedback</h2>
                    </div>
                    <div className="space-y-6">
                      {project.clientFeedback.map((feedback, idx) => (
                        <div 
                          key={idx} 
                          className="p-6 md:p-10 bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden group"
                        >
                          <div className="absolute top-0 left-0 w-[2px] h-full bg-amber-500/20 group-hover:bg-amber-500 transition-colors" />
                          <div className="flex gap-1 mb-6">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                          <blockquote className="text-lg md:text-xl font-serif italic text-white/80 leading-relaxed mb-6">
                            "{feedback.quote}"
                          </blockquote>
                          <cite className="not-italic">
                            <div className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-black">
                              {"//"} {feedback.reviewer}
                            </div>
                          </cite>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </HudPanel>
          </div>

          {/* SIDEBAR COLUMN (Right - 40%) */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            
            {/* Tech Stack */}
            <HudPanel title="ARSENAL_COMPOSITION">
              <div className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-mono text-[10px] font-black text-white/70 uppercase tracking-[0.3em]">Core_Technologies</h3>
                  <Terminal size={14} className="text-amber-500/40" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 bg-amber-500/5 text-amber-500/70 border border-amber-500/20 text-[9px] font-bold uppercase tracking-widest rounded-sm hover:bg-amber-500/10 hover:text-amber-500 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </HudPanel>

            {/* Services Provided */}
            <HudPanel title="DEPLOYMENT_SERVICES">
              <div className="p-6 md:p-10">
                <ul className="space-y-3">
                  {project.servicesProvided.map((service) => (
                    <li key={service} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                      <span className="text-amber-500/40 font-mono text-[10px] mt-0.5 shrink-0">{"//"}</span>
                      <span className="text-[11px] text-white/50 uppercase tracking-widest">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </HudPanel>

            {/* External Links */}
            {project.urls.clientSite && (
              <HudPanel title="EXTERNAL_VERIFICATION">
                <div className="p-6 md:p-10">
                  <a 
                    href={project.urls.clientSite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black transition-all text-xs font-black uppercase tracking-widest rounded-sm group"
                  >
                    <Globe size={16} className="group-hover:animate-pulse" />
                    Live_Site_Access
                  </a>
                </div>
              </HudPanel>
            )}
          </div>
        </div>

        {/* D. FAQ MODULE (Accordion de Seguridad) */}
        {project.faq && project.faq.length > 0 && (
          <HudPanel title="QUERY_SECURITY_FAQ" className="w-full">
            <div className="p-6 md:p-12 lg:p-16">
              <div className="max-w-4xl space-y-4 mx-auto">
                {project.faq.map((item, idx) => (
                  <details key={idx} className="group bg-white/[0.02] border border-white/5 rounded-sm overflow-hidden transition-all hover:bg-white/[0.04]">
                    <summary className="p-6 cursor-pointer flex items-center justify-between list-none font-mono text-[10px] md:text-xs uppercase tracking-widest font-black text-white/60 group-open:text-amber-500">
                      <span className="flex items-start md:items-center gap-4 pr-4">
                        <span className="text-amber-500/40 shrink-0">[{ (idx + 1).toString().padStart(2, '0') }]</span>
                        <span className="leading-tight">{item.question}</span>
                      </span>
                      <div className="w-6 h-6 shrink-0 rounded-full border border-white/10 flex items-center justify-center group-open:rotate-180 transition-transform">
                        <ChevronRight size={14} />
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-0 text-white/50 font-light leading-relaxed border-t border-white/5 mt-4 pt-6 text-sm">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </HudPanel>
        )}

        {/* FOOTER DOSSIER */}
        <footer className="py-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-all duration-700">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
            End_Of_Dossier // Hash: {project.id.replace(/-/g, '').substring(0, 6).toUpperCase()}
          </div>
          <div className="flex gap-4 md:gap-8 font-mono text-[9px] uppercase tracking-tighter flex-wrap justify-center">
            <span>Verified_By: filocode_agent</span>
            <span>Auth_Level: 05_SENIOR</span>
            <span>Date: 4/24/2026</span>
          </div>
        </footer>
      </div>
    </main>
  );
}