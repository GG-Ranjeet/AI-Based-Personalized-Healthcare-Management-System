import { defineConfig, loadEnv } from 'vite' // 1. Import loadEnv here
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'

// 2. Change the export to a function that takes the current 'mode' (development/production)
export default defineConfig(({ mode }) => {
  // 3. Load the environment variables from the process
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
    ],
    server: {
      watch: {
        usePolling: true,
      },
      proxy: {
        '/api': {
          target: env.VITE_PROXY_API_TARGET || 'http://localhost:5000',
          changeOrigin: true,
        }
      },
      open: false
    }
  }
})
