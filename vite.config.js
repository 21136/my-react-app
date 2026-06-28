import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Day 64：文章 API（若你已配置可保留）
      "/api/posts": {
        target: "https://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
      // Day 89：AI 聊天流式 → 本地 Node 代理
      "/api/chat": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});