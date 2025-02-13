import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      host: true, // Ensure the server is accessible from outside the container
      port: 5174, 
      watch: {
        usePolling: true, // Necessary for Docker to detect file changes
      },
    },
  });
};
