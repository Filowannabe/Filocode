'use client';

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { normalizeTopic, getUniqueTopics, filterReposByTopics } from '@/utils/topics';
import { GitHubRepository } from '@/types/repositorio';

interface TopicsContextType {
  activeTopic: string | null;
  setActiveTopic: (topic: string | null) => void;
  toggleTopic: (topic: string) => void;
  availableTopics: string[];
  filteredRepos: GitHubRepository[];
  isFiltered: boolean;
  clearFilter: () => void;
}

const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

interface TopicsProviderProps {
  children: React.ReactNode;
  repositories: GitHubRepository[];
}

/**
 * TopicsProvider - Gestión de estado de arsenal.
 * Corregido para evitar warnings de persistencia y cierres de tipos.
 */
export function TopicsProvider({ children, repositories }: TopicsProviderProps) {
  const allTopics = useMemo(() => getUniqueTopics(repositories), [repositories]);

  const [activeTopic, setActiveTopicState] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = window.localStorage.getItem('activeTopic');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      return typeof parsed === 'string' ? parsed : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (activeTopic === null) {
        localStorage.removeItem('activeTopic');
      } else {
        localStorage.setItem('activeTopic', JSON.stringify(activeTopic));
      }
    } catch (error) {
      console.warn('Persistence error:', error);
    }
  }, [activeTopic]);

  const setActiveTopic = useCallback((topic: string | null) => {
    setActiveTopicState(topic);
  }, []);

  const clearFilter = useCallback(() => {
    setActiveTopicState(null);
    if (typeof window !== 'undefined') {
      try { localStorage.removeItem('activeTopic'); } catch { /* ignore */ }
    }
  }, []);

  const toggleTopic = useCallback((topic: string) => {
    setActiveTopicState(prev => {
      const normalizedTopic = normalizeTopic(topic);
      return prev === normalizedTopic ? null : normalizedTopic;
    });
  }, []);

  const filteredRepos = useMemo(() => {
    return filterReposByTopics(repositories, activeTopic === null ? [] : [activeTopic]);
  }, [repositories, activeTopic]);

  const isFiltered = useMemo(() => activeTopic !== null, [activeTopic]);

  return (
    <TopicsContext.Provider
      value={{
        activeTopic,
        setActiveTopic,
        toggleTopic,
        availableTopics: allTopics,
        filteredRepos,
        isFiltered,
        clearFilter
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
}

export function useTopics(): TopicsContextType {
  const context = useContext(TopicsContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicsProvider');
  }
  return context;
}
