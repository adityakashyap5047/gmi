import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allows external access (e.g., via ngrok)
    allowedHosts: ['9fa2-2409-40e5-b8-d8a8-7cad-c685-ac44-9e85.ngrok-free.app'], // your ngrok URL
  },
});
