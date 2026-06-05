// Vite config — declares the plugins our project needs.
// react()       → enables JSX + Fast Refresh (HMR for React)
// tailwindcss() → processes Tailwind directives in our CSS

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
