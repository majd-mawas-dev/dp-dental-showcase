import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/dp-dental-showcase/",
  plugins: [react()],
});
