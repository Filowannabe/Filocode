"use client";

import dynamic from "next/dynamic";
import { TopicsProvider } from "@/contexts/use-topics";
import { HudPanel } from "@/components/hud/hud-panel";
import { FileDown, Target, Layout, Database, Activity, User, MessageSquare } from "lucide-react";
import Image from "next/image";
import avatarImg from "../../public/images/avatar.jpg";
import { useTranslations } from "@/lib/i18n-client";
import { TacticalNavbar } from "@/components/hud/tactical-navbar";
import { GlowLine } from "@/components/ui/glow-line";
import { useState } from "react";

// P1: Dynamic Injection (Performance Overdrive v7.0)
const StatsBar = dynamic(() => import("@/components/hud/stats-bar").then(mod => mod.StatsBar), { ssr: false });
const SkillsPanel = dynamic(() => import("@/components/hud/skills-panel").then(mod => mod.SkillsPanel), { ssr: false });
const ProjectSection = dynamic(() => import("@/components/hud/project-section").then(mod => mod.ProjectSection), { ssr: false });
const CollaborationsArchive = dynamic(() => import("@/components/hud/collaborations-archive").then(mod => mod.CollaborationsArchive), { ssr: false });
const AuthorizedFeedback = dynamic(() => import("@/components/hud/authorized-feedback").then(mod => mod.AuthorizedFeedback), { ssr: false });
const TerminalContact = dynamic(() => import("@/components/hud/terminal-contact").then(mod => mod.TerminalContact), { ssr: false });
const ContactModal = dynamic(() => import("@/components/hud/contact-modal").then(mod => mod.ContactModal), { ssr: false });

/**
 * Home Page - Client Component.
 * v7.0: Performance Overdrive - Lazy Loading & CSS Containment.
 */
