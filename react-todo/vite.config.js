import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite is the tool that runs our app in development and bundles it for production.
export default defineConfig({
  plugins: [react()],
});
