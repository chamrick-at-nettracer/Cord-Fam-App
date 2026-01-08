# Technical Documentation Index

Welcome to the Cord-Fam-App technical documentation. This directory contains
comprehensive documentation for developers and AI agents working on the project.

## Getting Started

**New to the project?** Start with these guides:

1. **[Getting Started Guide](../GETTING_STARTED.md)** - Complete setup
   instructions
2. **[Backend Setup](BACKEND_SETUP.md)** - Backend API development
3. **[Web Frontend Setup](WEB_FRONTEND_SETUP.md)** - React web app development
4. **[Android Setup](ANDROID_SETUP.md)** - Android app development (future)

## Architecture & Design

- **[Architecture](ARCHITECTURE.md)** - System architecture overview
- **[API Design](API_DESIGN.md)** - REST API endpoints and design
- **[Database Schema](database/DATABASE_SCHEMA.md)** - Database structure and
  relationships
- **[Project Structure](PROJECT_STRUCTURE.md)** - Codebase organization

## Development

- **[Development Guide](DEVELOPMENT.md)** - Development workflow, testing,
  debugging
- **[Git Hooks](GIT_HOOKS.md)** - Pre-commit hooks and code quality
- **[Multi-Agent Setup](MULTI_AGENT_SETUP.md)** - Using multiple AI agents

## Technology & Decisions

- **[Technology Stack](TECHNOLOGY_STACK.md)** - Complete technology choices
- **[Technology Recommendations](TECHNOLOGY_RECOMMENDATIONS.md)** - Tech
  evaluation and recommendations
- **[Decisions Log](DECISIONS.md)** - Technical decisions and rationale

## Deployment & Operations

- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions

## Database

- **[Database Schema](database/DATABASE_SCHEMA.md)** - MySQL and MongoDB schemas

## Quick Reference

### Backend

- **Port**: 3000
- **Health Check**: `http://localhost:3000/health`
- **API Base**: `http://localhost:3000/api/v1`

### Frontend Web

- **Port**: 5173
- **URL**: `http://localhost:5173`
- **Build Output**: `frontend/web/dist/`

### Databases

- **MySQL**: `localhost:3306` / database: `cordfam`
- **MongoDB**: `MongoDB://localhost:27017/cordfam`

---

**Last Updated**: 2026-01-27
