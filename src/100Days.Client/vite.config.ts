import { fileURLToPath, URL } from "node:url";
import svgr from "vite-plugin-svgr";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin(), svgr(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: parseInt(process.env.PORT ?? "5173"),
    proxy: {
      "/api/auth": {
        target:
          process.env.services__authapi__https__0 ||
          process.env.services__authapi__http__0,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },
});
