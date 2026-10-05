# ALFRZHB implementation specification

## Audit and precedence

The four supplied hand-drawn phone mockups are layout and styling specifications, not website assets. No mockup is embedded. The latest 2 October decision supersedes the earlier voxel, WebGL, and Stitch directions. ALFRZHB is a wordmark, not an acronym.

One continuous page: Header → Hero → About → Selected Work → Experience → Learning → Writing → Archive → Contact → Footer. English visible copy follows the references. Start at 390px, adapt to 320px, 700px, and 1020px+.

## Original assets

- `1000179962.png` → `assets/masters/character-full.png`: original bytes, full-body Hero character. CSS multiply integrates the white background into paper without changing the source.
- `WhatsApp Image 2026-09-24 at 10.52.17 PM.jpeg` → `assets/masters/character-head.jpeg`: original bytes, About portrait. A CSS clipping polygon hides the gray surroundings; the source and character are not redrawn or edited.
- All four phone mockups are excluded from runtime assets. No generated or fabricated project screenshots.

## Tokens

Paper #FAF8F3; charcoal #262626; body slate blue #48617E; muted brown #806753 (darkened slightly for normal-text contrast); border #E4D3C0; crayon peach #F6E5CE, blue #DEEBF4, green #E1EBDF, rose #F3DFD6, lavender #E9E2F1. Kalam bold for handwritten display type, DM Sans for readable body text. Both fonts are self-hosted.

Mobile gutter 22px; desktop gutter 40px; max width 1100px. Section rhythm 88px mobile / 110px desktop. Body 16px+, display 34–59px. Clean editorial structure with restrained crayon patches, strokes, imperfect pill borders, and rays. No 3D, no keycaps, no Stitch.

## Components

`Header`, `Hero`, `About`, `SectionHeading`, `Tag`, and `Rays` form the first slice. Subsequent components: `SelectedWork`, `Experience`, `Learning`, `Writing`, `Archive`, `Contact`, `Footer`, and an accessible `DetailDialog`. Project, education, experience, article, and archive data stay separate from layout. Shared tokens and primitives keep every section consistent.

Hero and About must pass visual inspection at 390px before implementing the remaining sections. Final validation covers mobile, tablet, desktop, navigation, content details, asset loading, overflow, keyboard use, reduced motion, typecheck, and production build.

## Deployment target

React + Vite + TypeScript, static output `dist`, Cloudflare Pages. No server, runtime secrets, D1, or Worker required. This phase performs no deployment or account/domain changes.

## Hardening decisions

Keep the existing editorial/crayon direction and single-page architecture. Masters are preserved byte for byte. The hero imports its original PNG; the portrait uses a 320px lossless WebP derivative. Both runtime images and WOFF2-only fonts are Vite fingerprinted. Display sizes, blending, clipping, and illustrations remain consistent with the baseline.

Small interactive links now have at least 44px target height. Keyboard section navigation transfers focus to a focusable section, and the skip link targets main. The disclosure closes on Escape, tab exit, outside click, and breakpoint change. Native modal dialogs retain browser inertness, restore trigger focus/scroll state, and cycle Tab/Shift+Tab through controls.

Grid tracks use zero minimums where necessary so 200% text can wrap. The education status badge stays in normal grid flow. The About portrait reflows below its heading through an em-based container query when enlarged text reduces available width. Decorative paper/crayon elements remain decorative and excluded from the accessibility tree.

Correct education and certificate status, visible draft labels, and centralized static metadata are content/quality changes. No case-study or article routes, new content pages, or generic replacement UI were introduced.
