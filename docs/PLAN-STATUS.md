# Plan Status (Porcupine Publisher)

Date: 2026-02-10

## High-level direction
- Monorepo (npm workspaces)
- `apps/web`: Astro static site (SEO-first)
- `apps/cms`: Next.js + Payload CMS (admin UI + API)
- `packages/shared`: shared TS utilities + tests

## Decisions
- CMS: Payload (best UX + blocks + TS-first)
- Admin access: public endpoint **with auth**
  - Phase 1: Payload auth (username/password)
  - Phase 2: add SSO (e.g., Cognito/OIDC at ALB)
- Cloud: AWS-first
- Separation: Option A — run CMS separately from web (different service/port) for clean deployment to ECS/EKS
- Local containers: **Podman** (open-source). Rancher Desktop optional later for Kubernetes testing.

## Current repo status
### ✅ Completed
- Monorepo scaffold + CI
- `packages/shared` utilities + Vitest tests (slug + offer URL builder)
- `apps/web` Astro skeleton (Home + About) builds successfully
- `apps/cms` Next.js skeleton builds successfully
- Content model scaffolding added under `apps/cms/src/payload`:
  - Collections: Media, Pages, Posts, Shorts, Offers, Disclosures
  - SEO fields group
  - Scheduling fields: status/publishAt/publishedAt
- Docs added:
  - `docs/CMS-OPTIONS.md`
  - `docs/AWS-DEPLOYMENT-NOTES.md`
  - `docs/CONTENT-MODEL.md`

### 🔜 Next steps (implementation)
1) Wire Payload into `apps/cms` so the Admin UI + API actually run locally
   - Postgres connection via `DATABASE_URL`
   - Local uploads in dev; S3 adapter in prod
2) Implement scheduled publishing job
   - Add secure internal endpoint + worker function
   - AWS: EventBridge schedule (later)
3) Wire `apps/web` to fetch **published** content from CMS
   - pages + blog posts + shorts
4) Add QC/QA baseline
   - Tests for shared utilities (already started)
   - Add unit tests for any new helper functions (slugging, canonical building, UTM builder, JSON-LD generator)
   - Add smoke test(s) for CMS: config loads + basic CRUD in-memory (or against test DB)
   - CI updates as test surface grows

## Quality bar (explicit)
- Every new function should have tests.
- CI must run tests + builds on every push.
- Avoid "npm audit fix --force" until we upgrade deliberately with tests to catch breaks.
