'use client';

import { useState, useEffect } from 'react';
import { getTopRepos } from '@/lib/github';
import { ProjectGallery } from '@/components/hud/project-gallery';
import { useTopics } from '@/contexts/use-topics';
import { FilterBar } from '@/components/hud/filter-bar';
import { GitHubRepository } from '@/types/repositorio';
import { TopicsProvider } from '@/contexts/use-topics';
import { GallerySkeleton } from '@/components/hud/project-skeleton';

/**
 * ProjectSection - Orquestador de arsenal.
 * v21: Restaurado estado de carga con GallerySkeleton (UX Premium).
 */
export function ProjectSection() {
  const [initialRepos, setInitialRepos] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchRepos = async () => {
      const repos = await getTopRepos();
      setInitialRepos(repos);
      setIsLoading(false);
    };
    
    fetchRepos();
  }, []);
  
  if (isLoading || initialRepos.length === 0) {
    return <GallerySkeleton />;
  }

  return (
    <TopicsProvider repositories={initialRepos}>
      <ProjectSectionContent initialReposCount={initialRepos.length} />
    </TopicsProvider>
  );
}

function ProjectSectionContent({ initialReposCount }: { initialReposCount: number }) {
  const { availableTopics, activeTopic, filteredRepos, setActiveTopic } = useTopics();

  return (
    <div className="relative">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-6 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
          Open Source <span className="text-primary">Arsenal</span>
        </h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl">
          Mi compromiso con la comunidad tecnológica y la ingeniería de software. Aquí puedes auditar la arquitectura, 
          calidad de código e impacto (estrellas y visualizaciones) de mis <strong>{initialReposCount}</strong> proyectos, 
          sincronizados dinámicamente con GitHub.
        </p>
      </div>
      
      <div className="mb-8">
        <FilterBar 
          availableTopics={availableTopics}
          activeTopic={activeTopic}
          onTopicChange={setActiveTopic}
          theme={{
            bg: 'bg-amber-500', // Agregado bg- prefix para clases de Tailwind
            text: 'text-black',
            activeBg: 'bg-amber-500',
            activeText: 'text-black',
            border: 'border-amber-500'
          }}
        />
      </div>
      
      <ProjectGallery initialRepos={filteredRepos} />
    </div>
  );
}
