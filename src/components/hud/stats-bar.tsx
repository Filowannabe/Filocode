"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n-client";

interface StatsBarProps {
  className?: string;
  delay?: number;
}

/**
 * StatsBar - Fila de métricas.
 * Corregido para Tailwind 4: 'primary' shorthand.
 */
export function StatsBar({ className }: StatsBarProps) {
  const t = useTranslations();

  const STATS = [
    { label: t("hud.stats_exp"), value: "5+" },
    { label: t("hud.stats_projects"), value: "12" },
    { label: t("hud.stats_mentoring"), value: "200+" },
    { label: t("hud.stats_commits"), value: "1.2k" },
  ];

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-6", className)}>
      {STATS.map((stat) => (
        <div 
          key={stat.label} 
          className="p-4 text-center group border border-white/5 bg-white/[0.02] rounded-lg transition-all hover:bg-white/[0.05] hover:border-amber-500/20"
        >
          <div className="flex flex-col">
            <span className="text-3xl font-black text-amber-500 drop-shadow-neon tracking-tighter">
              {stat.value}
            </span>
            <span className="text-[9px] font-black font-mono tracking-[0.2em] text-white/30 uppercase mt-1">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}