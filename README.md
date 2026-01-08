# Cord-Fam-App

A comprehensive family collaboration platform combining communication
(Slack-like), task management (JIRA-like), and note-taking (Evernote-like)
capabilities.

## Architecture

- **Backend**: Node.js + TypeScript REST API
- **Frontend**:
  - Web: React 19+ (static bundle)
  - Android: Native/Cross-platform app
  - iOS: Native/Cross-platform app (future)
- **Data Storage**: MySQL (SQL), MongoDB/NoSQL, File System
- **Authentication**: JWT-based authentication

## Project Structure

```text
├── backend/          # Node.js + TypeScript API server
├── frontend/
│   ├── web/         # React web application
│   ├── android/     # Android application
│   └── ios/         # iOS application (future)
├── docs/
│   ├── user-docs/   # User-facing documentation
│   ├── tech-docs/   # Technical documentation
│   └── tasks/       # Task tracking and history
├── tests/           # Shared test utilities and E2E tests
└── scripts/         # Build and deployment scripts
```

## Quick Start

**New to the project?** Start here:

👉 **[First Day Guide](docs/JUNIOR_DEV_START_HERE.md)** - Step-by-step
walkthrough for junior developers 👉
**[Getting Started Guide](docs/GETTING_STARTED.md)** - Complete setup
instructions

### Quick Commands

```bash
# Setup databases
MySQL -u root -p < scripts/init-database.sql

# Start backend (Terminal 1)
cd backend && npm install && cp .env.example .env && npm run dev

# Start frontend (Terminal 2)
cd frontend/web && npm install && npm run dev
```

Then open `http://localhost:5173` in your browser!

## Documentation

- **User Documentation**: `docs/user-docs/`
- **Technical Documentation**: `docs/tech-docs/`
- **API Documentation**: Swagger/OpenAPI specs in `docs/tech-docs/api/`
- **Task History**: `docs/tasks/PROGRESS.md`

## Development

### For New Developers

👉 **Start Here**: [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) -
Complete step-by-step setup guide

### Platform-Specific Guides

- **Backend**:
  [`docs/tech-docs/BACKEND_SETUP.md`](docs/tech-docs/BACKEND_SETUP.md) - Backend
  API setup
- **Web Frontend**:
  [`docs/tech-docs/WEB_FRONTEND_SETUP.md`](docs/tech-docs/WEB_FRONTEND_SETUP.md) -
  React web app setup
- **Android**:
  [`docs/tech-docs/ANDROID_SETUP.md`](docs/tech-docs/ANDROID_SETUP.md) - Android
  app setup (coming soon)

### Additional Documentation

- **Development Guide**:
  [`docs/tech-docs/DEVELOPMENT.md`](docs/tech-docs/DEVELOPMENT.md) - Development
  workflow and best practices
- **Quick Start**: [`docs/tasks/QUICK_START.md`](docs/tasks/QUICK_START.md) -
  Fast setup reference

## License

Private - Family Use Only
