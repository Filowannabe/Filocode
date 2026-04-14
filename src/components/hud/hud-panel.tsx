"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * HudPanel - Contenedor base para la estética HUD/Bento.
 * Incluye backdrop-blur, bordes sutiles y transiciones de hover.
 */
export function HudPanel({ children, className, delay = 0 }: HudPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.005 }}
      className={cn(
        "group relative overflow-hidden rounded-sm border border-white/5 bg-black/40 p-4 backdrop-blur-md transition-all duration-300",
        "hover:bg-black/60 hover:border-[var(--color-primary)]/50 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.1)]",
        className
      )}
    >
      {/* Glow sutil en la esquina superior izquierda al hacer hover */}
      <div className="absolute -left-16 -top-16 size-32 rounded-full bg-[var(--color-primary)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
