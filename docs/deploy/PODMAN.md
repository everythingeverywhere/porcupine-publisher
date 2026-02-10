# Podman local dev (Option A)

Date: 2026-02-10

## Goal
Use **open-source** container tooling (Podman) for local dev without Docker Desktop.

This repo currently includes a `docker-compose.yml` which we treat as a generic Compose spec.

## Prereqs (macOS)
- Install Podman
- Initialize the Podman VM:

```bash
podman machine init
podman machine start
```

## Run CMS + Postgres locally
From repo root:

```bash
podman compose up --build
```

Endpoints:
- CMS: http://localhost:3001
- Postgres: localhost:5432 (postgres/postgres)

## Notes
- Compose support depends on your Podman install; if `podman compose` is unavailable, we can add a fallback using `podman` + `podman generate systemd` or install the compose plugin.
- Later, Rancher Desktop can be used strictly for Kubernetes testing (not required for day-to-day dev).
