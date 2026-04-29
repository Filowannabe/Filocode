"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n-client";
import { HudPanel } from "./hud-panel";
import { Collaboration } from "@/types/collaboration";
import collaborationsData from "@/data/collaborations.json";
import { COLLABORATION_IMAGES } from "@/data/collaborationImages";
import { ChevronRight, LayoutGrid, GalleryHorizontalEnd } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";
import { ImageLightbox, ExpandIndicator } from "./image-lightbox";

// Mandato React 19: Casting Absoluto
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

/**
 * CollaborationsArchive - Visor Táctico de Colaboraciones.
 * v4.9 - Responsive fix for longer translations (No more cut-offs).
 */
export function CollaborationsArchive() {
  const t = useTranslations();
  const { collaborations } = collaborationsData as any;
  const [viewMode, setViewMode] = useState<'console' | 'carousel'>('console');
  const [activeId, setActiveId] = useState<string>(collaborations[0]?.id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileDragging, setIsMobileDragging] = useState(false);
  
  // Estado para Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<any>(null);

  const activeProject = collaborations.find((c: any) => c.id === activeId);

  // Abrir imagen específica
  const handleOpenLightbox = (id: string) => {
    setLightboxImage(COLLABORATION_IMAGES[id]);
    setLightboxOpen(true);
  };

  // Marquee Carousel Logic
  const controls = useAnimation();
  const x = useMotionValue(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Selector Móvil Marquee Logic
  const mobileX = useMotionValue(0);
  const mobileControls = useAnimation();
  const mobileSelectorRef = useRef<HTMLDivElement>(null);

  // Carousel Infinito: Duplicación para Marquee real
  const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
  const carouselItems = isTest ? collaborations : [...collaborations, ...collaborations];

  // Wrap de Drag Infinito (Carousel)
  const handleDragWrap = useCallback(() => {
    if (!carouselRef.current || isTest) return;
    const halfWidth = carouselRef.current.scrollWidth / 2;
    const currentX = x.get();
    if (currentX <= -halfWidth) x.set(currentX + halfWidth);
    else if (currentX > 0) x.set(currentX - halfWidth);
  }, [x, isTest]);

  // Wrap de Drag Infinito (Selector Móvil)
  const handleMobileDragWrap = useCallback(() => {
    if (!mobileSelectorRef.current || isTest) return;
    const halfWidth = mobileSelectorRef.current.scrollWidth / 2;
    const currentX = mobileX.get();
    if (currentX <= -halfWidth) mobileX.set(currentX + halfWidth);
    else if (currentX > 0) mobileX.set(currentX - halfWidth);
  }, [mobileX, isTest]);

  // Animación Automática Selector Móvil — Patrón ESLint-compliant (función auto-llamable)
  const startMobileMarquee = useCallback(() => {
    let animationTimeoutId: ReturnType<typeof setTimeout> | undefined;
    
    // Función auto-llamable para evitar error ESLint "use before define"
    const self = async () => {
      if (!mobileSelectorRef.current || viewMode !== 'console' || isTest) return;
      const halfWidth = mobileSelectorRef.current.scrollWidth / 2;
      if (halfWidth <= 0) return;

      const currentX = mobileX.get();
      if (currentX <= -halfWidth) mobileX.set(0);
      
      const remainingDistance = halfWidth + mobileX.get();
      const duration = remainingDistance / 25; // Velocidad ajustada

      try {
        await mobileControls.start({
          x: -halfWidth,
          transition: { duration, ease: "linear" }
        });
        if (viewMode === 'console') {
          mobileX.set(0);
          // Función auto-llamable, NO recursión en useCallback
          animationTimeoutId = setTimeout(self, 50);
        }
      } catch { /* Interrupción segura */ }
    };

    animationTimeoutId = setTimeout(self, 50);
    return () => clearTimeout(animationTimeoutId);
  }, [mobileControls, mobileX, viewMode, isTest]);

  // Lógica de Animación Orgánica (Carousel) — Patrón ESLint-compliant
  const startMarquee = useCallback(async () => {
    let animationTimeoutId: ReturnType<typeof setTimeout> | undefined;
    
    // Función auto-llamable para evitar error ESLint "use before define"
    const self = async () => {
      if (!carouselRef.current || viewMode !== 'carousel' || isTest) return;
      const halfWidth = carouselRef.current.scrollWidth / 2;
      if (halfWidth <= 0) {
        return;
      }
      const currentX = x.get();
      if (currentX <= -halfWidth) x.set(0);
      else if (currentX > 0) x.set(-halfWidth);
      const remainingDistance = halfWidth + x.get();
      const speed = 35;
      const duration = remainingDistance / speed;
      try {
        await controls.start({
          x: -halfWidth,
          transition: { duration, ease: "linear" }
        });
        if (viewMode === 'carousel') {
          x.set(0);
          // Función auto-llamable, NO recursión en useCallback
          animationTimeoutId = setTimeout(self, 50);
        }
      } catch { /* Interrupción */ }
    };

    animationTimeoutId = setTimeout(self, 50);
    return () => clearTimeout(animationTimeoutId);
  }, [controls, x, viewMode, isTest]);

  useEffect(() => {
    if (viewMode === 'carousel' && !isTest) {
      if (!isDragging) startMarquee();
    } else if (viewMode === 'console' && !isTest) {
      if (!isMobileDragging) startMobileMarquee();
    } else {
      x.set(0);
      mobileX.set(0);
      controls.stop();
      mobileControls.stop();
    }
  }, [viewMode, isDragging, isMobileDragging, startMarquee, startMobileMarquee, x, mobileX, controls, mobileControls, isTest]);

  return (
    <HudPanel title={t("hud.collaborations_hub_intel_feed")} className="w-full overflow-hidden">

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

      <div className="p-4 md:p-8 lg:p-12 lg:pb-6 flex flex-col gap-8 md:gap-10">
        
        {/* HEADER & TOGGLE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
             <div className="font-mono text-[10px] text-amber-200 uppercase tracking-[0.3em] flex items-center gap-4 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                <div className="w-8 h-[1px] bg-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                {t("hud.authorized_collaborations")}
              </div>
          
          <div className="flex bg-black/50 border border-white/10 rounded-sm p-1 backdrop-blur-md self-end md:self-auto shrink-0">
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
               <GalleryHorizontalEnd size={14} /> {t("viewModes.carousel")}
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
              <LayoutGrid size={14} /> {t("viewModes.console")}
            </MotionButton>
          </div>
        </div>

        {/* CONTENT AREA - ALTURA FLEXIBLE (v4.9) */}
        <div className="w-full min-h-[600px] lg:h-[900px]">
          <AnimatePresence mode="wait">
            {viewMode === 'console' ? (
              <MotionDiv 
                key="console-view"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 h-full"
              >
                <div 
                  className="order-first lg:order-last lg:col-span-7 flex flex-col h-[300px] md:h-[450px] lg:h-full group/img relative cursor-pointer"
                  onClick={() => handleOpenLightbox(activeProject.id)}
                >
                  <div className="relative flex-grow w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                    <ExpandIndicator />
                    <AnimatePresence mode="wait">
                      <MotionDiv 
                        key={activeProject.id}
                        initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full overflow-hidden"
                      >
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
                        <div className="absolute inset-0 bg-amber-600/50 mix-blend-multiply shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none transition-opacity duration-1000 group-hover/img:opacity-80" />
                      </MotionDiv>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col h-full gap-6 lg:gap-8 min-h-0">
                  {/* SELECTOR DE PROYECTOS (DESKTOP) */}
                  <div className="hidden lg:flex flex-col gap-2 overflow-y-auto h-[35%] min-h-[200px] pr-2 amber-scrollbar flex-none">
                    {collaborations.map((project: Collaboration) => (
                      <button
                        key={project.id}
                        onClick={() => setActiveId(project.id)}
                        className={cn(
                          "relative flex flex-col items-start p-3 md:p-4 transition-all duration-300 text-left rounded-sm overflow-hidden cursor-pointer border-l-2 shrink-0 flex-shrink-0",
                          activeId === project.id 
                            ? "bg-amber-500/10 border-amber-500" 
                            : "bg-white/[0.02] border-transparent hover:bg-white/[0.05] hover:border-white/20"
                        )}
                      >
                        <span className={cn(
                          "font-mono text-[8px] md:text-[9px] uppercase tracking-tighter mb-1",
                          activeId === project.id ? "text-amber-500" : "text-white/40"
                        )}>{t("listItems.collaboration")}</span>
                        <span className={cn(
                          "font-bold text-xs md:text-base tracking-tight",
                          activeId === project.id ? "text-white" : "text-white/60"
                        )}>{project.company}</span>
                      </button>
                    ))}
                  </div>

                  {/* SELECTOR DE PROYECTOS INFINITO (MÓVIL) */}
                  <div className="block lg:hidden w-full overflow-hidden relative py-2 flex-none border-b border-white/5 cursor-grab active:cursor-grabbing">
                    <MotionDiv
                      ref={mobileSelectorRef}
                      className="flex gap-4 w-max px-4"
                      style={{ x: mobileX }}
                      animate={mobileControls}
                      drag="x"
                      onDrag={handleMobileDragWrap}
                      onDragStart={() => {
                        mobileControls.stop();
                        setIsMobileDragging(true);
                      }}
                      onDragEnd={() => {
                        setIsMobileDragging(false);
                        startMobileMarquee();
                      }}
                      whileHover={{ animationPlayState: "paused" }}
                      whileTap={{ animationPlayState: "paused" }}
                    >
                      {[...collaborations, ...collaborations].map((project: Collaboration, idx: number) => (
                        <button
                          key={`${project.id}-mobile-${idx}`}
                          onClick={() => {
                            setActiveId(project.id);
                            // No detenemos la animación aquí, permitimos que siga su curso
                          }}
                          className={cn(
                            "relative flex flex-col items-start p-3 transition-all duration-300 text-left min-w-[160px] rounded-sm overflow-hidden cursor-pointer border-l-2 shrink-0",
                            activeId === project.id 
                              ? "bg-amber-500/15 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                              : "bg-white/[0.03] border-transparent hover:bg-white/[0.08]"
                          )}
                        >
                          <span className={cn(
                            "font-mono text-[8px] uppercase tracking-tighter mb-1",
                            activeId === project.id ? "text-amber-500" : "text-white/30"
                          )}>{t("listItems.collaboration")}</span>
                          <span className={cn(
                            "font-bold text-xs tracking-tight",
                            activeId === project.id ? "text-white" : "text-white/60"
                          )}>{project.company}</span>
                        </button>
                      ))}
                    </MotionDiv>
                  </div>

                  {/* BRIEFING DEL PROYECTO (BOTTOM) */}
                  <AnimatePresence mode="wait">
                    <MotionDiv 
                      key={`content-${activeProject.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="flex flex-col pt-6 border-t border-white/10 flex-grow min-h-0 relative overflow-hidden"
                    >
                      <div className="flex flex-col flex-none mb-6">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <span className="font-mono text-[9px] md:text-[10px] text-amber-500 font-bold tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-sm shrink-0">
                             {t("hud.completed")}
                           </span>
                          <div className="h-[1px] w-6 bg-white/20 shrink-0" />
                          <span className="font-mono text-[10px] md:text-[11px] font-black text-black bg-amber-500 px-3 py-1 rounded-sm uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.4)] shrink-0">
                            {activeProject.country}
                          </span>
                          {activeProject.clientFeedback?.[0]?.rating && (
                            <div className="flex items-center gap-1 bg-white/5 border border-amber-500/20 px-2 py-0.5 rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                              <span className="text-[10px] font-black text-amber-500">{activeProject.clientFeedback[0].rating}.0</span>
                              <span className="text-amber-500/80">★</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase mb-4">{activeProject.company}</h3>
                        <p className="text-xs md:text-lg text-amber-500/60 font-mono tracking-tight uppercase leading-tight border-b border-white/5 pb-4">{t(`projects.${activeProject.id}.title`)}</p>
                      </div>

                      <div className="flex-grow overflow-y-auto amber-scrollbar pr-2 pb-4 flex flex-col gap-6 relative">
                        <div className="flex-none">
                          <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">{t(`projects.${activeProject.id}.clientOverview`)}</p>
                        </div>
                        <div className="flex flex-wrap items-start content-start gap-2 flex-none">
                          {activeProject.techStack.map((tech: string) => (
                            <span key={tech} className="text-[8px] md:text-[9px] font-bold px-2.5 py-1 bg-white/5 text-white/50 border border-white/10 uppercase tracking-widest rounded-full whitespace-nowrap transition-all hover:bg-white/10 hover:text-white/80">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="shrink-0 pt-3 border-t border-white/10">
                        <NextLink
                          href={`/collaborations/${activeProject.id}`}
                          className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-gold-gradient rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all hover:scale-105 active:scale-95 group/btn w-full md:w-auto"
                        >
                          <ChevronRight size={16} strokeWidth={3} className="text-black group-hover:translate-x-1 transition-transform" />
                          <span className="font-mono text-[11px] md:text-[12px] font-black text-black uppercase tracking-[0.3em]">{t("actions.view_dossier")}</span>
                        </NextLink>
                      </div>
                    </MotionDiv>
                  </AnimatePresence>
                </div>

              </MotionDiv>
            ) : (
              <MotionDiv 
                key="carousel-view"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="relative w-full overflow-hidden h-full group/carousel cursor-grab active:cursor-grabbing"
              >
                <MotionDiv 
                  ref={carouselRef}
                  className="flex gap-6 md:gap-12 py-8 w-max h-full"
                  style={{ x }}
                  animate={controls}
                  drag={isTest ? false : "x"}
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
                      className="w-[85vw] md:w-[1100px] h-[820px] md:h-full flex-shrink-0 flex flex-col md:flex-row bg-[#050505] rounded-xl overflow-hidden border border-white/10 group/poster shadow-2xl relative"
                    >
                      <div 
                        className="h-[280px] md:h-full w-full md:w-1/2 shrink-0 relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10 cursor-zoom-in"
                        onClick={() => handleOpenLightbox(project.id)}
                      >
                        <ExpandIndicator />
                        <Image 
                          src={COLLABORATION_IMAGES[project.id]} 
                          alt={project.company} 
                          fill 
                          className="object-cover object-top grayscale sepia-[.7] contrast-125 brightness-75 group-hover/poster:scale-105 transition-all duration-[3s]" 
                        />
                        <div className="absolute inset-0 bg-amber-600/50 mix-blend-multiply shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
                      </div>

                      <div className="flex flex-col p-6 md:p-12 flex-grow w-full md:w-1/2 bg-black relative">
                        <div className="flex-none mb-4 md:mb-6 flex items-center gap-3 flex-wrap">
                          <span className="font-mono text-[9px] md:text-[10px] text-amber-500 font-bold tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-sm shrink-0">
                             {t("hud.completed")}
                           </span>
                          <div className="h-[1px] w-6 bg-white/20 shrink-0" />
                          <span className="inline-block font-mono text-[10px] md:text-[11px] font-black text-black bg-amber-500 px-3 py-1 rounded-sm uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.4)] shrink-0">
                            {project.country}
                          </span>
                          {project.clientFeedback?.[0]?.rating && (
                            <div className="flex items-center gap-1 bg-white/5 border border-amber-500/20 px-2 py-1 rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.1)] shrink-0">
                              <span className="text-[10px] font-black text-amber-500">{project.clientFeedback[0].rating}.0</span>
                              <span className="text-amber-500/80 text-[10px]">★</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-none h-[100px] md:h-[180px] flex flex-col justify-center border-b border-white/5 mb-2 md:mb-8 py-2 md:py-4">
                          <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-white leading-[0.9] tracking-tighter mb-1 md:mb-4">
                            {project.company}
                          </h3>
                          <div className="flex items-center gap-3">
                            <p className="font-mono text-amber-500 uppercase tracking-widest text-[9px] md:text-sm">
                              {t(`projects.${project.id}.title`)}
                            </p>
                            <span className="text-[8px] md:text-[10px] text-white/40 font-mono border-l border-white/10 pl-3">
                              {project.duration}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 relative overflow-hidden">
                          <AnimatePresence mode="wait">
                            {expandedId === project.id ? (
                              <MotionDiv
                                key="expanded-intel"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "100%" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="h-full overflow-y-auto amber-scrollbar pr-2"
                              >
                                <p className="text-xs md:text-xl text-amber-500/70 leading-relaxed font-mono">
                                  <span className="text-white/20 mr-2 md:block md:mb-4 md:text-xs tracking-[0.3em]">{t("labels._full_report_initialized")}</span>
                                  {t(`projects.${project.id}.clientOverview`)}
                                </p>
                              </MotionDiv>
                            ) : (
                              <MotionDiv
                                key="static-intel"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-4 md:gap-12"
                              >
                                <p className="text-xs md:text-lg text-white/40 leading-relaxed line-clamp-4 md:line-clamp-6 lg:line-clamp-none font-light">
                                  {t(`projects.${project.id}.clientOverview`)}
                                </p>
                                <div className="flex flex-wrap gap-2 md:gap-4 pb-4">
                                  {project.techStack.slice(0, 5).map((t: string) => (
                                    <span key={t} className="text-[8px] sm:text-[9px] md:text-[11px] font-bold px-2.5 py-1 md:px-4 md:py-2 bg-white/5 border border-white/10 text-white/40 rounded-full uppercase tracking-widest whitespace-nowrap transition-all hover:bg-white/10 hover:text-white/70">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </MotionDiv>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="flex-none min-h-[80px] md:min-h-[120px] flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 mt-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedId(expandedId === project.id ? null : project.id);
                            }}
                            className="text-[10px] md:text-xs font-mono font-bold text-amber-500/60 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] flex items-center gap-1 shrink-0"
                          >
                            {expandedId === project.id ? t("hud.close_intel") : t("hud.open_intel")}
                          </button>
                          
                          <NextLink 
                            href={`/collaborations/${project.id}`}
                            className="inline-flex items-center gap-2 px-6 py-4 md:px-7 md:py-3.5 bg-gold-gradient rounded-sm text-black font-bold uppercase text-[10px] md:text-[11px] tracking-[0.1em] sm:tracking-[0.3em] shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 transition-all w-full sm:w-auto justify-center"
                          >
                            <ChevronRight size={16} strokeWidth={3} /> {t("actions.view_dossier")}
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

      {/* MODAL DE IMAGEN FULLSCREEN */}
      <ImageLightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        src={lightboxImage} 
        alt="Collaboration Preview" 
      />
    </HudPanel>
  );
}
