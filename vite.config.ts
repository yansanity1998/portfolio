import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

function copyPreviewImage() {
  const src = path.resolve(__dirname, 'src/assets/ian.jpg');
  const dest = path.resolve(__dirname, 'public/ian.jpg');
  try {
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  } catch {
    // fallback
  }
}

copyPreviewImage();


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
