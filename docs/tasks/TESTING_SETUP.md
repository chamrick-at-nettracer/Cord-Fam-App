# Testing Setup

**Date**: 2026-01-27  
**Status**: ✅ **COMPLETE**

## Overview

Comprehensive testing infrastructure has been set up with 90%+ coverage
requirements enforced by pre-commit hooks.

## Test Structure

### Standard Structure

Every folder containing code files with functions also contains a `tests`
subfolder:

- Test files are named the same as source files with `.test` before the
  extension
- Example: `userRepository.ts` → `tests/userRepository.test.ts`
- Example: `AuthContext.tsx` → `tests/AuthContext.test.tsx`

### Backend Tests

- **Framework**: Jest with ts-jest
- **Location**: `backend/src/**/tests/*.test.ts`
- **Config**: `backend/jest.config.js`
- **Coverage**: 90% threshold enforced

### Frontend Tests

- **Framework**: Vitest with React Testing Library
- **Location**: `frontend/web/src/**/tests/*.test.tsx`
- **Config**: `frontend/web/Vite.config.ts` (test section)
- **Coverage**: 90% threshold enforced

## Test Commands

### Backend

```bash
cd backend
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Run with coverage report
```

### Frontend

```bash
cd frontend/web
npm test              # Run tests
npm run test:ui       # UI mode
npm run test:coverage # Run with coverage report
```

## Coverage Requirements

- **Minimum**: 90% coverage required
- **Enforced**: Pre-commit hook blocks commits if coverage < 90%
- **Metrics**: Branches, Functions, Lines, Statements

## Pre-commit Hook

The `.husky/pre-commit` hook:

1. Runs lint-staged (formatting, linting)
2. Runs backend tests with coverage (if backend exists)
3. Runs frontend tests with coverage (if frontend exists)
4. **Blocks commit** if coverage < 90%

## Initial Test Files Created

### Backend

- `src/repositories/tests/userRepository.test.ts` - User repository tests
- `src/services/tests/authService.test.ts` - Authentication service tests

### Frontend

- `src/services/tests/authService.test.ts` - Auth service tests
- `src/store/tests/AuthContext.test.tsx` - Auth context tests

## Adding New Tests

1. Create `tests` subfolder in the same directory as your code file
2. Create test file: `YourFile.test.ts` or `YourComponent.test.tsx`
3. Follow existing test patterns
4. Run `npm test` to verify
5. Ensure coverage stays above 90%

## Coverage Reports

Coverage reports are generated in:

- Backend: `backend/coverage/`
- Frontend: `frontend/web/coverage/`

Open `index.html` in browser to view detailed coverage report.

---

**Last Updated**: 2026-01-27
