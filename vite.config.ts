import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
    // Target is your backend API
      '/api': {
          target: 'http://localhost:8080', 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          
          configure: (proxy, options) => {
             proxy.on('error', (err, _req, _res) => {
              console.log('error', err);
             });
             proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Request sent to target:', req.method, req.url);
             });
             proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Response received from target:', proxyRes.statusCode, req.url);
             });
       },
    },
    },
  },
})
