/**
 * Interface para repositorio de GitHub
 * Definición estricta de campos según GitHub API
 */
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  clone_url: string;
  topics: string[];
}

/**
 * Response wrapper para GitHub API
 */
export interface GitHubAPIResponse {
  total_count: number;
  incomplete_results: boolean;
  repositories: GitHubRepository[];
}
