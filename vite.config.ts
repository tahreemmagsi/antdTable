import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Makes all paths relative for Salesforce
  build: {
    outDir: "dist",
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        format: 'iife', // Build as IIFE instead of ES modules
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})