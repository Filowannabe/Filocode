import { GitHubRepository, FetchState } from '../types/repositorio';

/**
 * Interfaz para los datos crudos que devuelve la API de GitHub
 */
interface GitHubRawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  html_url: string;
  clone_url: string;
  topics: string[] | null;
}

/**
 * Interfaz de error para GitHub API
 */
export class GitHubAPIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 200,
  maxDelayMs: 5000
};

interface AuditLog {
  timestamp: string;
  owner: string;
  action: string;
  [key: string]: unknown;
}

async function getStorage() {
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  if (isBrowser) {
    return {
      save: (key: string, data: unknown) => { try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* ignorar */ } },
      load: (key: string) => { try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : null; } catch { return null; } },
      delete: (key: string) => { try { localStorage.removeItem(key); } catch { /* ignorar */ } }
    };
  }
  return null;
}

async function logAudit(owner: string, action: string, details: Record<string, unknown>): Promise<void> {
  const storage = await getStorage();
  if (!storage) return;
  const logs = (storage.load('github-audit-logs') as AuditLog[]) || [];
  logs.push({ timestamp: new Date().toISOString(), owner, action, ...details });
  storage.save('github-audit-logs', logs.slice(-50));
}

/**
 * Fetch masivo de repositorios de GitHub (Issue #1 - COMPLIANCE VERSION v3.4)
 * v3.4: Agregado header mercy-preview para asegurar recuperación de topics.
 */
export async function fetchRepositoriosGitHub(
  owner: string,
  limit: number = 100,
  onProgress?: (fetched: number, total: number) => void,
  specificPage?: number,
  perPageOverride?: number
): Promise<GitHubRepository[]> {
  const perPage = perPageOverride || 100;
  const url = `https://api.github.com/users/${owner}/repos?per_page=${perPage}`;
  const allRepos: GitHubRepository[] = [];
  const storage = await getStorage();
  
  // Headers optimizados para topics
  const headers = { 
    'Accept': 'application/vnd.github.mercy-preview+json' 
  };
  
  if (specificPage) {
    const response = await fetch(`${url}&page=${specificPage}`, { headers });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = (await response.json()) as GitHubRawRepo[];
    if (!Array.isArray(data)) return [];
    return data.map((repo): GitHubRepository => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || '',
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      watchers_count: repo.watchers_count || 0,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      topics: repo.topics || [],
    }));
  }

  const state = storage ? (storage.load('github-api-state') as FetchState) : null;
  let currentPage = (state && state.owner === owner && !state.isComplete) ? state.lastPage + 1 : 1;
  let totalFetched = (state && state.owner === owner && !state.isComplete) ? state.fetchedCount : 0;
  const isUnlimited = limit === 0;
  const effectiveLimit = isUnlimited ? Infinity : limit;

  await logAudit(owner, 'FETCH_START', { limit: isUnlimited ? 'UNLIMITED' : limit, resume: totalFetched > 0 });

  while (totalFetched < effectiveLimit) {
    let response: Response | null = null;
    let attempt = 0;
    
    if (totalFetched > 0) await new Promise(resolve => setTimeout(resolve, 1000));

    while (attempt < DEFAULT_RETRY_CONFIG.maxAttempts) {
      response = await fetch(`${url}&page=${currentPage}`, { headers });
      if (response.ok) break;
      if (response.status === 403 || response.status === 429) {
        attempt++;
        await new Promise(resolve => setTimeout(resolve, DEFAULT_RETRY_CONFIG.initialDelayMs * Math.pow(2, attempt - 1)));
      } else { break; }
    }

    if (!response || !response.ok) { 
      await logAudit(owner, 'PAGE_FAILURE', { page: currentPage, status: response?.status });
      currentPage++; continue; 
    }
    
    const data = (await response.json()) as GitHubRawRepo[];
    if (!Array.isArray(data) || data.length === 0) break;

    const repos = data.map((repo): GitHubRepository => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || '',
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      watchers_count: repo.watchers_count || 0,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      topics: repo.topics || [],
    }));
    
    allRepos.push(...repos);
    totalFetched += repos.length;
    if (onProgress) onProgress(totalFetched, isUnlimited ? totalFetched + 100 : limit);

    const linkHeader = response.headers.get('Link');
    if (!linkHeader || !linkHeader.includes('rel="next"') || totalFetched >= effectiveLimit) {
      if (storage) storage.save('github-api-state', { owner, lastPage: currentPage, fetchedCount: totalFetched, isComplete: true });
      break;
    }
    
    if (storage) storage.save('github-api-state', { owner, lastPage: currentPage, fetchedCount: totalFetched, isComplete: false });
    currentPage++;
  }

  await logAudit(owner, 'FETCH_COMPLETE', { count: allRepos.length });
  return allRepos.slice(0, effectiveLimit);
}

export function exportData<T>(data: T): string { return JSON.stringify(data, null, 2); }

export function exportDataCSV(data: { repositories: GitHubRepository[]; generated_at?: string }): string {
  const { repositories } = data;
  const headers = ['id', 'name', 'full_name', 'stars', 'watchers', 'clone_url'].join(',');
  const rows = repositories.map(r => [r.id, `"${r.name}"`, `"${r.full_name}"`, r.stargazers_count, r.watchers_count, r.clone_url].join(','));
  return [headers, ...rows].join('\n');
}

export async function exportDataExcel(data: { repositories: GitHubRepository[]; generated_at?: string }): Promise<Blob> {
  const XLSX = await import('xlsx');
  const { repositories } = data;
  const ws = XLSX.utils.json_to_sheet(repositories);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Repos');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

export function downloadFile(content: string | Blob, filename: string, type: string): void {
  const blob = typeof content === 'string' ? new Blob([content], { type }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
