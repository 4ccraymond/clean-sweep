import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Removed invalid <meta> tag as it does not belong in a TypeScript file


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
