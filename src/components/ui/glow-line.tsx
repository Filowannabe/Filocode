"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowLineProps {
  className?: string;
  width?: string;
  vertical?: boolean;
  delay?: number;
}

const MotionDiv = motion.div as any;

/**
 * GlowLine - Línea táctica de alta intensidad reactiva al scroll.
 * v2.0: Brillo reforzado y pulsación vibrante.
 */
export function GlowLine({ className, width = "w-10", vertical = false, delay = 0 }: GlowLineProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-full", width, vertical ? "h-full w-[1px]" : "h-[1px]", className)}>
      {/* Capa de Brillo Dinámico (Glow Overdrive) */}
      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ 
          opacity: [0.4, 1, 0.4],
          scale: [0.98, 1.05, 0.98],
          filter: [
            "drop-shadow(0 0 5px rgba(245,158,11,0.5))",
            "drop-shadow(0 0 15px rgba(245,158,11,1))",
            "drop-shadow(0 0 5px rgba(245,158,11,0.5))"
          ]
        }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay 
        }}
        className={cn(
          "absolute inset-0 bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,1)]",
          vertical ? "h-full w-full" : "w-full h-full"
        )}
      />
      {/* Capa de Base Táctica */}
      <div className={cn("absolute inset-0 bg-amber-500/30", vertical ? "h-full w-full" : "w-full h-full")} />
    </div>
  );
}
