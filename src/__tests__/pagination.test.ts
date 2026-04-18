import { describe, it, expect } from 'vitest';
import { calculateNextPage, formatPaginationProgress } from '@/utils/pagination';

describe('Pagination Utilities', () => {
  describe('calculateNextPage', () => {
    it('should identify the last page when batch size is less than perPage', () => {
      const result = calculateNextPage(15, 5, { limit: 100, perPage: 10, currentPage: 2 });
      expect(result.isLastPage).toBe(true);
      expect(result.nextPage).toBe(2);
    });

    it('should increment page when not at limit and batch is full', () => {
      const result = calculateNextPage(10, 10, { limit: 100, perPage: 10, currentPage: 1 });
      expect(result.isLastPage).toBe(false);
      expect(result.nextPage).toBe(2);
    });

    it('should respect the limit', () => {
      const result = calculateNextPage(100, 10, { limit: 100, perPage: 10, currentPage: 10 });
      expect(result.isLastPage).toBe(true);
      expect(result.remainingItems).toBe(0);
    });
  });

  describe('formatPaginationProgress', () => {
    it('should return 0 when total is 0', () => {
      expect(formatPaginationProgress(10, 0)).toBe(0);
    });

    it('should return percentage', () => {
      expect(formatPaginationProgress(50, 200)).toBe(25);
    });

    it('should cap at 100', () => {
      expect(formatPaginationProgress(150, 100)).toBe(100);
    });
  });
});
