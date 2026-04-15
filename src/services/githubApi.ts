import { GitHubRepository } from '../types/github.types';

/**
 * Interfaz de error para GitHub API
 */
export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

/**
 * Fetch masivo de repositorios de GitHub (Issue #1)
 * 
 * @param owner - Owner del repositorio (ej: 'filocode')
 * @param limit - Límite de items a recuperar (default: 100)
 * @returns Array de repositorios
 * 
 * @throws GitHubAPIError - Cuando se excede el Rate Limit (403)
 */
export async function fetchRepositoriosGitHub(
  owner: string,
  limit: number = 100
): Promise<GitHubRepository[]> {
  const perPage = Math.min(limit, 100); // GitHub API max: 100 por página
  const url = `https://api.github.com/users/${owner}/repos?per_page=${perPage}`;
  
  const allRepos: GitHubRepository[] = [];

  // Paginación automática: hacer múltiples llamadas si limit > perPage
  let page = 1;
  while (allRepos.length < limit) {
    const response = await fetch(`${url}&page=${page}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 403) {
        throw new GitHubAPIError(
          `API rate limit exceeded for ${owner}. (Authenticated requests get a higher rate limit)`,
          403
        );
      }
      
      throw new GitHubAPIError(
        `GitHub API Error: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    
    // Transformar respuesta API a formato interno
    const repos = data.repositories.map((repo: any): GitHubRepository => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || '',
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      topics: repo.topics || [],
    }));
    
    allRepos.push(...repos);
    
    // Detener si ya tenemos suficientes items o no hay más páginas
    if (allRepos.length >= limit || data.total_count === allRepos.length) {
      break;
    }
    
    page++;
  }

  return allRepos.slice(0, limit); // Asegurar que no excedamos el límite
}

/**
 * Exportar datos en formato JSON
 * 
 * @param data - Datos a exportar
 * @param options - Opciones de serialización
 * @returns String JSON
 */
export function exportData<T>(
  data: T,
  options?: {
    indent?: number | null;
  }
): string {
  const { indent = 2 } = options || {};
  return JSON.stringify(data, undefined, indent ?? 2);
}

/**
 * Exportar datos en formato CSV
 * 
 * @param data - Datos con array de repositorios
 * @param options - Opciones de exportación
 * @returns String CSV
 */
export function exportDataCSV(
  data: { repositories: GitHubRepository[]; generated_at: string },
  options?: {
    bom?: boolean;
  }
): string {
  const { bom = false } = options || {};
  const { repositories, generated_at } = data;

  const headers = [
    'id',
    'name',
    'full_name',
    'description',
    'stargazers_count',
    'forks_count',
    'html_url',
    'clone_url',
    'topics',
  ].join(',');

  const rows = repositories.map((repo) => [
    repo.id,
    `"${repo.name}"`,
    `"${repo.full_name}"`,
    `"${(repo.description || '').replace(/"/g, '""')}"`,
    repo.stargazers_count,
    repo.forks_count,
    repo.html_url,
    repo.clone_url,
    `"${(repo.topics || []).join(', ')}"`,
  ].join(','));

  const csv = [headers, ...rows].join('\n');
  return bom ? `\uFEFF${csv}` : csv;
}
