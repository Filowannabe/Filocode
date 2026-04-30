"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavStore } from "@/store/use-nav-store";

const MotionDiv = motion.div as any;

interface HudPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  title?: string;
  id?: string;
  activeId?: string; // Brillo por herencia de sección
}

/**
 * HudPanel - Primitiva de interfaz HUD.
 * v7.0: Atomic Selector Shielding & React.memo.
 */
export const HudPanel = memo(function HudPanel({ 
  children, 
  className, 
  delay = 0, 
  title = "SYSTEM_PROCESS", 
  id, 
  activeId 
}: HudPanelProps) {
  // P3: Atomic Selector - Solo re-renderiza si isActive cambia de valor
  const isActive = useNavStore((state) => 
    (id && state.activeSection === id) || (activeId && state.activeSection === activeId)
  );

  return (
    <MotionDiv
      id={id}
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={cn(
        "relative overflow-hidden rounded-md transition-all duration-700",
        "bg-[rgba(5,5,5,0.45)] backdrop-blur-3xl",
        "border transition-colors duration-500",
        isActive ? "border-amber-500/30" : "border-white/10",
        "border-b-white/5 border-r-white/5",
        "shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]",
        "group",
        className
      )}
    >
      {/* WINDOW HEADER: Grid protegido contra colisión de texto largo */}
      <div className={cn(
        "grid grid-cols-[1fr_auto] items-center gap-2 sm:gap-4 px-4 py-2.5 transition-colors duration-500",
        isActive ? "bg-amber-500/10" : "bg-white/[0.03]",
        "border-b border-white/5"
      )}>
        <div className={cn(
          "font-mono text-[9px] sm:text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.25em] transition-all duration-500 uppercase truncate",
          isActive ? "text-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,1)]" : "text-white/20"
        )}>
          {title}
        </div>
        
        {/* INDICADOR TÉCNICO: Ultra-Glow Sync */}
        <div 
          className={cn(
            "w-10 sm:w-12 h-[2px] transition-all duration-700 rounded-full shrink-0",
            isActive 
              ? "bg-amber-100 shadow-[0_0_35px_rgba(245,158,11,1),0_0_15px_rgba(251,191,36,0.8)] opacity-100 scale-x-110 sm:scale-x-125" 
              : "bg-white/10 opacity-30 scale-x-100"
          )}
        />
      </div>

      {/* TACTICAL LIGHT HIT */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-opacity duration-1000",
        isActive ? "opacity-100" : "opacity-0"
      )} />

      {/* SCANLINE EFFECT */}
      <div className="absolute inset-0 top-8 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-5" />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </MotionDiv>
  );
});
