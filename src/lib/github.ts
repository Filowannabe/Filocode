import { fetchRepositoriosGitHub } from "@/services/githubApi";
import { GitHubRepository } from "@/types/repositorio";

/**
 * Obtiene los repositorios del usuario configurado.
 * Utiliza el motor robusto de fetch con resiliencia integrada.
 * @returns Array de GitHubRepository (hasta 100 items por llamada según Issue #1).
 */
export async function getTopRepos(): Promise<GitHubRepository[]> {
  const username = process.env.GITHUB_USERNAME || 'Filowannabe';
  
  try {
    // FETCH MASIVO: Traemos hasta 100 items en una sola llamada (Requisito Issue #1).
    // La UI (ProjectGallery) se encargará de paginarlos visualmente de a 6.
    const repos = await fetchRepositoriosGitHub(username, 100);
    
    // ORDENAMIENTO (Issue #1 Small Change):
    // Priorizamos primero por estrellas y luego por watchers (descendente).
    const sortedRepos = repos.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return b.watchers_count - a.watchers_count;
    });

    return sortedRepos;
  } catch (error) {
    console.error("[GITHUB_LIB] Error recuperando repositorios destacados:", error);
    return [];
  }
}
