// frontend/vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      // During local dev, proxy /api calls to a local Node server on port 3001
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
