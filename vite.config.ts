import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  // Disable Cloudflare plugin on Vercel; Nitro handles production output.
  cloudflare: false,
  vite: {
    build: {
      target: "es2022",
    },
    plugins: [
      nitro({
        preset: "vercel",
      }),
    ],
  },
});