import { describe, it, expect } from 'vitest';
import { normalizeTopic, getUniqueTopics, filterRepos } from '../utils/topics';
import { GitHubRepository } from '@/types/repositorio';

describe('Topics Utility - Lógica de Arsenal v2.0', () => {
  describe('normalizeTopic()', () => {
    it('debe convertir a minúsculas y eliminar puntos', () => {
      expect(normalizeTopic('TypeScript')).toBe('typescript');
      expect(normalizeTopic('Next.js')).toBe('nextjs');
    });
  });

  describe('getUniqueTopics()', () => {
    it('debe extraer un set único y ordenado', () => {
      const mockRepos = [
        { topics: ['react', 'node'] },
        { topics: ['react', 'typescript'] }
      ] as GitHubRepository[];

      const result = getUniqueTopics(mockRepos);
      expect(result).toEqual(['node', 'react', 'typescript']);
    });
  });

  describe('filterRepos() - Lógica OR + Búsqueda', () => {
    const mockRepos = [
      { id: 1, name: 'Alpha React', description: 'Frontend project', topics: ['react', 'frontend'] },
      { id: 2, name: 'Beta Node', description: 'Backend service', topics: ['node', 'backend'] },
      { id: 3, name: 'Gamma Java', description: 'Mixed legacy app', topics: ['java'] }
    ] as GitHubRepository[];

    it('debe retornar todos si no hay filtros', () => {
      expect(filterRepos(mockRepos, [])).toHaveLength(3);
    });

    it('debe filtrar por un lenguaje inyectado como topic (ej: java)', () => {
      const filtered = filterRepos(mockRepos, ['java']);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(3);
    });

    it('debe filtrar por búsqueda de texto (nombre)', () => {
      const filtered = filterRepos(mockRepos, [], 'Alpha');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(1);
    });

    it('debe filtrar por búsqueda de texto (descripción)', () => {
      const filtered = filterRepos(mockRepos, [], 'mixed');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(3);
    });

    it('debe combinar Búsqueda (AND) con Topics (OR)', () => {
      const filtered = filterRepos(mockRepos, ['java', 'node'], 'Mixed');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(3);
    });
  });
});
