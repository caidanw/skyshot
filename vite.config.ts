import { sveltekit } from "@sveltejs/kit/vite";
import { threlteStudio } from "@threlte/studio/vite";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [threlteStudio(), sveltekit()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
