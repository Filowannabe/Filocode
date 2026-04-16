import { GitHubRepository } from '@/types/repositorio';

/**
 * Normaliza un topic para uso interno (estándar GitHub Topics)
 * - Convierte a minúsculas
 * - Elimina puntos
 * - Reemplaza espacios con guiones
 * - Elimina caracteres especiales no alfanuméricos
 */
export function normalizeTopic(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Extrae todos los topics únicos de un array de repositorios
 * Retorna un array ordenado alfabéticamente para consistencia
 */
export function getUniqueTopics(repos: GitHubRepository[]): string[] {
  const topicSet = new Set<string>();
  
  repos.forEach(repo => {
    repo.topics.forEach(topic => {
      topicSet.add(normalizeTopic(topic));
    });
  });
  
  return Array.from(topicSet).sort();
}

/**
 * Filtra repositorios por topics usando lógica de INTERSECCIÓN
 * Un repositorio debe tener TODOS los topics seleccionados para ser incluido
 */
export function filterReposByTopics(
  repos: GitHubRepository[],
  selectedTopics: string[]
): GitHubRepository[] {
  if (selectedTopics.length === 0) {
    return repos;
  }

  const normalizedSelectedTopics = selectedTopics.map(normalizeTopic);

  return repos.filter(repo => {
    const repoTopics = repo.topics.map(normalizeTopic);
    
    return normalizedSelectedTopics.every(topic => 
      repoTopics.includes(topic)
    );
  });
}