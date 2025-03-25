import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://45.88.223.182:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
