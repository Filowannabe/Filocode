import { useTopics as useTopicsContext } from '@/contexts/use-topics';

/**
 * Hook que importa directamente del Context
 * No necesita props - gestiona el estado global del tema
 */
export function useTopics(): ReturnType<typeof useTopicsContext> {
  return useTopicsContext();
}
