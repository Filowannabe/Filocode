"use client";

import { GitHubRepository } from "@/types/repositorio";
import { FolderGit2, Star, Eye, ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LinkPreview } from "@/components/hud/link-preview";
// Timeline eliminado - integrado como badge simple directamente

const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;
const MotionButton = motion.button as any;

interface ProjectCardProps {
  repo: GitHubRepository;
  delay?: number;
  searchQuery?: string;
}

/**
 * ProjectCard PRO-MAX v29 (Highlight Ready)
 * RESOLUCIÓN FINAL: Se añade motor de resaltado de texto para búsquedas.
 */
export function ProjectCard({ repo, delay = 0, searchQuery = '' }: ProjectCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(repo.clone_url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <span key={i} className="bg-(--color-primary)/30 text-white font-bold px-0.5 rounded-sm">{part}</span> 
            : part
        )}
      </>
    );
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col justify-between h-full min-h-[300px] p-[1px] rounded-2xl overflow-hidden",
        "bg-(--color-primary)/10 shadow-2xl cursor-pointer",
        "transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(251,191,36,0.2)]"
      )}
    >
      {/* ... (borde animado y glow interior iguales) ... */}
      <div
        className="absolute -inset-[100%] z-0 w-[300%] h-[300%] origin-center opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
        style={{
          background: "conic-gradient(from 0deg, transparent 60%, var(--color-primary) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full bg-[#020202] rounded-[15px] p-7">
        
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-(--color-primary) rounded-full blur-[60px] pointer-events-none animate-glow-pulse" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-(--color-primary)/10 border border-(--color-primary)/20 text-(--color-primary) shadow-[0_0_15px_rgba(251,191,36,0.1)] group-hover:bg-(--color-primary)/20 group-hover:scale-110 transition-all duration-300 shrink-0 animate-icon-levitate">
              <FolderGit2 size={24} strokeWidth={1.5} />
            </div>
            
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-(--color-primary)/70 hover:bg-(--color-primary) hover:text-black transition-all duration-300 shadow-sm shrink-0 border border-white/5 hover:border-transparent"
              title="Ver en GitHub"
            >
              <ExternalLink size={18} strokeWidth={2} />
            </a>
          </div>

          <div className="flex-grow flex flex-col justify-start mb-6">
            <h3 className="font-bold text-xl text-white/90 tracking-tight mb-3 group-hover:text-white transition-colors line-clamp-1 uppercase font-mono">
              {highlightText(repo.name, searchQuery)}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-3 font-mono">
              {highlightText(repo.description || "Explora la arquitectura técnica y el código fuente de este nodo directamente en GitHub.", searchQuery)}
            </p>
          </div>
          {/* ... resto del componente igual ... */}

          <div className="flex flex-wrap gap-2 mb-6">
             {repo.topics.slice(0, 3).map((topic, i) => (
               <MotionSpan 
                 key={topic}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: delay + 0.2 + (i * 0.1) }}
                 className="text-[10px] font-bold px-3 py-1 bg-(--color-primary)/5 text-(--color-primary) border border-(--color-primary)/20 uppercase tracking-widest rounded-full"
               >
                 {topic}
               </MotionSpan>
             ))}
           </div>

           {/* Metadatos del Sistema: Fechas y Enlaces */}
            <div className="mt-6 pt-4">
              {repo.created_at && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-2"
                >
                  {/* Nodo ámbar simple - sin líneas */}
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                  
                  {/* Texto con fecha completa para claridad */}
                  <span className="text-[10px] text-white/40 font-mono uppercase">
                    [ {new Date(repo.created_at).toLocaleString("es-ES", { month: "short", day: "2-digit", year: "numeric" })} ]
                  </span>
                </motion.div>
              )}
              {repo.homepage && (
                <div className="mt-3">
                  <LinkPreview url={repo.homepage} />
                </div>
              )}
            </div>

           <div className="flex items-center justify-between pt-5 border-t border-white/10 group-hover:border-(--color-primary)/30 transition-colors duration-500">
            <div className="flex items-center gap-5">
              {/* Star Icon con Wiggle CSS - SIN MOTION PARA EVITAR CONGELAMIENTO */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-white/60 font-mono">
                <div className="animate-wiggle">
                  <Star size={16} className="text-amber-500/70" />
                </div>
                <span>{repo.stargazers_count}</span>
              </div>
              {/* Eye Icon con Pulse CSS - SIN MOTION PARA EVITAR CONGELAMIENTO */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-white/60 font-mono">
                <div className="animate-soft-pulse">
                  <Eye size={16} className="text-cyan-500/70" />
                </div>
                <span>{repo.watchers_count}</span>
              </div>
            </div>

            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClone}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 border",
                isCopied 
                  ? "bg-green-500/20 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                  : "bg-black text-(--color-primary) border-(--color-primary)/20 hover:bg-(--color-primary) hover:text-black"
              )}
              title={isCopied ? "URL copiada" : "Copiar URL (git clone)"}
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
            </MotionButton>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
