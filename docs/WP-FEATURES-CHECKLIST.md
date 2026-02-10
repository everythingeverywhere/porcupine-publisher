# WordPress Feature Checklist (future scope)

Date: 2026-02-10

This is a checklist of "WordPress-like" capabilities we may want to add over time, mapped to our stack (Astro + Payload).

## Core publishing
- [ ] Pages (static pages)
- [ ] Posts (blog)
- [ ] Categories / tags
- [ ] Authors / bylines
- [x] Drafts / revisions (Payload versions/drafts)
- [x] Scheduled publishing (model in place; job runner TBD)
- [ ] Editorial workflow (roles/permissions)
- [ ] Preview (live preview / draft preview)

## Media
- [x] Media library collection (basic)
- [ ] Image processing / responsive images (sharp + transforms)
- [ ] Video support
  - [x] Shorts model (upload or embed)
  - [ ] Transcoding / streaming strategy (likely external/hosted later)
- [ ] S3-backed uploads in production

## SEO
- [x] Page-level metadata fields (meta title/description, canonical, noindex, OpenGraph)
- [ ] XML sitemap generation (in Astro or separate job)
- [ ] Robots.txt
- [ ] Redirects management (301/302)
- [ ] Schema.org JSON-LD helpers (shared package + web)

## Site structure
- [ ] Menus / navigation editor (header/footer menus)
- [ ] Reusable blocks (disclosures, CTAs, offer tables)

## Comments / community (optional)
- [ ] Comments (likely external service first)

## Analytics / tracking
- [ ] UTM + outbound link tracking helpers
- [ ] Event tracking plan (GA4 / Plausible)

## Ops / admin
- [ ] Backups + restore strategy
- [ ] Admin audit logs
- [ ] Rate limiting / WAF edge settings

## Notes
- We should implement these *after* the CMS boots cleanly, QC/QA baseline is in place, and web is pulling content.
