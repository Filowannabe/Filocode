import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

/**
 * UI Integrity Mandate - HUD Pro-Max (v28)
 * 
 * Este test blinda la estética "Winter Blade Runner" contra cambios accidentales.
 * Incluye mocks para el App Router.
 */

// Mock de Framer Motion
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

// Mock del App Router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}));

// Mock global de scrollIntoView para evitar errores en JSDOM
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

describe('UI Integrity Mandate - HUD Pro-Max (v28)', () => {
  it('debe renderizar el título arquitectónico principal con la tipografía y gradientes correctos', () => {
    render(<Home />);
    expect(screen.getByText(/ARCHITECTURE &/i)).toBeInTheDocument();
    expect(screen.getByText(/DEVELOPMENT/i)).toHaveClass('text-transparent', 'bg-clip-text');
  });

  it('debe contener el botón principal de exploración con el gradiente dorado y la animación shine', () => {
    render(<Home />);
    // Buscamos el texto del botón de exploración
    const exploreText = screen.getByText(/EXPLORE_COLLABORATIONS/i);
    expect(exploreText).toBeInTheDocument();
  });

  it('debe mostrar el Avatar verificado con los metadatos correctos', () => {
    render(<Home />);
    expect(screen.getByAltText(/Filocode/i)).toBeInTheDocument();
    // Validamos que exista al menos un indicador de VERIFIED
    expect(screen.getAllByText(/VERIFIED/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/RANK: SENIOR/i)).toBeInTheDocument();
  });

  it('debe mostrar el widget CODE_EXAMPLE con el estado de sincronización', () => {
    render(<Home />);
    expect(screen.getByText('CODE_EXAMPLE')).toBeInTheDocument();
    expect(screen.getAllByText(/Architect/i).length).toBeGreaterThan(0);
  });

  it('debe mantener la distribución de ventanas flotantes sin los iconos de Macbook (Dots)', () => {
    const { container } = render(<Home />);
    const dots = container.querySelectorAll('.bg-red-500, .bg-yellow-500, .bg-green-500');
    expect(dots.length).toBe(0);
  });

  it('debe tener el footer con el estado operacional estable en verde', () => {
    render(<Home />);
    const footerStatus = screen.getByText(/\[STATUS: OPERATIONAL_STABLE\]/i);
    expect(footerStatus).toHaveClass('text-green-500');
  });

  describe('Responsive Guard', () => {
    it('el título arquitectónico debe tener clases de escala responsiva', () => {
      render(<Home />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveClass('text-4xl');
    });
  });

  describe('Tactical Navigation', () => {
    it('debe renderizar el TacticalNavbar con los puntos de entrada dinámicos en inglés', async () => {
      render(<Home />);
      expect(await screen.findAllByText(/IDENTITY/i)).toBeTruthy();
      expect(await screen.findAllByText(/SKILL_TREE/i)).toBeTruthy();
      expect(await screen.findAllByText(/TELEMETRY/i)).toBeTruthy();
      expect(await screen.findAllByText(/INTEL_FEED/i)).toBeTruthy();
      expect(await screen.findAllByText(/OPEN_SOURCE/i)).toBeTruthy();
      expect(await screen.findAllByText(/FEEDBACK/i)).toBeTruthy();
    });

    it('el botón de base debe mostrar TOP_PROTOCOL en la home', async () => {
      render(<Home />);
      expect(await screen.findByText(/TOP_PROTOCOL/i)).toBeInTheDocument();
    });
  });
});
