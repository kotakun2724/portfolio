// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Recommended: set this to your production URL for correct canonical/OG URLs
  // site: 'https://your-domain.com',
  vite: {
    plugins: [tailwindcss()]
  }
});