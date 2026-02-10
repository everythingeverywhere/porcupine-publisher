# AWS Cost Notes (Porcupine Publisher)

Date: 2026-02-10

> This is an **order-of-magnitude** estimate intended to guide architecture choices for **lowest cost** while keeping a sane upgrade path to ECS/EKS later.

## Cost drivers
For a small MVP, your biggest costs tend to be:
- **Compute that must be always-on** (CMS API/admin)
- **Database** (managed Postgres)
- **Load balancer** (ALB can be surprisingly expensive for tiny apps)

Your static web (Astro) is usually cheap.

## Component-by-component

### 1) Web app (Astro static) — S3 + CloudFront
Typical small site costs:
- S3 storage + requests: usually **cents to a couple dollars/month**
- CloudFront: depends on traffic; for low traffic typically **a few dollars/month**

Rule of thumb: **$1–$10/mo** for very small traffic, excluding domain.

### 2) CMS app (Payload) — the main cost

#### Lowest-cost AWS pattern (good MVP)
**Lightsail** instance (or Lightsail Containers) running the CMS container + reverse proxy.
- Example: $5–$10/mo instance can run a small Node app.
- Pros: cheap, simple.
- Cons: not as “cloud-native” as ECS, but migration later is straightforward.

DB options:
- Cheapest: run Postgres on the same instance (lowest $$, worst ops)
- Better practice: managed Postgres (RDS) which costs more.

#### “Best practice AWS-native” pattern (clean, but more $)
**ECS Fargate + ALB + RDS**
- ALB often adds a noticeable fixed monthly cost even at low traffic.
- Fargate is pay-per-resource; small services can still add up.

Rule of thumb for a small always-on CMS:
- **Compute + ALB**: often **$30–$80/mo**
- **RDS Postgres** (smallest practical): often **$15–$40/mo**

Total rough range: **$50–$120/mo** for a “proper” always-on setup.

### 3) Database (Postgres)
- RDS is the easiest path.
- Cheapest instances exist, but storage + backups add cost.

Rule of thumb: **$15–$50/mo** depending on class/region/storage.

### 4) Media storage (S3)
Typically low unless you host lots of videos.
- Images: cheap
- Video: can become meaningful with storage + egress

Rule of thumb early: **$1–$10/mo**, but videos can push higher.

### 5) Domain + DNS
- Route 53 hosted zone + queries: usually **~$1/mo** plus domain registration.

## Recommended “lowest cost with clean upgrade path”
If you want to minimize spend **now** but keep an easy path to Kubernetes later:

**Phase 1 (lowest cost)**
- Web: S3 + CloudFront
- CMS: Lightsail instance + Docker
- DB: start with managed Postgres if budget allows; otherwise co-locate Postgres (short-term only)
- Uploads: S3

Expected range: **$20–$60/mo** depending on DB choice.

**Phase 2 (more robust)**
- Move CMS to ECS Fargate + ALB
- RDS Postgres

Expected range: **$50–$120/mo**

**Phase 3 (Kubernetes)**
- Move CMS to EKS, keep RDS + S3

Cost can increase because EKS has cluster overhead; often worth it when you need scale/ops patterns.

## When GCP might be cheaper
GCP can be cost-competitive especially for:
- Cloud Run style services (scale-to-zero patterns)
- Some Postgres offerings depending on usage

However, for a CMS that’s actively used and needs to stay warm, the DB still dominates.

## Next: make this estimate precise
To produce a tighter estimate, I need:
1) Expected traffic (pageviews/month)
2) Expected CMS usage (how many editors, how often)
3) Media volume (GB of video/month)
4) Desired uptime (ok with occasional restarts?)
