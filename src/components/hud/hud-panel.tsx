"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div as any;

interface HudPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  title?: string;
}

/**
 * HudPanel - Primitiva de interfaz HUD.
 * v28: Compact Window Mode. Glassmorphism extremo y Brackets tácticos.
 */
export function HudPanel({ children, className, delay = 0, title = "SYSTEM_PROCESS" }: HudPanelProps) {
  return (
    <MotionDiv
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
        "border border-white/10 border-b-white/5 border-r-white/5",
        "shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]",
        "group",
        className
      )}
    >
      {/* WINDOW HEADER (Refined) */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
        <div className="font-mono text-[9px] font-black tracking-[0.3em] text-white/30 uppercase">
          {title}
        </div>
        <div className="w-8 h-[1px] bg-amber-500/30" />
      </div>

      {/* TACTICAL LIGHT HIT */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* SUBTLE SCANLINE */}
      <div className="absolute inset-0 top-8 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-5" />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </MotionDiv>
  );
}
