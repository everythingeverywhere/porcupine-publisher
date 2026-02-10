# AWS Deployment Notes (target: Kubernetes later)

Date: 2026-02-10

## Goals
- Public site: fast, static, SEO-first.
- CMS: public endpoint with strong auth; admin protected.
- Long-run: migrate to EKS (Kubernetes) cleanly.

## Recommended AWS shape

### Web (Astro static)
- Build artifact: `apps/web/dist`
- Host:
  - S3 static website hosting (private bucket)
  - CloudFront CDN in front
- Deploy:
  - GitHub Actions → upload to S3 + invalidate CloudFront

### CMS (Payload)
**Phase 1 (simple, AWS-managed):**
- ECS Fargate service (single or small scale) behind ALB
- RDS Postgres
- S3 for uploads
- Secrets in Secrets Manager

**Phase 2 (Kubernetes):**
- EKS deployment for `apps/cms` container
- RDS Postgres remains managed
- S3 remains uploads

## Auth best practices for public CMS
- Put admin behind SSO if possible.
  - Quick AWS-native: Cognito + ALB authentication (OIDC)
  - Or CloudFront + Cognito/IAM Identity Center (varies)
- Enforce MFA on admin identities.
- Lock down admin routes with stricter policies than read-only APIs.

## Kubernetes readiness checklist (for later)
- CMS container stateless, uploads to S3
- External secrets integration
- DB migrations as a job (or startup step)
- Liveness/readiness endpoints
- Resource requests/limits
- NetworkPolicy + WAF at edge (CloudFront/ALB)

