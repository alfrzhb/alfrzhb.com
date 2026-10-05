# ALFRZHB

The personal portfolio of **Muhammad Alfarizi Habibullah**, a software engineer and Informatics graduate. One continuous responsive page introduces the person behind the work, selected projects, experience, education, learning notes, an archive, and contact links.

The design implements the October 2026 hand-drawn mockups: off-white paper, charcoal typography, slate-blue body copy, muted crayon accents, and the original illustrated character. The mobile layout is designed from **390px** and validated down to 320px. Desktop uses the same visual language with a two-column hero and multi-column project, learning, writing, and archive cards.

## Run locally

Requires Node.js **22.12+** (or 20.19+) and npm.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm run preview
```

## What is included

- Header, Hero, About, Selected Work, Experience, Learning, Writing, Archive, Contact, Footer.
- Original full-body character in Hero and original head portrait in About. Source files are byte-for-byte copies; CSS integrates their surroundings without redrawing the character.
- Mobile menu, working section anchors, three project case studies, four readable learning notes, and six archive details.
- Native modal dialogs with Escape handling, focus restoration, background scroll locking, and browser focus containment.
- Self-hosted fonts, reduced-motion support, skip link, semantic landmarks, and original favicon.
- Static Cloudflare Pages output. No backend or credentials required to run the portfolio.

## Project structure

```text
src/
  App.tsx          Page composition and active detail state
  components.tsx   Header, Hero, About, shared heading/tag/accent components
  sections.tsx     Remaining sections and native detail dialog
  data.ts          Projects, experience, education, notes, archive, contact links
  styles.css       Design tokens and mobile-first responsive rules
public/
  assets/          Original character files
  _headers         Cloudflare Pages response headers
docs/
  design-spec.md   Reference audit, design tokens, component architecture
  validation.md    Visual and functional verification
  deployment.md    Cloudflare Pages deployment instructions
```

`qa.html` is a development-only responsive review fixture. It is not included in the production build. The standalone `alfrzhb-preview.html` in the delivery package contains the compiled application, fonts, and original images inline so the page can be reviewed without installing anything. The production deployment uses the normal `dist` directory.

## Content notes

Project order follows the agreed specification: DDL Optimization + Generative AI, Ratama Project & Finance Tracker, and ACM Monitoring System. Miniature project panels are HTML/CSS diagrams of each product's function, not claimed production screenshots. The four supplied phone mockups are never embedded.

The four Writing entries include new, editable note drafts based on the topics in the mockup. Edit their content in `src/data.ts` before publishing under your own name. BNSP is described as assessment completed with certificate pending, matching the available status rather than claiming a issued certificate.

Contact links use the previously shared public email, LinkedIn, and GitHub profile. Company-internal code and operational data are not included.

## Cloudflare Pages

Build command: `npm run build`. Output directory: `dist`. Root directory: repository root. Node version: `22`. See `docs/deployment.md` for Git integration and direct upload options.

The implementation is ready for Pages. No live Cloudflare project, account, or domain is changed by this package.
