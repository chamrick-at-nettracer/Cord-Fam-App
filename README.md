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

## Documentation

- **User Documentation**: `docs/user-docs/`
- **Technical Documentation**: `docs/tech-docs/`
- **API Documentation**: Swagger/OpenAPI specs in `docs/tech-docs/api/`
- **Task History**: `docs/tasks/PROGRESS.md`

## Development

See `docs/tech-docs/DEVELOPMENT.md` for setup and development instructions.

## License

Private - Family Use Only