export default function Home() {
  const t = useTranslations();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const homeNavItems = [
    { id: "identity", label: t("IDENTITY"), icon: User },
    { id: "skills", label: t("SKILLS"), icon: Layout },
    { id: "telemetry", label: t("TELEMETRY"), icon: Activity },
    { id: "collaborations", label: t("COLLABORATIONS"), icon: Target },
    { id: "projects", label: t("OPEN_SOURCE"), icon: Database },
    { id: "feedback", label: t("FEEDBACK"), icon: MessageSquare },
  ];

  const scrollToCollaborations = () => {
    const element = document.getElementById('collaborations');
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <TopicsProvider repositories={[]}>
      <main id="top" className="px-4 sm:px-6 md:px-16 max-w-[1920px] mx-auto min-h-screen relative z-10 flex flex-col gap-16 pt-24 sm:pt-32 pb-32">
        
        <TacticalNavbar 
          returnLabel={t("TOP_PROTOCOL")} 
          items={homeNavItems} 
        />

        {/* SECTION: IDENTITY - P2: Containment */}
        <section className="scroll-mt-32 [content-visibility:auto] [contain-intrinsic-size:800px]">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-stretch">
            <div className="xl:col-span-8 flex flex-col justify-center space-y-12 py-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <GlowLine width="w-20" />
                  <span className="font-mono text-[12px] font-black tracking-[0.5em] text-amber-200 uppercase drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                    {t("hud.status")}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter leading-[0.8] uppercase">
                  {t("hero.title_architecture")} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-200 to-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">{t("hero.title_development")}</span> <br />
                  {t("hero.title_software")} <span className="text-white/10 italic">{t("hero.title_senior")}</span>
                </h1>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-8 pt-8">
                <button 
                  onClick={scrollToCollaborations}
                  className="relative group px-8 sm:px-12 py-4 sm:py-5 overflow-hidden rounded-md transition-all duration-500 active:scale-95 shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gold-gradient animate-gold-shine" />
                  <span className="relative font-mono text-[12px] sm:text-[14px] font-black text-black uppercase tracking-[0.25em] flex items-center gap-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    {t("hero.explore_collaborations")}
                  </span>
                </button>
                
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="font-mono text-[10px] sm:text-[12px] font-black text-amber-200 border-2 border-amber-500/40 hover:border-amber-400 hover:text-white px-8 sm:px-10 py-4 sm:py-[18px] transition-all uppercase tracking-[0.25em] bg-white/[0.03] rounded-md cursor-pointer text-center shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                >
                  {t("hero.contact_protocol")}
                </button>
              </div>
            </div>

            <div className="xl:col-span-4 flex flex-col gap-8">
              <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
              <HudPanel id="identity" title={t("hud.avatar")} delay={0.2}>
                <div className="p-6 sm:p-10 flex flex-col items-center sm:items-start gap-6 sm:gap-10">
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full">
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
                        {t("hud.verified")}
                      </div>
                    </div>
                    <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                        FILOCODE
                      </h2>
                      <p className="text-[8px] sm:text-[9px] font-normal tracking-wider text-amber-200/60 uppercase truncate">
                        {t("hud.by")}
                      </p>
                      <div className="font-mono text-[10px] text-amber-200 uppercase tracking-[0.2em] flex flex-col gap-2 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                        <span>[{t("hud.xp")}]</span>
                        <span>[{t("hud.rank")}]</span>
                        <span className="text-green-400 animate-flicker">[{t("hud.system_online")}]</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <a 
                      href="documents/Felipe_Castro_CV_2025.pdf"
                      download="Felipe_Castro_CV_2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-gold-gradient rounded-sm shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all hover:scale-105 active:scale-95 group w-full cursor-pointer"
                    >
                      <FileDown size={16} className="text-black group-hover:translate-y-0.5 transition-transform" />
                      <span className="font-mono text-[10px] font-black text-black uppercase tracking-[0.2em]">
                        {t("hud.download_dossier")}
                      </span>
                    </a>
                  </div>
                </div>
              </HudPanel>


              <HudPanel activeId="identity" title={t("hud.code_example")} className="flex-1 min-h-[220px]" delay={0.3}>
                <div className="p-4 sm:p-8">
                  <div className="font-mono text-[10px] sm:text-[11px] space-y-3 sm:space-y-4 overflow-hidden">
                    <div className="flex items-start gap-3 text-white/20">
                      <span className="text-amber-500/40 w-4 shrink-0">01</span>
                      <div className="flex flex-wrap gap-x-2">
                        <span className="text-amber-500">import</span> <span className="text-white/60">{"{ Master_Architect }"}</span> <span>from</span> <span className="text-amber-200/40">'core-engine'</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-white/20">
                      <span className="text-amber-500/40 w-4 shrink-0">02</span>
                      <div className="flex flex-wrap gap-x-2">
                        <span className="text-amber-500">const</span> <span>skills</span> <span className="text-amber-500">=</span> <span className="text-white/60">["React 19", "Next.js 16", "TypeScript", "Tailwind 4", "Framer 12"]</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-white/20">
                      <span className="text-amber-500/40 w-4 shrink-0">03</span>
                      <div className="flex flex-wrap gap-x-2 pl-0 sm:pl-8">
                        <span className="text-amber-500">mastery</span> <span>=</span> <span className="text-green-500">'MAXIMUM'</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 sm:mt-12 flex justify-between items-end border-t border-white/5 pt-4 sm:pt-6 opacity-40">
                    <div className="text-[9px] sm:text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">
                      {t("hud.buffer_syncing")}
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-dashed border-amber-500/30 animate-spin-slow flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-2 h-2 bg-amber-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </HudPanel>
            </div>
          </div>
        </section>

        {/* SECTION: SKILLS & TELEMETRY - P2: Containment */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start content-visibility-auto contain-intrinsic-size-[600px]">
          <section className="xl:col-span-5 scroll-mt-32">
            <HudPanel id="skills" activeId="telemetry" title={t("hud.skill_tree")} delay={0.4}>
              <div className="p-8">
                <SkillsPanel />
              </div>
            </HudPanel>
          </section>

          <section className="xl:col-span-7 scroll-mt-32">
            <HudPanel id="telemetry" activeId="skills" title={t("hud.github_telemetry")} delay={0.5}>
              <div className="p-8">
                <StatsBar />
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="font-mono text-[10px] text-amber-200 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                      {t("hud.data_stream")}
                    </div>
                    <TerminalContact />
                </div>
              </div>
            </HudPanel>
          </section>
        </div>

        {/* SECTION: COLLABORATIONS - P2: Containment */}
        <section className="scroll-mt-32 content-visibility-auto contain-intrinsic-size-[900px]">
          <CollaborationsArchive id="collaborations" />
        </section>

        {/* SECTION: PROJECTS - P2: Containment */}
        <section className="scroll-mt-32 [content-visibility:auto] [contain-intrinsic-size:1200px]">
          <HudPanel id="projects" title={t("arsenal.station_title")} className="w-full mt-4" delay={0.6}>
            <div className="p-8 md:p-16">
              <ProjectSection />
            </div>
          </HudPanel>
        </section>

        {/* SECTION: FEEDBACK - P2: Containment */}
        <footer className="mt-12 space-y-12 content-visibility-auto contain-intrinsic-size-[500px]">
          <AuthorizedFeedback id="feedback" />
          <div className="flex justify-between items-center font-mono text-[12px] font-black tracking-[0.5em] text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] uppercase pb-16">
            <span>[ {t("hud.copyright")} ]</span>
            <span className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">[{t("hud.state_operational")}]</span>
          </div>
        </footer>
      </main>
    </TopicsProvider>
  );
}
