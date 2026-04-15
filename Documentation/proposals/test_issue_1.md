# 🧪 Propuesta de Test Issue #1 — Ciclo TDD

**Fecha**: 14 de abril, 2026  
**Issue**: #1 — Fetch masivo de repositorios (100 items)  
**Fase**: TDD — Test First  
**Herramienta**: Vitest (recomendado) o Jest  
**Archivo**: `src/services/githubApi.test.ts`

---

## 🎯 Objetivo

Definir el **PRIMER TEST** que validará la implementación de `githubApi.ts` siguiendo el flujo TDD:

1. **RED**: Test que falla (sin implementación)
2. **GREEN**: Implementación mínima para hacer pasar el test
3. **REFACTOR**: Mejora con confianza (testes como red de seguridad)

---

## 📋 Contexto Técnico

### Mock de GitHub API (Respuesta Exitosa)

```typescript
const mockSuccessResponse = {
  total_count: 100,
  incomplete_results: false,
  repositories: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `repo-${i + 1}`,
    full_name: `user/repo-${i + 1}`,
    description: `Repositorio ${i + 1}`,
    stargazers_count: Math.floor(Math.random() * 1000),
    forks_count: Math.floor(Math.random() * 100),
    html_url: `https://github.com/user/repo-${i + 1}`,
    clone_url: `git@github.com:user/repo-${i + 1}.git`,
    topics: ['typescript', 'react', 'nodejs']
  }))
};
```

### Datos Requeridos por Issue #1

| Campo | Fuente API |
|-------|-----------|
| Nombre | `name` / `full_name` |
| Descripción | `description` |
| Estrellas | `stargazers_count` |
| Forks | `forks_count` |
| URL | `html_url` |
| URL Clon | `clone_url` |
| Topics | `topics[]` |

---

## ✅ TEST 1: Fetch Exitoso de 100 Items

**Nombre del Test**: `fetchRepositoriosGitHub retorna datos completos exitosamente`

**Caso de Prueba**: Verifica que la función `fetchRepositoriosGitHub` recupera correctamente 100 items de repositorios de GitHub.

### Código del Test

```typescript
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fetchRepositoriosGitHub } from '../src/services/githubApi';

describe('githubApi - fetchRepositoriosGitHub', () => {
  beforeEach(() => {
    // Resetear fetch global para cada test
    global.fetch = vi.fn();
  });

  test('fetchRepositoriosGitHub retorna 100 items exitosos', async () => {
    // 1. ARRANGE: Mockear respuesta exitosa con 100 items
    const mockResponse = {
      total_count: 100,
      incomplete_results: false,
      repositories: Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `repo-${i + 1}`,
        full_name: `user/repo-${i + 1}`,
        description: `Repositorio ${i + 1}`,
        stargazers_count: i * 10,
        forks_count: i * 5,
        html_url: `https://github.com/user/repo-${i + 1}`,
        clone_url: `git@github.com:user/repo-${i + 1}.git`,
        topics: ['typescript', 'react', 'nodejs']
      }))
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse
    });

    // 2. ACT: Ejecutar función bajo prueba
    const result = await fetchRepositoriosGitHub('user');

    // 3. ASSERT: Verificar comportamiento esperado
    expect(result).toHaveLength(100);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'repo-1',
          full_name: 'user/repo-1',
          description: 'Repositorio 1',
          stargazers_count: expect.any(Number),
          forks_count: expect.any(Number),
          html_url: expect.any(String),
          clone_url: expect.any(String),
          topics: expect.any(Array)
        })
      ])
    );

    // Verificar que se llamó a fetch con parámetros correctos
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/api\.github\.com\/users\/user\/repos\?per_page=100$/),
      expect.any(Object) // headers con Accept: application/vnd.github.v3+json
    );
  });
});
```

---

## 🧪 TEST 2: Manejo de Rate Limit (403) - TEST ADICIONAL

**Nombre del Test**: `fetchRepositoriosGitHub lanza error ante Rate Limit (403)`

**Caso de Prueba**: Verifica que la función maneja correctamente el error de Rate Limit de GitHub API.

### Código del Test

```typescript
test('fetchRepositoriosGitHub lanza error ante Rate Limit (403)', async () => {
  // ARRANGE: Mockear respuesta con error 403
  const mockErrorResponse = {
    message: 'API rate limit exceeded for user. (But here\'s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details)',
    documentation_url: 'https://docs.github.com/rest/overview/rate-limits#rate-limiting'
  };

  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    json: async () => mockErrorResponse
  });

  // ACT + ASSERT: Verificar que se lanza excepción
  await expect(fetchRepositoriosGitHub('user')).rejects.toThrow(
    'API rate limit exceeded'
  );

  // Verificar que se llamó a fetch
  expect(fetch).toHaveBeenCalledWith(
    expect.stringMatching(/^https:\/\/api\.github\.com\/users\/user\/repos\?per_page=100$/)
  );
});
```

---

## 📦 Setup del Proyecto

### Instalación de Vitest (recomendado)

```bash
# Instalar Vitest y tipos
yarn add -D vitest @types/node

