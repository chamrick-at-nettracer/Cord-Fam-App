# Development Guide

## Prerequisites

- Node.js 20+ and npm/yarn/pnpm
- MySQL 8+
- MongoDB 7+
- Git
- Code editor (VS Code recommended)

## Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd Cord-Fam-App
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### 3. Frontend Web Setup
```bash
cd frontend/web
npm install
cp .env.example .env
# Edit .env with API endpoint
npm run dev
```

### 4. Database Setup
```bash
# MySQL
mysql -u root -p < scripts/init-mysql.sql

# MongoDB
mongosh < scripts/init-mongodb.js
```

## Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

### Commit Messages
Follow conventional commits:
- `feat: add user authentication`
- `fix: resolve message loading issue`
- `docs: update API documentation`
- `test: add unit tests for task service`

### Code Style
- TypeScript strict mode enabled
- ESLint + Prettier configured
- Pre-commit hooks for linting
- Format on save recommended

## Running Tests

### Unit Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend/web
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage Reports
```bash
npm run test:coverage
```

## API Development

### Adding a New Endpoint

1. Define route in `backend/src/routes/`
2. Create controller in `backend/src/controllers/`
3. Create service in `backend/src/services/`
4. Add validation schema
5. Write unit tests
6. Update Swagger documentation
7. Write E2E tests

### API Documentation
Swagger UI available at: `http://localhost:3000/api-docs`

## Database Migrations

### MySQL Migrations
```bash
npm run migrate:up
npm run migrate:down
```

### MongoDB Schema Updates
Document changes in `docs/tech-docs/database/MONGODB_SCHEMAS.md`

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3000
JWT_SECRET=your-secret-key
MYSQL_HOST=localhost
MYSQL_DB=cordfam
MYSQL_USER=root
MYSQL_PASSWORD=password
MONGODB_URI=mongodb://localhost:27017/cordfam
FILE_STORAGE_PATH=./storage
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api/v1
```

## Debugging

### Backend
- Use VS Code debugger
- Check logs in `backend/logs/`
- Enable debug mode: `DEBUG=* npm run dev`

### Frontend
- React DevTools
- Browser DevTools
- Network tab for API calls

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend Web
```bash
cd frontend/web
npm run build
# Output in dist/
```

## Deployment

See `docs/tech-docs/DEPLOYMENT.md` for detailed deployment instructions.

---

**Last Updated**: 2026-01-27
