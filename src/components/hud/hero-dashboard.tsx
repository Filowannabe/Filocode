"use client";

import { HudPanel } from "./hud-panel";
import { TerminalContact } from "./terminal-contact";
import { cn } from "@/lib/utils";

interface HeroDashboardProps {
  className?: string;
  delay?: number;
}

/**
 * HeroDashboard - El núcleo de identidad visual.
 * Corregido para Tailwind 4: 'primary' shorthand.
 */
export function HeroDashboard({ className, delay }: HeroDashboardProps) {
  return (
    <HudPanel 
      className={cn("flex flex-col justify-between p-6 md:p-8 h-full", className)}
      delay={delay}
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-6xl font-bold tracking-tight md:text-7xl">
            FILOCODE
          </h1>
          <p className="text-xs font-medium tracking-widest text-primary/80 uppercase">
            Senior Software Engineer | 5 Years Experience
          </p>
        </div>

        <div className="mt-2 border-t border-white/10 pt-4 font-mono text-xs text-white/40">
          <span className="mr-4">[CLASS: FULLSTACK]</span>
          <span className="mr-4">[WEAPON: NODE.JS]</span>
          <span>[MASTERY: NEXT.JS]</span>
        </div>
      </div>

      <div className="mt-8">
        <TerminalContact />
      </div>
    </HudPanel>
  );
}