# Actualizar package.json
yarn build
```

### Actualización de package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

### Crear `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    setupFiles: ['./src/test/setup.ts'],
  }
});
```

### Setup File (`src/test/setup.ts`)

```typescript
// Mock de fetch (si no se usa vi.fn() en cada test)
vi.mock('node-fetch', () => ({
  default: vi.fn()
}));

// Mock de Node.js globals
global.process = process;
global.Buffer = Buffer;
global.crypto = {
  getRandomValues: (buffer: Uint8Array) => {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    return buffer;
  }
};
```

---

## 🎯 Criterios de Aceptación del Test

- [ ] Test se ejecuta sin errores
- [ ] Test pasa con mock de respuesta exitosa (200 OK)
- [ ] Test pasa con mock de Rate Limit (403 Forbidden)
- [ ] Verifica que se llama a GitHub API con parámetros correctos
- [ ] Verifica estructura de datos retornada
- [ ] No hay llamadas reales a GitHub API durante tests
- [ ] Test es independiente y reproducible

---

## 📊 Estrategia de Paginación (Para Tests Futuros)

### Test 3: Paginación Automática (Fase 2)

```typescript
test('fetchRepositoriosGitHub maneja paginación automática', async () => {
  // Mock de 3 páginas (50 items cada una)
  const mockPages = [
    { total_count: 150, repositories: Array.from({ length: 50 }, (_, i) => ({ id: i })) },
    { total_count: 150, repositories: Array.from({ length: 50 }, (_, i) => ({ id: i + 50 })) },
    { total_count: 150, repositories: Array.from({ length: 50 }, (_, i) => ({ id: i + 100 })) },
  ];

  global.fetch
    .mockResolvedValueOnce({ ok: true, json: async () => mockPages[0] })
    .mockResolvedValueOnce({ ok: true, json: async () => mockPages[1] })
    .mockResolvedValueOnce({ ok: true, json: async () => mockPages[2] });

  const result = await fetchRepositoriosGitHub('user');

  expect(result).toHaveLength(150); // Total de items, no 50
  expect(fetch).toHaveBeenCalledTimes(3); // 3 llamadas a API
});
```

---

## 🚦 Flujo TDD (Para Implementación)

```
┌─────────────────┐
│   TEST 1 (RED)  │ ← Test falla (sin implementación)
└────────┬────────┘
         ↓
┌─────────────────┐
│   TEST 2 (RED)  │ ← Test de error 403 falla
└────────┬────────┘
         ↓
┌─────────────────┐
│ IMPLEMENTACIÓN  │ ← Código mínimo para pasar TEST 1
└────────┬────────┘
         ↓
┌─────────────────┐
│ TEST 1 (GREEN)  │ ← Test pasa ✅
└────────┬────────┘
         ↓
┌─────────────────┐
│ IMPLEMENTACIÓN  │ ← Código mínimo para pasar TEST 2
└────────┬────────┘
         ↓
┌─────────────────┐
│ TEST 2 (GREEN)  │ ← Test de error pasa ✅
└────────┬────────┘
         ↓
┌─────────────────┐
│    REFACTOR     │ ← Mejorar sin miedo (tests como red)
└─────────────────┘
```

---

## 📝 Notas de Implementación

### 1. Tipado Estricto

```typescript
// Definir interfaces antes de implementar
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  clone_url: string;
  topics: string[];
}
```

### 2. Manejo de Errores

```typescript
class GitHubAPIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}
```

### 3. Backoff Exponencial (Para Rate Limit)

```typescript
async function withRateLimit<T>(
  fn: () => Promise<T>,
  maxRetries = 5
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}
```

---

## ✅ Próximos Pasos (Post-Aprobación)

1. **Crear** `src/services/githubApi.ts` (implementación)
2. **Crear** `src/services/githubApi.test.ts` (tests)
3. **Ejecutar** `yarn test` para validar
4. **Refactorizar** si es necesario

---

## 📌 Referencias

- [Vitest Documentation](https://vitest.dev/)
- [Vitest Mocks](https://vitest.dev/guide/mocks)
- [GitHub API Rate Limiting](https://docs.github.com/rest/overview/rate-limits)
- [TDD Red-Green-Refactor](https://martinfowler.com/bliki/RedGreenRefactor.html)

---

**⏸️ ESTADO: PROPUESTA PENDIENTE DE APROBACIÓN**

**Para proceder con la creación de archivos en `src/`:**
```
APROBADO: Inicia Ciclo TDD Issue #1
```

---

*Documento generado como parte de la implementación de Issue #1 bajo protocolo TDD v2.5.*
