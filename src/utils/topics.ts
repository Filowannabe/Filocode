/**
 * topics.ts - Utilidades centralizadas para gestión de tecnologías y filtrado.
 * v6.4 - Reparación de firma de función para compatibilidad con use-topics.tsx
 */
import { GitHubRepository } from '@/types/repositorio';

/**
 * Formatea nombres de tecnologías para visualización HUD.
 */
export function formatTechName(tech: string): string {
  if (!tech) return '';
  const t = tech.toLowerCase().trim();
  
  if (t === 'c#' || t === 'csharp' || t === 'dotnet') return 'C#';
  if (t === 'javascript') return 'JavaScript';
  if (t === 'typescript') return 'TypeScript';
  if (t === 'nextjs' || t === 'next') return 'Next.js';
  if (t === 'spring-boot') return 'Spring Boot';
  if (t === 'github-actions') return 'GH Actions';
  if (t === 'postgresql') return 'PostgreSQL';
  if (t === 'php') return 'PHP';
  if (t === 'sql') return 'SQL';
  if (t === 'html') return 'HTML5';
  if (t === 'css') return 'CSS3';
  
  return tech.charAt(0).toUpperCase() + tech.slice(1);
}

/**
 * Normaliza un tópico para comparaciones internas.
 */
export function normalizeTopic(topic: string): string {
  const t = topic.toLowerCase().trim();
  if (t === 'c#' || t === 'csharp') return 'csharp';
  return t;
}

/**
 * Extrae todos los tópicos únicos de una lista de repositorios.
 */
export function getUniqueTopics(repos: GitHubRepository[]): string[] {
  const topicsSet = new Set<string>();
  repos.forEach(repo => {
    repo.topics.forEach(topic => {
      topicsSet.add(normalizeTopic(topic));
    });
  });
  return Array.from(topicsSet).sort();
}

/**
 * Filtra repositorios basados en búsqueda y tópicos activos.
 * Firma ajustada para compatibilidad: (repos, activeTopics, searchQuery)
 */
export function filterRepos(
  repos: GitHubRepository[],
  activeTopics: string[] = [],
  searchQuery: string = ""
): GitHubRepository[] {
  return repos.filter(repo => {
    // 1. Filtro por tópicos (debe contener todos los tópicos activos)
    const normalizedRepoTopics = repo.topics.map(normalizeTopic);
    const matchesTopics = activeTopics.length === 0 || 
      activeTopics.every(active => normalizedRepoTopics.includes(normalizeTopic(active)));

    if (!matchesTopics) return false;

    // 2. Filtro por búsqueda (nombre o descripción)
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query));
  });
}
