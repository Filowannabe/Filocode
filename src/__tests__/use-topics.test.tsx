import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { GitHubRepository } from '../types/repositorio';
import { TopicsProvider, useTopics } from '../contexts/use-topics';

function createMockRepo(id: number, name: string, topics: string[]): GitHubRepository {
  return {
    id,
    name,
    full_name: `user/${name.toLowerCase().replace(/\s+/g, '-')}`,
    description: `A ${topics[0]} application`,
    stargazers_count: Math.floor(Math.random() * 1000),
    forks_count: Math.floor(Math.random() * 100),
    watchers_count: 0,
    html_url: `https://github.com/user/${name.toLowerCase().replace(/\s+/g, '-')}`,
    clone_url: `https://github.com/user/${name.toLowerCase().replace(/\s+/g, '-')}.git`,
    topics,
  };
}

describe('useTopics Hook - SINGLE SELECT', () => {
  it('debe iniciar con ALL (null) como estado por defecto', () => {
    const mockRepos: GitHubRepository[] = [
      createMockRepo(1, 'React App', ['react', 'ts']),
      createMockRepo(2, 'Node App', ['node', 'ts']),
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TopicsProvider repositories={mockRepos}>{children}</TopicsProvider>
    );

    const { result } = renderHook(() => useTopics(), { wrapper });

    expect(result.current.activeTopic).toBeNull();
  });

  it('debe retornar todos los repos si activeTopic es null (ALL)', () => {
    const mockRepos: GitHubRepository[] = [
      createMockRepo(1, 'React App', ['react', 'ts']),
      createMockRepo(2, 'Node App', ['node', 'ts']),
      createMockRepo(3, 'Vue App', ['vue', 'ts']),
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TopicsProvider repositories={mockRepos}>{children}</TopicsProvider>
    );

    const { result } = renderHook(() => useTopics(), { wrapper });

    expect(result.current.activeTopic).toBeNull();
    expect(result.current.filteredRepos).toHaveLength(3);
  });

  it('debe filtrar solo repos con el topic seleccionado (SINGLE SELECT)', () => {
    const mockRepos: GitHubRepository[] = [
      createMockRepo(1, 'React + TS', ['react', 'ts']),
      createMockRepo(2, 'Node + TS', ['node', 'ts']),
      createMockRepo(3, 'React + Node', ['react', 'node']),
      createMockRepo(4, 'Solo TS', ['ts']),
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TopicsProvider repositories={mockRepos}>{children}</TopicsProvider>
    );

    const { result } = renderHook(() => useTopics(), { wrapper });

    expect(result.current.filteredRepos).toHaveLength(4);
  });

  it('debe persistir el filtro activo en localStorage', async () => {
    const mockRepos: GitHubRepository[] = [
      createMockRepo(1, 'React App', ['react', 'ts']),
      createMockRepo(2, 'Node App', ['node', 'ts']),
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TopicsProvider repositories={mockRepos}>{children}</TopicsProvider>
    );

    const { result } = renderHook(() => useTopics(), { wrapper });

    await act(async () => {
      result.current.setActiveTopic('react');
    });

    expect(result.current.activeTopic).toBe('react');
  });

  it('debe resetear el filtro a ALL (null) al llamar clearFilter', async () => {
    const mockRepos: GitHubRepository[] = [
      createMockRepo(1, 'React App', ['react', 'ts']),
      createMockRepo(2, 'Node App', ['node', 'ts']),
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TopicsProvider repositories={mockRepos}>{children}</TopicsProvider>
    );

    const { result } = renderHook(() => useTopics(), { wrapper });

    await act(async () => {
      result.current.clearFilter();
    });

    expect(result.current.activeTopic).toBeNull();
  });

  it('debe normalizar y activar el topic (ej: "React" → "react")', async () => {
    const mockRepos: GitHubRepository[] = [
      createMockRepo(1, 'React App', ['react', 'ts']),
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TopicsProvider repositories={mockRepos}>{children}</TopicsProvider>
    );

    const { result } = renderHook(() => useTopics(), { wrapper });

    await act(async () => {
      result.current.toggleTopic('React');
    });

    expect(result.current.activeTopic).toBe('react');
  });

  it('debe deseleccionar el topic activo al volver a seleccionarlo (vuelve a ALL)', async () => {
    const mockRepos: GitHubRepository[] = [
      createMockRepo(1, 'React App', ['react', 'ts']),
      createMockRepo(2, 'Node App', ['node', 'ts']),
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TopicsProvider repositories={mockRepos}>{children}</TopicsProvider>
    );

    const { result } = renderHook(() => useTopics(), { wrapper });

    await act(async () => {
      result.current.toggleTopic('React');
    });
    expect(result.current.activeTopic).toBe('react');

    await act(async () => {
      result.current.toggleTopic('React');
    });
    expect(result.current.activeTopic).toBeNull();
  });
});
