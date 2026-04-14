import { GitHubRepo } from "@/lib/github";
import { HudPanel } from "./hud-panel";
import { FolderGit2, Star } from "lucide-react";

interface ProjectCardProps {
  repo: GitHubRepo;
  delay?: number;
}

/**
 * ProjectCard - Server Component que renderiza la información de un repositorio.
 * Mejorado con atributos de accesibilidad y estados de foco visibles.
 */
export function ProjectCard({ repo, delay }: ProjectCardProps) {
  return (
    <HudPanel 
      className="group flex h-full flex-col justify-between p-5 transition-colors hover:border-[var(--color-primary)]/50 cursor-pointer"
      delay={delay}
    >
      <div className="space-y-3">
        {/* Header: Icono + Link externo con accesibilidad mejorada */}
        <div className="flex items-start gap-3">
          <FolderGit2 
            size={18} 
            className="mt-1 shrink-0 text-[var(--color-primary)]/60 group-hover:text-[var(--color-primary)] transition-colors" 
            aria-hidden="true"
          />
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver repositorio ${repo.name} en GitHub`}
            className="block font-bold text-lg tracking-tight transition-colors group-hover:text-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:outline-none"
          >
            {repo.name}
          </a>
        </div>

        {/* Descripción truncada a 2 líneas */}
        <p className="line-clamp-2 text-sm leading-relaxed text-white/60">
          {repo.description ?? "Sin descripción."}
        </p>
      </div>

      {/* Footer: Stats Monospace con iconografía Lucide */}
      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[10px] text-white/40 uppercase">
        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-[var(--color-primary)] opacity-40" aria-hidden="true" />
          <span>{repo.language ?? "N/A"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star size={12} className="text-[var(--color-primary)]/80" aria-hidden="true" />
          <span>{repo.stargazers_count}</span>
        </div>
      </div>
    </HudPanel>
  );
}
