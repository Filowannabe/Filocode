"use client";

import { useState, useMemo } from "react";
import { Collaboration } from "@/types/collaboration";
import { COLLABORATION_IMAGES } from "@/data/collaborationImages";
import { HudPanel } from "@/components/hud/hud-panel";
import { ImageLightbox, ExpandIndicator } from "@/components/hud/image-lightbox";
import { ChevronRight, Star, Globe, Terminal, Target, Layout, Shield } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "@/lib/i18n-client";
import { TacticalNavbar } from "./tactical-navbar";

interface CollaborationContentProps {
  project: Collaboration;
}

/**
 * CollaborationContent - Componente de Cliente para el Dossier.
 * v5.6: Sincronización de Brillo por ID y Refuerzo de Rango.
 */
export function CollaborationContent({ project }: CollaborationContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const t = useTranslations();

  // 📋 NAV ITEMS: Claves Reales y Dinámicas
  const navItems = useMemo(() => {
    const items = [
      { id: "hero", label: t("INTEL_REPORT"), icon: Target },
      { id: "synopsis", label: t("SYNOPSIS"), icon: Layout },
      { id: "specs", label: t("TECH_SPECS"), icon: Terminal },
    ];

    if (project.faq && project.faq.length > 0) {
      items.push({ id: "security", label: t("SECURITY_FAQ"), icon: Shield });
    }

    return items;
  }, [project, t]);

  return (
    <main className="min-h-screen text-white selection:bg-amber-500 selection:text-black relative z-10 flex flex-col gap-12 pb-32 pt-24 sm:pt-28">
      
      {/* NAVBAR TÁCTICO DINÁMICO */}
      <TacticalNavbar 
        returnLabel={t("RETURN_TO_BASE")} 
        items={navItems} 
      />

      <div className="max-w-[1800px] mx-auto px-4 md:px-16 w-full space-y-12">
        
        {/* SECTION: HERO */}
        <section className="scroll-mt-32">
          <HudPanel id="hero" title={t("collaborations.intelligence_report")} className="w-full">
            <div className="p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:items-center">
              
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
                  <span className="font-mono text-[10px] text-amber-100 font-black drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] bg-white/10 px-2 py-0.5 rounded-sm border border-white/20 uppercase tracking-widest">
                    {t("hud.completed")}
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

                  {project.duration && (
                    <div className="space-y-2 group/spec">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-amber-500/40 rounded-full" />
                        <span className="font-mono text-[10px] text-amber-500 font-black uppercase tracking-[0.2em]">{t("collaborations.mission_duration")}</span>
                      </div>
                      <p className="text-[12px] md:text-sm font-black text-amber-200 uppercase tracking-wide drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">{project.duration}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </HudPanel>
        </section>

        {/* SECTION: SYNOPSIS */}
        <section className="scroll-mt-32 w-full">
          <HudPanel id="synopsis" title={t("collaborations.client_overview")}>
            <div className="p-6 md:p-12 space-y-16">
              <div className="space-y-6">
                <div className="text-base md:text-xl text-white/90 font-light leading-relaxed">
                  {t(`projects.${project.id}.clientOverview`)}
                </div>
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

              {project.clientFeedback && project.clientFeedback.length > 0 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-amber-500" />
                    <h2 className="font-mono text-sm font-black text-amber-500 uppercase tracking-widest">{t("hud.authorized_feedback")}</h2>
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
                          "{t(`projects.${project.id}.clientFeedback.${idx}.quote`)}"
                        </blockquote>
                        <cite className="not-italic">
                          <div className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-black">
                            {"//"} {t(`projects.${project.id}.clientFeedback.${idx}.reviewer`)}
                          </div>
                        </cite>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </HudPanel>
        </section>

        {/* SECTION: SPECS */}
        <section className="scroll-mt-32 grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          <div className="xl:col-span-6">
            <HudPanel id="specs" title={t("collaborations.core_technologies")}>
              <div className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-mono text-[10px] font-black text-amber-200 uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">{t("collaborations.core_technologies")}</h3>
                  <Terminal size={14} className="text-amber-500/60" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 bg-amber-500/10 text-amber-100 border border-amber-500/30 text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-amber-500/20 hover:text-white transition-all cursor-default shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </HudPanel>
          </div>

          <div className="xl:col-span-6">
            <HudPanel activeId="specs" title={t("collaborations.deployment_services")}>
              <div className="p-6 md:p-10">
                <ul className="space-y-3">
                  {project.servicesProvided.map((_, idx) => (
                    <li key={idx} className="flex items-start gap-3 py-2 border-b border-white/10 last:border-0 group/service">
                      <span className="text-amber-500/60 font-mono text-[10px] mt-0.5 shrink-0 group-hover/service:scale-110 transition-transform">{"//"}</span>
                      <span className="text-[11px] text-white/80 font-bold uppercase tracking-widest group-hover:text-white transition-colors">{t(`projects.${project.id}.servicesProvided.${idx}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </HudPanel>

            {project.urls.clientSite && (
              <HudPanel activeId="specs" title={t("collaborations.external_verification")} className="mt-12">
                <div className="p-6 md:p-10">
                  <a 
                    href={project.urls.clientSite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative group px-8 py-5 overflow-hidden rounded-md transition-all duration-500 active:scale-95 shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] cursor-pointer flex items-center justify-center w-full"
                  >
                    <div className="absolute inset-0 bg-gold-gradient animate-gold-shine" />
                    <span className="relative font-mono text-[14px] font-black text-black uppercase tracking-[0.3em] flex items-center gap-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      <Globe size={18} strokeWidth={3} className="group-hover:animate-pulse" />
                      {t("collaborations.live_site_access")}
                    </span>
                  </a>
                </div>
              </HudPanel>
            )}
          </div>
        </section>

        {/* SECTION: SECURITY */}
        <section className="scroll-mt-32 w-full">
          {project.faq && project.faq.length > 0 && (
            <HudPanel id="security" title={t("collaborations.query_security_faq")} className="w-full">
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
        </section>

        <footer className="py-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-all duration-700">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
            {t("hud.end_of_dossier")} {"//"} Hash: {project.id.replace(/-/g, '').substring(0, 6).toUpperCase()}
          </div>
          
          <div className="flex gap-4 md:gap-8 font-mono text-[9px] uppercase tracking-tighter flex-wrap justify-center">
            <span className="text-amber-200 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]">{t("hud.verified_by")}filocode_agent</span>
            <span>{t("hud.auth_level")}05_SENIOR</span>
            <span>{t("hud.date")}4/24/2026</span>
          </div>
        </footer>
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
