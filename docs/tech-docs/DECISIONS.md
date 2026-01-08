# Technical Decisions Log

This document records significant technical decisions made during the
development of Cord-Fam-App, including the rationale and alternatives
considered.

## 2026-01-27: Project Initialization

### Decision: Multi-Database Architecture

**Decision**: Use MySQL for structured data, MongoDB for document data, and file
system for files.

**Rationale**:

- MySQL is ideal for relational data (users, tasks, projects, relationships)
- MongoDB provides flexibility for messages, notes, and recipes
- File system is simplest for user-uploaded files
- This hybrid approach leverages strengths of each storage type

**Alternatives Considered**:

- Single database (MySQL or MongoDB only) - rejected for lack of optimal fit
- Cloud storage (S3) for files - deferred to future if needed

### Decision: Unified API Architecture

**Decision**: Single backend API serving all frontend clients (Web, Android,
iOS).

**Rationale**:

- Consistent API usage across platforms
- Single codebase for business logic
- Easier maintenance and updates
- Standard REST API approach

**Alternatives Considered**:

- Platform-specific APIs - rejected for maintenance burden
- GraphQL - considered but REST is simpler for this use case

### Decision: JWT Authentication

**Decision**: Use JWT tokens for authentication.

**Rationale**:

- Stateless authentication
- Works well with REST APIs
- Standard approach for modern apps
- Supports mobile apps easily

**Alternatives Considered**:

- Session-based auth - rejected for stateless requirement
- OAuth - unnecessary complexity for family-only app

### Decision: TypeScript Everywhere

**Decision**: Use TypeScript for backend and all frontends.

**Rationale**:

- Type safety reduces bugs
- Better IDE support
- Self-documenting code
- Industry best practice

**Alternatives Considered**:

- JavaScript - rejected for lack of type safety

### Decision: React 19+ for Web

**Decision**: Use React 19+ for web frontend.

**Rationale**:

- Modern React features
- Large ecosystem
- Component reusability
- User requirement

**Alternatives Considered**:

- Vue.js - rejected per user preference
- Angular - rejected per user preference

### Decision: Comprehensive Documentation Structure

**Decision**: Separate folders for user-docs, tech-docs, and tasks.

**Rationale**:

- Clear organization
- Easy to find information
- Scalable structure
- Supports multiple audiences (users, developers, AI agents)

**Alternatives Considered**:

- Single docs folder - rejected for lack of organization

### Decision: 100% Test Coverage Requirement

**Decision**: Require 100% unit test coverage and 100% E2E test coverage.

**Rationale**:

- High code quality
- Confidence in changes
- Long-term maintainability
- Best practices for production apps

**Alternatives Considered**:

- Lower coverage thresholds - rejected for quality standards

---

## 2026-01-27: Technology Stack Decisions

### Decision: Fastify Backend Framework

**Decision**: Use Fastify instead of Express.js.

**Rationale**:

- Better performance (2x faster than Express)
- Built-in TypeScript support
- Modern async/await patterns
- Better validation integration
- User preference

**Alternatives Considered**:

- Express.js - rejected in favor of Fastify's performance and TypeScript support

### Decision: Vite Build Tool

**Decision**: Use Vite for frontend web build tool.

**Rationale**:

- Fastest development experience
- Excellent TypeScript support
- Simple configuration
- Perfect for static apps
- User preference

**Alternatives Considered**:

- Next.js - rejected as we don't need SSR and want simpler setup

### Decision: Native Kotlin for Android

**Decision**: Use Native Kotlin for Android app development.

**Rationale**:

- Best performance
- Full access to Android features
- Native user experience
- User preference for performance

**Note**: Separate folder (`frontend/android/`) within same repository is
sufficient. No separate repo needed.

**Alternatives Considered**:

- React Native - rejected for performance reasons
- Kotlin Multiplatform - rejected in favor of full native approach

### Decision: React Context + Hooks for State Management

**Decision**: Start with React Context + Hooks, with option to migrate to
Zustand if needed.

**Rationale**:

- Built-in, no dependencies
- Sufficient for initial needs
- Can evolve to Zustand if complexity grows
- localStorage for persistence across sessions

**Alternatives Considered**:

- Zustand from start - deferred until needed

### Decision: Material-UI (MUI) Framework

**Decision**: Use MUI framework for web frontend styling.

**Rationale**:

- Comprehensive component library
- Free tier sufficient for needs
- `sx` attribute for styling
- Professional, polished UI
- User preference

**Note**: Will use free-licensed (MIT) NPM packages or custom components when
MUI free tier doesn't cover needs.

**Alternatives Considered**:

- Tailwind CSS - rejected in favor of MUI component library
- CSS Modules - rejected in favor of MUI
- styled-components - rejected in favor of MUI

### Decision: npm Package Manager

**Decision**: Use npm for package management.

**Rationale**:

- Standard, widely supported
- Comes with Node.js
- User preference

### Decision: Development Tools (ESLint, Prettier, Knip)

**Decision**: Use ESLint, Prettier, and Knip for code quality. No Husky.

**Rationale**:

- ESLint: Code linting
- Prettier: Code formatting
- Knip: Dead code detection
- No Husky: User preference to skip git hooks

**Alternatives Considered**:

- Husky - rejected per user preference

### Decision: Latest LTS Versions

**Decision**: Use latest LTS versions of all tools and technologies.

**Rationale**:

- Stability and security
- Long-term support
- Industry best practice

---

## 2026-01-27: Channel Membership Architecture

### Decision: Auto-Join for Public Channels

**Decision**: Automatically add users as members of public channels when they
first access the channel (view messages or send a message).

**Rationale**:

- Provides Slack-like user experience where public channels are accessible to
  all users
- Reduces friction - users don't need to explicitly "join" public channels
- Public channels are meant to be open to all family members
- Private channels still require explicit membership, maintaining privacy
  controls

**Implementation**:

- `ChannelService.ensureMember()` checks if user is a member
- If not a member and channel is public, automatically adds user as member
- If not a member and channel is private, throws error (403 Forbidden)
- Applied in message routes before allowing message access/creation

**Alternatives Considered**:

- Require explicit join for all channels - rejected for UX friction
- Make all channels public without membership table - rejected for private
  channel support

---

**Last Updated**: 2026-01-27
