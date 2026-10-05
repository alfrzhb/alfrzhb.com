# ALFRZHB

Personal portfolio of **Muhammad Alfarizi Habibullah**, a software engineer with S1 Informatika at UIN Sunan Kalijaga. Yudisium is completed; graduation is planned for November 2026. One responsive page contains selected work, experience, education, draft learning notes, an archive, and contact links.

## Current status

Pre-deployment hardening is under review. **No Cloudflare deployment or domain change was performed in this phase.** Complete the [pre-deployment checklist](docs/pre-deployment-checklist.md) before publishing. Case-study and article routes remain future work.

## Stack and design

React 19, Vite 7, TypeScript, Lucide icons, and self-hosted DM Sans / Kalam. ESLint validates TypeScript and React Hooks. GitHub Actions checks pushes and pull requests using Node 22 without deployment or secrets.

The mobile-first editorial design is preserved: off-white paper, charcoal headings, slate-blue body text, muted crayon details, and original character illustrations. Desktop adapts the same system. No character was redrawn or regenerated.

## Local development

Use **Node 22 LTS, version 22.13 or later within Node 22**, and npm.

```sh
npm ci
npm run dev
```

Required checks and local production preview:

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

Vite preview serves static files but does not apply Cloudflare `_headers`. See [verification](docs/validation.md) for policy testing.

## Project structure

```text
.github/workflows/ci.yml  Install, lint, typecheck, build
assets/masters/          Original illustrations, preserved byte for byte
src/
  App.tsx                Page composition and active detail state
  components.tsx         Header, Hero, About, shared primitives
  sections.tsx           Remaining sections and native modal dialog
  data.ts                Projects, experience, education, drafts, contact URLs
  site.ts                Canonical URL and shared SEO information
  assets/                Optimized portrait derivative
  fonts.css              WOFF2-only self-hosted font definitions
  styles.css             Design tokens and mobile-first responsive rules
public/                  Favicons, sharing image, headers template
vite.config.ts           Metadata, robots, sitemap, CSP hash generation
docs/                    Audit, design, validation, deployment guidance
```

## Content and asset maintenance

Education follows the owner's correction. BNSP is **assessment completed, certificate pending**. Writing entries are editable drafts labelled in cards and dialogs; personally review them before final publication. Existing project and experience entries are retained from repository data without adding achievements. Uncorroborated numerical evaluation, staging, and award claims were removed; see the [audit](docs/audit.md).

Vite fingerprints runtime illustrations. The full-body PNG is unchanged. The portrait uses a lossless WebP encoding of a 320px resized copy for its maximum 160px display at 2? density. Original masters remain in the repository; the unused full-resolution portrait is excluded from `dist`. Font weights are retained where used; unused WOFF fallbacks are excluded.

SEO is generated from `src/site.ts`: title, description, canonical `https://alfrzhb.com`, Open Graph, Twitter/X cards, and Person JSON-LD with the existing GitHub/LinkedIn profiles. `robots.txt` and the one-URL `sitemap.xml` are generated into `dist`. The 1200?630 sharing image is a brand card without fabricated product screenshots. Update that image when branding changes.

## Deployment target

Static **Cloudflare Pages**: build `npm run build`, output `dist`, repository root, Node 22. The build resolves the JSON-LD hash token in `public/_headers`; deploy built output, never the template directory. [Deployment guidance](docs/deployment.md) covers a later, separately authorized phase.
