# Porcupine Publisher

Finance affiliate publisher stack (mobile-first, SEO-first) with:
- **Astro** static site for SEO landing pages + blog
- **Payload CMS** (Next.js) for admin UI + content API
- AWS-first deploy path with a long-run Kubernetes target

## Repo layout (npm workspaces)
- `apps/web` — Astro public site (static output)
- `apps/cms` — Next.js app that will host **Payload CMS** admin + API (separate service/port from web)
- `packages/shared` — shared TypeScript utilities + tests (Vitest)

## Key features (planned / in progress)
- Draft/publish workflow
- **Scheduled publishing** (`status`, `publishAt`)
- **Short-form video** content type (upload or embed)
- SEO metadata controls (meta title/description, canonical, noindex, OpenGraph)
- Reusable disclosure/compliance content blocks

See:
- `docs/PLAN-STATUS.md`
- `docs/CONTENT-MODEL.md`
- `docs/AWS-DEPLOYMENT-NOTES.md`
- `docs/AWS-COSTS.md`

## Local development
Prereqs: Node 20+

Install and run tests:
```bash
npm install
npm run test
```

Run the web app:
```bash
npm --workspace @porcupine/web run dev
```

Run the CMS app (Next skeleton today; Payload wiring in progress):
```bash
npm --workspace @porcupine/cms run dev
```

## Quality bar
- Every new helper function should ship with tests.
- CI must pass tests + builds on every push.

## Security model (high level)
- CMS will be **publicly reachable with auth**.
- Phase 1: Payload auth.
- Phase 2: SSO at the edge (AWS Cognito/OIDC via ALB), plus MFA.
