# Pre-deployment checklist

- [ ] Owner approves factual project/experience copy and contact destinations.
- [ ] Owner reviews writing drafts; retain draft labels until publication is approved.
- [ ] Confirm education still says yudisium completed and November 2026 graduation planned.
- [ ] Confirm BNSP certificate status before changing the pending label.
- [ ] Review and merge the hardening PR manually after CI succeeds.
- [ ] Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build` on Node 22.
- [ ] Inspect generated HTML, robots/sitemap, icons, sharing image, hashed assets, and `_headers` with its resolved JSON-LD hash.
- [ ] Recheck keyboard navigation, dialogs, mobile layouts, and text resizing after further content edits.
- [ ] Authorize the later Cloudflare deployment; inspect its preview and actual response headers before changing the custom domain.

This phase prepares a reviewable PR only. No checklist item constitutes a deployment record.
