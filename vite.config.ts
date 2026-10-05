import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/site';

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.owner,
  url: site.url,
  jobTitle: 'Software Engineer',
  sameAs: site.sameAs,
}).replaceAll('<', '\\u003c');
const jsonLdHash = `'sha256-${createHash('sha256').update(jsonLd).digest('base64')}'`;
const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function portfolioMetadata(): Plugin {
  let outputDirectory: string;
  return {
    name: 'portfolio-metadata',
    configResolved(config) { outputDirectory = resolve(config.root, config.build.outDir); },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace('<!-- portfolio-metadata -->', `
    <title>${escapeHtml(site.title)}</title>
    <meta name="description" content="${escapeHtml(site.description)}" />
    <meta name="theme-color" content="${site.themeColor}" />
    <link rel="canonical" href="${site.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escapeHtml(site.title)}" />
    <meta property="og:description" content="${escapeHtml(site.description)}" />
    <meta property="og:url" content="${site.url}" />
    <meta property="og:image" content="${site.url}${site.image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(site.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(site.title)}" />
    <meta name="twitter:description" content="${escapeHtml(site.description)}" />
    <meta name="twitter:image" content="${site.url}${site.image}" />
    <meta name="twitter:image:alt" content="${escapeHtml(site.imageAlt)}" />
    <script type="application/ld+json">${jsonLd}</script>`);
      },
    },
    writeBundle() {
      const headers = readFileSync('public/_headers', 'utf8').replace('{{jsonLdHash}}', jsonLdHash);
      writeFileSync(resolve(outputDirectory, '_headers'), headers);
      writeFileSync(resolve(outputDirectory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
      writeFileSync(resolve(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}</loc></url></urlset>\n`);
    },
  };
}

export default defineConfig({
  plugins: [react(), portfolioMetadata()],
  build: { assetsInlineLimit: 0 },
});
