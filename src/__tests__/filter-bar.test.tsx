import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../components/hud/filter-bar';

const mockTheme = {
  bg: '#fbb03b',
  text: '#000000',
  activeBg: '#fbb03b',
  activeText: '#000000',
  border: '#fbb03b'
};

describe('FilterBar Component - SINGLE SELECT', () => {
  it('debe renderizar con [ ALL ] como filtro inicial', () => {
    const availableTopics = ['react', 'typescript', 'node'];
    const setActiveTopic = vi.fn();
    
    const { rerender } = render(
      <FilterBar 
        availableTopics={availableTopics}
        activeTopic={null}
        onTopicChange={setActiveTopic}
        theme={mockTheme}
      />
    );
    
    expect(screen.getByText('[ ALL ]')).toBeInTheDocument();
    
    // Simular click y re-render
    fireEvent.click(screen.getByText('[ ALL ]'));
    rerender(
      <FilterBar 
        availableTopics={availableTopics}
        activeTopic={null}
        onTopicChange={setActiveTopic}
        theme={mockTheme}
      />
    );
    
    expect(screen.getByText('[ ALL ]')).toHaveAttribute('data-active', 'true');
  });

  it('debe mostrar el topic activo al hacer click en [ ALL ]', () => {
    const availableTopics = ['react', 'typescript', 'node'];
    const setActiveTopic = vi.fn();
    
    const { rerender } = render(
      <FilterBar 
        availableTopics={availableTopics}
        activeTopic={null}
        onTopicChange={setActiveTopic}
        theme={mockTheme}
      />
    );
    
    const allButton = screen.getByText('[ ALL ]');
    fireEvent.click(allButton);
    
    // Re-render con el nuevo estado
    rerender(
      <FilterBar 
        availableTopics={availableTopics}
        activeTopic={null}
        onTopicChange={setActiveTopic}
        theme={mockTheme}
      />
    );
    
    expect(allButton).toHaveAttribute('data-active', 'true');
  });

  it('debe mostrar el topic seleccionado al hacer click en un topic', async () => {
    const availableTopics = ['react', 'typescript', 'node'];
    const setActiveTopic = vi.fn();
    
    const { rerender } = render(
      <FilterBar 
        availableTopics={availableTopics}
        activeTopic={null}
        onTopicChange={setActiveTopic}
        theme={mockTheme}
      />
    );
    
    const reactButton = screen.getByText('[ react ]');
    fireEvent.click(reactButton);
    
    // Re-render con el nuevo estado
    rerender(
      <FilterBar 
        availableTopics={availableTopics}
        activeTopic='react'
        onTopicChange={setActiveTopic}
        theme={mockTheme}
      />
    );
    
    expect(reactButton).toHaveAttribute('data-active', 'true');
    const allButton = screen.getByText('[ ALL ]');
    expect(allButton).not.toHaveAttribute('data-active', 'true');
  });

  it('debe mostrar todos los topics disponibles', () => {
    const availableTopics = ['react', 'typescript', 'node'];
    const setActiveTopic = vi.fn();
    
    render(
      <FilterBar 
        availableTopics={availableTopics}
        activeTopic={null}
        onTopicChange={setActiveTopic}
        theme={mockTheme}
      />
    );
    
    expect(screen.getByText('[ react ]')).toBeInTheDocument();
    expect(screen.getByText('[ typescript ]')).toBeInTheDocument();
    expect(screen.getByText('[ node ]')).toBeInTheDocument();
  });
});
