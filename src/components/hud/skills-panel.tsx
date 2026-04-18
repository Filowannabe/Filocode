"use client";

import { HudPanel } from "./hud-panel";
import { cn } from "@/lib/utils";

interface SkillsPanelProps {
  className?: string;
  delay?: number;
}

const CORE_SKILLS = ["Node.js", "TypeScript"];
const OTHER_SKILLS = ["Next.js", "Docker", "PostgreSQL", "React", "TailwindCSS"];

/**
 * SkillsPanel - Listado de capacidades.
 * v10: primary shorthand, grow, cero arbitrary vars.
 */
export function SkillsPanel({ className, delay }: SkillsPanelProps) {
  return (
    <HudPanel className={cn("flex flex-col h-full p-4", className)} delay={delay}>
      <h3 className="text-[10px] font-mono tracking-widest text-primary uppercase mb-4">
        {">"} CORE_MODULES
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {CORE_SKILLS.map((skill) => (
          <span 
            key={skill}
            className="border border-primary/30 bg-primary/5 px-2 py-1 text-xs font-mono text-primary font-bold"
          >
            {skill}
          </span>
        ))}
        
        {OTHER_SKILLS.map((skill) => (
          <span 
            key={skill}
            className="border border-white/10 bg-white/5 px-2 py-1 text-xs font-mono text-white/70"
          >
            {skill}
          </span>
        ))}
      </div>
    </HudPanel>
  );
}
