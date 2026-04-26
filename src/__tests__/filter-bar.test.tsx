import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { render, screen, waitFor, within } from '@testing-library/react'; // No usados en este test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from '../components/hud/filter-bar';

/**
 * Mock de framer-motion para desactivar animaciones en tests.
 */
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
      span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <div data-testid="animate-presence-root">{children}</div>,
  };
});

describe('FilterBar Component - ESCUDO DE REGRESIÓN v4.2', () => {
  const mockOnTopicToggle = vi.fn();
  const mockOnSearchChange = vi.fn();
  const mockOnClear = vi.fn();

  const defaultProps = {
    searchQuery: "",
    availableTopics: ['react', 'C#', 'java', 'javascript'],
    activeTopics: [],
    onTopicToggle: mockOnTopicToggle,
    onSearchChange: mockOnSearchChange,
    onClear: mockOnClear,
    filteredCount: 31,
    totalCount: 31
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * FASE 1: INTEGRIDAD ESTRUCTURAL
   */
  it('debe garantizar la presencia del Command Bar y el buscador', () => {
    render(<FilterBar {...defaultProps} />);
    const input = screen.getByPlaceholderText(/BUSCAR PROYECTO/i);
    expect(input).toBeInTheDocument();
  });

  /**
   * FASE 2: AUTOCOMPLETADO Y TECLADO
   */
  it('debe mostrar el dropdown de sugerencias cuando se fuerza su visibilidad', async () => {
    render(<FilterBar {...defaultProps} searchQuery="ja" _test_forceShowSuggestions={true} />);
    
    expect(screen.getByText(/Sugerencias_Filtro/i)).toBeInTheDocument();
    
    // Usamos getAllByText y verificamos que al menos uno contenga el texto (desambiguación manual)
    const javaElements = screen.getAllByText(/Java/i);
    expect(javaElements.length).toBeGreaterThan(0);
  });

  it('debe permitir seleccionar una sugerencia con el teclado', async () => {
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} searchQuery="ja" _test_forceShowSuggestions={true} />);
    
    const input = screen.getByPlaceholderText(/BUSCAR PROYECTO/i);
    await user.click(input); // Asegurar foco activo

    // Navegar: ArrowDown (selecciona la primera sugerencia, que es java) -> Enter
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    // Verificamos que se llamó a la función con el valor 'java' (normalizado)
    expect(mockOnTopicToggle).toHaveBeenCalledWith('java');
  });

  /**
   * FASE 3: INTERACCIÓN DE FILTROS
   */
  it('debe llamar a onTopicToggle al hacer click en un tag', async () => {
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} availableTopics={['react']} />);
    
    const tag = screen.getByText('React').closest('button');
    await user.click(tag!);
    
    expect(mockOnTopicToggle).toHaveBeenCalledWith('react');
  });
});

