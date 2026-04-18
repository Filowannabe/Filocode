/**
 * Servicios de manejo de fechas y enlaces
 * Issue #3 — Fechas y Enlaces Demo
 */

export const formatDate = (
  date: Date,
  pattern: string = 'DD/MM/YYYY',
  options: { isFuture?: boolean; isPast?: boolean } = {}
): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const replacements: Record<string, string> = {
    'DD': day,
    'MM': month,
    'YYYY': String(year),
    'HH': hours,
    'mm': minutes,
  };

  let formatted = pattern;
  for (const [key, value] of Object.entries(replacements)) {
    formatted = formatted.split(key).join(value);
  }

  if (options.isFuture || options.isPast) {
    const now = new Date();
    if (options.isFuture && date > now) {
      return `${formatted} [FUTURO]`;
    }
    if (options.isPast && date < now) {
      return `${formatted} [PASADO]`;
    }
  }

  return formatted;
};

export const parseIsoDate = (isoString: string): Date => {
  return new Date(isoString);
};

export const calculateDifference = (
  startDate: Date,
  endDate: Date,
  unit: 'days' | 'weeks' | 'months' | 'years'
): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffMs = diffTime;

  switch (unit) {
    case 'days':
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    case 'weeks':
      return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    case 'months':
      const yearsDiff = endDate.getFullYear() - startDate.getFullYear();
      const monthsDiff = endDate.getMonth() - startDate.getMonth();
      return Math.abs(yearsDiff * 12 + monthsDiff);
    case 'years':
      return endDate.getFullYear() - startDate.getFullYear();
    default:
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }
};

export const validateUrl = (url: string | null | undefined): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

export const classifyLinkType = (url: string | null): LinkType => {
  if (!url || typeof url !== 'string') {
    return 'code-only';
  }

  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isTutorial = url.toLowerCase().includes('/tutoriales/');
  const isGitHub = url.includes('github.com');

  if (isTutorial) {
    return 'tutorial';
  }
  if (isYouTube) {
    return 'video';
  }
  if (isGitHub) {
    return 'external';
  }

  return 'external';
};

export type LinkType = 'external' | 'video' | 'tutorial' | 'code-only';

/**
 * Ordenamiento cronológico de repositorios
 */

export interface Repository {
  name: string;
  created_at: string;
  updated_at?: string;
  homepage?: string;
}

export const sortRepositories = (
  repos: Repository[],
  by: 'created_at' | 'updated_at' = 'created_at'
): Repository[] => {
  return [...repos].sort((a, b) => {
    const dateA = by === 'updated_at' ? a.updated_at || a.created_at : a.created_at;
    const dateB = by === 'updated_at' ? b.updated_at || b.created_at : b.created_at;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
};

export const groupByMonth = (repos: Repository[]): Record<string, Repository[]> => {
  return repos.reduce((acc, repo) => {
    const date = new Date(repo.created_at);
    const month = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(repo);
    return acc;
  }, {} as Record<string, Repository[]>);
};
