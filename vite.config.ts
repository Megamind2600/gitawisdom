import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// GitHub Pages serves this project at /gitawisdom/. Local development stays at /.
const base = process.env.GITHUB_ACTIONS === "true" ? "/gitawisdom/" : "/";

export default defineConfig({
  base,
  plugins: [react()],
  root: path.resolve(import.meta.dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client/src"),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
