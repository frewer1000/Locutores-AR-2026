
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  define: {
    // Inyectamos las variables de entorno necesarias para el funcionamiento del cliente
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY || ''),
    'process.env.MP_ACCESS_TOKEN': JSON.stringify(process.env.MP_ACCESS_TOKEN || '')
  },
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
});
