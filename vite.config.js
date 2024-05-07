import { defineConfig } from 'vite'
import { dependencies } from './package.json';
import react from '@vitejs/plugin-react-swc';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router', 'react-router-dom', 'react-dom', 'jwt-decode', 'dayjs'].includes(key)) return;
    if (key.startsWith('@')) return
    chunks[key] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router', 'react-router-dom', 'react-dom', 'jwt-decode'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled', '@fontsource/roboto'],
          report: ['dayjs', '@mui/x-date-pickers'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true
  },
  preview: {
    port: 80,
    strictPort: true,
    host: true
  }
})