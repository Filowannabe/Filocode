import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Home from '../../app/page';
import { TopicsProvider } from '../../contexts/use-topics';

// Mock translations and icons since we only care about styles here
vi.mock('../../lib/i18n-client', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
}));

describe('Performance Architecture Validation', () => {
  it('should have content-visibility: auto on critical sections', () => {
    const { container } = render(
      <TopicsProvider repositories={[]}>
        <Home />
      </TopicsProvider>
    );
    
    // Check for sections with performance attributes
    const sections = container.querySelectorAll('section, footer');
    let foundOptimized = 0;
    
    sections.forEach(section => {
      const className = section.className;
      if (className.includes('content-visibility:auto') || className.includes('content-visibility-auto')) {
        foundOptimized++;
      }
    });

    expect(foundOptimized).toBeGreaterThanOrEqual(4);
  });

  it('should have contain-intrinsic-size on critical sections', () => {
    const { container } = render(
      <TopicsProvider repositories={[]}>
        <Home />
      </TopicsProvider>
    );
    
    const sections = container.querySelectorAll('section, footer');
    let foundIntrinsicSize = 0;
    
    sections.forEach(section => {
      const className = section.className;
      if (className.includes('contain-intrinsic-size') || className.includes('contain-intrinsic-size')) {
        foundIntrinsicSize++;
      }
    });

    expect(foundIntrinsicSize).toBeGreaterThanOrEqual(4);
  });
});
