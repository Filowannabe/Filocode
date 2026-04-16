"use client";

import { GitHubRepository } from "@/types/repositorio";
import { FolderGit2, Star, Eye, ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  repo: GitHubRepository;
  delay?: number;
}

/**
 * ProjectCard PRO-MAX v6 (Fidelidad de Diseño)
 * Restaura el redondeado suave (rounded-2xl) aprobado por el Lead Architect.
 * Mantiene el contraste extremo (#020202) y la animación de bordes Aceternity.
 */
export function ProjectCard({ repo, delay = 0 }: ProjectCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(repo.clone_url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const randomOffset = (repo.id % 5) * 0.5;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col justify-between h-full min-h-[300px] p-[1px] rounded-2xl overflow-hidden",
        "bg-(--color-primary)/10 shadow-2xl cursor-pointer",
        "transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(251,191,36,0.2)]"
      )}
    >
      {/* EL BORDE ANIMADO PERMANENTE (Aceternity UI effect) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[100%] z-0 w-[300%] h-[300%] origin-center opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "conic-gradient(from 0deg, transparent 60%, var(--color-primary) 100%)",
        }}
      />

      {/* CONTENIDO INTERIOR (Restaurado rounded-[15px] y Negro Profundo) */}
      <div className="relative z-10 flex flex-col justify-between h-full bg-[#020202] rounded-[15px] p-7">
        
        {/* Glow de fondo interior respirando */}
        <motion.div 
          animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.1, 1] }}
          transition={{ duration: 4 + randomOffset, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-48 h-48 bg-(--color-primary) rounded-full blur-[60px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header: Icono Levitante y Enlace Externo */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3 + randomOffset, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-(--color-primary)/10 border border-(--color-primary)/20 text-(--color-primary) shadow-[0_0_15px_rgba(251,191,36,0.1)] group-hover:bg-(--color-primary)/20 group-hover:scale-110 transition-all duration-300 shrink-0"
            >
              <FolderGit2 size={24} strokeWidth={1.5} />
            </motion.div>
            
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

          {/* Título y Descripción */}
          <div className="flex-grow flex flex-col justify-start mb-6">
            <h3 className="font-bold text-xl text-white/90 tracking-tight mb-3 group-hover:text-white transition-colors line-clamp-1 uppercase font-mono">
              {repo.name}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-3 font-mono">
              {repo.description || "Explora la arquitectura técnica y el código fuente de este nodo directamente en GitHub."}
            </p>
          </div>

          {/* Topics / Tags (Premium Pills) */}
          <div className="flex flex-wrap gap-2 mb-6">
            {repo.topics.slice(0, 3).map((topic, i) => (
              <motion.span 
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.2 + (i * 0.1) }}
                className="text-[10px] font-bold px-3 py-1 bg-(--color-primary)/5 text-(--color-primary) border border-(--color-primary)/20 uppercase tracking-widest rounded-full"
              >
                {topic}
              </motion.span>
            ))}
          </div>

          {/* Footer: KPIs y Clone Action */}
          <div className="flex items-center justify-between pt-5 border-t border-white/10 group-hover:border-(--color-primary)/30 transition-colors duration-500">
            <div className="flex items-center gap-5">
              {/* Stars */}
              <a 
                href={`${repo.html_url}/stargazers`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-amber-400 transition-colors group/star font-mono"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: randomOffset }}
                >
                  <Star size={16} className="text-amber-500/70 group-hover/star:fill-amber-500/50 transition-all" />
                </motion.div>
                <span>{repo.stargazers_count}</span>
              </a>
              {/* Watchers */}
              <a 
                href={`${repo.html_url}/watchers`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-cyan-400 transition-colors group/eye font-mono"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: randomOffset }}
                >
                  <Eye size={16} className="text-cyan-500/70 group-hover/eye:fill-cyan-500/50 transition-all" />
                </motion.div>
                <span>{repo.watchers_count}</span>
              </a>
            </div>

            {/* Clone Button */}
            <motion.button
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
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
