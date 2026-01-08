# Project Structure

Complete overview of the Cord-Fam-App project structure.

## Root Directory

````text
Cord-Fam-App/
├── .cursorrules          # AI agent orchestration rules
├── .gitignore           # Git ignore patterns
├── README.md            # High-level project overview
│
├── backend/             # Backend API server
│   ├── src/            # Source code
│   ├── tests/          # Backend tests
│   ├── logs/           # Application logs
│   └── README.md       # Backend documentation
│
├── frontend/
│   ├── web/            # React web application
│   │   ├── src/       # Source code
│   │   └── tests/     # Frontend tests
│   ├── android/       # Android application (future)
│   └── ios/           # iOS application (future)
│
├── docs/               # All documentation
│   ├── PRD.md         # Product Requirements Document
│   ├── user-docs/     # User-facing documentation
│   ├── tech-docs/     # Technical documentation
│   └── tasks/         # Task tracking
│
├── tests/             # Shared test utilities and E2E tests
│   └── e2e/           # End-to-end tests
│
└── scripts/            # Build and deployment scripts
```text

## Backend Structure

```TypeScript
backend/
├── src/
│   ├── routes/        # Express route definitions
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── channels.ts
│   │   ├── messages.ts
│   │   ├── projects.ts
│   │   ├── tasks.ts
│   │   ├── notes.ts
│   │   └── recipes.ts
│   │
│   ├── controllers/   # Request handlers
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   └── ...
│   │
│   ├── services/      # Business logic
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   └── ...
│   │
│   ├── repositories/ # Data access layer
│   │   ├── userRepository.ts
│   │   └── ...
│   │
│   ├── models/        # Data models
│   │   ├── User.ts
│   │   └── ...
│   │
│   ├── middleware/    # Express middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validator.ts
│   │
│   ├── utils/         # Utility functions
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   └── ...
│   │
│   ├── types/         # TypeScript types
│   │   ├── express.d.ts
│   │   └── ...
│   │
│   └── index.ts       # Application entry point
│
├── tests/
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
│   └── fixtures/      # Test data
│
└── package.json
```text

## Frontend Web Structure

```TypeScript
frontend/web/
├── src/
│   ├── components/    # React components
│   │   ├── common/   # Reusable components
│   │   ├── communication/  # Chat components
│   │   ├── tasks/    # Task management components
│   │   └── notes/    # Notes/recipes components
│   │
│   ├── pages/        # Page components
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Channels.tsx
│   │   ├── Tasks.tsx
│   │   └── Notes.tsx
│   │
│   ├── hooks/        # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── ...
│   │
│   ├── services/     # API service clients
│   │   ├── api.ts    # Base API client
│   │   ├── authService.ts
│   │   ├── channelService.ts
│   │   └── ...
│   │
│   ├── store/        # State management
│   │   ├── authStore.ts
│   │   └── ...
│   │
│   ├── utils/        # Utility functions
│   │   ├── formatters.ts
│   │   └── ...
│   │
│   ├── types/        # TypeScript types
│   │   ├── api.ts
│   │   ├── user.ts
│   │   └── ...
│   │
│   ├── App.tsx       # Root component
│   └── main.tsx      # Entry point
│
├── tests/
│   ├── unit/         # Unit tests
│   ├── e2e/          # E2E tests (if not in root tests/)
│   └── fixtures/     # Test data
│
└── package.json
```text

## Documentation Structure

```sql
docs/
├── PRD.md                    # Product Requirements Document
│
├── user-docs/               # User-facing documentation
│   ├── README.md
│   ├── GETTING_STARTED.md
│   ├── COMMUNICATION_CHANNELS.md
│   ├── TASKS_CREATING.md
│   └── ...
│
├── tech-docs/               # Technical documentation
│   ├── ARCHITECTURE.md      # System architecture
│   ├── API_DESIGN.md        # API design and endpoints
│   ├── DEVELOPMENT.md       # Development setup guide
│   ├── DEPLOYMENT.md        # Deployment guide
│   ├── TECHNOLOGY_STACK.md  # Technology choices
│   ├── DECISIONS.md         # Technical decisions log
│   ├── PROJECT_STRUCTURE.md # This file
│   │
│   ├── api/                 # API documentation
│   │   └── swagger.yaml     # Swagger/OpenAPI spec
│   │
│   ├── database/            # Database documentation
│   │   └── DATABASE_SCHEMA.md
│   │
│   └── deployment/          # Deployment docs
│       └── ...
│
└── tasks/                   # Task tracking
    ├── PROGRESS.md          # Progress and task history
    └── ...
```text

## Key Files

### Configuration Files

- `.cursorrules` - AI agent orchestration
- `.gitignore` - Git ignore patterns
- `package.json` (root) - Workspace configuration (if using monorepo)
- `backend/package.json` - Backend dependencies
- `frontend/web/package.json` - Web frontend dependencies

### Documentation Files

- `README.md` - Project overview
- `docs/PRD.md` - Product requirements
- `docs/tech-docs/ARCHITECTURE.md` - System architecture
- `docs/tech-docs/API_DESIGN.md` - API design
- `docs/tasks/PROGRESS.md` - Task tracking

### Entry Points

- `backend/src/index.ts` - Backend server entry
- `frontend/web/src/main.tsx` - Web app entry
- `frontend/web/src/App.tsx` - React root component

## Naming Conventions

### Files

- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: camelCase (`userTypes.ts`)
- **Tests**: `.test.ts` or `.spec.ts` suffix

### Directories

- **Components**: lowercase (`components/`)
- **Pages**: lowercase (`pages/`)
- **Services**: lowercase (`services/`)
- **Types**: lowercase (`types/`)

### Code

- **Variables/Functions**: camelCase (`getUserData`)
- **Classes/Components**: PascalCase (`UserService`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase (`User`, `ApiResponse`)

## Module Organization

### Backend Modules

Each feature module follows this pattern:

- Route → Controller → Service → Repository → Model

Example: User module

- `routes/users.ts` - Route definitions
- `controllers/userController.ts` - Request handlers
- `services/userService.ts` - Business logic
- `repositories/userRepository.ts` - Data access
- `models/User.ts` - Data model

### Frontend Modules

Each feature module follows this pattern:

- Page → Components → Hooks → Services → Types

Example: Channels module

- `pages/Channels.tsx` - Page component
- `components/communication/ChannelList.tsx` - Components
- `hooks/useChannels.ts` - Custom hooks
- `services/channelService.ts` - API calls
- `types/channel.ts` - TypeScript types

---

**Last Updated**: 2026-01-27
````
