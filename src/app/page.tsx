"use client";

import { StatsBar } from "@/components/hud/stats-bar";
import { SkillsPanel } from "@/components/hud/skills-panel";
import { ProjectSection } from "@/components/hud/project-section";
import { TopicsProvider } from "@/contexts/use-topics";
import { HudPanel } from "@/components/hud/hud-panel";
import { TerminalContact } from "@/components/hud/terminal-contact";
import { FileDown } from "lucide-react";
import Image from "next/image";
import avatarImg from "../../public/images/avatar.jpg";

/**
 * Home Page - Client Component.
 * Arquitectura de Ventanas Flotantes de Alta Fidelidad (v28).
 */
export default function Home() {
  const scrollToProjects = () => {
    const section = document.getElementById('repos-section');
    if (section) {
      const yOffset = -100; 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <TopicsProvider repositories={[]}>
      <main className="px-4 sm:px-6 md:px-16 max-w-[1800px] mx-auto min-h-screen relative z-10 flex flex-col gap-16">
        
        {/* ROW 1: CORE COMPOSITION - SPACE-BETWEEN FEEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-stretch">
          
          {/* LEFT AREA: MAIN ARCHITECTURE STATEMENT */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-12 py-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-20 bg-amber-500 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
                <span className="font-mono text-[12px] font-black tracking-[0.6em] text-amber-500/90 uppercase">
                  System_Status: Operational
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.8] uppercase">
                ARQUITECTURA Y <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-200 to-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">DESARROLLO</span> <br />
                DE SOFTWARE <span className="text-white/10 italic">SENIOR</span>
              </h1>
            </div>

            <div className="flex flex-wrap gap-8 pt-8">
              <button 
                onClick={scrollToProjects}
                className="relative group px-12 py-5 overflow-hidden rounded-md transition-all duration-500 active:scale-95 shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gold-gradient animate-shine bg-[length:200%_100%]" />
                <span className="relative font-mono text-[14px] font-black text-black uppercase tracking-[0.25em] flex items-center gap-3">
                  EXPLORAR_PROYECTOS [0x26]
                </span>
              </button>
              
              <button className="font-mono text-[12px] font-bold text-white/40 hover:text-amber-400 border border-white/5 hover:border-amber-500/30 px-10 py-5 transition-all uppercase tracking-widest bg-white/[0.03] rounded-md cursor-pointer">
                Contact_Protocol
              </button>
            </div>
          </div>

          {/* RIGHT AREA: FLOATING WIDGETS STACK */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* WINDOW: AVATAR */}
            <HudPanel title="AVATAR" className="p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10" delay={0.2}>
              <div className="relative shrink-0 group">
                <div className="absolute inset-[-15%] bg-amber-500/30 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                  <Image 
                    src={avatarImg} 
                    alt="Filocode" 
                    fill 
                    className="object-cover sepia-[0.6] brightness-125 contrast-110 saturate-[1.2] hover:sepia-0 hover:saturate-100 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-amber-500/10 mix-blend-color pointer-events-none" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black text-[9px] font-black px-2 py-1 tracking-tighter uppercase">
                  VERIFIED
                </div>
              </div>
              <div className="space-y-3 text-center sm:text-left w-full">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic leading-none text-white/90">FILOCODE</h2>
                <div className="font-mono text-[10px] text-amber-500/70 uppercase tracking-[0.2em] flex flex-col gap-2">
                  <span>[XP: 05_YEARS]</span>
                  <span>[RANK: SENIOR]</span>
                  <span className="text-green-500 animate-flicker">[SYSTEM: ONLINE]</span>
                </div>

                {/* DOSSIER DOWNLOAD BUTTON (v28 HUD) */}
                <div className="pt-3">
                  <a 
                    href="documents/Felipe_Castro_CV_2025.pdf"
                    download="Felipe_Castro_CV_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-gold-gradient rounded-sm animate-shine bg-[length:200%_100%] shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all hover:scale-105 active:scale-95 group w-full cursor-pointer"
                  >
                    <FileDown size={16} className="text-black group-hover:translate-y-0.5 transition-transform" />
                    <span className="font-mono text-[10px] font-black text-black uppercase tracking-[0.2em]">
                      DOWNLOAD_DOSSIER [PDF]
                    </span>
                  </a>
                </div>
              </div>
            </HudPanel>

            {/* WINDOW: CODE 1 */}
            <HudPanel title="CODE 1" className="p-8 flex-1 min-h-[220px]" delay={0.3}>
              <div className="font-mono text-[11px] space-y-4">
                <div className="flex items-center gap-3 text-white/20">
                  <span className="text-amber-500/40 w-4">01</span>
                  <span className="text-amber-500">import</span> <span className="text-white/60">{"{ Architect }"}</span> <span>from</span> <span className="text-amber-200/40">'core-engine'</span>
                </div>
                <div className="flex items-center gap-3 text-white/20">
                  <span className="text-amber-500/40 w-4">02</span>
                  <span className="text-amber-500">const</span> <span>skills</span> <span className="text-amber-500">=</span> <span className="text-white/60">["React 19", "Next.js 16"]</span>
                </div>
                <div className="flex items-center gap-3 text-white/20 pl-8">
                  <span className="text-amber-500/40 w-4">03</span>
                  <span className="text-amber-500">mastery</span> <span>=</span> <span className="text-green-500">'MAXIMUM'</span>
                </div>
              </div>
              
              <div className="mt-12 flex justify-between items-end border-t border-white/5 pt-6 opacity-40">
                <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">
                  BUFFER_SYNCING...
                </div>
                <div className="w-10 h-10 rounded-full border border-dashed border-amber-500/30 animate-spin-slow flex items-center justify-center">
                   <div className="w-2 h-2 bg-amber-500 rounded-full" />
                </div>
              </div>
            </HudPanel>
          </div>
        </div>

        {/* ROW 2: TELEMETRY & SKILL TREE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* WINDOW: SKILL TREE */}
          <HudPanel title="SKILL TREE" className="lg:col-span-5 p-8" delay={0.4}>
             <SkillsPanel />
          </HudPanel>

          {/* WINDOW: GITHUB / TELEMETRY */}
          <HudPanel title="GITHUB_TELEMETRY" className="lg:col-span-7 p-8" delay={0.5}>
             <StatsBar />
             <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                  DATA_STREAM_ACTIVE // 32_NODES_DETECTOR
                </div>
                <TerminalContact />
             </div>
          </HudPanel>
        </div>

        {/* ROW 3: PROJECT ARSENAL (THE BIG WINDOW) */}
        <HudPanel title="PROJECT_ARSENAL_STATION" className="w-full mt-4 p-8 md:p-16" delay={0.6}>
          <ProjectSection />
        </HudPanel>

        {/* FOOTER */}
        <footer className="mt-20 border-t border-white/5 pt-12 pb-16">
          <div className="flex justify-between items-center font-mono text-[12px] font-black tracking-[0.5em] text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] uppercase">
            <span>[ © 2026 // FILOCODE ]</span>
            <span className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">[ESTADO: OPERACIONAL_ESTABLE]</span>
          </div>
        </footer>
      </main>
    </TopicsProvider>
  );
}
