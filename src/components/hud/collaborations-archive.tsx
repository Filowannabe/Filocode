"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { HudPanel } from "./hud-panel";
import { Collaboration } from "@/types/collaboration";
import collaborationsData from "@/data/collaborations.json";
import { COLLABORATION_IMAGES } from "@/data/collaborationImages";
import { ChevronRight, LayoutGrid, GalleryHorizontalEnd } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";

// Mandato React 19: Casting Absoluto
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

/**
 * CollaborationsArchive - Visor Táctico de Colaboraciones.
 * v38.3 - UNIFIED FILTERS & DARK CAROUSEL.
 * Filtros sincronizados entre Consola y Carousel para máxima belleza visual.
 */
export function CollaborationsArchive() {
  const { collaborations } = collaborationsData as any;
  const [viewMode, setViewMode] = useState<'console' | 'carousel'>('console');
  const [activeId, setActiveId] = useState<string>(collaborations[0]?.id);
  const activeProject = collaborations.find((c: any) => c.id === activeId);

  // Marquee Carousel Logic
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // Carousel Infinito: Duplicación para Marquee real
  const carouselItems = [...collaborations, ...collaborations];

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [viewMode, collaborations]);

  useEffect(() => {
    if (viewMode === 'carousel' && !isHovered && carouselWidth > 0) {
      controls.start({
        x: [x.get(), -carouselWidth],
        transition: {
          ease: "linear",
          duration: 30 * (1 - Math.abs(x.get() / carouselWidth)),
          repeat: Infinity,
          repeatType: "reverse"
        }
      });
    } else {
      controls.stop();
    }
  }, [viewMode, isHovered, carouselWidth, controls, x]);

  return (
    <HudPanel title="COLLABORATIONS_HUB // INTEL_FEED" className="w-full overflow-hidden">
      {/* Estilos para el scrollbar ámbar táctico */}
      <style jsx global>{`
        .amber-scrollbar::-webkit-scrollbar {
          width: 4px !important;
          display: block !important;
        }
        .amber-scrollbar::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .amber-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.4) !important;
          border-radius: 10px !important;
        }
        .amber-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.8) !important;
        }
        .amber-scrollbar {
          scrollbar-width: thin !important;
          scrollbar-color: rgba(245, 158, 11, 0.4) transparent !important;
        }
      `}</style>

      {/* Patrón de Padding v28.1 */}
      <div className="p-4 md:p-8 lg:p-12 flex flex-col gap-8 md:gap-12">
        
        {/* HEADER & TOGGLE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
          <div className="font-mono text-[10px] text-amber-500/50 uppercase tracking-[0.3em] flex items-center gap-4">
            <div className="w-8 h-[1px] bg-amber-500/50" />
            AUTHORIZED_COLLABORATIONS
          </div>
          
          <div className="flex bg-black/50 border border-white/10 rounded-sm p-1 backdrop-blur-md self-end md:self-auto">
            <MotionButton
              onClick={() => setViewMode('console')}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest z-10 transition-colors duration-300",
                viewMode === 'console' ? "text-black" : "text-white/40 hover:text-white/80"
              )}
            >
              {viewMode === 'console' && (
                <MotionDiv layoutId="view-mode-indicator" className="absolute inset-0 bg-amber-500 rounded-sm -z-10" />
              )}
              <LayoutGrid size={14} /> Console
            </MotionButton>
            <MotionButton
              onClick={() => setViewMode('carousel')}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest z-10 transition-colors duration-300",
                viewMode === 'carousel' ? "text-black" : "text-white/40 hover:text-white/80"
              )}
            >
              {viewMode === 'carousel' && (
                <MotionDiv layoutId="view-mode-indicator" className="absolute inset-0 bg-amber-500 rounded-sm -z-10" />
              )}
              <GalleryHorizontalEnd size={14} /> Carousel
            </MotionButton>
          </div>
        </div>

        {/* CONTENT AREA - ALTURA RESPONSIVA (v38.2) */}
        <div className="w-full min-h-[auto] lg:h-[800px]">
          <AnimatePresence mode="wait">
            {viewMode === 'console' ? (
              // === MODO CONSOLA ===
              <MotionDiv 
                key="console-view"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 h-full"
              >
                
                {/* 1. VISOR DE IMAGEN (ORDER-FIRST EN MOBILE, col-span-7 EN DESKTOP) */}
                <div className="order-first lg:order-last lg:col-span-7 flex flex-col h-[300px] md:h-[450px] lg:h-full group/img">
                  <div className="relative flex-grow w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <MotionDiv 
                        className="absolute inset-0"
                        whileHover={{ y: "-5%", scale: 1.05 }}
                        transition={{ duration: 15, ease: "linear" }}
                      >
                        <Image
                          src={COLLABORATION_IMAGES[activeProject.id]}
                          alt={activeProject.company}
                          fill
                          className="object-cover object-top grayscale sepia-[.7] contrast-125 brightness-75 transition-all duration-1000"
                        />
                      </MotionDiv>
                    </div>
                    {/* Unified Image Filter: Same as Carousel (The beautiful one) */}
                    <div className="absolute inset-0 bg-amber-600/50 mix-blend-multiply shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none transition-opacity duration-1000 group-hover/img:opacity-80" />
                  </div>
                </div>

                {/* 2. SELECTOR + BRIEFING (col-span-5) */}
                <div className="lg:col-span-5 flex flex-col gap-8 h-full min-h-[500px] lg:min-h-0">
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none flex-none">
                    {collaborations.map((project: Collaboration) => (
                      <button
                        key={project.id}
                        onClick={() => setActiveId(project.id)}
                        className={cn(
                          "relative flex flex-col items-start p-3 md:p-4 transition-all duration-500 text-left min-w-[200px] lg:min-w-0 rounded-sm overflow-hidden",
                          activeId === project.id 
                            ? "bg-amber-500/10 border-l-2 border-amber-500" 
                            : "bg-white/[0.02] border-l-2 border-transparent hover:bg-white/[0.05] hover:border-white/20"
                        )}
                      >
                        <span className={cn(
                          "font-mono text-[8px] md:text-[9px] uppercase tracking-tighter mb-1",
                          activeId === project.id ? "text-amber-500" : "text-white/40"
                        )}>COLLABORATION</span>
                        <span className={cn(
                          "font-bold text-xs md:text-base tracking-tight",
                          activeId === project.id ? "text-white" : "text-white/60"
                        )}>{project.company}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-6 pt-6 border-t border-white/10 flex-grow overflow-y-auto amber-scrollbar pr-4">
                    <div className="flex flex-col flex-none">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-[9px] md:text-[10px] text-amber-500 font-bold tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-sm">
                          [ COMPLETED ]
                        </span>
                        <div className="h-[1px] w-6 bg-white/10 shrink-0" />
                        <span className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase truncate">{activeProject.country}</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase mb-4">{activeProject.company}</h3>
                      <p className="text-xs md:text-lg text-amber-500/60 font-mono tracking-tight uppercase leading-tight border-b border-white/5 pb-4">{activeProject.title}</p>
                    </div>
                    <div className="flex-none">
                      <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">{activeProject.clientOverview}</p>
                    </div>
                    <div className="flex flex-wrap items-start content-start gap-2 flex-none">
                      {activeProject.techStack.map((tech: string) => (
                        <span key={tech} className="text-[8px] md:text-[9px] font-bold px-2 py-1 bg-white/5 text-white/50 border border-white/10 uppercase tracking-widest rounded-full">{tech}</span>
                      ))}
                    </div>
                    <div className="pt-6 border-t border-white/5 mt-auto flex-none">
                      <NextLink
                        href={`/collaborations/${activeProject.id}`}
                        className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gold-gradient rounded-sm shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all hover:scale-105 active:scale-95 group/btn w-full md:w-auto"
                      >
                        <ChevronRight size={18} strokeWidth={3} className="text-black group-hover:translate-x-1 transition-transform" />
                        <span className="font-mono text-[10px] md:text-xs font-black text-black uppercase tracking-[0.2em]">Access Secure Dossier</span>
                      </NextLink>
                    </div>
                  </div>
                </div>

              </MotionDiv>
            ) : (
              // === MODO CAROUSEL ===
              <MotionDiv 
                key="carousel-view"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="relative w-full overflow-hidden h-full group/carousel cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <MotionDiv 
                  className="flex gap-6 md:gap-12 py-8 w-max h-full"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                  whileHover={{ transition: { duration: 0 } }} 
                >
                  {carouselItems.map((project: Collaboration, idx: number) => (
                    <div key={`${project.id}-${idx}`} className="min-w-[85vw] md:min-w-[70vw] lg:min-w-[900px] xl:min-w-[1100px] h-full relative rounded-3xl overflow-hidden border border-white/10 group/poster flex-shrink-0 bg-black shadow-2xl flex flex-col md:flex-row">
                      {/* Visual Poster Side (Visible in mobile) */}
                      <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                         <Image src={COLLABORATION_IMAGES[project.id]} alt={project.company} fill className="object-cover object-top grayscale sepia-[.7] contrast-125 brightness-75 group-hover/poster:scale-105 transition-all duration-[3s]" />
                         <div className="absolute inset-0 bg-amber-600/50 mix-blend-multiply shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
                      </div>
                      {/* Text Poster Side (No blur, Pure black background) */}
                      <div className="w-full md:w-1/2 flex-grow md:h-full p-6 md:p-12 lg:p-16 flex flex-col justify-between relative z-10 overflow-y-auto scrollbar-none bg-black">
                         <div className="flex justify-between items-start mb-auto">
                            <span className="font-mono text-[8px] md:text-[10px] text-amber-500 font-bold tracking-widest border border-amber-500/20 px-3 py-1 bg-black rounded-sm">[ COMPLETED ]</span>
                            <div className="w-2 h-2 bg-amber-500/40 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                         </div>
                         <div className="mt-4 md:mt-auto mb-6 md:mb-10">
                            <h3 className="text-2xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter uppercase mb-2 md:mb-4">{project.company}</h3>
                            <p className="text-xs md:text-xl text-amber-500/80 font-mono tracking-tight uppercase line-clamp-2">{project.title}</p>
                         </div>
                         <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pointer-events-auto">
                            <div className="flex flex-wrap gap-2 max-w-xs hidden md:flex">
                              {project.techStack.slice(0, 4).map((t: string) => (
                                <span key={t} className="text-[8px] md:text-[9px] font-bold px-3 py-1.5 bg-white/5 border border-white/10 text-white/50 rounded-full uppercase tracking-widest">{t}</span>
                              ))}
                            </div>
                            <NextLink href={`/collaborations/${project.id}`} className="inline-flex items-center gap-3 px-6 py-4 bg-gold-gradient rounded-sm text-black font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-all w-full md:w-auto">
                              <ChevronRight size={16} strokeWidth={3} /> VIEW_DOSSIER
                            </NextLink>
                         </div>
                      </div>
                    </div>
                  ))}
                </MotionDiv>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </div>
    </HudPanel>
  );
}
