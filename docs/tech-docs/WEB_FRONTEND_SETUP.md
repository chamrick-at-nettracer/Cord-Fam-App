# Web Frontend Development Setup

Complete guide for setting up and running the React web application.

## Prerequisites

- Node.js 20+ LTS
- npm (comes with Node.js)
- Backend API running (see `BACKEND_SETUP.md`)

## Installation

### 1. Navigate to Frontend Directory

```bash
cd frontend/web
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:

- React 19+
- Vite (build tool)
- Material-UI (MUI) components
- React Router (routing)
- Axios (HTTP client)
- TypeScript and type definitions
- Development tools (ESLint, Prettier, Vitest, etc.)

### 3. Environment Configuration

Create `.env` file from example:

```bash
cp .env.example .env
```

The default `.env` should work if backend is running on `localhost:3000`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

If your backend is running on a different port or host, update this value.

## Running the Application

### Development Mode

```bash
npm run dev
```

This starts the Vite development server with hot module replacement (HMR).

**Expected Output**:

```text
Vite v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

This compiles and bundles the application for production. Output is in `dist/`
directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Project Structure

```typescript
frontend/web/
├── src/
│   ├── components/      # React components
│   │   └── common/     # Reusable components
│   ├── pages/          # Page components
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── DashboardPage.tsx
│   ├── hooks/          # Custom React hooks
│   │   └── useAuth.ts
│   ├── services/       # API service clients
│   │   ├── api.ts      # Base API client
│   │   ├── authService.ts
│   │   ├── channelService.ts
│   │   └── messageService.ts
│   ├── store/          # State management
│   │   └── AuthContext.tsx
│   ├── types/          # TypeScript types
│   │   └── api.ts
│   ├── utils/          # Utility functions
│   ├── theme.ts        # MUI theme configuration
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
├── Vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests (when implemented)

## Features

### Current MVP Features

- ✅ User registration
- ✅ User login
- ✅ Channel creation
- ✅ Channel list
- ✅ Message sending
- ✅ Message display
- ✅ Real-time updates (polling every 2 seconds)

### UI Components

The app uses Material-UI (MUI) for components:

- Buttons, TextFields, Paper, AppBar, Drawer, etc.
- Theme customization in `src/theme.ts`
- Responsive design

## Development Workflow

### Making Changes

1. Edit files in `src/`
2. Vite automatically hot-reloads changes
3. Browser updates instantly (no page refresh needed)

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation if needed

### Adding New API Calls

1. Add method to appropriate service in `src/services/`
2. Use in components via hooks or direct calls
3. Handle loading/error states

### Styling

- Use MUI's `sx` prop for styling
- Customize theme in `src/theme.ts`
- Use MUI components for consistent UI

## Testing

### Manual Testing

1. Open `http://localhost:5173`
2. Register a new user
3. Create channels
4. Send messages
5. Test in multiple browser windows (simulate multiple users)

### Automated Testing

When tests are implemented:

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

## Troubleshooting

### Frontend Won't Start

**Error**: `Port 5173 already in use`

**Solution**:

```bash
# Find process using port 5173
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Kill the process or change port in Vite.config.ts
```

### Can't Connect to Backend

**Error**: `Network Error` or `CORS Error`

**Solution**:

1. Verify backend is running: `curl http://localhost:3000/health`
2. Check `VITE_API_URL` in `.env` matches backend URL
3. Check browser console for specific error messages
4. Verify CORS is enabled in backend (should be automatic)

### Build Errors

**Error**: TypeScript compilation errors

**Solution**:

- Fix type errors shown in terminal
- Check `tsconfig.json` configuration
- Ensure all imports are correct

**Error**: Module not found

**Solution**:

- Run `npm install` to ensure all dependencies are installed
- Check `package.json` for correct dependencies
- Delete `node_modules` and `package-lock.json`, then `npm install`

### MUI Components Not Rendering

**Error**: Components don't appear or look wrong

**Solution**:

- Check browser console for errors
- Verify MUI dependencies are installed: `npm list @MUI/material`
- Check `src/theme.ts` is properly configured
- Ensure `ThemeProvider` wraps the app in `main.tsx`

## Development Tips

1. **Hot Reload**: Changes are instantly reflected in the browser
2. **React DevTools**: Install browser extension for debugging
3. **Network Tab**: Use browser DevTools to inspect API calls
4. **Console**: Check browser console for errors and warnings
5. **TypeScript**: Fix type errors as you code for better IDE support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps

- Read `docs/tech-docs/ARCHITECTURE.md` for system architecture
- Read `docs/tech-docs/API_DESIGN.md` for API documentation
- Check `docs/tasks/PROGRESS.md` for current tasks
- Explore the codebase in `src/` directory

---

**Last Updated**: 2026-01-27
