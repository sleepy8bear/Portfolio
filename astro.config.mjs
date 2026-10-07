import { defineConfig } from 'astro/config';

// Static site, deployed to GitHub Pages on the custom domain.
// `format: 'file'` keeps the existing URLs (/work.html, /about.html, ...).
export default defineConfig({
  site: 'https://helene-david.com',
  build: { format: 'file' },
});
