import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor, act } from '@testing-library/react';
import { render } from '@testing-library/react';
import { RepoFetcher } from './RepoFetcher';

const MOCK_REPO_DATA: Array<{
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  html_url: string;
  clone_url: string;
  topics: string[] | null;
}> = [
  { id: 1, name: 'repo-1', full_name: 'filocode/repo-1', description: 'Repo 1', stargazers_count: 10, forks_count: 5, watchers_count: 10, html_url: 'https://github.com/filocode/repo-1', clone_url: 'git@github.com:filocode/repo-1.git', topics: ['react', 'typescript'] },
];

function createMockResponse(data: unknown): Promise<Response> {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    json: () => Promise.resolve(data),
  } as unknown as Response);
}

describe('RepoFetcher Component - Component Testing', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Mock fetch global para evitar llamadas a GitHub API real
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(() => 
      createMockResponse(MOCK_REPO_DATA)
    );
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  test('Muestra botón de "Iniciar Escaneo" al renderizar', () => {
    render(<RepoFetcher initialLimit={10} />);
    expect(screen.getByRole('button', { name: /iniciar_secuencia_escaneo/i })).toBeInTheDocument();
  });

  test('Muestra estado de escaneo al hacer click', async () => {
    render(<RepoFetcher initialLimit={5} />);
    const startButton = screen.getByRole('button', { name: /iniciar_secuencia_escaneo/i });
    
    await act(async () => {
      startButton.click();
    });
    
    // Debug: verificar que fetch fue llamado (comentar en producción)
     // console.log('Fetch llamado:', fetchSpy.mock.calls.length);
    
    // La llamada a fetch debería resolverse inmediatamente gracias al mock
    await waitFor(() => {
      expect(screen.getByText(/database_synchronized/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
