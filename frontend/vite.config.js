import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],

  

  /* ✅ ADD BELOW (iPhone Safari compatibility) */
  build: {
    target: ['es2015'],        // iPhone Safari safe
    cssTarget: 'chrome61',     // prevents CSS crash on iOS
     sourcemap: false,
  },

  esbuild: {
    target: 'es2015',          // forces safe JS output
  },
})
