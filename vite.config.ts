import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PowerSync Vue Demo",
        short_name: "PowerSync Vue",
        display: "standalone",
        scope: "/",
        start_url: "/",
        theme_color: "#4CA154",
        background_color: "#4CA154",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
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
