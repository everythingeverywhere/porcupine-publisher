# Content Model + Publishing Features (MVP)

Date: 2026-02-10

This doc captures the **best-practice MVP** for the CMS features you asked for:
- scheduled publishing
- short-form video support
- SEO metadata editing for ranking

## Key idea
Use Payload’s **drafts / versions** for editorial workflow, then add a lightweight **scheduler** that flips content from `scheduled` → `published` when `publishAt <= now`.

In AWS this scheduler is typically:
- **EventBridge Scheduled Rule** → hits an internal endpoint (or invokes a Lambda) every minute
- OR later in Kubernetes: **CronJob** calling the same endpoint.

## Collections

### 1) Pages
Purpose: SEO landing pages, evergreen content.

Fields (suggested)
- `title` (text)
- `slug` (text; derived from title)
- `layout` (blocks)
- `seo` (group)
  - `metaTitle`
  - `metaDescription`
  - `canonicalUrl`
  - `noIndex` (bool)
  - `openGraph` (group)
    - `title`
    - `description`
    - `image` (relationship → Media)
- `status` (select: `draft | scheduled | published`)
- `publishAt` (date)
- `publishedAt` (date; set by system when published)

### 2) Posts (Blog)
Purpose: long-form content, news, topical posts.

Fields
- all `Pages` fields, plus:
- `excerpt`
- `author` (relationship)
- `category/tags`

### 3) Shorts (Short-form video)
Purpose: your “short form” plan.

Fields
- `title`
- `slug`
- `video`
  - either upload (relationship → Media) OR embed URL (YouTube/TikTok/etc)
- `caption` / `transcript` (rich text)
- `cta` (button text + URL)
- `seo` group
- `status` + `publishAt` + `publishedAt`

### 4) Offers
Purpose: structured affiliate offers.

Fields
- `name`
- `provider`
- `baseUrl`
- `utmDefaults` (key/value)
- `disclosures` (relationship → Disclosures)

### 5) Disclosures
Purpose: reusable compliance blocks.

Fields
- `key` (e.g., `general-disclosure`, `apr-disclosure`)
- `title`
- `body` (rich text)
- `effectiveFrom` (date)

### 6) Media
Purpose: images/videos used everywhere.

Best practice
- In dev: local storage
- In prod: **S3** (so the app stays stateless for ECS/EKS)

## Scheduled publishing implementation (best practice)

### Data model
- Editors set `status=scheduled` and `publishAt`.
- A scheduler job periodically:
  - finds documents with `status=scheduled` and `publishAt <= now`
  - flips to `published` (and sets `publishedAt`)

### AWS implementation
- **EventBridge** cron (every 1 minute)
- Target:
  - Lambda that calls Payload local API
  - OR HTTPS endpoint on the CMS (protected with secret header)

### Kubernetes implementation (later)
- CronJob hitting the same “publish scheduled” endpoint.

## SEO best practices supported by the model
- Canonical URL
- OpenGraph image
- Optional `noIndex`
- Structured data JSON-LD (generated in `apps/web` based on content type)
- Slug normalization via `@porcupine/shared`

## Next steps
1) Implement these collections in Payload config.
2) Wire `apps/web` to read published content.
3) Add scheduler endpoint + EventBridge rule.
