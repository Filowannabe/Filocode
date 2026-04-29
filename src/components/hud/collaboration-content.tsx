"use client";

import { useState } from "react";
import { Collaboration } from "@/types/collaboration";
import { COLLABORATION_IMAGES } from "@/data/collaborationImages";
import { HudPanel } from "@/components/hud/hud-panel";
import { ImageLightbox, ExpandIndicator } from "@/components/hud/image-lightbox";
import { ChevronRight, Star, Globe, Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/lib/i18n-client";

interface CollaborationContentProps {
  project: Collaboration;
}

/**
 * CollaborationContent - Componente de Cliente para el Dossier.
 * Maneja el estado interactivo (Lightbox) y el renderizado HUD.
 */
export function CollaborationContent({ project }: CollaborationContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const t = useTranslations();

  return (
    <main className="min-h-screen text-white selection:bg-amber-500 selection:text-black relative z-10 flex flex-col gap-12 pb-20 pt-24">
      
      {/* A. HEADER (Terminal Status Bar) */}
      <div className="fixed top-4 left-4 right-4 md:left-16 md:right-16 z-50">
        <div className="relative overflow-hidden rounded-md transition-all duration-700 bg-[rgba(5,5,5,0.45)] backdrop-blur-3xl border border-white/10 border-b-white/5 border-r-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-5" />
          <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-white/[0.03]">
            <div className="font-mono text-[9px] font-black tracking-[0.3em] text-white/50 uppercase flex items-center gap-4">
              <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-2 group/link text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                <ArrowLeft size={12} className="group-hover/link:-translate-x-1 transition-transform" />
                <span>{t("collaborations.return_to_base")}</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 font-mono text-[9px] font-black tracking-[0.3em] text-amber-200 uppercase shrink-0 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
              <div className="w-8 h-[1px] bg-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-16 w-full space-y-12">
        <HudPanel title={t("collaborations.intelligence_report")} className="w-full">
          <div className="p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:items-center">
            
            {/* Image Trigger */}
            <div 
              className="w-full relative h-[280px] sm:h-[400px] md:h-[450px] lg:h-[550px] lg:flex-1 rounded-3xl overflow-hidden border border-white/10 bg-black group shadow-2xl cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <ExpandIndicator />
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image 
                  src={COLLABORATION_IMAGES[project.id]} 
                  alt={project.company} 
                  fill 
                  priority
                  className="object-cover object-top grayscale sepia-[.7] contrast-125 brightness-75 transition-all duration-1000 ease-out group-hover:scale-105" 
                />
              </div>
              <div className="absolute inset-0 bg-amber-600/50 mix-blend-multiply shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none transition-opacity duration-1000 group-hover:opacity-80" />
            </div>

            <div className="space-y-6 md:space-y-8 w-full lg:flex-1">
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <span className="font-mono text-[10px] text-amber-200 font-black tracking-widest bg-amber-500/20 px-3 py-1 rounded-sm uppercase border border-amber-500/30 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">
                  [ {project.id.replace(/-/g, '_').toUpperCase()} ]
                </span>
                <div className="h-[1px] w-6 bg-white/20 shrink-0" />
                <span className="font-mono text-[10px] md:text-[11px] font-black text-black bg-amber-500 px-3 py-1 rounded-sm uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.4)] shrink-0">
                  {project.country}
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                  {project.company}
                </h1>
                <p className="text-lg md:text-xl text-white/50 font-mono tracking-tight uppercase border-b border-white/10 pb-6">
                  {t(`projects.${project.id}.title`)}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pt-8">
                <div className="space-y-2 group/spec">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-amber-500/40 rounded-full" />
                    <span className="font-mono text-[10px] text-amber-500 font-black uppercase tracking-[0.2em]">{t("collaborations.engagement_model")}</span>
                  </div>
                  <p className="text-[12px] md:text-sm font-black text-amber-200 uppercase tracking-wide drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">{t(`projects.${project.id}.engagementModel`)}</p>
                </div>
                
                {project.budget && (
                  <div className="space-y-2 group/spec">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-3 bg-amber-500/40 rounded-full" />
                      <span className="font-mono text-[10px] text-amber-500 font-black uppercase tracking-[0.2em]">{t("collaborations.budget_allocation")}</span>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-sm">
                      <p className="text-[12px] md:text-sm font-black text-amber-200 uppercase tracking-wide drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                        {t(`projects.${project.id}.budget`)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </HudPanel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-12 self-start">
            <HudPanel title={t("collaborations.client_overview")}>
              <div className="p-6 md:p-12 space-y-16">
                <div className="text-base md:text-xl text-white/90 font-light leading-relaxed">
                  {t(`projects.${project.id}.clientOverview`)}
                </div>
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-amber-500" />
                    <h2 className="font-mono text-sm font-black text-amber-500 uppercase tracking-widest">{t("collaborations.tactical_outcomes")}</h2>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 items-start">
                    {project.results.map((_, idx) => (
                      <li key={idx} className="flex items-start gap-4 group">
                        <div className="mt-1.5 w-2 h-2 bg-amber-500/40 border border-amber-500 group-hover:scale-125 transition-transform shrink-0" />
                        <span className="text-white/80 font-mono text-xs leading-tight uppercase tracking-tight group-hover:text-white transition-colors">
                          {t(`projects.${project.id}.results.${idx}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </HudPanel>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-12">
            <HudPanel title={t("collaborations.core_technologies")}>
              <div className="p-6 md:p-10">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-amber-500/10 text-amber-100 border border-amber-500/30 text-[9px] font-black uppercase tracking-widest rounded-sm">{tech}</span>
                  ))}
                </div>
              </div>
            </HudPanel>
          </div>
        </div>

        {/* D. FAQ MODULE */}
        {project.faq && project.faq.length > 0 && (
          <HudPanel title={t("collaborations.query_security_faq")} className="w-full">
            <div className="p-6 md:p-12 lg:p-16">
              <div className="max-w-4xl space-y-4 mx-auto">
                {project.faq.map((_, idx) => (
                  <details key={idx} className="group bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden transition-all hover:bg-white/[0.05]">
                    <summary className="p-6 cursor-pointer flex items-center justify-between list-none font-mono text-[11px] md:text-sm uppercase tracking-widest font-black text-white/90 group-open:text-amber-400 group-hover:text-white transition-colors">
                      <span className="flex items-start md:items-center gap-4 pr-4">
                        <span className="text-amber-500 shrink-0 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">[{ (idx + 1).toString().padStart(2, '0') }]</span>
                        <span className="leading-tight">{t(`projects.${project.id}.faq.${idx}.question`)}</span>
                      </span>
                      <div className="w-6 h-6 shrink-0 rounded-full border border-white/20 flex items-center justify-center group-open:rotate-180 transition-transform group-hover:border-amber-500/50">
                        <ChevronRight size={14} className="text-amber-500" />
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-0 text-white/80 font-light leading-relaxed border-t border-white/5 mt-4 pt-6 text-sm md:text-base bg-black/20">
                      {t(`projects.${project.id}.faq.${idx}.answer`)}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </HudPanel>
        )}
      </div>

      <ImageLightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        src={COLLABORATION_IMAGES[project.id]} 
        alt={project.company} 
      />
    </main>
  );
}
