'use client';

import { useState, useEffect } from 'react';
import { getTopRepos } from '@/lib/github';
import { ProjectGallery } from '@/components/hud/project-gallery';
import { useTopics } from '@/contexts/use-topics';
import { FilterBar } from '@/components/hud/filter-bar';
import { GitHubRepository } from '@/types/repositorio';
import { TopicsProvider } from '@/contexts/use-topics';
import { GallerySkeleton } from '@/components/hud/project-skeleton';
import { useTranslations } from '@/lib/i18n-client';

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
  const t = useTranslations();
  const { 
    availableTopics, 
    activeTopics, 
    searchQuery,
    filteredRepos, 
    toggleTopic,
    setSearchQuery,
    clearFilter
  } = useTopics();

  return (
    <div className="relative">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-6 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
          {t("arsenal.title_open_source")} <span className="text-primary">{t("arsenal.title_arsenal")}</span>
        </h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl">
          {t("arsenal.description", { count: initialReposCount })}
        </p>
      </div>
      
      <div className="mb-8">
        <FilterBar 
          availableTopics={availableTopics}
          activeTopics={activeTopics}
          searchQuery={searchQuery}
          onTopicToggle={toggleTopic}
          onSearchChange={setSearchQuery}
          onClear={clearFilter}
          filteredCount={filteredRepos.length}
          totalCount={initialReposCount}
        />
      </div>
      
      <ProjectGallery 
        initialRepos={filteredRepos} 
        searchQuery={searchQuery}
      />
    </div>
  );
}
