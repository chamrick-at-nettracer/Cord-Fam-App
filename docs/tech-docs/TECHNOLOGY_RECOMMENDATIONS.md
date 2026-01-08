# Technology Recommendations & Considerations

## New Technologies (2025-2026)

### Vitest
**What it is**: Fast unit testing framework built for Vite projects
**Role**: Replace Jest for frontend testing
**Why Consider**: Native Vite integration, faster than Jest, same API
**Status**: ✅ **RECOMMENDED** - Use Vitest for frontend tests

### Knip
**What it is**: Dead code detection tool
**Role**: Find unused exports, dependencies, files
**Why Consider**: Keep codebase clean, reduce bundle size
**Status**: ✅ **CONFIRMED** - Already in your requirements

### Turborepo / Nx
**What they are**: Monorepo build systems
**Role**: Manage multiple packages (backend, frontend, shared)
**Why Consider**: Better than npm workspaces for complex builds
**Status**: ⚠️ **DEFERRED** - Not needed yet, can add later if monorepo grows

### tRPC
**What it is**: End-to-end typesafe APIs
**Role**: Type-safe API calls between frontend and backend
**Why Consider**: Eliminates API type mismatches
**Status**: ❌ **NOT RECOMMENDED** - We're doing REST, tRPC requires different backend setup

### Zod
**What it is**: TypeScript-first schema validation
**Role**: Validate API inputs/outputs
**Why Consider**: TypeScript integration, runtime validation
**Status**: ✅ **CONFIRMED** - Already planned

## Technologies to Consider Avoiding

### GraphQL
**What it is**: Query language for APIs
**Role**: Alternative to REST
**Why Avoid for MVP**:
- More complex setup
- Overkill for family app
- REST is simpler and sufficient
- **Status**: ❌ **AVOID** - Stick with REST

### Prisma
**What it is**: Next-generation ORM
**Role**: Database access layer
**Why Consider**:
- Type-safe database queries
- Great TypeScript support
- Migrations built-in
- **Alternative**: TypeORM (more mature, more features)
- **Status**: ⚠️ **CONSIDER LATER** - TypeORM is fine for now, Prisma is newer but less mature

### Redux / Zustand (Initially)
**What they are**: State management libraries
**Role**: Global state management
**Why Avoid Initially**:
- React Context sufficient for MVP
- Can add later if needed
- **Status**: ✅ **DEFERRED** - Start with Context, add Zustand if needed

### Next.js
**What it is**: Full-stack React framework
**Role**: Web framework
**Why Avoid**:
- We want static export
- Vite is simpler for our use case
- **Status**: ❌ **AVOID** - Using Vite instead

### React Native (for Android)
**What it is**: Cross-platform mobile framework
**Role**: Mobile app development
**Why Avoid**:
- You chose Native Kotlin for performance
- **Status**: ❌ **AVOID** - Using Native Kotlin

### Tailwind CSS
**What it is**: Utility-first CSS framework
**Role**: Styling
**Why Avoid**:
- You chose MUI
- MUI provides components, Tailwind is just utilities
- **Status**: ❌ **AVOID** - Using MUI

### Husky
**What it is**: Git hooks manager
**Role**: Pre-commit hooks
**Why Avoid**:
- You explicitly don't want it
- Can add manually if needed
- **Status**: ❌ **AVOID** - Per your preference

## Recommended Stack Summary

### Backend
- ✅ Fastify (confirmed)
- ✅ TypeScript (confirmed)
- ✅ Zod (validation)
- ✅ TypeORM (MySQL)
- ✅ MongoDB native driver
- ✅ Jest (backend testing)
- ✅ Pino (logging - Fastify's default)

### Frontend Web
- ✅ Vite (confirmed)
- ✅ React 19+ (confirmed)
- ✅ TypeScript (confirmed)
- ✅ MUI (confirmed)
- ✅ React Router (routing)
- ✅ Axios (HTTP client)
- ✅ React Context + Hooks (state)
- ✅ Vitest (testing - recommended)
- ✅ Playwright (E2E testing)

### Frontend Android
- ✅ Native Kotlin (confirmed)
- ✅ Jetpack Compose (modern UI)
- ✅ Retrofit + OkHttp (HTTP)
- ✅ Room Database (local storage)

### Development Tools
- ✅ ESLint (confirmed)
- ✅ Prettier (confirmed)
- ✅ Knip (confirmed)
- ❌ Husky (avoided per preference)

---

**Last Updated**: 2026-01-27
