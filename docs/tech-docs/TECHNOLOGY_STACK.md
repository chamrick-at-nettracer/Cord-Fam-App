# Technology Stack

This document outlines the proposed technology stack for Cord-Fam-App. These are recommendations that should be confirmed before implementation.

## Backend

### Runtime & Language
- **Node.js**: 20+ LTS
- **TypeScript**: 5+ (strict mode)
- **Package Manager**: npm, yarn, or pnpm (TBD)

### Web Framework
- **Express.js**: Mature, widely-used, extensive middleware ecosystem
- **Alternative**: Fastify (faster, modern, TypeScript-friendly)

**Recommendation**: Express.js for stability and ecosystem, or Fastify for performance

### Database Drivers
- **MySQL**: `mysql2` or `typeorm` (with TypeORM for ORM)
- **MongoDB**: `mongodb` (official driver) or `mongoose`

**Recommendation**:
- MySQL: `typeorm` for type-safe queries and migrations
- MongoDB: `mongodb` driver (native) for flexibility

### Authentication
- **JWT**: `jsonwebtoken`
- **Password Hashing**: `bcrypt` or `bcryptjs`

### Validation
- **Zod**: TypeScript-first schema validation
- **Alternative**: Joi

**Recommendation**: Zod for TypeScript integration

### API Documentation
- **Swagger/OpenAPI**: `swagger-jsdoc` + `swagger-ui-express`
- **Alternative**: `tsoa` (TypeScript-first OpenAPI)

**Recommendation**: `swagger-jsdoc` for flexibility

### Testing
- **Jest**: Unit and integration tests
- **Supertest**: HTTP endpoint testing

### Other Backend Tools
- **Logging**: `winston` or `pino`
- **Environment Variables**: `dotenv`
- **CORS**: `cors`
- **Security**: `helmet`
- **Rate Limiting**: `express-rate-limit`

## Frontend Web

### Framework & Build Tool
- **React**: 19+
- **Build Tool Options**:
  - **Vite**: Fast, modern, simple
  - **Next.js**: Full-stack framework (but we want static export)

**Recommendation**: Vite for simplicity and speed (we don't need SSR)

### Language
- **TypeScript**: 5+ (strict mode)

### Routing
- **React Router**: 6+

### State Management
- **React Context + Hooks**: Built-in, simple
- **Alternative**: Zustand (lightweight, simple)

**Recommendation**: Start with React Context, migrate to Zustand if needed

### HTTP Client
- **Axios**: Feature-rich, interceptors
- **Alternative**: Native `fetch` with wrapper

**Recommendation**: Axios for interceptors and error handling

### UI/Component Library
- **Custom Components**: Build from scratch (Slack/JIRA/Evernote-inspired)
- **Styling**: CSS Modules or Tailwind CSS

**Recommendation**: Tailwind CSS for rapid development

### Testing
- **Vitest**: Fast unit testing (Vite-compatible)
- **React Testing Library**: Component testing
- **Playwright**: E2E testing

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

## Frontend Android

### Framework Options

#### Option 1: React Native
- **Pros**: Code sharing with web, single codebase, large ecosystem
- **Cons**: Performance overhead, native module complexity
- **Best For**: Rapid development, code reuse

#### Option 2: Kotlin Multiplatform Mobile (KMM)
- **Pros**: Native performance, shared business logic
- **Cons**: Smaller ecosystem, more complex setup
- **Best For**: Performance-critical, native feel required

#### Option 3: Native Kotlin/Java
- **Pros**: Best performance, full Android features
- **Cons**: No code sharing, separate codebase
- **Best For**: Maximum performance, Android-specific features

**Recommendation**: React Native for code sharing and faster development

### If React Native:
- **React Native**: Latest stable
- **Navigation**: React Navigation
- **State**: React Context or Zustand (shared with web)
- **HTTP**: Axios (shared with web)
- **Storage**: AsyncStorage or React Native MMKV

### If Native Kotlin:
- **Kotlin**: Latest stable
- **Architecture**: MVVM with Jetpack Compose
- **HTTP**: Retrofit + OkHttp
- **Storage**: Room Database or DataStore

## Frontend iOS (Future)

### Framework Options

#### Option 1: React Native
- **Pros**: Code sharing with web/Android, single codebase
- **Cons**: Performance overhead
- **Best For**: Consistency across platforms

#### Option 2: SwiftUI
- **Pros**: Native performance, modern UI framework
- **Cons**: No code sharing, iOS 14+ only
- **Best For**: Best iOS experience

#### Option 3: Kotlin Multiplatform Mobile
- **Pros**: Shared business logic with Android
- **Cons**: UI still needs native code
- **Best For**: Business logic reuse

**Recommendation**: React Native for consistency, or SwiftUI if prioritizing native iOS experience

## Databases

### MySQL
- **Version**: 8.0+
- **ORM/Query Builder**: TypeORM
- **Migrations**: TypeORM migrations

### MongoDB
- **Version**: 7.0+
- **Driver**: Native `mongodb` driver
- **ODM**: Optional `mongoose` if needed

### File Storage
- **Development**: Local file system
- **Production**: Local file system or S3-compatible storage

## DevOps & Infrastructure

### Version Control
- **Git**: Standard Git workflow
- **Hosting**: GitHub, GitLab, or Bitbucket

### CI/CD
- **GitHub Actions**: If using GitHub
- **Alternative**: GitLab CI, Jenkins

### Deployment
- **Backend**: PM2, Docker, or cloud platform
- **Frontend Web**: Static hosting (Nginx, Vercel, Netlify)
- **Database**: Self-hosted or managed service

### Monitoring (Future)
- **Logging**: Winston/Pino logs
- **Error Tracking**: Sentry (optional)
- **Analytics**: Custom or privacy-focused solution

## Development Tools

### Code Quality
- **ESLint**: Linting
- **Prettier**: Formatting
- **Husky**: Git hooks
- **lint-staged**: Pre-commit linting

### Documentation
- **Markdown**: All documentation
- **Swagger**: API documentation
- **JSDoc**: Code documentation

## Questions for Confirmation

1. **Backend Framework**: Express.js or Fastify?
2. **Frontend Build Tool**: Vite or Next.js (static export)?
3. **Android Framework**: React Native, Kotlin Multiplatform, or Native?
4. **State Management**: React Context or Zustand?
5. **Styling**: CSS Modules, Tailwind CSS, or styled-components?
6. **Package Manager**: npm, yarn, or pnpm?

---

**Last Updated**: 2026-01-27
