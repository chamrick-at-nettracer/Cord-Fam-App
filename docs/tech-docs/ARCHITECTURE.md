# System Architecture

## Overview

Cord-Fam-App follows a client-server architecture with a unified backend API serving multiple frontend clients (Web, Android, iOS).

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Web App    │  │ Android App │  │  iOS App    │
│  (React)    │  │  (Future)   │  │  (Future)   │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
                        │ HTTPS/REST API
                        │
                ┌───────▼────────┐
                │  Backend API   │
                │ Node.js + TS   │
                └───────┬────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
│   MySQL      │ │  MongoDB    │ │ File System │
│  (SQL Data)  │ │ (NoSQL Data)│ │  (Files)    │
└──────────────┘ └─────────────┘ └─────────────┘
```

## Backend Architecture

### API Server
- **Framework**: Express.js or Fastify (Node.js)
- **Language**: TypeScript (strict mode)
- **Authentication**: JWT tokens
- **API Style**: RESTful APIs
- **Documentation**: OpenAPI/Swagger

### Data Layer

#### MySQL (Structured Data)
- Users and authentication
- Projects and tasks
- Channel metadata
- Relationships and assignments

#### MongoDB (Document Data)
- Messages and chat history
- Notes and recipes
- Task comments
- Flexible document structures

#### File System
- User-uploaded images
- Documents and attachments
- Recipe photos
- Profile pictures

### API Design Principles
- RESTful endpoints
- Consistent response formats
- Versioned APIs (`/api/v1/...`)
- Pagination for list endpoints
- Filtering and sorting support
- Error handling with proper HTTP status codes

## Frontend Architecture

### Web Application
- **Framework**: React 19+
- **Build Tool**: Vite or Next.js (static export)
- **State Management**: React Context + Hooks or Zustand
- **Routing**: React Router
- **API Client**: Axios or Fetch with interceptors
- **UI Components**: Custom components (Slack/JIRA/Evernote-inspired)

### Android Application
- **Framework**: TBD (React Native, Kotlin Multiplatform, or Native)
- **API Client**: Same REST API as web
- **State Management**: Framework-appropriate solution
- **Offline Support**: Local caching and sync

### iOS Application (Future)
- **Framework**: TBD (React Native, SwiftUI, or Native)
- **API Client**: Same REST API as web
- **State Management**: Framework-appropriate solution
- **Offline Support**: Local caching and sync

## Security Architecture

### Authentication Flow
1. User submits credentials
2. Backend validates and issues JWT
3. Client stores JWT (secure storage)
4. Client includes JWT in API requests
5. Backend validates JWT on each request

### Authorization
- Role-based access control (RBAC)
- All family members have equal access initially
- Future: Admin roles if needed

### Data Protection
- HTTPS/TLS for all communications
- JWT tokens with expiration
- Password hashing (bcrypt)
- Input validation and sanitization
- SQL injection prevention
- XSS prevention
- CSRF protection

## Real-time Communication

### Options
1. **WebSockets**: Full-duplex communication
2. **Server-Sent Events (SSE)**: One-way server-to-client
3. **Polling**: Fallback option

### Recommendation
- WebSockets for real-time messaging
- Fallback to polling if WebSocket unavailable

## Deployment Architecture

### Development
- Local development servers
- Local databases
- Hot reload for frontend

### Production
- Backend: Node.js server (PM2 or Docker)
- Databases: MySQL and MongoDB instances
- File Storage: Local or cloud storage (S3-compatible)
- Frontend: Static hosting (CDN or web server)
- Reverse Proxy: Nginx (recommended)

## Scalability Considerations

### Current Scale (5-25 users)
- Single server deployment sufficient
- Database connections pooled
- File storage on same server

### Future Scale (50+ users)
- Load balancing for API servers
- Database replication
- CDN for static assets
- Separate file storage service
- Caching layer (Redis) if needed

## Technology Stack (Proposed)

### Backend
- **Runtime**: Node.js 20+
- **Language**: TypeScript 5+
- **Framework**: Express.js or Fastify
- **Database**: MySQL 8+, MongoDB 7+
- **Authentication**: jsonwebtoken, bcrypt
- **Validation**: Zod or Joi
- **Testing**: Jest, Supertest

### Frontend Web
- **Framework**: React 19+
- **Build Tool**: Vite (recommended) or Next.js
- **Language**: TypeScript
- **Routing**: React Router
- **State**: React Context + Hooks or Zustand
- **HTTP Client**: Axios
- **Testing**: Vitest, React Testing Library, Playwright

### Frontend Android
- **Option 1**: React Native (shared code with web)
- **Option 2**: Kotlin Multiplatform Mobile
- **Option 3**: Native Kotlin/Java
- **Recommendation**: React Native for code sharing

### Frontend iOS
- **Option 1**: React Native (shared code with web/Android)
- **Option 2**: SwiftUI (native)
- **Option 3**: Kotlin Multiplatform Mobile
- **Recommendation**: React Native for consistency

## Data Models (High Level)

### User
- id, email, username, password_hash
- profile information
- preferences

### Channel
- id, name, description, created_by
- members (many-to-many with User)

### Message
- id, channel_id, user_id, content
- timestamp, edited_at
- attachments

### Project
- id, name, description, created_by

### Task
- id, project_id, title, description
- assignee_id, status, due_date
- created_by, created_at, updated_at

### Note
- id, title, content, notebook_id
- tags, created_by, created_at, updated_at

### Recipe
- id, title, description, ingredients
- instructions, servings, prep_time, cook_time
- tags, images, created_by

---

**Last Updated**: 2026-01-27
