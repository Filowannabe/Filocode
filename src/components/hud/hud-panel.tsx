"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div as any;

interface HudPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * HudPanel - Primitiva de interfaz HUD.
 * v23: Restaurado uso directo de motion para asegurar animaciones vivas.
 */
export function HudPanel({ children, className, delay = 0 }: HudPanelProps) {
  return (
    <MotionDiv
      
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: "easeOut" 
      }}
      className={cn(
        "relative overflow-hidden rounded-sm border border-white/5 bg-black/40 backdrop-blur-md transition-all duration-300",
        "hover:border-(--color-primary)/50 hover:bg-black/60",
        className
      )}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </MotionDiv>
  );
}
