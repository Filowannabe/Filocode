import { GitHubRepository } from '../types/github.types';
import fs from 'fs';
import path from 'path';

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
 * Configuración de retry con backoff exponencial
 */
interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 100,
  maxDelayMs: 10000
};

/**
 * Guardar estado para reanudar si falla
 */
function saveState(owner: string, lastPage: number, fetchedCount: number): void {
  const stateData = {
    owner,
    lastPage,
    fetchedCount,
    lastFetchAt: Date.now()
  };
  
  const statePath = path.join(process.cwd(), '.github-api-state.json');
  fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2));
}

/**
 * Cargar estado previo
 */
function loadState(owner: string): { lastPage: number; fetchedCount: number } | null {
  const statePath = path.join(process.cwd(), '.github-api-state.json');
  
  if (!fs.existsSync(statePath)) {
    return null;
  }
  
  try {
    const stateData = fs.readFileSync(statePath, 'utf-8');
    const state = JSON.parse(stateData);
    
    if (state.owner === owner) {
      return {
        lastPage: state.lastPage,
        fetchedCount: state.fetchedCount
      };
    }
  } catch (error) {
    console.error('Error al cargar estado:', error);
  }
  
  return null;
}

/**
 * Eliminar estado guardado
 */
function deleteState(owner: string): void {
  const statePath = path.join(process.cwd(), '.github-api-state.json');
  
  if (fs.existsSync(statePath)) {
    fs.unlinkSync(statePath);
  }
}

/**
 * Registrar log de intentos y errores
 */
function logAttempt(owner: string, page: number, success: boolean, error?: any): void {
  const logPath = path.join(process.cwd(), '.github-api-logs.json');
  
  let logs: any = [];
  
  if (fs.existsSync(logPath)) {
    try {
      const logData = fs.readFileSync(logPath, 'utf-8');
      logs = JSON.parse(logData);
    } catch (error) {
      logs = [];
    }
  }
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    page,
    success,
    error: error ? error.message : null,
    owner
  };
  
  logs.push(logEntry);
  
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
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
  const retryConfig = DEFAULT_RETRY_CONFIG;
  
  // Cargar estado previo si existe
  const state = loadState(owner);
  let currentPage = state ? state.lastPage + 1 : 1;
  let totalFetched = state ? state.fetchedCount : 0;
  
  let attempt = 0;
  
  // Paginación automática: hacer múltiples llamadas si limit > perPage
  while (totalFetched < limit && currentPage <= 50) { // Max 50 páginas (5000 items)
    const response = await fetch(`${url}&page=${currentPage}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 403) {
        attempt++;
        logAttempt(owner, currentPage, false, new GitHubAPIError(
          `API rate limit exceeded for ${owner}`,
          403
        ));
        
        // Si no es el primer intento, aplicar backoff exponencial
        if (attempt < retryConfig.maxAttempts) {
          const delayMs = Math.min(
            retryConfig.initialDelayMs * Math.pow(2, attempt - 1),
            retryConfig.maxDelayMs
          );
          
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue; // Retry
        } else {
          throw new GitHubAPIError(
            `API rate limit exceeded for ${owner}. (Max attempts: ${retryConfig.maxAttempts})`,
            403
          );
        }
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
    totalFetched += repos.length;
    
    // Registrar intento exitoso
    logAttempt(owner, currentPage, true);
    
    // Guardar estado si hay fallas previas (pero no si vamos a continuar)
    if (currentPage > 1 && state) {
      saveState(owner, currentPage - 1, totalFetched);
    }
    
    // Detener si ya tenemos suficientes items o no hay más páginas
    if (totalFetched >= limit || data.total_count === allRepos.length) {
      deleteState(owner); // Eliminar estado cuando se completa
      break;
    }
    
    currentPage++;
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

/**
 * Exportar datos en formato Excel (.xlsx)
 * 
 * @param data - Datos con array de repositorios
 * @param options - Opciones de exportación
 * @returns Workbook de Excel
 */
export async function exportDataExcel(
  data: { repositories: GitHubRepository[]; generated_at: string },
  options?: {
    fileName?: string;
    includeMetadata?: boolean;
  }
): Promise<any> {
  // Usar la librería xlsx para exportar a Excel
  const XLSX = (await import('xlsx')).default;
  const { repositories, generated_at } = data;
  const { fileName = 'github-repos.xlsx', includeMetadata = false } = options || {};
  
  // Preparar datos para Excel
  const headers = [
    'ID',
    'Nombre',
    'Full Name',
    'Descripción',
    'Estrellas',
    'Forks',
    'URL',
    'Clone URL',
    'Topics',
  ];
  
  const rows = repositories.map((repo, index) => {
    const row = [
      repo.id.toString(),
      repo.name,
      repo.full_name,
      repo.description || '',
      repo.stargazers_count.toString(),
      repo.forks_count.toString(),
      repo.html_url,
      repo.clone_url,
      repo.topics.join(', ')
    ];
    
    // Agregar metadata si aplica
    if (includeMetadata) {
      row.push(generated_at || '', index.toString());
    }
    
    return row;
  });
  
  const worksheetData: (string[] | any)[] = [headers, ...rows];
  
  // Crear workbook
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  
  // Ajustar columnas - CORREGIDO: usar formato correcto para xlsx v0.18
  const wscols = [
    { wch: 6 },  // ID
    { wch: 25 }, // Nombre
    { wch: 30 }, // Full Name
    { wch: 50 }, // Descripción
    { wch: 10 }, // Estrellas
    { wch: 10 }, // Forks
    { wch: 50 }, // URL
    { wch: 50 }, // Clone URL
    { wch: 50 }, // Topics
  ];
  
  if (includeMetadata) {
    wscols.push({ wch: 20 }, { wch: 10 });
  }
  
  // sheet_col_s no existe en xlsx, omitir
  // XLSX.utils.sheet_col_s(ws, wscols);
  XLSX.utils.book_append_sheet(wb, ws, 'Repositorios GitHub');
  
  // Retornar workbook
  return wb;
}
