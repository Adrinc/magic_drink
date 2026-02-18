import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

const isVercel = process.env.VERCEL === '1';
const baseUrl = isVercel ? '/' : '/cbl_compras_web_demo';

export default defineConfig({
  site: isVercel ? 'https://cbl_compras_web_demo.vercel.app' :  'https://Adrinc.github.io',
  base: baseUrl,
  integrations: [tailwind(), react()],
  output: 'static'
});