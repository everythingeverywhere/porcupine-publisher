# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app

# Copy root manifests for workspaces install
COPY package.json package-lock.json ./
COPY apps/cms/package.json ./apps/cms/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build only the CMS workspace
RUN npm --workspace @porcupine/cms run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed to run the built Next app
COPY --from=build /app/apps/cms .
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

EXPOSE 3001

# Default: run CMS on 3001
ENV PORT=3001
CMD ["npm", "run", "start"]
