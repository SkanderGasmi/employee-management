import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // <- Use localhost, not 'backend'
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api') // optional, keeps /api
      }
    }
  }
});
