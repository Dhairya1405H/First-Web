import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleBackendApi } from './server/apiRouter';

function backendApiPlugin(): Plugin {
  return {
    name: 'ecoquest-backend-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          handleBackendApi(req, res);
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), backendApiPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    open: false,
    host: true,
  },
});
