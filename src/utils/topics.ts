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
  const allTopics = repos.flatMap(repo => repo.topics || []);
  const normalizedTopics = allTopics.map(normalizeTopic);
  const topicSet = new Set<string>(normalizedTopics);
  
  return Array.from(topicSet).filter(Boolean).sort();
}

/**
 * Filtra repositorios por topics (lógica OR) y búsqueda por texto
 * - Topics: Si tiene al menos uno de los seleccionados (OR)
 * - Búsqueda: Si el texto está contenido en nombre o descripción
 */
export function filterRepos(
  repos: GitHubRepository[],
  selectedTopics: string[],
  searchQuery: string = ''
): GitHubRepository[] {
  const normalizedQuery = searchQuery.toLowerCase().trim();
  const normalizedSelectedTopics = selectedTopics.map(normalizeTopic);

  return repos.filter(repo => {
    // 1. Filtro por Búsqueda (Texto)
    const matchesSearch = normalizedQuery === '' || 
      repo.name.toLowerCase().includes(normalizedQuery) || 
      (repo.description && repo.description.toLowerCase().includes(normalizedQuery));

    if (!matchesSearch) return false;

    // 2. Filtro por Topics (Lógica OR)
    if (normalizedSelectedTopics.length === 0) return true;

    const repoTopics = (repo.topics || []).map(normalizeTopic);
    return normalizedSelectedTopics.some(topic => 
      repoTopics.includes(topic)
    );
  });
}