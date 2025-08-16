import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // CRA's default build output
  },
  esbuild: {
    include: /\.[jt]sx?$/,
    exclude: [],
    loader: 'jsx',
  },
});