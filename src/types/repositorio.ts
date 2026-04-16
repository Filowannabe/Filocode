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
}

export interface FetchState {
  owner: string;
  lastPage: number;
  fetchedCount: number;
  isComplete: boolean;
}
