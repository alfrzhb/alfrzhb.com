import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const root = process.cwd();
const output = resolve(process.argv[2] || 'alfrzhb-preview.html');
const mime = { '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' };
const inlineAsset = url => {
  const path = resolve(root, 'dist', url.replace(/^\//, ''));
  return `data:${mime[extname(path)] || 'application/octet-stream'};base64,${readFileSync(path).toString('base64')}`;
};

let html = readFileSync(resolve(root, 'dist/index.html'), 'utf8');
html = html.replace(/<link[^>]+href="(\/assets\/[^" ]+\.css)"[^>]*>/g, (_, url) => {
  const css = readFileSync(resolve(root, 'dist', url.slice(1)), 'utf8')
    .replace(/url\((\/assets\/[^)]+)\)/g, (_, asset) => `url("${inlineAsset(asset)}")`);
  return `<style>${css}</style>`;
});
html = html.replace(/<script[^>]+src="(\/assets\/[^" ]+\.js)"[^>]*><\/script>/g, (_, url) => {
  let js = readFileSync(resolve(root, 'dist', url.slice(1)), 'utf8');
  for (const asset of ['/assets/character-full.png', '/assets/character-head.jpeg']) {
    js = js.replaceAll(asset, inlineAsset(asset));
  }
  return `<script type="module">${js.replaceAll('</script', '<\\/script')}</script>`;
});
html = html.replace('href="/favicon.svg"', `href="${inlineAsset('/favicon.svg')}"`);
if (/<(?:link|script)[^>]+(?:src|href)="\/assets\//.test(html)) throw new Error('An external build asset remains in the preview');
writeFileSync(output, html);
console.log(JSON.stringify({ output, bytes: Buffer.byteLength(html) }));
