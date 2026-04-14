/**
 * GitHub API Service - Capa de datos para la integración con repositorios.
 * Implementa ISR (revalidate) para optimizar el rendimiento y evitar Rate Limits.
 */

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

/**
 * Obtiene los repositorios más recientes del usuario configurado.
 * @returns Array de GitHubRepo o array vacío en caso de error o falta de credenciales.
 */
export async function getTopRepos(): Promise<GitHubRepo[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  // Validación preventiva de variables de entorno
  if (!username || !token) {
    console.error("[GITHUB_SERVICE] Missing credentials: GITHUB_USERNAME or GITHUB_TOKEN");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        // ISR: Revalidación cada hora (3600 segundos)
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = (await response.json()) as GitHubRepo[];
    return data;
  } catch (error) {
    console.error("[GITHUB_SERVICE] Fetch failed:", error);
    // Retornamos array vacío para evitar que la página falle en runtime/build
    return [];
  }
}
