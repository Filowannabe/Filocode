import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '../components/hud/project-card';
import { ProjectSkeleton } from '../components/hud/project-skeleton';
import React from 'react';

// Mock de framer-motion para validar estructura
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, className, style, ...props }: any) => 
        React.createElement('div', { className, style, ...props, 'data-testid': 'motion-div' }, children),
      span: ({ children, className, ...props }: any) => 
        React.createElement('span', { className, ...props, 'data-testid': 'motion-span' }, children),
      button: ({ children, className, ...props }: any) => 
        React.createElement('button', { className, ...props, 'data-testid': 'motion-button' }, children),
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

describe('UI Fidelity Guard - HUD Layer', () => {
  const mockRepo = {
    id: 1,
    name: 'Fidelity Test',
    full_name: 'user/fidelity-test',
    description: 'Testing design and animations',
    stargazers_count: 100,
    forks_count: 10,
    watchers_count: 50,
    html_url: 'https://github.com',
    clone_url: 'https://github.com.git',
    topics: ['react', 'nextjs']
  };

  describe('ProjectCard Fidelity (v28)', () => {
    it('debe tener el borde rotatorio Aceternity (animate-spin-slow)', () => {
      const { container } = render(<ProjectCard repo={mockRepo} />);
      const border = container.querySelector('.animate-spin-slow');
      expect(border).toBeInTheDocument();
    });

    it('iconos de stats deben usar CSS nativo y NO Framer Motion para evitar congelamiento', () => {
      const { container } = render(<ProjectCard repo={mockRepo} />);
      
      const starWrapper = container.querySelector('.animate-wiggle');
      const eyeWrapper = container.querySelector('.animate-soft-pulse');
      
      expect(starWrapper).toBeInTheDocument();
      expect(eyeWrapper).toBeInTheDocument();
      
      // Validar que no son motion components (no tienen el data-testid del mock)
      expect(starWrapper?.getAttribute('data-testid')).not.toBe('motion-div');
      expect(eyeWrapper?.getAttribute('data-testid')).not.toBe('motion-div');
    });

    it('debe mantener el redondeado interior premium de 15px', () => {
      const { container } = render(<ProjectCard repo={mockRepo} />);
      const inner = container.querySelector('.rounded-\\[15px\\]');
      expect(inner).toBeInTheDocument();
    });

    it('debe renderizar los tags como Pills Premium redondeadas', () => {
      render(<ProjectCard repo={mockRepo} />);
      const tag = screen.getByText('React'); // formatTechName('react') devuelve 'React'
      expect(tag.className).toContain('rounded-full');
      expect(tag.className).toContain('bg-(--color-primary)/5');
    });
  });

  describe('Skeleton Mirror Integrity', () => {
    it('ProjectSkeleton debe copiar el layout exacto de la Card', () => {
      const { container } = render(<ProjectSkeleton />);
      expect(container.querySelector('.rounded-lg.p-\\[1px\\]')).toBeInTheDocument();
      expect(container.querySelector('.rounded-\\[15px\\].bg-\\[\\#020202\\]')).toBeInTheDocument();
    });
  });
});
