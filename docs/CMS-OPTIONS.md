# CMS Options & Best-Practice Choice (Porcupine Publisher)

Date: 2026-02-10

## Context / goals (from plan)
- Mobile-first performance, SEO-first.
- CMS UI MVP that feels WordPress-like (collections / menus) with Google-Docs-ish rich editing.
- Self-hostable / cloud deployable (AWS or Google), **eventually Kubernetes**.
- Prefer clean separation: public site (`apps/web`) vs CMS/admin/API (`apps/cms`).

## Short recommendation (best practice)
**Use Payload CMS (self-hosted) backed by Postgres, with S3/GCS for media, packaged as a container for AWS/GCP, and keep the Astro site static and separate.**

Why this is the best-practice fit:
- **Editorial UX**: Payload’s admin + rich text (Lexical) is the closest match to “Docs-ish” in the popular OSS/self-hostable CMS set.
- **Code-first, TS-first**: content types live in code alongside your app; changes are reviewable and versioned.
- **Deployment path to Kubernetes is straightforward**: a standard web app + Postgres + object storage.

If you prioritize “most battle-tested traditional headless CMS ops model” over code-first DX, Strapi is the runner-up.

## Decision criteria (what matters for *this* project)
1. **Editorial UX** (rich text, drafts, preview, roles)
2. **Developer ergonomics** (type safety, migrations, versioned schemas)
3. **Ops / deployability** (Docker/K8s friendliness, statelessness, scaling)
4. **Data model fit** (Pages, Offers, Disclosures, reusable blocks)
5. **Licensing & long-term risk**

## Option comparison (high-level)

### 1) Payload CMS (recommended)
**Strengths**
- Excellent rich-text + blocks model (good for compliance blocks, disclosures, reusable page sections).
- Code-first configuration and TS typing tends to be strong.
- Works naturally with a dedicated CMS app (often Next.js) while exposing REST/GraphQL APIs.

**Watch-outs**
- You need to be disciplined about separation of concerns (admin/API vs public web) and secrets.
- Make sure preview/draft workflows are designed intentionally (preview tokens, etc.).

**Best for**: “developer-owned CMS”, strong blocks, modern editor, versioned schema.

### 2) Strapi (runner-up)
**Strengths**
- Mature ecosystem, lots of deployment guides, common in production.
- Clear separation: API server + admin UI.
- Docs explicitly call out Kubernetes considerations (e.g., package manager behavior).

**Watch-outs**
- Rich-text/editor experience can be good but may feel less “docs-like” unless tuned with plugins.
- Plugin surface area can become a maintenance/security burden.

**Best for**: “standard headless CMS” with many known patterns.

### 3) Directus
**Strengths**
- Great admin UI and instant API generation.
- Very container-friendly.

**Watch-outs**
- Licensing note: Directus docs indicate BSL 1.1 for commercial usage with a threshold (>$5M finances requires a license). That may or may not matter for you, but it is a **future constraint**.

**Best for**: rapid CRUD/admin on existing DB, when license constraints are acceptable.

## Recommended architecture (AWS/GCP now, Kubernetes later)

### Apps
- `apps/web` (Astro)
  - Static output.
  - Reads content from CMS via REST/GraphQL.
  - Deployed as static site (CloudFront+S3, or Cloud Storage+Cloud CDN).

- `apps/cms` (Payload)
  - Admin UI + API.
  - Runs as container behind HTTPS.
  - Uses Postgres.
  - Uses object storage for uploads.

### Data/services
- Postgres (RDS / Cloud SQL)
- Object storage for media
  - AWS: S3
  - GCP: GCS
- Optional: Redis (rate limiting, caching, background jobs)

### Network + security
- CMS/admin should not be “public to the world” unless necessary.
  - Put behind auth (SSO/IAP) and/or allowlist.
  - At minimum: TLS + strong admin password policy + MFA if supported.
- Separate **public content API** from **admin UI** where feasible.
- Use secrets manager (AWS Secrets Manager / GCP Secret Manager).

## Kubernetes best practices (when you get there)
- Treat CMS as **stateless**:
  - uploads → object storage (not local disk)
  - session keys/secrets → k8s secrets / external secret store
- Use **readiness/liveness** probes.
- Run DB separately (managed Postgres is easiest).
- Consider a migration job/step in CI/CD.
- Add basic observability:
  - request logs, error tracking, metrics

## MVP content model (fits finance affiliate)
- Pages
  - title, slug, SEO fields (meta title/description, canonical)
  - layout blocks (hero, FAQ, offer-table, disclosure)
- Offers
  - partner, base URL, terms, categories, states availability
  - tracking params builder (UTM)
- Disclosures
  - reusable blocks/snippets with versioning (effective dates)

## Notes about current repo dependency vulnerabilities
`npm audit` shows moderate vulnerabilities (esbuild dev-server related). Practical guidance:
- This is primarily a **dev-server exposure** class issue.
- Mitigation: ensure local dev servers bind to localhost and are not exposed to the internet; don’t run `astro dev` on a public interface.
- We can schedule dependency upgrades, but `npm audit fix --force` would be a breaking jump for vitest. Better to upgrade intentionally once we’ve added more code/tests.

## Open questions (to decide before implementing `apps/cms`)
1. Do you want CMS admin accessible publicly (with auth), or only via VPN/IAP/allowlist?
2. For cloud: AWS first or GCP first? (Either is fine; it mainly changes Terraform/Helm values.)
3. Media storage preference: S3/GCS now, or local for dev only?

