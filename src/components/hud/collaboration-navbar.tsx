"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n-client";
import { Terminal, Shield, Cpu, Rocket } from "lucide-react";
import NextLink from "next/link";

/**
 * CollaborationNavbar - Navbar Táctico con Glassmorphism.
 * v1.0 - Transparente en Top 0, Glassmorphism al hacer scroll.
 * Incluye IntersectionObserver para resaltar sección actual y Golden Pulse.
 */
export function CollaborationNavbar() {
  const t = useTranslations();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("synopsis");
  const navRef = useRef<HTMLDivElement>(null);
  
  // Memoization de sections para evitar recrear en cada render
  const sections = useMemo(() => [
    { id: "synopsis", label: t("nav.synopsis"), icon: Terminal },
    { id: "arsenal", label: t("nav.arsenal"), icon: Cpu },
    { id: "deployment", label: t("nav.deployment"), icon: Rocket },
    { id: "feedback", label: t("nav.feedback"), icon: Shield },
  ], [t]);
  
  const scrollY = useMotionValue(0);
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [0, -50]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Intersection Observer para detectar sección activa
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5
        }
      );
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.observe(element);
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);
  
  return (
    <motion.div
      ref={navRef}
      style={{ opacity, y }}
      className="fixed top-4 left-4 right-4 z-50 transition-all duration-700"
    >
      <motion.div
        className={cn(
          "relative backdrop-blur-3xl rounded-md border transition-all duration-700",
          isScrolled
            ? "bg-black/70 border-white/20 border-b-white/10 border-r-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]"
            : "bg-transparent border-transparent border-b-0 border-r-0"
        )}
      >
        <div className="px-4 md:px-8 py-3 bg-black/20">
          <nav className="flex items-center justify-between">
            {/* Left Section - Branding */}
            <div className="flex items-center gap-3 font-mono text-[9px] md:text-[10px] font-black tracking-[0.3em] text-white/50 uppercase">
              <Terminal size={12} className="text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
              <span>
                {isScrolled ? t("hud.verified_by") : ""}filocode_agent
              </span>
            </div>
            
            {/* Center Section - Navigation Links */}
            <div className="flex items-center gap-1 md:gap-2">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                
                return (
                  <NextLink
                    key={section.id}
                    href={`#${section.id}`}
                    className="relative group nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(section.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                  >
                    <motion.div
                      initial={false}
                      animate={isActive ? { scale: 1, x: 0 } : { scale: 0.95, x: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="relative flex items-center gap-2 px-3 md:px-4 py-2 rounded-sm"
                    >
                      {/* Golden Pulse Effect */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-amber-500/20 rounded-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.6, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      
                      <section.icon 
                        size={14} 
                        className={cn(
                          "relative z-10 transition-colors duration-300",
                          isActive ? "text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" : "text-white/40 group-hover:text-white/100"
                        )}
                      />
                      
                      <span
                        className={cn(
                          "font-mono text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-colors duration-300 relative z-10",
                          isActive ? "text-black" : "text-white/60 group-hover:text-white/100"
                        )}
                      >
                        {section.label}
                      </span>
                      
                      {/* Active Indicator Line */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute inset-0 bg-amber-500 rounded-sm -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </NextLink>
                );
              })}
            </div>
          </nav>
        </div>
      </motion.div>
      
      {/* Golden Pulse Overlay - Solo cuando alguna sección está activa */}
      {sections.some((s) => s.id === activeSection) && (
        <motion.div
          className="fixed inset-0 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-amber-500/5 blur-[100px]" />
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * Declaración global para animaciones Golden Pulse
 * Debe ir en un componente separado o en _app.tsx
 */
export const GoldenPulseStyles = () => (
  <style jsx global>{`
    @keyframes golden-pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(245, 158, 11, 0);
      }
    }
    
    .animate-golden-pulse {
      animation: golden-pulse 2s ease-out forwards;
    }
  `}</style>
);
