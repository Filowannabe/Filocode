import { GitHubRepository } from '../types/repositorio';

/**
 * Allow-list de tecnologías autorizadas (Consolidada y Expandida)
 */
export const TECH_ALLOW_LIST = new Set([
  'java', 'typescript', 'javascript', 'python', 'kotlin', 'bash', 'shell', 'sql', 'html', 'css', 'markdown', 'csharp', 'dotnet', 'php', 'c#', 'c++', 'go',
  'react', 'angular', 'vue', 'nextjs', 'spring-boot', 'springboot', 'nestjs', 'express', 'django', 'flask', 'bootstrap', 'electron', 
  'framer-motion', 'zustand', 'vite', 'vitest', 'lucide', 'shadcn', 'hibernate', 'junit', 'graphql', 'apollo', 'redux', 'prisma', 'tailwind',
  'docker', 'nginx', 'firebase', 'github-actions', 'postman', 'unity', 'gcp', 'aws', 'stripe', 'notion', 'trello', 'git', 'linux', 'ubuntu', 'vscode', 'android'
]);

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
   language: string | null;
   created_at?: string; // ISO 8601 - Issue #3
   updated_at?: string; // ISO 8601 - Issue #3
   homepage?: string;   // URL de despliegue - Issue #3
 }

/**
 * Mapeo LIGERO y RESILIENTE v5.8
 * Unifica variantes internas para evitar duplicados pero preserva la detección.
 */
function mapGitHubRepo(repo: GitHubRawRepo): GitHubRepository {
  const rawTopics = repo.topics || [];
  const normalizedTopics = new Set<string>();
  
  const processTerm = (t: string) => {
    let clean = t.toLowerCase().trim();
    if (clean === 'c#') clean = 'csharp';
    if (clean === 'springboot') clean = 'spring-boot';
    if (TECH_ALLOW_LIST.has(clean) || TECH_ALLOW_LIST.has(t.toLowerCase().trim())) {
      normalizedTopics.add(clean);
    }
  };

  rawTopics.forEach(processTerm);
  if (repo.language) processTerm(repo.language);

return {
     id: repo.id,
     name: repo.name,
     full_name: repo.full_name,
     description: repo.description || '',
     stargazers_count: repo.stargazers_count || 0,
     forks_count: repo.forks_count || 0,
     watchers_count: repo.watchers_count || 0,
     html_url: repo.html_url,
     clone_url: repo.clone_url,
     topics: Array.from(normalizedTopics),
     created_at: repo.created_at, // Issue #3
     updated_at: repo.updated_at, // Issue #3
     homepage: repo.homepage,    // Issue #3
   };
}

/**
 * Escanea los detalles del repo (languages + package.json) y extrae topics
 * 
 * ⚠️ ADVERTENCIA: Esta función es ÚNICAMENTE para scripts de background o cron jobs.
 * NO debe usarse en fetch principal para evitar el problema N+1 QUERY.
 * 
 * @param repo - Repositorio a escanear
 * @param fetchFn - Función custom de fetch (para testing)
 */
export async function deepScanRepository(
  repo: GitHubRawRepo,
  fetchFn: typeof fetch = fetch
): Promise<string[]> {
  const topics = new Set<string>(repo.topics || []);

  try {
    // 1. Obtener languages del repo
    const repoParts = repo.full_name.split('/');
    const languagesUrl = `https://api.github.com/repos/${repoParts[0]}/${repoParts[1]}/languages`;
    const languagesRes = await fetchFn(languagesUrl, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });
    
    if (languagesRes.ok) {
      const languages = await languagesRes.json();
      if (languages) {
        Object.entries(languages).forEach(([lang, _]) => {
          const clean = lang.toLowerCase().trim();
          if (TECH_ALLOW_LIST.has(clean)) {
            topics.add(clean);
          }
        });
      }
    }
  } catch {
    // Silencioso - no romper el flujo
  }

  try {
    // 2. Obtener package.json
    const repoParts = repo.full_name.split('/');
    const contentsUrl = `https://api.github.com/repos/${repoParts[0]}/${repoParts[1]}/contents/package.json`;
    const contentsRes = await fetchFn(contentsUrl, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });
    
    if (contentsRes.ok) {
      const contents = await contentsRes.json();
      // El contenido viene en base64
      if (contents.content) {
        try {
          const decoded = atob(contents.content);
          const packageJson = JSON.parse(decoded);
          
          const dependencies = packageJson.dependencies || {};
           Object.entries(dependencies).forEach(([pkg, _]) => {
            const clean = pkg.toLowerCase().trim();
            if (TECH_ALLOW_LIST.has(clean) && !topics.has(clean)) {
              topics.add(clean);
            }
          });
        } catch {
          // Silencioso - no romper el flujo
        }
      }
    }
  } catch {
    // Silencioso - no romper el flujo
  }

  return Array.from(topics);
}

/**
 * Fetch masivo de repositorios (CERO peticiones adicionales)
 * 
 * ⚠️ IMPORTANTE: Solo usa los datos que vienen del endpoint principal.
 * La inteligencia reside en el procesamiento del lado del cliente con TECH_ALLOW_LIST.
 * 
 * @param owner - Owner del usuario/org
 * @param limit - Número máximo de repositorios (default: 100)
 * @param onProgress - Callback opcional para progreso (fetched: cantidad obtenida, total: límite)
 * @param fetchFn - Función custom de fetch (para testing, opcional)
 */
export async function fetchRepositoriosGitHub(
  owner: string,
  limit: number = 100,
  onProgress?: (fetched: number, total: number) => void,
  fetchFn?: typeof fetch
): Promise<GitHubRepository[]> {
  const url = `https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`;
  const headers = { 'Accept': 'application/vnd.github.mercy-preview+json' };
  
  const fetchToUse = fetchFn || fetch;
  
  // Reportar progreso inicial
  if (onProgress) {
    onProgress(0, limit);
  }
  
  const response = await fetchToUse(url, { headers });
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  
  const rawRepos = (await response.json()) as GitHubRawRepo[];
  
  // ✅ CERO peticiones adicionales - solo mapeo y filtrado
  const result = rawRepos.slice(0, limit).map(mapGitHubRepo);
  
  // Reportar progreso final
  if (onProgress) {
    onProgress(limit, limit);
  }
  
  return result;
}
