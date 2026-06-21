import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages のプロジェクトページ配信のため、本番ビルド時のみ base をリポジトリ名にする。
// ローカル開発(dev)では '/' のままにして http://localhost:5173/ で開けるようにする。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Gobblet-Gobblers/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
