# Developer Onboarding Guide

Welcome to the Cord-Fam-App project! This guide will help you get started as a
developer.

## 📚 Documentation Overview

### Essential Reading (Start Here)

1. **[Getting Started Guide](GETTING_STARTED.md)** ⭐ **START HERE**
   - Complete step-by-step setup instructions
   - Database setup
   - Running backend and frontend
   - Testing the MVP

2. **[Backend Setup](tech-docs/BACKEND_SETUP.md)**
   - Backend API development guide
   - Database connections
   - API endpoints
   - Troubleshooting

3. **[Web Frontend Setup](tech-docs/WEB_FRONTEND_SETUP.md)**
   - React web app development guide
   - Component structure
   - State management
   - Testing

4. **[Android Setup](tech-docs/ANDROID_SETUP.md)**
   - Android app development (coming soon)
   - Native Kotlin setup
   - Jetpack Compose

### Reference Documentation

- **[Architecture](tech-docs/ARCHITECTURE.md)** - System design and architecture
- **[API Design](tech-docs/API_DESIGN.md)** - REST API documentation
- **[Development Guide](tech-docs/DEVELOPMENT.md)** - Development workflow and
  best practices
- **[Project Structure](tech-docs/PROJECT_STRUCTURE.md)** - Codebase
  organization
- **[Technology Stack](tech-docs/TECHNOLOGY_STACK.md)** - Technology choices
- **[Decisions Log](tech-docs/DECISIONS.md)** - Technical decisions and
  rationale

## 🚀 Quick Start

### 1. Prerequisites Check

```bash
node --version    # Need v20+
npm --version     # Need v10+
MySQL --version   # Need 8.0+ (MySQL)
mongod --version  # Need 7.0+ (MongoDB)
```

### 2. Clone and Setup

```bash
git clone <repository-url>
cd Cord-Fam-App
npm install  # Root dependencies
```

### 3. Database Setup

```bash
# MySQL - Create database and tables
MySQL -u root -p < scripts/init-database.sql

# MongoDB - No setup needed, auto-creates on connection
```

### 4. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MySQL password
npm run dev
```

Backend runs on `http://localhost:3000`

### 5. Frontend Setup

```bash
# In a new terminal
cd frontend/web
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 6. Test It

1. Open `http://localhost:5173`
2. Register a user
3. Create a channel
4. Send messages!

## 📖 What to Read Next

### For Backend Developers

1. Read `tech-docs/BACKEND_SETUP.md`
2. Read `tech-docs/ARCHITECTURE.md`
3. Read `tech-docs/API_DESIGN.md`
4. Explore `backend/src/` directory

### For Frontend Developers

1. Read `tech-docs/WEB_FRONTEND_SETUP.md`
2. Read `tech-docs/ARCHITECTURE.md`
3. Explore `frontend/web/src/` directory
4. Check MUI documentation for components

### For Android Developers

1. Read `tech-docs/ANDROID_SETUP.md` (when available)
2. Read `tech-docs/ARCHITECTURE.md`
3. Read `tech-docs/API_DESIGN.md` (for API integration)

## 🛠️ Development Tools

### Code Quality

- **ESLint**: Code linting (configured per project)
- **Prettier**: Code formatting
- **Knip**: Dead code detection
- **Git Hooks**: Auto-format/lint on commit (see `tech-docs/GIT_HOOKS.md`)

### Testing

- **Unit Tests**: Jest/Vitest (when implemented)
- **E2E Tests**: Playwright (when implemented)
- **Coverage**: 100% required (when implemented)

### Debugging

- **Backend**: Check `backend/logs/` for application logs
- **Frontend**: Use browser DevTools and React DevTools
- **API**: Use browser Network tab or `curl` commands

## 📝 Development Workflow

1. **Pick a Task**: Check `docs/tasks/PROGRESS.md`
2. **Create Branch**: `git checkout -b feature/your-feature`
3. **Make Changes**: Follow code style and architecture
4. **Test Locally**: Ensure everything works
5. **Commit**: Git hooks will auto-format/lint
6. **Update Docs**: Update relevant documentation
7. **Update Progress**: Mark task complete in `PROGRESS.md`

## 🎯 Project Goals

- **MVP**: Communication (channels, messages) ✅
- **Phase 1**: Task management (in progress)
- **Phase 2**: Notes & Recipes (planned)
- **Phase 3**: Android app (planned)
- **Phase 4**: iOS app (future)

## ❓ Getting Help

- **Documentation**: Check `docs/tech-docs/` first
- **Code**: Read the code - it's well-documented
- **Issues**: Check existing issues or create new one
- **Architecture**: Read `tech-docs/ARCHITECTURE.md`

## 🔗 Useful Links

- **Main README**: `README.md`
- **Getting Started**: `docs/GETTING_STARTED.md`
- **Progress Tracking**: `docs/tasks/PROGRESS.md`
- **PRD**: `docs/PRD.md`

---

**Welcome to the team** 🎉

---

**Last Updated**: 2026-01-27
