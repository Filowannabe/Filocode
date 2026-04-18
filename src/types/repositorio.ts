export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number; // Requisito Issue #1
  html_url: string;
  clone_url: string;
  topics: string[];
  created_at?: string; // ISO 8601 - Issue #3 (opcional, GitHub API)
  updated_at?: string; // ISO 8601 - Issue #3 (opcional, GitHub API)
  homepage?: string; // URL de despliegue - Issue #3
}

export interface FetchState {
  owner: string;
  lastPage: number;
  fetchedCount: number;
  isComplete: boolean;
}
