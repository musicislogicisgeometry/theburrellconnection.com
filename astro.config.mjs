// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: process.env.CI
    ? "https://theburrellconnection.com"
    : "http://localhost:4321",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Geist",
        cssVariable: "--font-geist",
        fallbacks: ["Inter", "sans-serif"],
      },
    ],
  },

  adapter: vercel(),
});

// import { defineConfig } from 'astro/config'
// import react from '@astrojs/react'
// import tailwind from '@astrojs/tailwind'

// // https://astro.build/config
// export default defineConfig({

//   integrations: [
//     react(),
//     tailwind({
//       applyBaseStyles: false,
//     }),
//   ],
// })
