'use client';

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { normalizeTopic, getUniqueTopics, filterRepos } from '@/utils/topics';
import { GitHubRepository } from '@/types/repositorio';

interface TopicsContextType {
  activeTopics: string[];
  setActiveTopics: (topics: string[]) => void;
  toggleTopic: (topic: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
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
 * v2.2: Corrección Crítica - Topics Reales de GitHub únicamente.
 */
export function TopicsProvider({ children, repositories }: TopicsProviderProps) {
  // 01. Extraer ÚNICAMENTE topics reales de GitHub
  const allTopics = useMemo(() => getUniqueTopics(repositories), [repositories]);

  const [activeTopics, setActiveTopicsState] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem('activeTopics');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem('searchQuery') || '';
  });

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('activeTopics', JSON.stringify(activeTopics));
      localStorage.setItem('searchQuery', searchQuery);
    } catch (error) {
      console.warn('Persistence error:', error);
    }
  }, [activeTopics, searchQuery]);

  const setActiveTopics = useCallback((topics: string[]) => {
    setActiveTopicsState(topics);
  }, []);

  const clearFilter = useCallback(() => {
    setActiveTopicsState([]);
    setSearchQuery('');
    if (typeof window !== 'undefined') {
      try { 
        localStorage.removeItem('activeTopics');
        localStorage.removeItem('searchQuery');
      } catch { /* ignore */ }
    }
  }, []);

  const toggleTopic = useCallback((topic: string) => {
    const normalized = normalizeTopic(topic);
    setActiveTopicsState(prev => 
      prev.includes(normalized)
        ? prev.filter(t => t !== normalized)
        : [...prev, normalized]
    );
  }, []);

  const filteredRepos = useMemo(() => {
    return filterRepos(repositories, activeTopics, debouncedSearchQuery);
  }, [repositories, activeTopics, debouncedSearchQuery]);

  const isFiltered = useMemo(() => 
    activeTopics.length > 0 || searchQuery.length > 0, 
  [activeTopics, searchQuery]);

  return (
    <TopicsContext.Provider
      value={{
        activeTopics,
        setActiveTopics,
        toggleTopic,
        searchQuery,
        setSearchQuery,
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
