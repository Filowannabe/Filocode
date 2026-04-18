import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './project-card';

vi.mock('framer-motion', () => {
  const MotionComponent = ({ children, className, ...props }: any) => {
    // Pasar todas las props y clases para que los tests las vean
    return React.createElement('div', { className, ...props }, children);
  };

  const mockMotion = {
    div: MotionComponent,
    span: MotionComponent,
    button: MotionComponent,
    component: MotionComponent,
    AnimatePresence: vi.fn(({ children }) => children),
    Layout: vi.fn(({ children }) => children),
  };
  
  return {
    ...mockMotion,
    motion: mockMotion,
    useMotionValue: vi.fn(() => ({ set: vi.fn(), get: vi.fn() })),
    useSpring: vi.fn((val) => val),
  };
});

describe('ProjectCard Component - HUD', () => {
  const mockRepo = {
    id: 1,
    name: 'Awesome React App',
    full_name: 'user/awesome-react-app',
    description: 'A React application with TypeScript',
    stargazers_count: 150,
    forks_count: 20,
    watchers_count: 5,
    html_url: 'https://github.com/user/awesome-react-app',
    clone_url: 'https://github.com/user/awesome-react-app.git',
    topics: ['react', 'typescript', 'nextjs']
  };

  it('debe renderizar los topics correctamente en el diseño premium', () => {
    render(<ProjectCard repo={mockRepo} />);

    // Validar que los textos de los topics están presentes
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText('nextjs')).toBeInTheDocument();
    
    // Validar que tienen la clase de Pills redondeadas
    const tags = screen.getAllByText(/react|typescript|nextjs/);
    tags.forEach(tag => {
      expect(tag.className).toContain('rounded-full');
    });
  });
});
