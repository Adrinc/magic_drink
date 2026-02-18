import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://Adrinc.github.io',
  base: './compras_web_demo',
  integrations: [tailwind(), react()]
});