# Deploy CMS on AWS Lightsail (Phase 1: lowest cost)

Date: 2026-02-10

## Goal
Run `apps/cms` (Next + Payload) cheaply on AWS with a clean migration path to ECS/EKS later.

## Recommended Phase 1 shape
- 1x Lightsail Linux instance
- Docker + Docker Compose
- Reverse proxy + TLS (Caddy recommended) in front of the CMS
- Postgres:
  - Lowest cost: run Postgres in Docker on the instance
  - Better practice: use managed Postgres later (RDS) once revenue/traffic justify

## Steps (high-level)
1) Create a Lightsail instance
- Linux (Ubuntu)
- Size: start small (5–10 USD/mo class)

2) Install Docker
- Install Docker + docker compose plugin

3) Deploy the repo
- `git clone` on the instance
- Create `.env` (do not commit)
- `docker compose up -d`

4) Add TLS + auth posture
- Put CMS behind HTTPS
- Phase 1 auth: Payload login
- Phase 2: add SSO at the edge (Cognito/OIDC) when moving to ALB/ECS

## Notes
- Keep uploads in object storage (S3) in production so the CMS stays stateless.
- Avoid exposing Postgres publicly.
- Make sure secrets are stored outside git.
