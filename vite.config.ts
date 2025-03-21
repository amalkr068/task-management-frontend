{/*import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    port: 5173, // Ensure this matches your frontend port
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
*/}

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables manually
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    css: {
      postcss: "./postcss.config.cjs",
    },
    server: {
      port: 5173, // Ensure this matches your frontend port
      proxy: {
        "/api": {
          target: env.VITE_REACT_APP_BACKEND_BASEURL, // Use loadEnv() instead of import.meta.env
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});

