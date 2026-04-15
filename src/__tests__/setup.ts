import { vi } from 'vitest';

// Setup file para Vitest
// Los mocks de fetch se manejan en cada test

// Mock de console para reducir ruido en tests
const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

export function silenceLogs() {
  console.log = (vi as any).fn();
  console.error = (vi as any).fn();
  console.warn = (vi as any).fn();
}

export function restoreLogs() {
  console.log = originalLog;
  console.error = originalError;
  console.warn = originalWarn;
}
