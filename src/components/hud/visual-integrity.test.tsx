import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './project-card';
import { ProjectSkeleton } from './project-skeleton';
import React from 'react';

describe('Integridad Visual y Estructural - HUD Layer', () => {
  const mockRepo = {
    id: 1,
    name: 'Test Repo',
    full_name: 'user/test-repo',
    description: 'Test description',
    stargazers_count: 10,
    forks_count: 5,
    watchers_count: 2,
    html_url: 'https://github.com/user/test-repo',
    clone_url: 'https://github.com/user/test-repo.git',
    topics: ['react', 'tailwind']
  };

  it('ProjectCard debe tener la estructura PRO-MAX (Glow, Border, Tags)', () => {
    const { container } = render(<ProjectCard repo={mockRepo} />);
    
    // Validar el contenedor principal con redondeado 2xl y padding de borde
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('rounded-2xl');
    expect(card.className).toContain('p-[1px]');

    // Validar presencia del gradiente cónico (Borde Animado)
    const border = container.querySelector('div[style*="conic-gradient"]');
    expect(border).toBeInTheDocument();
    
    // Validar que el borde tiene la animación nativa o de motion
    expect(border?.className).toMatch(/animate-spin-slow|mock-motion/);

    // Validar redondeado interior
    const content = container.querySelector('.bg-\\[\\#020202\\]');
    expect(content?.className).toContain('rounded-[15px]');

    // Validar estilo de los tags (Pills Premium) - Soporta ambas nomenclaturas de TW4
    const tag = screen.getByText('react');
    expect(tag.className).toContain('rounded-full');
    expect(tag.className).toMatch(/bg-primary\/5|bg-\(--color-primary\)\/5/);
  });

  it('ProjectSkeleton debe ser un espejo exacto de ProjectCard', () => {
    const { container } = render(<ProjectSkeleton />);
    
    // Validar que el skeleton tiene la misma estructura de bordes
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.className).toContain('rounded-2xl');
    expect(skeleton.className).toContain('p-[1px]');

    const inner = container.querySelector('.bg-\\[\\#020202\\]');
    expect(inner?.className).toContain('rounded-[15px]');

    // Validar que los tags en el skeleton también son redondeados
    const tags = container.querySelectorAll('.rounded-full');
    expect(tags.length).toBeGreaterThan(0);
  });
});
