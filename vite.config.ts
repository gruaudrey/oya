import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'import.meta.env.VITE_MISTRAL_KEY': JSON.stringify(env.VITE_MISTRAL_KEY),
      'import.meta.env.VITE_N8N_WEBHOOK': JSON.stringify(env.VITE_N8N_WEBHOOK),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3008,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/n8n-webhook': {
          target: 'http://localhost:5678',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/n8n-webhook/, ''),
        },
      },
    },
  };
});
