import { GitHubRepository, FetchState } from '../types/repositorio';

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
  };
}

export async function fetchRepositoriosGitHub(
  owner: string,
  limit: number = 100
): Promise<GitHubRepository[]> {
  const url = `https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`;
  const headers = { 'Accept': 'application/vnd.github.mercy-preview+json' };
  
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  
  const rawRepos = (await response.json()) as GitHubRawRepo[];
  return rawRepos.slice(0, limit).map(mapGitHubRepo);
}
