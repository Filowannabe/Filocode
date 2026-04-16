import type { TransformOptions } from 'esbuild';

export default function esbuildPlugin(): TransformOptions {
  return {
    loader: 'tsx',
    tsconfigRaw: {
      compilerOptions: {
        jsx: 'react-jsx',
      },
    },
  };
}
