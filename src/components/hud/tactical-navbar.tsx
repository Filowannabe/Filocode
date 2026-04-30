"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Activity } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GlowLine } from "@/components/ui/glow-line";
import { useNavStore } from "@/store/use-nav-store";
import { LanguageSwitcher } from "./language-switcher";

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

interface TacticalNavbarProps {
  returnLabel: string;
  items: NavItem[];
}

const MotionDiv = motion.div as any;

/**
 * TacticalNavbar - Controlador de Navegación HUD.
 * v6.5: Amber Scrollbar y Switcher Minimalista.
 */
export function TacticalNavbar({ returnLabel, items }: TacticalNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/Filocode/";
  
  const activeSection = useNavStore((state) => state.activeSection);
  const setActiveSection = useNavStore((state) => state.setActiveSection);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const isManualScrolling = useRef(false);

  // 1. SENSOR DE EXTREMOS
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (scrollY < 100 && items.length > 0) {
        setActiveSection(items[0].id);
        return;
      }

      const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom && items.length > 0) {
        setActiveSection(items[items.length - 1].id);
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, setActiveSection]);

  // 2. MOTOR DE SELECCIÓN (Closest to Focal Point)
  useEffect(() => {
    const scanLoop = () => {
      if (isManualScrolling.current) return;
      if (window.scrollY < 100) return;

      const focalPoint = window.innerHeight * 0.35;
      let foundId = "";
      let minDistance = Infinity;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = (rect.top <= focalPoint && rect.bottom >= focalPoint)
            ? 0
            : Math.min(Math.abs(rect.top - focalPoint), Math.abs(rect.bottom - focalPoint));

          if (distance < minDistance) {
            minDistance = distance;
            foundId = item.id;
          }
        }
      }

      if (foundId && foundId !== activeSection) {
        setActiveSection(foundId);
      }
    };

    window.addEventListener("scroll", scanLoop, { passive: true });
    return () => window.removeEventListener("scroll", scanLoop);
  }, [items, activeSection, setActiveSection]);

  // 3. AUTO-CENTRADO MOBILE
  useEffect(() => {
    if (activeSection && itemsRef.current[activeSection]) {
      const timeout = setTimeout(() => {
        itemsRef.current[activeSection]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [activeSection]);

  // 4. NAVEGACIÓN FLUIDA
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isManualScrolling.current = true;
      setActiveSection(id);
      const offset = 110; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      setTimeout(() => { isManualScrolling.current = false; }, 800);
    }
  };

  const handleBack = () => {
    if (isHome) { window.scrollTo({ top: 0, behavior: "smooth" }); }
    else { router.back(); }
  };

  return (
    <header 
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-3 md:py-4 px-2 md:px-16",
        isScrolled 
          ? "bg-black/60 backdrop-blur-3xl border-b border-white/5 shadow-2xl" 
          : "bg-transparent"
      )}
    >
      {/* RESTAURACIÓN DE AMBER SCROLLBAR EN NAV */}
      <style jsx global>{`
        .amber-nav-scroll::-webkit-scrollbar {
          height: 3px !important;
          display: block !important;
        }
        .amber-nav-scroll::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .amber-nav-scroll::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.2) !important;
          border-radius: 10px !important;
        }
        .amber-nav-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.5) !important;
        }
        .amber-nav-scroll {
          scrollbar-width: thin !important;
          scrollbar-color: rgba(245, 158, 11, 0.2) transparent !important;
        }
      `}</style>

      <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        
        {/* LADO IZQUIERDO: RETORNO + SWITCHER (Sutil) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button 
            onClick={handleBack}
            className="font-mono text-[9px] font-black tracking-[0.1em] sm:tracking-[0.2em] hover:text-amber-400 transition-colors flex items-center gap-1 group text-amber-200 cursor-pointer p-2"
          >
            <ArrowLeft size={18} className={cn("transition-transform", isHome ? "rotate-90 group-hover:-translate-y-1" : "group-hover:-translate-x-1")} />
            <span className="hidden sm:inline uppercase">{returnLabel}</span>
          </button>
          
          <LanguageSwitcher />
        </div>

        {/* CENTRO: NAVEGACIÓN TÁCTICA */}
        <div className="flex-grow flex items-center overflow-hidden">
          <nav className="flex items-center gap-1 sm:gap-4 overflow-x-auto amber-nav-scroll py-2 -my-2 flex-grow justify-start md:justify-center px-2 md:px-0">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  ref={(el) => { itemsRef.current[item.id] = el; }}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative px-3 md:px-4 py-2 flex items-center gap-2 font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer",
                    isActive ? "text-amber-500 scale-105" : "text-white/30 hover:text-white/60"
                  )}
                >
                  {isActive && (
                    <MotionDiv
                      layoutId="tactical-nav-active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-amber-500/20 border border-amber-500/60 rounded-sm -z-10 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                    />
                  )}
                  
                  <Icon size={12} className={cn("transition-colors", isActive ? "text-amber-500" : "text-white/20")} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* LADO DERECHO: SCAN INDICATOR */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-[9px] font-black tracking-[0.3em] text-amber-200 uppercase shrink-0 opacity-40">
          <Activity size={12} className="animate-pulse" />
          <span>HUD_SYNC_ACTIVE</span>
          <GlowLine width="w-8" className="ml-2" />
        </div>
      </div>
    </header>
  );
}
