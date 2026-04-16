import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { GitHubRepository } from '../types/repositorio';
import { TopicsProvider, useTopics } from '../contexts/use-topics';

function createMockRepo(id: number, name: string, topics: string[], description: string = ''): GitHubRepository {
  return {
    id,
    name,
    full_name: `user/${name.toLowerCase().replace(/\s+/g, '-')}`,
    description: description || `A ${topics[0]} application`,
    stargazers_count: 10,
    forks_count: 2,
    watchers_count: 0,
    html_url: `https://github.com/user/repo`,
    clone_url: `https://github.com/user/repo.git`,
    topics,
  };
}

describe('useTopics Hook - MULTI SELECT & SEARCH', () => {
  const mockRepos: GitHubRepository[] = [
    createMockRepo(1, 'Alpha React', ['react', 'frontend'], 'UI component library'),
    createMockRepo(2, 'Beta Node', ['node', 'backend'], 'API service'),
    createMockRepo(3, 'Gamma Fullstack', ['react', 'node'], 'Complete solution'),
  ];

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <TopicsProvider repositories={mockRepos}>{children}</TopicsProvider>
  );

  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  it('debe iniciar con filtros vacíos', () => {
    const { result } = renderHook(() => useTopics(), { wrapper });
    expect(result.current.activeTopics).toEqual([]);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredRepos).toHaveLength(3);
  });

  it('debe permitir seleccionar múltiples topics (OR logic)', async () => {
    const { result } = renderHook(() => useTopics(), { wrapper });
    
    await act(async () => {
      result.current.toggleTopic('frontend');
    });
    expect(result.current.filteredRepos).toHaveLength(1);

    await act(async () => {
      result.current.toggleTopic('backend');
    });
    // Alpha (frontend) + Beta (backend) = 2 repos
    expect(result.current.filteredRepos).toHaveLength(2);
  });

  it('debe filtrar por búsqueda de texto tras debounce', async () => {
    const { result } = renderHook(() => useTopics(), { wrapper });
    
    await act(async () => {
      result.current.setSearchQuery('Complete');
    });
    
    // Antes del debounce sigue habiendo 3
    expect(result.current.filteredRepos).toHaveLength(3);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    
    expect(result.current.filteredRepos).toHaveLength(1);
    expect(result.current.filteredRepos[0].id).toBe(3);
  });

  it('debe combinar topics y búsqueda con debounce', async () => {
    const { result } = renderHook(() => useTopics(), { wrapper });
    
    await act(async () => {
      result.current.toggleTopic('react'); // Repos 1 y 3 (Instantáneo)
      result.current.setSearchQuery('UI'); // Repo 1 (Debounced)
    });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    
    expect(result.current.filteredRepos).toHaveLength(1);
    expect(result.current.filteredRepos[0].id).toBe(1);
  });

  it('debe limpiar todos los filtros al llamar clearFilter', async () => {
    const { result } = renderHook(() => useTopics(), { wrapper });
    
    await act(async () => {
      result.current.toggleTopic('react');
      result.current.setSearchQuery('test');
      vi.advanceTimersByTime(300);
      result.current.clearFilter();
    });

    expect(result.current.activeTopics).toEqual([]);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredRepos).toHaveLength(3);
  });
});
