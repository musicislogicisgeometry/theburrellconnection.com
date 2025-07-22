// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: process.env.CI
    ? "https://theburrellconnection.com"
    : "http://localhost:4321",

  vite: {
    plugins: [tailwindcss()],
    // Only include files in src/assets, ignore public images
    assetsInclude: ["src/assets/**", "!**/images/uploads/**"],
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
