"use client";

import { HudPanel } from "./hud-panel";
import { TerminalContact } from "./terminal-contact";
import { cn } from "@/lib/utils";
import Image from "next/image";
import avatarImg from "../../../public/images/avatar.jpg";

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
      className={cn("flex flex-col justify-between p-6 md:p-10 h-full min-h-[400px]", className)}
      delay={delay}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        {/* Avatar Cinematic Container */}
        <div className="flex-shrink-0 self-center lg:self-start">
          <div className="relative group">
            {/* Cinematic Outer Glow */}
            <div className="absolute inset-[-10%] bg-amber-500/30 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-sm overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <Image
                src={avatarImg}
                alt="Avatar"
                fill
                className="object-cover grayscale-[0.1] brightness-110 contrast-110 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
              
              {/* TECHNICAL OVERLAYS */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent mix-blend-overlay" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px] pointer-events-none" />
              
              {/* Border Inner Highlight */}
              <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none" />
            </div>
            
            {/* HUD Technical Frames */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500/60" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500/60" />
            
            {/* ID Tag */}
            <div className="absolute top-2 right-2 bg-amber-500 text-[8px] font-black text-black px-1 py-0.5 tracking-tighter uppercase">
              ID: 0xFD-26
            </div>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <h1 className="text-6xl font-black tracking-tighter md:text-8xl bg-gradient-to-b from-white via-white to-amber-500/20 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.15)]">
              FILOCODE
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-gradient-to-r from-amber-500/80 to-transparent" />
              <p className="text-[11px] font-bold tracking-[0.4em] text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)] uppercase">
                Senior Software Engineer | 5 Years Experience
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[10px] text-white/30 tracking-widest uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              [CLASS: FULLSTACK]
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              [WEAPON: NODE.JS]
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              [MASTERY: NEXT.JS]
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-0">
        <TerminalContact />
      </div>
    </HudPanel>
  );
}
