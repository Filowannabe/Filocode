import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-syntax-jsx'],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    env: {
      TZ: 'America/Bogota',
    },
    include: [
      'src/__tests__/**/*.test.tsx',
      'src/__tests__/**/*.test.ts',
      'src/components/**/*.test.tsx',
    ],
    setupFiles: [
      'src/__tests__/setup.tsx',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
