import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './project-card';

vi.mock('framer-motion', () => {
  // Mock que filtra props de animación no soportadas por JSDOM
  const MotionComponent = React.forwardRef<any, any>(({ children, className, style, ...props }: any) => {
    // Filtrar props que causan warnings en JSDOM (framer-motion props)
    const filteredProps: any = {};
    
    // Copiar solo props válidas para elementos DOM
    Object.keys(props).forEach(key => {
      if (!['whileHover', 'whileTap', 'whileInView', 'initial', 'animate', 'transition', 'exit', 'layout', 'layoutId', 'layoutProps', 'custom', 'viewport', 'drag', 'dragElastic', 'dragMomentum', 'onDrag', 'onDragStart', 'onDragEnd', 'onDragUpdate', 'onLayout', 'style'].includes(key)) {
        filteredProps[key] = props[key];
      }
    });
    
    // Elementos motion específicos pueden necesitar treatment diferente
    return React.createElement('div', { className, style, ...filteredProps }, children);
  });
  MotionComponent.displayName = 'MockMotionComponent';

  const AnimatePresence = React.forwardRef(({ children }: any) => React.createElement('div', null, children));
  AnimatePresence.displayName = 'MockAnimatePresence';

  const Layout = React.forwardRef(({ children }: any) => React.createElement('div', null, children));
  Layout.displayName = 'MockLayout';

  const Value = React.forwardRef(({ value, children }: any) => React.createElement('div', { key: value }, children));
  Value.displayName = 'MockValue';

  const mockMotion = {
    div: MotionComponent,
    span: MotionComponent,
    button: MotionComponent,
    component: MotionComponent,
    AnimatePresence,
    Layout,
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

      // Validar que los textos de los topics están presentes (formatTechName capitaliza)
      expect(screen.getByText('React')).toBeInTheDocument(); // formatTechName('react') → 'React'
      expect(screen.getByText('TypeScript')).toBeInTheDocument(); // formatTechName('typescript') → 'TypeScript'
      expect(screen.getByText('Next.js')).toBeInTheDocument(); // formatTechName('nextjs') → 'Next.js'
      
      // Validar que cada topic tiene su propio elemento tag con clase rounded-full
      // Buscamos por el texto y verificamos que el elemento contenedor tenga la clase
      const reactTag = screen.getByText('React');
      const tsTag = screen.getByText('TypeScript');
      const nextTag = screen.getByText('Next.js');
      
      expect(reactTag.className).toContain('rounded-full');
      expect(tsTag.className).toContain('rounded-full');
      expect(nextTag.className).toContain('rounded-full');
    });
});
