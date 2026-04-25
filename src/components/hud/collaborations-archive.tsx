"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
 * v4.7 - GOLDEN_STATE: Infinite Wrap + Debt Zero.
 */
export function CollaborationsArchive() {
  const { collaborations } = collaborationsData as any;
  const [viewMode, setViewMode] = useState<'console' | 'carousel'>('carousel');
  const [activeId, setActiveId] = useState<string>(collaborations[0]?.id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const activeProject = collaborations.find((c: any) => c.id === activeId);

  // Marquee Carousel Logic
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<(() => Promise<void>) | null>(null);
  
  // Carousel Infinito: Duplicación para Marquee real
  const carouselItems = [...collaborations, ...collaborations];

  // Wrap de Drag Infinito: Permite arrastrar sin fin (Sincronizado con x)
  const handleDragWrap = useCallback(() => {
    if (!carouselRef.current) return;
    const halfWidth = carouselRef.current.scrollWidth / 2;
    const currentX = x.get();

    if (currentX <= -halfWidth) {
      x.set(currentX + halfWidth);
    } else if (currentX > 0) {
      x.set(currentX - halfWidth);
    }
  }, [x]);

  // Lógica de Animación Orgánica (Recursiva vía Ref)
  const startMarquee = useCallback(async () => {
    if (!carouselRef.current || viewMode !== 'carousel') return;
    
    const halfWidth = carouselRef.current.scrollWidth / 2;
    
    // Si el ancho no es válido aún (vistas recién montadas), reintentar en el próximo frame
    if (halfWidth <= 0) {
      requestAnimationFrame(() => {
        if (marqueeRef.current) marqueeRef.current();
      });
      return;
    }

    const currentX = x.get();
    
    // Sincronización de posición para loop infinito
    if (currentX <= -halfWidth) {
      x.set(0);
    } else if (currentX > 0) {
      x.set(-halfWidth);
    }

    const remainingDistance = halfWidth + x.get();
    const speed = 35;
    const duration = remainingDistance / speed;

    try {
      await controls.start({
        x: -halfWidth,
        transition: {
          duration: duration,
          ease: "linear",
        }
      });

      if (viewMode === 'carousel') {
        x.set(0);
        if (marqueeRef.current) marqueeRef.current();
      }
    } catch {
      // Interrupción segura
    }
  }, [controls, x, viewMode]);

  // Actualizar ref para evitar error de declaración previa (Hoisting fix)
  useEffect(() => {
    marqueeRef.current = startMarquee;
  }, [startMarquee]);

  // CONTROL DE FLUJO ATÓMICO: Switch de Vistas + Marquee Trigger
  useEffect(() => {
    if (viewMode === 'carousel') {
      // Solo disparamos si no se está arrastrando manualmente
      if (!isDragging) {
        startMarquee();
      }
    } else {
      // Limpieza total al salir de modo carousel
      x.set(0);
      controls.stop();
    }
    // Eliminamos isHovered de la ecuación para que el slider sea perpetuo
  }, [viewMode, isDragging, startMarquee, x, controls]);

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
          </div>
        </div>

        {/* CONTENT AREA - ALTURA RESPONSIVA (v38.2) */}
        <div className="w-full min-h-[auto] lg:h-[900px]">
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

                  <div className="flex flex-col pt-6 border-t border-white/10 flex-grow overflow-hidden">
                    {/* A. Cabecera de Inteligencia (Fija) */}
                    <div className="flex flex-col flex-none mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-[9px] md:text-[10px] text-amber-500 font-bold tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-sm">
                          [ COMPLETED ]
                        </span>
                        <div className="h-[1px] w-6 bg-white/10 shrink-0" />
                        <span className="font-mono text-[10px] md:text-[11px] font-black text-black bg-amber-500 px-3 py-1 rounded-sm uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.4)] shrink-0">
                          {activeProject.country}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase mb-4">{activeProject.company}</h3>
                      <p className="text-xs md:text-lg text-amber-500/60 font-mono tracking-tight uppercase leading-tight border-b border-white/5 pb-4">{activeProject.title}</p>
                    </div>

                    {/* B. Cuerpo de Inteligencia (Scrollable) */}
                    <div className="flex-grow overflow-y-auto amber-scrollbar pr-2 pb-4 flex flex-col gap-6 relative">
                      <div className="flex-none">
                        <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">{activeProject.clientOverview}</p>
                      </div>
                      <div className="flex flex-wrap items-start content-start gap-2 flex-none">
                        {activeProject.techStack.map((tech: string) => (
                          <span key={tech} className="text-[8px] md:text-[9px] font-bold px-2 py-1 bg-white/5 text-white/50 border border-white/10 uppercase tracking-widest rounded-full">{tech}</span>
                        ))}
                      </div>
                      
                      {/* Gradient Mask for Scroll Integrity */}
                      <div className="sticky bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
                    </div>

                    {/* C. Pie de Acción (Anclado) */}
                    <div className="shrink-0 pt-4 border-t border-white/10 mt-auto">
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
                  ref={carouselRef}
                  className="flex gap-6 md:gap-12 py-8 w-max h-full"
                  style={{ x }}
                  animate={controls}
                  drag="x"
                  onDrag={handleDragWrap}
                  onDragStart={() => {
                    controls.stop();
                    setIsDragging(true);
                  }}
                  onDragEnd={() => {
                    setIsDragging(false);
                  }}
                >
                  {carouselItems.map((project: Collaboration, idx: number) => (
                    <MotionDiv 
                      key={`${project.id}-${idx}`}
                      onViewportLeave={() => setExpandedId(null)}
                      className="w-[85vw] md:w-[1100px] h-[600px] md:h-full flex-shrink-0 flex flex-col md:flex-row bg-[#050505] rounded-xl overflow-hidden border border-white/10 group/poster shadow-2xl relative"
                    >
                      {/* Imagen: Altura fija en móvil, 50% ancho en desktop */}
                      <div className="h-[250px] md:h-full w-full md:w-1/2 shrink-0 relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                        <Image 
                          src={COLLABORATION_IMAGES[project.id]} 
                          alt={project.company} 
                          fill 
                          className="object-cover object-top grayscale sepia-[.7] contrast-125 brightness-75 group-hover/poster:scale-105 transition-all duration-[3s]" 
                        />
                        <div className="absolute inset-0 bg-amber-600/50 mix-blend-multiply shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
                      </div>

                      {/* Contenido: 350px en móvil, h-full en desktop */}
                      <div className="flex flex-col p-6 md:p-12 h-[350px] md:h-full w-full md:w-1/2 bg-black relative">
                        {/* A. Tactical Badge (Golden) */}
                        <div className="flex-none mb-4 md:mb-6">
                          <span className="inline-block font-mono text-[10px] md:text-[11px] font-black text-black bg-amber-500 px-3 py-1 rounded-sm uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                            {project.country}
                          </span>
                        </div>
                        
                        {/* 1. Header Area: Título y Subtítulo (Rigid) */}
                        <div className="flex-none h-[80px] md:h-[180px] flex flex-col justify-center border-b border-white/5 mb-4 md:mb-8">
                          <h3 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-white leading-[0.9] tracking-tighter mb-2 md:mb-4">
                            {project.company}
                          </h3>
                          <p className="font-mono text-amber-500 uppercase tracking-widest text-[10px] md:text-sm">
                            {project.title}
                          </p>
                        </div>

                        {/* 2. Content Area: Overview o Expanded Intel (Flexible) */}
                        <div className="flex-1 overflow-hidden relative">
                          <AnimatePresence mode="wait">
                            {expandedId === project.id ? (
                              <MotionDiv
                                key="expanded-intel"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 480 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="h-[120px] md:h-[480px] overflow-y-auto amber-scrollbar pr-2"
                              >
                                <p className="text-xs md:text-xl text-amber-500/70 leading-relaxed font-mono">
                                  <span className="text-white/20 mr-2 md:block md:mb-4 md:text-xs tracking-[0.3em]">{"//_FULL_REPORT_INITIALIZED:"}</span>
                                  {project.clientOverview}
                                </p>
                              </MotionDiv>
                            ) : (
                              <MotionDiv
                                key="static-intel"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-6 md:gap-12"
                              >
                                <p className="text-xs md:text-lg text-white/40 leading-relaxed line-clamp-4 md:line-clamp-none font-light">
                                  {project.clientOverview}
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-4">
                                  {project.techStack.slice(0, 5).map((t: string) => (
                                    <span key={t} className="text-[7px] md:text-[11px] font-bold px-2 py-1 md:px-4 md:py-2 bg-white/5 border border-white/10 text-white/30 rounded-full uppercase tracking-widest">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </MotionDiv>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 3. Footer Area: Toggles y CTA (Rigid) */}
                        <div className="flex-none h-[60px] md:h-[120px] flex items-center justify-between gap-4 pt-4 border-t border-white/5 mt-4 md:mt-8">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedId(expandedId === project.id ? null : project.id);
                            }}
                            className="text-[9px] md:text-xs font-mono font-bold text-amber-500/60 hover:text-amber-500 transition-colors uppercase tracking-widest flex items-center gap-1 shrink-0"
                          >
                            {expandedId === project.id ? "[ - CLOSE_INTEL ]" : "[ + OPEN_INTEL ]"}
                          </button>
                          
                          <NextLink 
                            href={`/collaborations/${project.id}`}
                            className="inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-3.5 bg-gold-gradient rounded-sm text-black font-bold uppercase text-[9px] md:text-[11px] tracking-[0.3em] shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 transition-all flex-grow md:flex-none justify-center"
                          >
                            <ChevronRight size={16} strokeWidth={3} /> VIEW_DOSSIER
                          </NextLink>
                        </div>
                      </div>
                    </MotionDiv>
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
