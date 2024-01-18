import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({ registerType: "autoUpdate" })],
  optimizeDeps: {
    exclude: ["@journeyapps/powersync-sdk-web"],
    include: [
      "object-hash",
      "uuid",
      "event-iterator",
      "js-logger",
      "lodash",
      "can-ndjson-stream",
    ],
  },
  resolve: {
    alias: {
      "@/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
  },
  worker: {
    format: "es",
  },
  build: {
    target: "ESNext",
  },
});
