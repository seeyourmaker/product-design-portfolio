import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://seeyourmaker.github.io/product-design-portfolio/
export default defineConfig({
  base: '/product-design-portfolio/',
  plugins: [react()],
})
