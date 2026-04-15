// githubApi.test.ts - Tests de integración para GitHub API
// TDD Phase: GREEN - Validar implementación corregida

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchRepositoriosGitHub, exportDataCSV, exportDataExcel } from '../../services/githubApi';
import fs from 'fs';
import path from 'path';

// Mock de fetch global
describe('githubApi - fetchRepositoriosGitHub', () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn(() => Promise.resolve({} as unknown as Response));
    globalThis.fetch = mockFetch;
    // Limpiar archivos
    try { fs.unlinkSync(path.join(process.cwd(), '.github-api-state.json')); } catch {}
    try { fs.unlinkSync(path.join(process.cwd(), '.github-api-logs.json')); } catch {}
  });

  afterEach(() => {
    try { fs.unlinkSync(path.join(process.cwd(), '.github-api-state.json')); } catch {}
    try { fs.unlinkSync(path.join(process.cwd(), '.github-api-logs.json')); } catch {}
  });

  test('fetchRepositoriosGitHub retorna 100 items exitosos', async () => {
    const mockResponse = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `repo-${i + 1}`,
      full_name: `user/repo-${i + 1}`,
      html_url: `https://github.com/user/repo-${i + 1}`,
      clone_url: `git@github.com:user/repo-${i + 1}.git`,
      topics: []
    }));

    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ Link: '' }),
      json: async () => mockResponse
    } as unknown as Response);

    const result = await fetchRepositoriosGitHub('user', 100);
    expect(result).toHaveLength(100);
    expect(result[0].name).toBe('repo-1');
  });

  test('fetchRepositoriosGitHub paginación automática (150 items)', async () => {
    let callCount = 0;
    mockFetch.mockImplementation(() => {
      callCount++;
      const count = callCount === 1 ? 100 : 50;
      return Promise.resolve({
        ok: true,
        status: 200,
        headers: new Headers(callCount === 1 ? { Link: '<url>; rel="next"' } : { Link: '' }),
        json: async () => Array.from({ length: count }, (_, i) => ({ id: (callCount-1)*100 + i }))
      } as unknown as Response);
    });

    const result = await fetchRepositoriosGitHub('user', 150);
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(150);
  });

  test('retry con backoff exponencial (1 fallo 403, 1 éxito)', async () => {
    let attempt = 0;
    mockFetch.mockImplementation(() => {
      attempt++;
      if (attempt === 1) {
        return Promise.resolve({
          ok: false,
          status: 403,
          headers: new Headers(),
          json: async () => ({ message: 'Rate Limit' })
        } as unknown as Response);
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => [{ id: 1 }]
      } as unknown as Response);
    });

    const result = await fetchRepositoriosGitHub('user', 1);
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(1);
  });
});

describe('githubApi - Exportación', () => {
  test('exportDataExcel retorna un Blob válido', async () => {
    const mockData = {
      repositories: [{ id: 1, name: 'test', full_name: 'test/test', topics: [], stargazers_count: 0, forks_count: 0, watchers_count: 0, html_url: '', clone_url: '', description: '' }],
      generated_at: new Date().toISOString()
    };

    const result = await exportDataExcel(mockData);
    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });

  test('exportDataCSV genera formato correcto', () => {
    const mockData = {
      repositories: [{ id: 1, name: 'repo-1', full_name: 'user/repo-1', topics: ['ts'], stargazers_count: 10, forks_count: 5, watchers_count: 10, html_url: '', clone_url: '', description: 'desc' }],
      generated_at: new Date().toISOString()
    };

    const result = exportDataCSV(mockData);
    expect(result).toContain('id,name,full_name');
    expect(result).toContain('1,"repo-1","user/repo-1"');
  });
});
