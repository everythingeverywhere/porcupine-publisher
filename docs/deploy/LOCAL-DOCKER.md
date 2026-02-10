# Local container dev (CMS + Postgres)

We support running the stack locally using **open-source** tooling.

## Option A (recommended): Podman
See `docs/deploy/PODMAN.md`.

## Compose file
From repo root, use the included `docker-compose.yml` (Compose spec) to run:
- CMS: http://localhost:3001
- Postgres: localhost:5432 (postgres/postgres)

Environment variables are set in `docker-compose.yml` for local convenience.
