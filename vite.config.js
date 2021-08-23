import { defineConfig } from "vite";
import path from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import mpa from "vite-plugin-mpa";
import windicss from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [svelte(), mpa(), windicss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/pages/index.html"),
      },
    },
  },
  optimizeDeps: {
    include: ["attractions"],
  },
});
