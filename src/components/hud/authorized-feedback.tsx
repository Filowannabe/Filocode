"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import collaborationsData from "@/data/collaborations.json";
import { Collaboration } from "@/types/collaboration";

const MotionDiv = motion.div as any;

/**
 * AuthorizedFeedback - Marquee táctico de reviews globales.
 * v1.0 - Sincronizado con estética Golden Sun.
 */
export function AuthorizedFeedback() {
  const { collaborations } = collaborationsData as any;
  
  // Extraer todos los feedbacks válidos
  const allFeedbacks = collaborations
    .filter((c: Collaboration) => c.clientFeedback && c.clientFeedback.length > 0)
    .flatMap((c: Collaboration) => c.clientFeedback.map(f => ({
      ...f,
      company: c.company,
      projectId: c.id
    })));

  // Duplicar para loop infinito suave
  const displayFeedbacks = [...allFeedbacks, ...allFeedbacks];

  return (
    <div className="w-full overflow-hidden py-12 border-y border-white/5 bg-white/[0.01] relative group">
      {/* Ambient Background Label */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[8px] text-amber-500/20 uppercase tracking-[0.5em] pointer-events-none">
        AUTHORIZED_FEEDBACK_STREAM // ENCRYPTED_CHANNEL
      </div>

      <MotionDiv 
        className="flex gap-8 px-4"
        animate={{ x: [0, -2000] }}
        transition={{ 
          duration: 60, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {displayFeedbacks.map((feedback, idx) => (
          <div 
            key={`${feedback.projectId}-${idx}`}
            className="flex-none w-[350px] md:w-[450px] p-6 bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden"
          >
            {/* Tactical Accent */}
            <div className="absolute top-0 left-0 w-[2px] h-full bg-amber-500/20" />
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-0.5">
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-500 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                ))}
              </div>
              <span className="font-mono text-[9px] text-amber-500/40 uppercase tracking-widest border border-amber-500/20 px-1.5 py-0.5 rounded-xs">
                {feedback.company}
              </span>
            </div>

            <blockquote className="text-sm md:text-base font-serif italic text-white/80 leading-relaxed mb-4 line-clamp-3">
              "{feedback.quote}"
            </blockquote>

            <cite className="not-italic block">
              <div className="font-mono text-[9px] text-amber-200 uppercase tracking-widest font-black drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                {"//"} {feedback.reviewer}
              </div>
            </cite>
          </div>
        ))}
      </MotionDiv>
      
      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}
