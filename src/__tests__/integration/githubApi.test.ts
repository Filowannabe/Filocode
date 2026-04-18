import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRepositoriosGitHub, deepScanRepository } from '../../services/githubApi';

describe('githubApi - Integration Deep Scan', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verifica que deepScanRepository funciona en aislamiento
  it('debe realizar escaneo profundo (lenguajes + package.json) y enriquecer los topics - FUNCION AISLADA', async () => {
    // Mock de fetch para deepScanRepository
    const mockFetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/languages')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ TypeScript: 1000, CSS: 500 })
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

    const mockRepo = {
      id: 1,
      name: 'repo-test',
      full_name: 'user/repo-test',
      language: 'TypeScript',
      topics: ['react'],
      description: null,
      stargazers_count: 10,
      forks_count: 5,
      watchers_count: 2,
      html_url: '',
      clone_url: ''
    };

    const enrichedTopics = await deepScanRepository(mockRepo, mockFetch);

    // Validar enriquecimiento
    expect(enrichedTopics).toContain('react'); // Base
    expect(enrichedTopics).toContain('typescript'); // De languages
    expect(enrichedTopics).toContain('framer-motion'); // De package.json
    expect(enrichedTopics).toContain('zustand'); // De package.json
    expect(enrichedTopics).not.toContain('lodash'); // Bloqueado por security allow-list
  });

  // Test 2: Verifica que fetchRepositoriosGitHub NO hace escaneo profundo (CERO llamadas adicionales)
  it('debe devolver repositorios con los topics que ya vienen en el endpoint principal - CERO peticiones adicionales', async () => {
    let callCount = 0;
    const mockFetch = vi.fn().mockImplementation((url: string) => {
      callCount++;
      if (url.includes('/repos?')) {
        return Promise.resolve({
          ok: true,
          json: async () => [{ 
            id: 1, 
            name: 'repo-test', 
            full_name: 'user/repo-test',
            language: 'TypeScript', // El endpoint principal YA trae language
            topics: ['react'],
            description: null,
            stargazers_count: 10,
            forks_count: 5,
            watchers_count: 2,
            html_url: '',
            clone_url: ''
          }]
        });
      }
      return Promise.resolve({ ok: false });
    });

    // Mock de callback de progreso
    const onProgress = vi.fn();
    
    const repos = await fetchRepositoriosGitHub('user', 1, onProgress, mockFetch as any);
    
    // ✅ DEBE ser exactamente 1 llamada (NO más)
    expect(callCount).toBe(1);
    
    // Los topics deben incluir language (que ya viene del endpoint principal)
    expect(repos[0].topics).toContain('react'); // De topics originales
    expect(repos[0].topics).toContain('typescript'); // De language (ya viene en la API)
  });

  // Test 3: Verifica que el fetch maneja errores correctamente
  it('debe manejar fallos en el fetch principal sin romper la aplicación', async () => {
    const mockFetch = vi.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false, status: 404 });
    });

    // Mock de callback de progreso
    const onProgress = vi.fn();
    
    await expect(fetchRepositoriosGitHub('user', 1, onProgress, mockFetch as any)).rejects.toThrow('HTTP Error: 404');
  });
});
