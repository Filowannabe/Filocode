// Mock de fetch y globals para Vitest
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.mock('node-fetch', () => ({
  default: vi.fn()
}));

// Mock de Node.js globals
global.process = process;
global.Buffer = Buffer;

// Fix: crypto es read-only en algunos entornos, usamos defineProperty
const mockCrypto = {
  getRandomValues: (buffer: Uint8Array) => {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    return buffer;
  }
};

Object.defineProperty(global, 'crypto', {
  value: mockCrypto,
  writable: true,
  configurable: true
});

// Mock de localStorage para entorno JSDOM
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    key: (index: number) => Object.keys(store)[index] || null,
    get length() { return Object.keys(store).length; }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock de window.scrollTo para evitar errores en tests de UI
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});
