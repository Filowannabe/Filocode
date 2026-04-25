"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import collaborationsData from "@/data/collaborations.json";
import { Collaboration } from "@/types/collaboration";
import { HudPanel } from "./hud-panel";

const MotionDiv = motion.div as any;

/**
 * AuthorizedFeedback - Marquee táctico de reviews globales.
 * v3.1 - Restaurado Estándar Mac Window para el Footer Base.
 */
export function AuthorizedFeedback() {
  const { collaborations } = collaborationsData as any;
  
  const allFeedbacks = collaborations
    .filter((c: Collaboration) => c.clientFeedback && c.clientFeedback.length > 0)
    .flatMap((c: Collaboration) => (c.clientFeedback || []).map(f => ({
      ...f,
      company: c.company,
      projectId: c.id
    })));

  // Triplicar para asegurar un loop infinito sin cortes visuales
  const displayFeedbacks = [...allFeedbacks, ...allFeedbacks, ...allFeedbacks];

  return (
    <div className="w-full">
      <HudPanel title="SYSTEM_VALIDATION // GLOBAL_FEEDBACK_STREAM" delay={0.7}>
        <div className="w-full overflow-hidden py-16 relative group">
          {/* High-Visibility Intelligence Label - Mac Window Style */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-amber-200 uppercase tracking-[0.4em] font-black pointer-events-none z-20 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            AUTHORIZED_FEEDBACK_STREAM // ENCRYPTED_CHANNEL
          </div>

          <MotionDiv 
            className="flex gap-8 px-8 mt-6"
            animate={{ x: [0, -3000] }}
            transition={{ 
              duration: 90, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {displayFeedbacks.map((feedback, idx) => (
              <div 
                key={`${feedback.projectId}-${idx}`}
                className="flex-none w-[350px] md:w-[500px] p-8 bg-white/[0.03] border border-white/10 rounded-xl relative overflow-hidden backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
              >
                {/* Tactical Side Accent */}
                <div className="absolute top-0 left-0 w-[3px] h-full bg-amber-500/40" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-500 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-black text-amber-100 bg-amber-500/20 uppercase tracking-widest border border-amber-500/40 px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    {feedback.company}
                  </span>
                </div>

                <blockquote className="text-base md:text-xl font-serif italic text-white/90 leading-relaxed mb-8">
                  "{feedback.quote}"
                </blockquote>

                <cite className="not-italic block border-t border-white/5 pt-4">
                  <div className="font-mono text-[10px] text-amber-200 uppercase tracking-[0.3em] font-black drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                    {"//"} {feedback.reviewer}
                  </div>
                </cite>
              </div>
            ))}
          </MotionDiv>
          
          {/* Internal Gradient Masks for Seamless Edge Transition */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />
        </div>
      </HudPanel>
    </div>
  );
}
