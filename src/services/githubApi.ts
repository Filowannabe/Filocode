import { GitHubRepository } from '../types/repositorio';

/**
 * Allow-list de tecnologías autorizadas (Consolidada y Expandida)
 */
export const TECH_ALLOW_LIST = new Set([
  'java', 'typescript', 'javascript', 'python', 'kotlin', 'bash', 'shell', 'sql', 'html', 'css', 'markdown', 'csharp', 'dotnet', 'php', 'c++', 'go',
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
   created_at?: string;
   updated_at?: string;
   homepage?: string;
 }

/**
 * Mapeo LIGERO y RESILIENTE v6.1
 * C# Identification Protocol.
 */
function mapGitHubRepo(repo: GitHubRawRepo): GitHubRepository {
  const rawTopics = repo.topics || [];
  const normalizedTopics = new Set<string>();
  
  const processTerm = (t: string) => {
    if (!t) return;
    const lower = t.toLowerCase().trim();
    
    // CASO CRÍTICO: C# / .NET
    if (lower === 'c#' || lower === 'csharp' || lower === 'dotnet') {
      normalizedTopics.add('csharp');
      return;
    }

    if (lower === 'springboot') {
      normalizedTopics.add('spring-boot');
      return;
    }

    if (TECH_ALLOW_LIST.has(lower)) {
      normalizedTopics.add(lower);
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
     language: repo.language,
     created_at: repo.created_at,
     updated_at: repo.updated_at,
     homepage: repo.homepage,
   };
}

export async function deepScanRepository(
  repo: GitHubRawRepo,
  fetchFn: typeof fetch = fetch
): Promise<string[]> {
  const topics = new Set<string>(repo.topics || []);
  try {
    const repoParts = repo.full_name.split('/');
    
    // 1. Obtener languages
    const languagesUrl = `https://api.github.com/repos/${repoParts[0]}/${repoParts[1]}/languages`;
    const languagesRes = await fetchFn(languagesUrl, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });
    if (languagesRes.ok) {
      const languages = await languagesRes.json();
      if (languages) {
        Object.keys(languages).forEach(lang => {
          const l = lang.toLowerCase();
          if (l === 'c#' || l === 'csharp') topics.add('csharp');
          else if (TECH_ALLOW_LIST.has(l)) topics.add(l);
        });
      }
    }
    
    // 2. Obtener package.json y enriquecer topics
    const packageJsonUrl = `https://api.github.com/repos/${repoParts[0]}/${repoParts[1]}/contents/package.json`;
    const packageJsonRes = await fetchFn(packageJsonUrl, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });
    if (packageJsonRes.ok) {
      const packageJsonContent = await packageJsonRes.json();
      if (packageJsonContent && packageJsonContent.content) {
        try {
          const packageJson = JSON.parse(atob(packageJsonContent.content));
          if (packageJson.dependencies) {
            Object.keys(packageJson.dependencies).forEach(dep => {
              if (TECH_ALLOW_LIST.has(dep.toLowerCase())) {
                topics.add(dep.toLowerCase());
              }
            });
          }
        } catch { /* package.json inválido */ }
      }
    }
  } catch { /* ... */ }
  return Array.from(topics);
}

export async function fetchRepositoriosGitHub(
  owner: string,
  limit: number = 100,
  onProgress?: (fetched: number, total: number) => void,
  fetchFn?: typeof fetch
): Promise<GitHubRepository[]> {
  const url = `https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`;
  const headers = { 'Accept': 'application/vnd.github.mercy-preview+json' };
  const fetchToUse = fetchFn || fetch;
  if (onProgress) onProgress(0, limit);
  const response = await fetchToUse(url, { headers });
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  const rawRepos = (await response.json()) as GitHubRawRepo[];
  const result = rawRepos.slice(0, limit).map(mapGitHubRepo);
  if (onProgress) onProgress(limit, limit);
  return result;
}
