"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useTranslations } from "@/lib/i18n-client";
import { HudPanel } from "./hud-panel";
import collaborationsData from "@/data/collaborations.json";
import { Star } from "lucide-react";

const MotionDiv = motion.div as any;

/**
 * AuthorizedFeedback - Marquee táctico de reviews globales.
 * v6.1: Eliminadas máscaras de gradiente (sombras laterales).
 */
export function AuthorizedFeedback({ id }: { id?: string }) {
  const t = useTranslations();
  const { collaborations } = collaborationsData as any;
  const [isDragging, setIsDragging] = useState(false);

  const allFeedbacks = collaborations
    .filter((c: any) => c.clientFeedback && c.clientFeedback.length > 0)
    .flatMap((c: any) => (c.clientFeedback || []).map((f: any, idx: number) => ({
      ...f,
      company: c.company,
      projectId: c.id,
      feedbackIndex: idx
    })));

  // Triplicar para asegurar el loop infinito sin saltos
  const displayFeedbacks = [...allFeedbacks, ...allFeedbacks, ...allFeedbacks];

  const controls = useAnimation();
  const x = useMotionValue(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

  const handleDragWrap = useCallback(() => {
    if (!marqueeRef.current || isTest) return;
    const contentWidth = marqueeRef.current.scrollWidth / 3;
    const currentX = x.get();
    
    if (currentX <= -(contentWidth * 2)) {
      x.set(currentX + contentWidth);
    } 
    else if (currentX >= 0) {
      x.set(currentX - contentWidth);
    }
  }, [x, isTest]);

  const startMarquee = useCallback(async () => {
    if (!marqueeRef.current || isTest) return;
    const contentWidth = marqueeRef.current.scrollWidth / 3;
    
    const run = async () => {
      if (isDragging) return;
      
      const currentX = x.get();
      const targetX = -(contentWidth * 2);
      const remaining = Math.abs(targetX - currentX);
      const duration = remaining / 35;

      try {
        await controls.start({
          x: targetX,
          transition: { duration, ease: "linear" }
        });
        x.set(-contentWidth);
        run();
      } catch { /* Interrupción segura */ }
    };

    if (x.get() === 0) x.set(-contentWidth);
    run();
  }, [controls, x, isTest, isDragging]);

  useEffect(() => {
    if (!isDragging) {
      startMarquee();
    } else {
      controls.stop();
    }
  }, [isDragging, startMarquee, controls]);

  return (
    <div className="w-full">
      <HudPanel id={id} title={t("hud.validation_stream")} delay={0.7}>
        <div className="w-full overflow-hidden py-16 relative group cursor-grab active:cursor-grabbing">
          
          {/* Etiquetas HUD */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-amber-200 uppercase tracking-[0.4em] font-black pointer-events-none z-20 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            {t("hud.feedback_channel")}
          </div>

          <MotionDiv
            ref={marqueeRef}
            style={{ x }}
            animate={controls}
            drag="x"
            dragElastic={0.1}
            onDrag={handleDragWrap}
            onDragStart={() => {
              setIsDragging(true);
              controls.stop();
            }}
            onDragEnd={() => {
              setIsDragging(false);
            }}
            className="flex gap-6 md:gap-8 px-8 mt-6 w-max"
          >
            {displayFeedbacks.map((feedback: any, idx: number) => (
              <div
                key={`${feedback.projectId}-${feedback.feedbackIndex}-${idx}`}
                className="flex-none w-[300px] sm:w-[400px] md:w-[500px] flex flex-col p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-xl relative overflow-hidden backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] select-none"
              >
                <div className="absolute top-0 left-0 w-[3px] h-full bg-amber-500/40" />

                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 flex-none pointer-events-none">
                  <div className="flex gap-1 shrink-0">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-500 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] md:text-[10px] font-black text-amber-100 bg-amber-500/20 uppercase tracking-widest border border-amber-500/40 px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] truncate max-w-full">
                    {feedback.company}
                  </span>
                </div>

                <div className="flex-grow pointer-events-none">
                  <blockquote className="text-sm md:text-xl font-serif italic text-white/90 leading-relaxed mb-8">
                    "{t(`projects.${feedback.projectId}.clientFeedback.${feedback.feedbackIndex}.quote`)}"
                  </blockquote>
                </div>

                <cite className="not-italic block border-t border-white/5 pt-4 mt-auto pointer-events-none">
                  <div className="font-mono text-[9px] md:text-[10px] text-amber-200 uppercase tracking-[0.3em] font-black drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                    {"//"} {t(`projects.${feedback.projectId}.clientFeedback.${feedback.feedbackIndex}.reviewer`)}
                  </div>
                </cite>
              </div>
            ))}
          </MotionDiv>

          {/* Máscaras de Gradiente Eliminadas v6.1 */}
        </div>
      </HudPanel>
    </div>
  );
}
