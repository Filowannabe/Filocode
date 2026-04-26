"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n-client";

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
export function SkillsPanel({ className }: SkillsPanelProps) {
  const t = useTranslations();

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="space-y-4">
        <h3 className="text-[11px] font-black font-mono tracking-[0.4em] text-amber-500 uppercase flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          {t("hud.skills_core")}
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {CORE_SKILLS.map((skill) => (
            <div 
              key={skill}
              className="border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-[10px] font-black font-mono text-amber-500 uppercase tracking-widest flex items-center justify-between group cursor-default hover:bg-amber-500/10 transition-all"
            >
              <span>{skill}</span>
              <span className="text-[8px] opacity-30">{t("hud.skills_active")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black font-mono tracking-[0.3em] text-amber-200 uppercase drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
          {t("hud.skills_sub")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {OTHER_SKILLS.map((skill) => (
            <span 
              key={skill}
              className="border border-white/5 bg-white/[0.02] px-3 py-1.5 text-[9px] font-mono text-white/50 hover:text-white hover:border-white/20 transition-all cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}