import { GitHubRepo } from "@/lib/github";
import { HudPanel } from "./hud-panel";
import { FolderGit2, Star } from "lucide-react";

interface ProjectCardProps {
  repo: GitHubRepo;
}

/**
 * ProjectCard - Server Component que renderiza la información de un repositorio.
 * Estética HUD con iconografía de Lucide para mayor cohesión visual.
 */
export function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <HudPanel className="group flex h-full flex-col justify-between p-5 transition-colors hover:border-[var(--color-primary)]/50 cursor-pointer">
      <div className="space-y-3">
        {/* Header: Icono + Link externo con hover dinámico */}
        <div className="flex items-start gap-3">
          <FolderGit2 size={18} className="mt-1 shrink-0 text-[var(--color-primary)]/60 group-hover:text-[var(--color-primary)] transition-colors" />
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-bold text-lg tracking-tight transition-colors group-hover:text-[var(--color-primary)]"
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
          <div className="size-1.5 rounded-full bg-[var(--color-primary)] opacity-40" />
          <span>{repo.language ?? "N/A"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star size={12} className="text-[var(--color-primary)]/80" />
          <span>{repo.stargazers_count}</span>
        </div>
      </div>
    </HudPanel>
  );
}
