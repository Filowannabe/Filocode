"use client";

import { GitHubRepository } from "@/types/repositorio";
import { FolderGit2, Star, Eye, ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LinkPreview } from "@/components/hud/link-preview";
import { useTranslations } from "@/lib/i18n-client";
import { formatTechName } from "@/utils/topics";

const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;
const MotionButton = motion.button as any;

interface ProjectCardProps {
  repo: GitHubRepository;
  delay?: number;
  searchQuery?: string;
}

/**
 * ProjectCard PRO-MAX v29.1
 * Consistencia Absoluta de Identidad Técnica.
 */
export function ProjectCard({ repo, delay = 0, searchQuery = '' }: ProjectCardProps) {
  const t = useTranslations();
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
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cn(
        "group relative flex flex-col justify-between h-full min-h-[350px] p-[1px] rounded-lg overflow-hidden",
        "bg-white/[0.03] shadow-2xl cursor-pointer transition-all duration-500",
        "hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(245,158,11,0.1)]"
      )}
    >
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
              title={t("arsenal.view_on_github")}
            >
              <ExternalLink size={18} strokeWidth={2} />
            </a>
          </div>

          <div className="flex-grow flex flex-col justify-start mb-6">
            <h3 className="font-bold text-xl text-white/90 tracking-tight mb-3 group-hover:text-white transition-colors line-clamp-1 uppercase font-mono">
              {highlightText(repo.name, searchQuery)}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-3 font-mono">
              {highlightText(repo.description || t("arsenal.default_description"), searchQuery)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
             {repo.topics.slice(0, 3).map((topic, i) => (
               <MotionSpan 
                 key={topic}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: delay + 0.2 + (i * 0.1) }}
                 className="text-[10px] font-bold px-3 py-1 bg-(--color-primary)/5 text-(--color-primary) border border-(--color-primary)/20 uppercase tracking-widest rounded-full"
               >
                 {formatTechName(topic)}
               </MotionSpan>
             ))}
           </div>

            <div className="mt-6 pt-4">
              {repo.created_at && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-(--color-primary)" />
                  
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
              <div className="flex items-center gap-1.5 text-xs font-bold text-white/60 font-mono">
                <div className="animate-wiggle">
                  <Star size={16} className="text-amber-500/70" />
                </div>
                <span>{repo.stargazers_count}</span>
              </div>
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
              title={isCopied ? "URL copiada" : t("arsenal.copy_url")}
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
            </MotionButton>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
