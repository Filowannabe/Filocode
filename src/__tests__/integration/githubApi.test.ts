import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRepositoriosGitHub } from '../../services/githubApi';

describe('githubApi - Integration Deep Scan', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe realizar escaneo profundo (lenguajes + package.json) y enriquecer los topics', async () => {
    // Mock de fetch global
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/repos?')) {
        return Promise.resolve({
          ok: true,
          json: async () => [{ 
            id: 1, 
            name: 'repo-test', 
            full_name: 'user/repo-test',
            language: 'TypeScript', 
            topics: ['react'],
            stargazers_count: 10,
            forks_count: 5,
            watchers_count: 2,
            html_url: '',
            clone_url: ''
          }]
        });
      }
      if (url.includes('/languages')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ 'TypeScript': 1000, 'CSS': 500 })
        });
      }
      if (url.includes('/contents/package.json')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            content: btoa(JSON.stringify({ 
              dependencies: { 
                'framer-motion': '1.0.0', 
                'zustand': '1.0.0',
                'lodash': '1.0.0' // No está en allow-list
              } 
            }))
          })
        });
      }
      return Promise.resolve({ ok: false });
    });

    const repos = await fetchRepositoriosGitHub('user', 1);
    
    // Validar enriquecimiento
    expect(repos[0].topics).toContain('react'); // Base
    expect(repos[0].topics).toContain('typescript'); // De languages
    expect(repos[0].topics).toContain('framer-motion'); // De package.json
    expect(repos[0].topics).toContain('zustand'); // De package.json
    expect(repos[0].topics).not.toContain('lodash'); // Bloqueado por security allow-list
  });

  it('debe manejar fallos en escaneo profundo sin romper el fetch principal', async () => {
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/repos?')) {
        return Promise.resolve({
          ok: true,
          json: async () => [{ id: 1, name: 'fail-repo', full_name: 'user/fail-repo', topics: [] }]
        });
      }
      // Simular error 404 en sub-recursos
      return Promise.resolve({ ok: false, status: 404 });
    });

    const repos = await fetchRepositoriosGitHub('user', 1);
    expect(repos).toHaveLength(1);
    expect(repos[0].name).toBe('fail-repo');
  });
});
