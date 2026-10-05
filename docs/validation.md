# Pre-deployment verification

Verified locally on 5 October 2026. Baseline: `ad21b50`. Current architecture remains one page with section anchors and dialogs. No Cloudflare deployment, merge, account setting, DNS, or domain change was performed.

## Quality gates

Node **22.23.3** was used for the clean install and quality commands. The host also has Node 23; validation explicitly selected Node 22 rather than relying on that host default.

| Command | Result |
| --- | --- |
| `npm ci` | Passed; no install warnings; npm reported 0 vulnerabilities |
| `npm run lint` | Passed with zero warnings |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; no build warnings |
| `git diff --check` | Passed |

GitHub Actions runs the same four commands on Node 22 for push and pull-request events, using read-only repository permission and SHA-pinned actions. It contains no deployment step or secrets.

## Browser and responsive checks

Automated QA used Playwright Chromium 153 and axe-core, installed outside the repository. The production `dist` was served locally with the generated CSP, cache, MIME, referrer, permissions, and anti-framing headers applied. Vite preview alone does not apply `_headers`.

| Viewport width | 100% text | 200% root text | Menu/dialog checks |
| --- | --- | --- | --- |
| 320px | Passed | Passed | Passed |
| 360px | Passed | Passed | Passed |
| 390px | Passed | Passed | Passed |
| 430px | Passed | Passed | Passed |
| 768px | Passed | Passed | Passed |
| 1024px | Passed | Passed | Passed |
| 1366px | Passed | Passed | Passed |
| 1440px | Passed | Passed | Passed |

All sixteen combinations had document scroll width equal to viewport width, with no content-element horizontal protrusions. Three representative dialogs were measured in each combination (48 checks); their content fit the dialog width. Mobile menus were also opened and checked at both text scales. Header/heading wrapping, hero scaling, cards, timeline, learning, notes, archive, contact/footer, and dialog layout were reviewed in screenshots; targeted 320px/200% and tablet screenshots checked portrait and education-tag reflow.

The 200% test changes the root font size to 32px. It does not represent a separately executed OS text-scaling or browser-zoom test. Native dialog content remains vertically scrollable at enlarged text sizes. No horizontal clipping was added to hide problems.

## Accessibility and functional results

- axe WCAG A/AA checks reported **zero violations** on the page and three representative open dialogs. This is an automated fundamentals check, not a complete accessibility certification or screen-reader audit.
- One H1, named sections, header/main/nav/footer landmarks, heading progression, descriptive image alternatives, decorative exclusions, and visible focus indicators are retained. Footer identity text no longer adds an out-of-order heading.
- Muted normal text was darkened slightly within the same palette; its contrast against paper is approximately **4.97:1**. Body and action colors passed axe contrast checks.
- Keyboard skip link transfers focus to main. All seven navigation anchors transfer focus to their destinations on mobile and desktop; every in-page anchor resolves.
- Hamburger opens/focuses its first link and closes on Escape, section selection, Tab leaving the disclosure, outside click, or breakpoint change. Focus is restored or moved to the visible destination as appropriate.
- All **14 detail triggers** passed: three work dialogs, four note dialogs, the combined notebook, and six archive dialogs. Tests covered initial close-button focus, Tab/Shift+Tab containment, Escape/close controls, background scroll locking/restoration, and trigger focus restoration.
- Back-to-top resolves to home. Reduced-motion preference removes smooth scrolling/transitions.
- Main action targets are at least 44px high. Note/category/status text reflows without overlapping neighboring content.
- No production console errors, failed local asset responses, or CSP errors were observed during the functional suite. Fonts, original hero, portrait derivative, icons, OG image, robots, sitemap, and built scripts/styles loaded.

## SEO, asset identity, and output

The HTML has one canonical `https://alfrzhb.com`, title/description, theme color, SVG/PNG favicon and Apple icon, Open Graph, Twitter/X large card, and Person JSON-LD. The JSON-LD contains only owner name, canonical identity, software-engineer role, and existing GitHub/LinkedIn profiles. Its exact SHA-256 matches the generated CSP allowlist. No fake social handles were added.

Robots declares the canonical sitemap. The sitemap has exactly one homepage URL; dialog content is not represented as invented routes. Every `/assets/` file is fingerprinted, and no template placeholders or temporary review pages appear in `dist`.

| Output | Raw size | Gzip (Vite report) |
| --- | --- | --- |
| Main JavaScript | 259.40 KB | 80.89 KB |
| CSS | 23.70 KB | 6.27 KB |
| HTML | 2.76 KB | 0.88 KB |
| Six WOFF2 fonts, total | 101.48 KB | ? |
| Hero PNG | 149.21 KB | ? |
| Portrait WebP | 42.65 KB | ? |
| Sharing PNG (1200?630) | 23.47 KB | ? |
| Apple icon | 5.61 KB | ? |
| PNG favicon | 1.29 KB | ? |

Sizes use decimal KB. Runtime JavaScript remains around the baseline size; no new runtime dependencies were introduced. Six unused WOFF fallback files were removed. The portrait payload is about 43% smaller than its 74.74 KB master.

Both original master SHA-256 hashes match the baseline exactly; see `assets/README.md`. The hero runtime PNG also preserves those original bytes. The decoded portrait WebP equals the LANCZOS-resized reference pixel for pixel. A larger lossless hero WebP was rejected. No illustrations were regenerated, redrawn, or traced.

## External links and remaining review

The [owner's GitHub profile](https://github.com/alfrzhb), [DDL repository](https://github.com/alfrzhb/tugas-akhir), [Harumnesia repository](https://github.com/Harumnesia/harumnesia), and [Harumnesia application](https://harumnesia.pages.dev/) were reachable. The public profile also corroborates the existing email and LinkedIn destination. External links use new-tab notice, `noopener`, and `noreferrer`. The email link has the correct `mailto:` destination; no email was sent.

LinkedIn returned HTTP 999 to automated retrieval. Its destination is preserved and supported by the public GitHub profile, but interactive availability still needs manual review. Owner approval of internship/organization facts and writing drafts is outstanding publication work; unsupported numerical achievement claims were removed. BNSP remains certificate pending, and graduation remains planned for November 2026.

Cloudflare response behavior, preview-domain noindex matching, DNS, and live-domain asset loading must be verified after a separately authorized future deployment. No deployment was used as part of these checks. Other browser engines and assistive technologies were not tested in this phase.
