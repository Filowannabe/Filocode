// githubApi.test.ts - Tests de integración para GitHub API
// TDD Phase: GREEN - Validar implementación

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { fetchRepositoriosGitHub, exportData, exportDataCSV } from './githubApi';

// Mock de fetch global para cada test
describe('githubApi - fetchRepositoriosGitHub', () => {
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = vi.fn(() => Promise.resolve({} as any));
    (global as any).fetch = mockFetch;
  });

  test('fetchRepositoriosGitHub retorna 100 items exitosos', async () => {
    // ARRANGE: Mockear respuesta exitosa con 100 items
    const mockResponse = {
      total_count: 100,
      incomplete_results: false,
      repositories: Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `repo-${i + 1}`,
        full_name: `user/repo-${i + 1}`,
        description: `Repositorio ${i + 1}`,
        stargazers_count: i * 10,
        forks_count: i * 5,
        html_url: `https://github.com/user/repo-${i + 1}`,
        clone_url: `git@github.com:user/repo-${i + 1}.git`,
        topics: ['typescript', 'react', 'nodejs']
      }))
    };

    // Mock de fetch exitoso
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse
    });

    // ACT: Ejecutar función bajo prueba
    const result = await fetchRepositoriosGitHub('user');

    // ASSERT: Verificar comportamiento esperado
    expect(result).toHaveLength(100);
    expect(result[0]).toMatchObject({
      name: 'repo-1',
      full_name: 'user/repo-1',
      description: 'Repositorio 1',
      stargazers_count: 0,
      forks_count: 0,
      html_url: 'https://github.com/user/repo-1',
      clone_url: 'git@github.com:user/repo-1.git',
      topics: ['typescript', 'react', 'nodejs']
    });

  // Verificar que se llamó a fetch con parámetros correctos (incluye page=1)
   expect(mockFetch).toHaveBeenCalledWith(
     expect.stringMatching(/^https:\/\/api\.github\.com\/users\/user\/repos\?per_page=100(&\S+)?$/),
     expect.any(Object)
   );
  });

  test('fetchRepositoriosGitHub lanza error ante Rate Limit (403)', async () => {
    // ARRANGE: Mockear respuesta con error 403
    const mockErrorResponse = {
      message: 'API rate limit exceeded for user. (But here\'s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details)',
      documentation_url: 'https://docs.github.com/rest/overview/rate-limits#rate-limiting'
    };

    // Mock de fetch con error 403
    mockFetch.mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      json: async () => mockErrorResponse
    });

    // ACT + ASSERT: Verificar que se lanza excepción
    await expect(fetchRepositoriosGitHub('user')).rejects.toThrow('API rate limit exceeded');
  });

  test('fetchRepositoriosGitHub paginación automática (150 items)', async () => {
    // ARRANGE: Mock de paginación con 3 páginas (50 items cada una)
    let callCount = 0;
    mockFetch.mockImplementation(() => {
      callCount++;
      const offset = (callCount - 1) * 50;
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ total_count: 150, repositories: Array.from({ length: 100 }, (_, i) => ({ id: offset + i })) })
      });
    });

    // ACT: Ejecutar con limit=150
    const result = await fetchRepositoriosGitHub('user', 150);

    // ASSERT: Verificar que se hizo paginación automática
    expect(mockFetch).toHaveBeenCalledTimes(2); // 2 llamadas (100 + 50)
    expect(result).toHaveLength(150); // Total de items acumulados
  });
});

describe('githubApi - Exportación', () => {
  test('exportData retorna datos en formato JSON', () => {
    // ARRANGE: Datos de ejemplo
    const mockData = {
      repositories: [
        {
          id: 1,
          name: 'repo-1',
          full_name: 'user/repo-1',
          description: 'Repositorio 1',
          stargazers_count: 100,
          forks_count: 10,
          html_url: 'https://github.com/user/repo-1',
          clone_url: 'git@github.com:user/repo-1.git',
          topics: ['typescript', 'react']
        }
      ],
      generated_at: new Date().toISOString(),
      user: 'user'
    };

    // ACT
    const result = exportData(mockData);

    // ASSERT
    expect(result).toBe(JSON.stringify(mockData, undefined, 2));
    expect(result).toContain('"id": 1');
    expect(result).toContain('"name": "repo-1"');
  });

  test('exportData retorna datos en formato CSV', () => {
    // ARRANGE: Datos de ejemplo
    const mockData = {
      repositories: [
        {
          id: 1,
          name: 'repo-1',
          full_name: 'user/repo-1',
          description: 'Repositorio 1',
          stargazers_count: 100,
          forks_count: 10,
          html_url: 'https://github.com/user/repo-1',
          clone_url: 'git@github.com:user/repo-1.git',
          topics: ['typescript', 'react']
        }
      ],
      generated_at: new Date().toISOString()
    };

    // ACT
    const result = exportDataCSV(mockData);

    // ASSERT
    expect(result).toContain('id,name,full_name');
    expect(result).toContain('1,"repo-1","user/repo-1"');
    expect(result).toContain('stargazers_count,forks_count,html_url,clone_url,topics');
  });

  test('exportData con indent null usa sin indentación', () => {
    // ARRANGE: Datos de ejemplo
    const mockData = { value: 'test' };

    // ACT
    const result = exportData(mockData, { indent: null });

    // ASSERT
    expect(result).toMatch(/^{\s*"value":\s*"test"\s*}$/); // Sin indentación, solo espacios/newlines
  });
});
