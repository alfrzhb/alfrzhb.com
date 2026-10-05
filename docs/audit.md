# Pre-deployment audit

Audited on 5 October 2026, starting from `ad21b50`. All tracked source, configs, content, styles, assets, headers, and documentation were reviewed before implementation. The available design reference is `docs/design-spec.md`; the four original phone mockups are not in this checkout, so no new pixel comparison with them is claimed.

## Findings before implementation

- Education included an unrelated postgraduate program. The owner supplied S1 Informatika, UIN Sunan Kalijaga, yudisium completed, graduation planned for November 2026.
- BNSP already correctly said assessment completed, certificate pending; retain that distinction.
- Notes were described as drafts only in documentation while the UI implied publication. Some prose attributed personal experiences to the owner. Make draft status visible and use neutral technical copy.
- Numerical claims about evaluation stages, staging phases, and a competition placing had no corroborating material in this checkout. Remove them pending owner verification; add no new achievements.
- HTML lacked canonical, social metadata, sharing asset, Apple icon, structured data, and sitemap.
- Images had explicit dimensions but public runtime files were not fingerprinted. A 1254px portrait JPEG served a maximum 160px display.
- All six font weights are used; imports also emitted unused WOFF alternatives.
- Useful MIME, referrer, and permissions protections existed, but anti-framing and CSP were absent. Cache rules did not distinguish immutable assets.
- Lint and CI were absent. Two icon imports and hero annotation selectors were unused. `qa.html` and the standalone-export script were temporary delivery tools.
- Landmarks, one H1, skip link, native dialogs, alt text, and reduced motion existed. Mobile section selection could leave focus on a hidden link. Menu outside click, tab exit, and breakpoint transitions needed repair. Dialog cleanup referenced a changing ref.
- Small links were below 44px in height. Muted text failed normal-text contrast. Text resizing revealed overflow in Notes/social actions and needed portrait/status-tag reflow checks.
- Documentation referenced absent standalone/ZIP artifacts and overgeneralized earlier verification.

## Scope and evidence

Preserve the single page, ordering, palette, fonts, crayon details, and original character identity. Correct content; harden SEO/assets/cache/security; add lint/CI; fix verified keyboard, contrast, and reflow issues; document measured results. No routes, merge, deployment, or Cloudflare account changes.

Existing projects, organizations, dates, contact addresses, and technology descriptions come from repository data, not an independently verified biography. The owner should approve factual copy and writing drafts before publication. Validation and external-link limitations are recorded in `validation.md`.

## Public-source corroboration

The owner's [GitHub profile](https://github.com/alfrzhb) corroborates the existing public GitHub, LinkedIn, email, and several project references. The [DDL project's README](https://github.com/alfrzhb/tugas-akhir) identifies FastAPI, Celery/Redis, PostgreSQL, MinIO, Docker, and Gemini/LangChain with a Next.js frontend; the portfolio's Express/D1 description was corrected accordingly. A public repository link was added to the existing DDL dialog.

The [Harumnesia README](https://github.com/Harumnesia/harumnesia) corroborates the browser-worker/static-dataset recommendation architecture and its existing [Pages destination](https://harumnesia.pages.dev/). No new dataset counts, deployment-phase claims, or project achievements were added to the portfolio. Internship/organization dates still require owner review; they were not independently verified from employment records.
