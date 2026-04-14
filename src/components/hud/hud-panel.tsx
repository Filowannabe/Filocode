"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * HudPanel - Primitiva de interfaz HUD/Bento brutalista.
 * Enfoque: Backdrop blur de cristal oscuro con bordes reactivos.
 * Habilita orquestación en cascada mediante el prop delay.
 */
export function HudPanel({ children, className, delay = 0 }: HudPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: "easeOut" 
      }}
      className={cn(
        "relative overflow-hidden rounded-sm border border-white/5 bg-black/40 backdrop-blur-md transition-all duration-300",
        "hover:border-[var(--color-primary)]/50 hover:bg-black/60",
        className
      )}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
