import '@testing-library/jest-dom/vitest';
import { vi, beforeEach } from 'vitest';

// Mock de localStorage para entorno JSDOM
let localStorageStore: Record<string, string> = {};

const localStorageMock = {
  store: localStorageStore,
  getItem: (key: string) => localStorageStore[key] || null,
  setItem: (key: string, value: string) => { localStorageStore[key] = value.toString(); },
  removeItem: (key: string) => { delete localStorageStore[key]; },
  clear: () => { localStorageStore = {}; },
  key: (index: number) => Object.keys(localStorageStore)[index] || null,
  get length() { return Object.keys(localStorageStore).length; }
};

declare global {
  interface Window {
    localStorage: typeof localStorageMock;
  }
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock de Node.js globals
global.process = process;
global.Buffer = Buffer;
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (buffer: Uint8Array) => {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor(Math.random() * 256);
      }
      return buffer;
    }
  },
  writable: true,
  configurable: true
});

// Mock de fetch
vi.mock('node-fetch', () => ({
  default: vi.fn()
}));

// Mock de window.scrollTo para evitar errores en tests de UI
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});

// Reset localStorage mock before each test
beforeEach(() => {
  Object.keys(localStorageStore).forEach((key: string) => {
    delete localStorageStore[key];
  });
});
