import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // JSX 호환 파일 포함 설정
      include: "**/*.{jsx,js}",
    }),
  ],

  base: "/",

  server: {
    port: 3000,
    host: 'localhost',
    proxy: {
      // ── 여기 추가: /api → 8000 FastAPI 서버로 프록시
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        // backend가 /api 프리픽스를 그대로 기대하므로 rewrite 불필요
        // 필요 시: rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },

  test: {
    globals: true,
    include: ["src/**/*.test.js", "src/**/*.test.jsx"],
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    transformMode: {
      web: [/\.[jt]sx?$/], // 모든 JS/JSX/TS/TSX을 web 모드로 변환
    },
  },

  build: {
    chunkSizeWarningLimit: 100000000,
  },

  // .js 파일에서도 JSX 허용
  esbuild: {
    loader: "jsx",
    include: /\.[jt]sx?$/, // .js, .jsx, .ts, .tsx
    exclude: [],
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".jsx": "jsx",
      },
    },
  },
});
