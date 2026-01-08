# MVP Plan - 2pm Deadline

**Start Time**: 10:30am **Target Completion**: 2:00pm **Duration**: ~3.5 hours

## MVP Goal

A working demo that shows:

1. Backend API running (Fastify + TypeScript)
2. Web frontend running (Vite + React 19 + MUI)
3. User authentication (login/register)
4. At least ONE working feature (Channels/Messaging OR Tasks)
5. Database connections working (MySQL + MongoDB)

## Scope Limitations for MVP

- **Android App**: Deferred - Native Kotlin setup is too time-intensive for MVP
- **Full Feature Set**: Deferred - Focus on one feature working end-to-end
- **Comprehensive Tests**: Deferred - Basic smoke tests only
- **Production Deployment**: Deferred - Local development only
- **File Uploads**: Deferred - Can add placeholder
- **Real-time Updates**: Deferred - Polling or basic implementation

## MVP Feature: Channels & Messaging

**Why**: Most visible feature, demonstrates full stack, shows family
collaboration concept.

**What's Included**:

- User registration/login
- Create channel
- List channels
- Send message to channel
- View channel messages
- Basic UI with MUI

**What's Deferred**:

- Direct messages
- File attachments
- Real-time updates (WebSocket)
- Message editing/deletion
- Reactions
- User presence

## Implementation Plan

### Phase 1: Backend Setup (30 min)

- [x] Initialize Fastify project
- [x] Set up TypeScript configuration
- [x] Configure ESLint, Prettier, Knip
- [x] Set up environment variables
- [x] Create basic server structure

### Phase 2: Database Setup (30 min)

- [x] MySQL connection setup
- [x] MongoDB connection setup
- [x] Create basic schema (users, channels)
- [x] Set up database utilities

### Phase 3: Authentication (45 min)

- [x] User model/repository
- [x] Registration endpoint
- [x] Login endpoint (JWT)
- [x] Auth middleware
- [x] Password hashing (bcrypt)

### Phase 4: Channels & Messages API (45 min)

- [x] Channel model/repository
- [x] Message model (MongoDB)
- [x] Channel CRUD endpoints
- [x] Message endpoints (create, list)
- [x] Basic validation (Zod)

### Phase 5: Frontend Setup (30 min)

- [x] Initialize Vite + React 19 + TypeScript
- [x] Set up MUI
- [x] Configure ESLint, Prettier, Knip
- [x] Set up React Router
- [x] Create API client (Axios)

### Phase 6: Frontend Auth UI (30 min)

- [x] Login page
- [x] Register page
- [x] Auth context/store
- [x] Protected routes
- [x] localStorage for token

### Phase 7: Channels UI (45 min)

- [x] Channel list component
- [x] Channel creation
- [x] Message list component
- [x] Message input/send
- [x] Basic layout with MUI

### Phase 8: Integration & Polish (15 min)

- [x] Connect frontend to backend
- [x] Error handling
- [x] Loading states
- [x] Basic styling
- [x] Test end-to-end flow

## Success Criteria

✅ Backend server runs on localhost:3000 ✅ Frontend runs on localhost:5173
(Vite default) ✅ Can register a new user ✅ Can login ✅ Can create a channel
✅ Can send a message ✅ Can view messages in channel ✅ UI looks presentable
with MUI ✅ No critical errors in console

## Post-MVP (After 2pm)

- Add more features (Tasks, Notes)
- Improve UI/UX
- Add real-time updates
- Add tests
- Android app development
- Production deployment

---

**Last Updated**: 2026-01-27
