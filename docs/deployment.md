# Cloudflare Pages deployment preparation

**No deployment was performed in this phase.** No Cloudflare account settings, project, DNS, or domain were changed. GitHub CI validates source only, without deployment or secrets.

The application produces static `dist` files. It needs no Pages Functions, Worker, database, backend, or runtime secrets.

## Settings for a later authorized deployment

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | Repository root |
| Node | Node 22 LTS, at least 22.13 |
| Production branch | `main`, after manual PR review |

Complete the [pre-deployment checklist](pre-deployment-checklist.md) first. When separately authorized, inspect a Pages preview before attaching `alfrzhb.com`. Existing Git integrations can deploy automatically on pushes; review branch controls before enabling integration. This phase does not change those controls.

## Build output and headers

`npm ci` uses the lockfile. The build generates metadata from `src/site.ts`, a one-URL sitemap, robots instructions, and the hash of the exact inline Person JSON-LD. It resolves `{{jsonLdHash}}` in the `_headers` template when writing `dist/_headers`. Only `dist` is a deployment artifact.

- `/` and `/index.html` revalidate (`no-cache`).
- `/assets/` contains Vite-fingerprinted files only, with one-year immutable caching. Unhashed icons/sharing assets remain outside it.
- MIME sniffing is disabled; referrer and camera/microphone/location protections are retained.
- CSP permits local scripts/styles/fonts/images, the exact JSON-LD hash, and data images used by the paper texture. It denies plugins, forms, base URL overrides, and framing. External profile links use ordinary navigation.
- `X-Frame-Options: DENY` complements `frame-ancestors 'none'`.
- Pages project/branch domains receive `X-Robots-Tag: noindex`; the canonical domain remains indexable.

Navigation stays on section anchors. No routes or custom SPA rewrites were added. Original masters are not copied wholesale into the build; only the imported hero master is emitted.

Vite preview does not emulate `_headers`. Hardening QA uses a local server applying built policy. After a future deployment, verify actual root/asset responses, CSP behavior, and preview noindex rules on Cloudflare.

References: [Cloudflare headers](https://developers.cloudflare.com/pages/configuration/headers/) and [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/). These describe future deployment settings, not a deployment record.
