/**
 * Utilidad de paginación para servicios de API (Issue #1)
 */

export interface PaginationOptions {
  limit: number;
  perPage: number;
  currentPage: number;
}

export interface PaginationResult {
  nextPage: number;
  isLastPage: boolean;
  remainingItems: number;
}

/**
 * Calcula el siguiente paso de la paginación
 */
export function calculateNextPage(
  fetchedSoFar: number,
  lastBatchSize: number,
  options: PaginationOptions
): PaginationResult {
  const { limit, perPage, currentPage } = options;
  
  const totalFetched = fetchedSoFar;
  const isLastPage = lastBatchSize < perPage || totalFetched >= limit;
  const remainingItems = Math.max(0, limit - totalFetched);
  
  return {
    nextPage: isLastPage ? currentPage : currentPage + 1,
    isLastPage,
    remainingItems
  };
}

/**
 * Formatea el offset para logs o UI
 */
export function formatPaginationProgress(current: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
}
