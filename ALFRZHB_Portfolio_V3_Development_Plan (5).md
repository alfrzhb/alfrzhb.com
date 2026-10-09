# ALFRZHB Portfolio V3

**Development Plan & AI Agent Execution Guide**  
**Project:** [alfrzhb/alfrzhb.com](https://github.com/alfrzhb/alfrzhb.com)  
**Target:** [alfrzhb.com](https://alfrzhb.com) · Cloudflare Pages  
**Planning baseline:** 9 Oktober 2026  
**Status:** Proposed plan — tickets have not been created in GitHub by this document  
**Scope:** Upgrade an existing, working portfolio; **not** a full redesign.

> **North star:** An editorial-minimal, crayon-accented, responsive personal website that communicates software-engineering capability through polished desktop experiences, navigable case studies, authentic learning history, and purposeful motion.

---

## 1. Executive summary

The current mobile-oriented single-page portfolio remains the visual foundation. V3 adds a deliberate desktop layout, multiple public routes, substantial project and journey pages, and restrained interactions. The homepage remains a continuous overview; deeper content lives on dedicated URLs.

### Success outcomes

1. **Desktop quality:** each homepage section is intentionally composed at desktop widths, not simply stretched from 390px.
2. **Discoverable depth:** visitors can browse `/projects`, open individual project case studies, explore education/experience on `/journey`, and read articles under `/writing`.
3. **Credibility:** project pages explain the problem, role, scope, architecture, technical decisions, constraints, verifiable outcomes, and repository/demo availability.
4. **Visual continuity:** existing illustrated character files, paper/crayon personality, and mobile experience are preserved.
5. **Production readiness:** direct URLs and refreshes work on Cloudflare; public content has correct SEO output; motion respects user preferences; tests and preview deployments pass.

### Non-goals

- Replacing the established visual identity with generic startup, glassmorphism, or dashboard aesthetics.
- Embedding reference mockups as flattened page screenshots or redrawing the original illustrated character assets.
- Adding scroll hijacking, excessive parallax, autoplay audio, or decorative motion without interaction value.
- Inventing project metrics, testimonials, credentials, timelines, screenshots, or claimed production impact.
- Introducing a CMS, database, user accounts, or server infrastructure before a demonstrated requirement exists.

## 2. Baseline assumptions and decision checkpoints

These are **planning assumptions**, not claims about the latest repository state. Ticket `ALF-001` must verify them before implementation.

| Area | Working assumption | Validation / decision |
|---|---|---|
| Frontend | React + Vite + TypeScript | Check package versions, dependencies, scripts, and current component boundaries. |
| Hosting | Cloudflare Pages | Verify build output, redirects, custom domain, and preview/production environments. |
| Layout | Mobile-first, ~390px reference | Capture baseline and preserve mobile section geometry. |
| Main navigation | One continuous homepage with section anchors | Preserve overview while allowing links to detail routes. |
| Content | Project and learning content already exists in some form | Audit source-of-truth and avoid duplicating conflicting records. |
| Routing | New detail routes are required | Choose routing/rendering based on deployment and SEO tests, not library preference. |
| Illustrations | Original head and full-body assets exist | Reference original files; never redraw/recreate them. |
| SEO | Existing metadata may be present | Audit it; extend rather than overwrite blindly. |

**Architecture gate (before ALF-008):** Decide between client routing + build-time prerendering and another Cloudflare-compatible rendering approach. Route-specific metadata must be present in **initial served HTML** for public detail pages if search/share indexing is required. Client-side title changes alone are not sufficient evidence. Record the decision in an ADR.

## 3. Master milestone plan

**Priority convention:** `P0` = release-critical foundation/quality; `P1` = important experience/content; `P2` = optional later expansion.  
**Size convention:** `S` = bounded; `M` = moderate; `L` = multi-component or content-heavy. Sizes represent **relative complexity, not promised durations**.

| Milestone | Focus | Tickets | Priority | Exit gate |
|---|---|---:|---|---|
| **M0** | Audit & design foundation | ALF-001–003 (3) | P0 | Approved audit, UI baseline, IA/design tokens. |
| **M1** | Desktop refinement | ALF-004–007 (4) | P0 | Homepage quality at desktop/tablet; mobile regression clean. |
| **M2** | Multi-page architecture | ALF-008–011 (4) | P0 | Route shell, navigation, typed data, deep-link refresh. |
| **M3** | Projects & case studies | ALF-012–015 (4) | P0/P1 | Project listing and credible detailed pages. |
| **M4** | Academic & journey | ALF-016–019 (4) | P1 | Journey listing and substantial individual stories. |
| **M5** | Writing & archive | ALF-020–021 (2) | P2 | Article routes and coherent archive links. |
| **M6** | Motion & interactions | ALF-022–024 (3) | P1 | Purposeful motion, reduced-motion fallback, no regressions. |
| **M7** | SEO, QA & deployment | ALF-025–029 (5) | P0 | Tested preview, indexable public routes, production sign-off. |
| **TOTAL** | | **29 tickets** | | |

**Recommended delivery order:** M0 → M1 → M2 → M3; start M4/M5 after reusable route/data patterns stabilize; M6 can incrementally follow stable components; M7 tests should run continuously with final release sign-off at the end. This is a dependency graph, not a rigid one-PR-per-milestone rule.

## 4. Proposed information architecture

```text
/
├── Homepage (continuous overview + section anchors)
│   ├── Hero / About
│   ├── Selected Work → /projects or /projects/:slug
│   ├── Experience / Learning → /journey or /journey/:slug
│   ├── Writing → /writing or /writing/:slug
│   ├── Archive
│   └── Contact / Footer
├── /projects
│   └── /projects/:slug
├── /journey
│   └── /journey/:slug
├── /writing
│   └── /writing/:slug
└── /* → Not Found
```

### Content model (illustrative; exact shapes decided in M2)

- **Project:** `slug`, `title`, `summary`, `role`, `period`, `status`, `category`, `stack`, `cover`, `problem`, `constraints`, `approach`, `architecture`, `tradeoffs`, `outcomes`, `evidence`, `links`.
- **Journey entry:** `slug`, `kind` (education / bootcamp / work / organization / award / certification), `organization`, `period`, `role`, `highlights`, `skills`, `artifacts`, `verification`.
- **Writing:** `slug`, `title`, `summary`, `publishedAt`, `updatedAt`, `tags`, `body`, `relatedProjects`, `status`.

**Content publication rule:** draft-only or unverified items may appear in internal data, but must not present as finished public case studies/articles. Private client data and confidential screenshots must not be published.

## 5. Ticket register and acceptance criteria

### M0 — Audit & Design Foundation

| Ticket | Work item | Pri. | Size | Depends on |
|---|---|---|---|---|
| **ALF-001** | Repository, components, dependencies, content, and technical-debt audit | P0 | M | — |
| **ALF-002** | Desktop visual audit at 1024/1440/1920px + mobile screenshot baseline | P0 | M | 001 |
| **ALF-003** | Responsive design system, IA, content taxonomy, and route plan | P0 | M | 001–002 |

**ALF-001 — Repository audit**  
Deliverables: dependency inventory, current directory/component map, build/test/deploy commands, a risk register, and a list of features already implemented.  
Acceptance: agent can reproduce a clean install/build; findings distinguish confirmed facts from assumptions; no source changes during audit.

**ALF-002 — Visual baseline**  
Deliverables: screenshots of all existing homepage sections at 390, 768, 1024, 1440, and 1920px (extend if necessary), plus noted issues and overflow checks.  
Acceptance: mobile baseline is retained; desktop issues are documented with section, viewport, and expected correction; design references are used as specifications, not embedded images.

**ALF-003 — Design/IA specification**  
Deliverables: responsive grid and container widths, fluid typography rules, spacing/palette/motion tokens, navigation map, and page templates.  
Acceptance: explicit mobile/tablet/desktop behavior; original assets are inventoried; reusable patterns are defined before divergent page implementations.

### M1 — Desktop UI Refinement

| Ticket | Work item | Pri. | Size | Depends on |
|---|---|---|---|---|
| **ALF-004** | Desktop Header, Navigation, Hero, and About | P0 | L | 003 |
| **ALF-005** | Desktop Selected Work and Archive | P0 | M | 003 |
| **ALF-006** | Desktop Experience, Learning, Writing, Contact, Footer | P0 | L | 003 |
| **ALF-007** | Tablet/responsive polish + mobile visual regression | P0 | M | 004–006 |

**ALF-004 — Above-the-fold desktop**  
Deliverables: intentional desktop hero composition, legible text measure, positioned original illustration, consistent navigation and About proportions.  
Acceptance: no stretched-mobile appearance or horizontal scrolling; original character files remain untouched; nav is keyboard accessible; 390px baseline remains recognizable.

**ALF-005 — Project/Archive desktop composition**  
Deliverables: stronger work-preview hierarchy, responsive project grid/rows, readable metadata, and deliberate archive density.  
Acceptance: card text has sufficient contrast; click targets are unambiguous; all cards retain meaningful fallback where imagery is unavailable.

**ALF-006 — Remaining sections desktop**  
Deliverables: responsive editorial timelines/rows, coherent vertical rhythm, usable contact interactions, and aligned footer.  
Acceptance: long labels and dates wrap without clipping; links are clear; headings preserve meaningful document order; no excessive whitespace gaps.

**ALF-007 — Responsive QA**  
Deliverables: screenshot comparison matrix, fixes for tablet and extreme widths, documented exceptions.  
Acceptance: tested at 320/390/768/1024/1440/1920px; no unintended overflow; original mobile interactions and layout pass a targeted regression checklist.

### M2 — Multi-page Architecture

| Ticket | Work item | Pri. | Size | Depends on |
|---|---|---|---|---|
| **ALF-008** | Router + shared layouts + rendering decision record | P0 | M | 003, 007 |
| **ALF-009** | Cross-page navigation, active state, focus, scroll restoration | P0 | M | 008 |
| **ALF-010** | Typed content models + reusable page primitives | P0 | L | 008 |
| **ALF-011** | 404, slug handling, and Cloudflare deep-link behavior | P0 | M | 008–010 |

**ALF-008 — Route foundation**  
Deliverables: route shell for `/`, `/projects`, `/projects/:slug`, `/journey`, `/journey/:slug`, `/writing`, `/writing/:slug`; layout boundaries; ADR on routing/rendering and SEO.  
Acceptance: shared header/footer are not copied across pages; direct navigation is possible; no homepage section or anchor is lost.

**ALF-009 — Navigation behavior**  
Deliverables: active route treatment, semantic links, mobile navigation behavior, page-title/focus handling and scroll restoration.  
Acceptance: browser Back/Forward works; keyboard users maintain orientation; deep-links into homepage sections remain valid; no jarring scroll-to-top on normal anchor navigation.

**ALF-010 — Content architecture**  
Deliverables: typed schemas/content registries, consistent slug/URL generation, shared card/detail components, content validation.  
Acceptance: no duplicated project text in multiple components; missing links/images render gracefully; malformed content and duplicate slugs are flagged by checks.

**ALF-011 — Route resilience**  
Deliverables: Not Found page, invalid-slug handling, Cloudflare Pages route/fallback configuration, smoke tests for refresh/direct URL.  
Acceptance: valid nested URLs render on direct visit and reload; unknown URLs return a user-friendly 404 experience; routing behavior is verified on a Cloudflare preview deployment (not just Vite dev server).

### M3 — Projects & Case Studies

| Ticket | Work item | Pri. | Size | Depends on |
|---|---|---|---|---|
| **ALF-012** | `/projects` browsing page with filters/tags | P0 | L | 010–011 |
| **ALF-013** | Reusable `/projects/:slug` case-study template | P0 | L | 010–011 |
| **ALF-014** | Verified case studies: DDL Thesis, Ratama Tracker, ACM | P0 | L | 013 |
| **ALF-015** | Additional projects: Harumnesia, UsStuck, CRM, QRGen, etc. | P1 | L | 013–014 |

**ALF-012 — Project index**  
Deliverables: browsable catalog with accessible filter/category controls, clear project state, cover/summary/stack, and direct detail links.  
Acceptance: filters work with keyboard and mobile; empty states are clear; no broken project links; homepage Selected Work links to the relevant routes.

**ALF-013 — Case-study template**  
Deliverables: title/overview, role, timeframe, problem, scope, architecture, key decisions/tradeoffs, implementation, challenges, outcomes, media/captions, links, and related projects.  
Acceptance: readable long-form desktop/mobile layout; headings and images are accessible; absent metrics are stated qualitatively rather than invented; works for multiple distinct projects.

**ALF-014 — Three flagship case studies**  
Deliverables: content for (1) DDL Optimization Thesis, (2) Ratama Project & Finance Tracker, (3) ACM monitoring project.  
Acceptance: each states individual contribution and technology accurately; outcomes supported by real evidence; confidential customer/company material is excluded or approved; link availability validated.

**ALF-015 — Extended case-study catalog**  
Deliverables: prioritized stories for Harumnesia V2, UsStuck, CRM, QRGen, MyDicodingEvent, and other worthwhile projects.  
Acceptance: distinguish full case studies from short project summaries where evidence is limited; no fabricated screenshots or project metrics; no dead-end navigation.

### M4 — Academic & Journey

| Ticket | Work item | Pri. | Size | Depends on |
|---|---|---|---|---|
| **ALF-016** | `/journey` overview: education, work, bootcamps, organization, awards | P1 | L | 010–011 |
| **ALF-017** | Reusable `/journey/:slug` detailed experience template | P1 | M | 016 |
| **ALF-018** | UIN Sunan Kalijaga, Bangkit, DBS detailed stories | P1 | L | 017 |
| **ALF-019** | Internships, organizations, achievements, verified certifications | P1 | M | 017–018 |

**ALF-016 — Journey overview**  
Deliverables: scannable chronological or grouped history with filters/categories as justified, plus honest dates and statuses.  
Acceptance: distinguish education vs employment vs training; no misleading certificate equivalence; important entries have direct detail links.

**ALF-017 — Journey detail template**  
Deliverables: organization/program, role, dates, objectives, learning or responsibilities, activities/projects, tools/skills, notable outcomes, evidence/credential links if public.  
Acceptance: flexible enough for degree, bootcamp, internship, or organizational role without forcing irrelevant fields.

**ALF-018 — Academic and bootcamp content**  
Deliverables: education page for UIN Sunan Kalijaga Informatics, Bangkit Academy 2024 Android track, DBS Coding Camp and its Harumnesia capstone.  
Acceptance: exact credentials, attendance period, degree/status, learning scope, and public artifacts are verified before publication; content emphasizes substance over decorative certificate thumbnails.

**ALF-019 — Professional/community history**  
Deliverables: selected internship experience, student organization roles, award/hackathon results, and useful certifications.  
Acceptance: private or unverifiable claims are omitted or clearly marked; entries indicate responsibility and impact where demonstrable; links work.

### M5 — Writing & Archive

| Ticket | Work item | Pri. | Size | Depends on |
|---|---|---|---|---|
| **ALF-020** | `/writing` index and `/writing/:slug` article template | P2 | L | 010–011 |
| **ALF-021** | Archive integration and cross-linking | P2 | M | 012, 016, 020 |

**ALF-020 — Articles**  
Deliverables: article registry, status handling, readable article typography, code blocks, accessible headings, related-project links, and publication dates.  
Acceptance: only published/verified articles are exposed; articles remain legible on 390px and desktop; direct URLs and metadata are correct.

**ALF-021 — Archive as discovery system**  
Deliverables: curated link-outs from homepage/archive to projects, journey stories, articles, GitHub repos, or other verified materials.  
Acceptance: no duplicative disconnected archive cards; clearly distinguish internal and external navigation; verify outbound URLs.

### M6 — Motion & Interactions

| Ticket | Work item | Pri. | Size | Depends on |
|---|---|---|---|---|
| **ALF-022** | Motion tokens and reusable animation primitives | P1 | M | 003, 008 |
| **ALF-023** | Hover/tap feedback, reveal/stagger, sketch accents, character motion | P1 | L | 022, stable UI |
| **ALF-024** | Page transitions, reduced motion, animation performance | P1 | M | 022–023 |

**ALF-022 — Motion system**  
Deliverables: duration/easing/distance tokens; animation utility/component APIs; clear policy for what moves and what does not.  
Acceptance: reduced-motion behavior is defined from the start; animations are composited where possible; no motion dependency added without documented need.

**ALF-023 — Brand interactions**  
Deliverables: restrained hover/tap states, minimal scroll entrance, subtle crayon/doodle line animations and optional character transforms acting on original image elements.  
Acceptance: never replace/redraw original illustrations; pointer-only behaviors have keyboard equivalents; content is visible if JS/motion does not run; animations do not obstruct reading.

**ALF-024 — Cross-route polish**  
Deliverables: short route transitions where valuable, focus/scroll coordination, reduced-motion and low-end-device checks.  
Acceptance: no layout thrashing or scroll hijacking; interactive elements remain usable mid-transition; navigation remains correct with motion disabled.

### M7 — SEO, QA & Deployment

| Ticket | Work item | Pri. | Size | Depends on |
|---|---|---|---|---|
| **ALF-025** | Per-route metadata, canonical, OG, structured data, sitemap | P0 | L | 011, public content |
| **ALF-026** | Prerendering / initial-HTML indexing verification | P0 | M | 008, 025 |
| **ALF-027** | Core Web Vitals, media/font/bundle optimization | P0 | M | stable UI/content |
| **ALF-028** | E2E, accessibility, cross-browser, responsive visual regression | P0 | L | 007, 011, feature routes |
| **ALF-029** | Cloudflare preview validation, production release, smoke test, rollback plan | P0 | M | 025–028 |

**ALF-025 — Search/share metadata**  
Deliverables: unique title/description, correct canonical URLs, Open Graph/Twitter previews, robots and sitemap coverage, appropriate structured data (e.g., Person and relevant CreativeWork).  
Acceptance: each public route has its own metadata and valid destination; no draft/private route appears in sitemap; share previews tested against deployed HTML.

**ALF-026 — Render strategy validation**  
Deliverables: prerendering or an equivalent SEO-capable route-render strategy as required by the M2 ADR, plus automated HTML checks.  
Acceptance: `curl`/raw HTML of at least three nested public URLs contains appropriate title, description, canonical, and meaningful content where required; JS-only head mutations are not treated as sufficient.

**ALF-027 — Performance**  
Deliverables: baseline vs final Lighthouse/field-informed metrics where available; image dimensions/compression, font loading, code splitting, route and motion profiling.  
Acceptance: no material regression to mobile Core Web Vitals; avoid oversize media and needless animation libraries; test a representative slower-device profile.

**ALF-028 — Regression and accessibility suite**  
Deliverables: route E2E tests; keyboard/focus tests; visual snapshots at 320/390/768/1024/1440/1920px; contrast and reduced-motion checks; targeted cross-browser smoke tests.  
Acceptance: all critical paths pass; no blocking accessibility defects; comparison report documents acceptable intentional visual changes.

**ALF-029 — Release operations**  
Deliverables: production-readiness checklist, Cloudflare preview link and validation notes, production deployment record, post-release checks, rollback approach.  
Acceptance: nested routes resolve after hard reload; mobile/homepage still work; social previews and contact links verified; deploy/rollback steps documented; production changes occur only with user authorization.

## 6. Dependencies, releases, and verification gates

```text
M0 Audit / baseline / tokens
 ├─→ M1 Desktop homepage ─→ Responsive regression
 └─→ M2 Routing + SEO ADR + content model
       ├─→ M3 Project catalog + case studies
       ├─→ M4 Journey + detailed experiences
       └─→ M5 Writing + archive
M0/M2 ─→ M6 Motion foundations ─→ interactions & transitions
M1–M6 ─→ M7 SEO / performance / E2E / release
```

### Suggested release slices

| Release | Contents | Minimum gate |
|---|---|---|
| **R1 — Desktop** | M0 + M1 | Baselines approved; no 390px regressions. |
| **R2 — Routes + Projects** | M2 + M3 P0 | Index/detail routes, accurate flagship stories, direct-refresh preview test. |
| **R3 — Journey + Writing** | M4 + M5 | Credible verified content, navigation complete, no drafts leaked. |
| **R4 — Motion + Hardening** | M6 + M7 | Reduced motion, route SEO, E2E and production checklist passed. |

**Critical-path caution:** A routing or SEO decision that requires switching rendering architecture must be settled in M2, **before** authoring many detail pages. Avoid building dozens of client-only routes and discovering indexability gaps at M7.

## 7. Design and technical guardrails

### Visual invariants

- Maintain editorial minimalism, open whitespace, careful typography, quiet paper/cream surfaces, sketch/crayon accents, and the established palette.
- Treat uploaded mockups as **visual specifications**, never screenshots to paste as a section.
- Reuse original ALFRZHB head/full-body asset files; CSS transform/position/opacity is allowed, redrawing or AI regenerating them is not.
- Mobile baseline starts at **390px**; desktop receives deliberate compositions, not a wholesale new brand.
- Keep content-first reading order and real semantic headings; avoid fake or distorted statistics for visual interest.

### Technical rules

- Keep the existing React/Vite/TypeScript implementation unless audit evidence justifies a change.
- Prefer composable route layouts and typed content data; minimize needless dependencies and abstractions.
- Prefer CSS transitions for simple feedback; introduce Motion for React only when warranted and measured.
- Use real `a`/router links, keyboard operability, visible focus, stable browser history and accessible route changes.
- Serve deep links correctly on Cloudflare; validate **preview deployment** behavior, not only localhost.
- Use source-backed claims. Provide user-friendly unavailable/private project artifact handling.
- Never commit secrets, staging credentials, confidential internal screenshots, or customer records.

### Suggested quality targets (provisional, confirm in M0)

- Zero unintentional horizontal overflow at 320–1920px.
- No blocking keyboard, focus, or screen-reader issues on critical flows.
- Respect `prefers-reduced-motion`; content readable without animation.
- No console errors on critical routes; build/lint/typecheck/test passing.
- Lighthouse/Core Web Vitals tracked as **baseline vs final** rather than claiming arbitrary scores; aim for good real-world LCP/INP/CLS where measurable.
- Nested public routes return correct rendered metadata and stable links.

## 8. Definition of Ready / Definition of Done

### Definition of Ready (before coding)

- Problem and observable expected result recorded in the ticket.
- Dependencies resolved and target pages/viewports listed.
- Source assets and content identified, with private/public status checked.
- Acceptance criteria are testable; uncertainty and tradeoffs called out.
- Scope is small enough for a reviewable PR, or explicitly split.

### Definition of Done (every ticket)

- Acceptance criteria implemented and demonstrated with screenshots/logs/tests as applicable.
- No regression to current mobile layout and character asset identity.
- Updated component states are usable with keyboard and reduced motion where relevant.
- Build, lint, typecheck, and relevant automated tests pass (or documented existing limitations).
- Responsive review complete at required viewports.
- No invented content, broken links, exposed secrets, or unapproved dependencies.
- Docs/ADR/content records updated where architecture or published facts changed.
- PR references ticket; reviewer-facing summary includes what changed, evidence, and residual risks.
- Production publish/push only within the authorization explicitly granted for the active task.

## 9. GitHub Issues, labels, branches, and PR policy

| Item | Recommended convention |
|---|---|
| Milestones | `M0 — Audit`, `M1 — Desktop`, … `M7 — Release` |
| Issue titles | `[ALF-004] Refine Desktop Hero & Navigation` |
| Type labels | `type:design`, `type:feature`, `type:refactor`, `type:content`, `type:testing`, `type:docs` |
| Priority labels | `priority:P0`, `priority:P1`, `priority:P2` |
| Status workflow | Backlog → Ready → In Progress → In Review → Done |
| Branches | `feat/alf-013-project-detail`, `fix/alf-007-responsive` |
| Commits | Conventional Commits, e.g., `feat(projects): add case study page template` |
| PR scope | One coherent change, linked to ticket; split oversized work |

**Important:** ALF IDs are **planning IDs**, not GitHub issue numbers. Do not imply they already exist or that any issue/PR was created. Map them to actual issue URLs when tickets are published.

### GitHub issue template

```md
## Goal
[What user-facing or engineering outcome does this achieve?]

## Scope
- In: ...
- Out: ...

## Dependencies
ALF-XXX

## Acceptance criteria
- [ ] ...
- [ ] ...

## Verification
- Viewports/routes: ...
- Commands/tests: ...
- Screenshot or deployment evidence: ...

## Risks / content approvals
...
```

### Pull request checklist

```md
Closes: [GitHub issue URL]
Planning ID: ALF-XXX

### Changes
...
### Evidence
- [ ] Build / typecheck / lint / tests
- [ ] Mobile baseline comparison
- [ ] Desktop/tablet comparison
- [ ] Accessibility / keyboard / reduced motion
- [ ] Cloudflare deep-link test (if routing changes)
- [ ] Initial HTML / SEO test (if public route changes)
### Risk / rollback
...
```

## 10. AI agent operating instructions

Give the agent this document as its **project execution contract**, while confirming the actual repository state before each change.

1. **Inspect before changing.** Read the repository README, package manifests, relevant source files, deployment configuration, existing docs, and open/merged PR context. Do not assume this plan reflects the latest implementation.
2. **One ticket or one reviewable slice at a time.** State scope, files expected to change, acceptance criteria and verification strategy before edits.
3. **Protect the existing design.** Do not reinterpret the supplied references, redraw character assets, or regress 390px mobile UX to improve desktop.
4. **Evidence-based content.** Verify credentials, project descriptions, statuses, links, screenshots, and results against available source material; request input only for genuinely unavailable facts. Never make up numbers or personal claims.
5. **Use the existing architecture first.** Prefer small, reversible changes. A new framework, animation library, CMS, or major routing strategy must have a documented rationale.
6. **Visual verification is mandatory.** Capture representative screenshots before and after visual tickets; check mobile, tablet, desktop and long-form detail pages.
7. **Route and SEO checks are mandatory.** Test direct URLs, refresh, Back/Forward, 404s, canonical URLs, OG tags, sitemap, raw HTML, and Cloudflare previews for relevant tickets.
8. **Accessibility and performance are functional requirements.** Preserve semantics, focus, contrast, `prefers-reduced-motion`, and page responsiveness.
9. **Never silently push/deploy.** Follow the active user's permissions; share diff/test results and explicit limitations. Do not assume old chat permission extends to current tickets.
10. **Close the loop.** Update issue/PR documentation and record observed results, regressions, decisions, and follow-up tickets. Mark complete only with evidence.

### Starter prompt for an AI coding agent

> Implement ALFRZHB Portfolio V3 using `ALFRZHB_Portfolio_V3_Development_Plan.md` as the execution specification. Begin with **ALF-001**, a read-only repository audit. Review existing code, assets, visual references, docs, dependencies, Cloudflare configuration, and tests. Report confirmed architecture, discrepancies against the plan, and a prioritized actionable audit. Do not modify files, redraw original character images, or push/deploy during the audit. After approval, implement tickets sequentially with small PRs and evidence-based acceptance checks. Preserve the existing 390px mobile identity; build intentional desktop layouts and deeper public routes; verify route-specific SEO and Cloudflare deep links.

## 11. Release acceptance checklist

- [ ] Desktop at 1024/1440/1920px intentionally designed; 320/390/768px usable.
- [ ] Homepage remains complete and section anchors function.
- [ ] `/projects` + flagship `/projects/:slug` routes finished.
- [ ] `/journey` + approved detailed academic/bootcamp/experience pages finished.
- [ ] Writing/archive destinations behave correctly; drafts excluded from public navigation.
- [ ] Unknown slugs and 404 behavior work.
- [ ] Every public nested route opens directly and reloads successfully on Cloudflare preview.
- [ ] Per-route title/description/canonical/OG/social preview and sitemap verified from served output.
- [ ] Animations are modest and obey reduced motion.
- [ ] No original character asset is replaced; mobile visual regressions reviewed.
- [ ] Build, tests, lint, typecheck, accessibility, and keyboard flows pass or exceptions documented.
- [ ] Media, fonts, bundle costs, and mobile performance reviewed.
- [ ] Private/client data excluded; all public project claims verified.
- [ ] Production deploy, smoke checks, and rollback procedure documented.

## 12. Immediate next steps

1. Create GitHub milestones **M0–M7** and issues **ALF-001–ALF-029** from this plan if ticket publication is desired.
2. Execute **ALF-001** read-only; compare repository reality with the plan and note any scope corrections.
3. Execute **ALF-002/003**: desktop screenshots, mobile baselines, design tokens and route/SEO ADR.
4. Implement M1 desktop improvements, verify mobile, then advance to M2 and M3.

---

**Document ownership:** ALFRZHB Portfolio project.  
**Change control:** Update this plan whenever ticket scope, route strategy, acceptance criteria, or release sequence changes. Record the decision and date; do not silently drift from the agreed visual specification.
