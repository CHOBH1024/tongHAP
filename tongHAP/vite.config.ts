import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    TanStackRouterVite(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/apps/mim35"),
      "@gajeong": path.resolve(__dirname, "./src/apps/gajeong"),
      "@mim35": path.resolve(__dirname, "./src/apps/mim35"),
    },
  },
  server: {
    port: 3000,
  },
});
