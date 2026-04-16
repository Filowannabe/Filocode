import { describe, it, expect } from 'vitest';
import { normalizeTopic, getUniqueTopics, filterReposByTopics } from '../utils/topics';
import { GitHubRepository } from '@/types/repositorio';

describe('Topics Utility - Lógica de Arsenal', () => {
  describe('normalizeTopic()', () => {
    it('debe convertir a minúsculas y eliminar puntos (estándar slug)', () => {
      expect(normalizeTopic('TypeScript')).toBe('typescript');
      expect(normalizeTopic('Next.js')).toBe('nextjs');
    });

    it('debe reemplazar espacios por guiones', () => {
      expect(normalizeTopic('React Native')).toBe('react-native');
    });

    it('debe manejar casos mixtos y caracteres especiales', () => {
      expect(normalizeTopic('TypeScript (React)')).toBe('typescript-react');
      expect(normalizeTopic('Next.JS 2024')).toBe('nextjs-2024');
    });
  });

  describe('getUniqueTopics()', () => {
    it('debe extraer un set único y ordenado de todos los repositorios', () => {
      const mockRepos = [
        { topics: ['react', 'node'] },
        { topics: ['react', 'typescript'] }
      ] as GitHubRepository[];

      const result = getUniqueTopics(mockRepos);
      expect(result).toEqual(['node', 'react', 'typescript']);
      expect(result).toHaveLength(3);
    });

    it('debe manejar repositorios sin topics', () => {
      const mockRepos = [
        { topics: ['react'] },
        { topics: [] }
      ] as GitHubRepository[];

      const result = getUniqueTopics(mockRepos);
      expect(result).toEqual(['react']);
    });
  });

  describe('filterReposByTopics()', () => {
    it('debe retornar todos los repos si no hay filtros activos', () => {
      const mockRepos = [{ id: 1, topics: ['a'] }] as GitHubRepository[];
      expect(filterReposByTopics(mockRepos, [])).toHaveLength(1);
    });

    it('debe aplicar lógica de INTERSECCIÓN (debe tener todos los tags seleccionados)', () => {
      const mockRepos = [
        { id: 1, topics: ['react', 'ts'] },
        { id: 2, topics: ['react'] }
      ] as GitHubRepository[];

      const filtered = filterReposByTopics(mockRepos, ['react', 'ts']);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(1);
    });

    it('debe excluir repos que no cumplan TODOS los criterios de filtrado', () => {
      const mockRepos = [
        { id: 1, topics: ['react', 'ts', 'node'] },
        { id: 2, topics: ['react', 'vue'] },
        { id: 3, topics: ['node'] }
      ] as GitHubRepository[];

      const filtered = filterReposByTopics(mockRepos, ['react', 'ts']);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(1);
    });
  });
});