# API Design Document

## Overview

This document outlines the API design for Cord-Fam-App. All APIs follow RESTful
conventions and use JSON for request/response bodies.

## Base URL

- **Development**: `http://localhost:3000/api/v1`
- **Production**: `https://api.cordfam.app/api/v1` (TBD)

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  }
}
```

## HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Pagination

List endpoints support pagination:

````text
GET /api/v1/resource?page=1&limit=20&sort=created_at&order=desc
```http

Response includes pagination metadata:

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
````

## API Endpoints (Planned)

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user info

### Users

- `GET /users` - List all users (family members)
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user profile
- `PUT /users/:id/password` - Change password

### Channels (Communication)

- `GET /channels` - List channels
- `POST /channels` - Create channel
- `GET /channels/:id` - Get channel details
- `PUT /channels/:id` - Update channel
- `DELETE /channels/:id` - Delete channel
- `POST /channels/:id/members` - Add member to channel
- `DELETE /channels/:id/members/:userId` - Remove member from channel

### Messages

- `GET /channels/:id/messages` - Get channel messages
- `POST /channels/:id/messages` - Send message to channel
- `PUT /messages/:id` - Edit message
- `DELETE /messages/:id` - Delete message
- `GET /messages/:id/reactions` - Get message reactions
- `POST /messages/:id/reactions` - Add reaction

### Direct Messages

- `GET /dms` - List DM conversations
- `GET /dms/:userId` - Get DM conversation with user
- `POST /dms/:userId/messages` - Send DM
- `GET /dms/:userId/messages` - Get DM messages

### Projects (Task Management)

- `GET /projects` - List projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Tasks

- `GET /projects/:id/tasks` - List tasks in project
- `POST /projects/:id/tasks` - Create task
- `GET /tasks/:id` - Get task details
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PUT /tasks/:id/assign` - Assign task to user
- `PUT /tasks/:id/status` - Update task status
- `GET /tasks` - List all tasks (with filters)

### Task Comments

- `GET /tasks/:id/comments` - Get task comments
- `POST /tasks/:id/comments` - Add comment to task
- `PUT /comments/:id` - Edit comment
- `DELETE /comments/:id` - Delete comment

### Notes

- `GET /notes` - List notes
- `POST /notes` - Create note
- `GET /notes/:id` - Get note details
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note
- `GET /notes/search` - Search notes

### Notebooks

- `GET /notebooks` - List notebooks
- `POST /notebooks` - Create notebook
- `GET /notebooks/:id` - Get notebook details
- `PUT /notebooks/:id` - Update notebook
- `DELETE /notebooks/:id` - Delete notebook
- `GET /notebooks/:id/notes` - Get notes in notebook

### Recipes

- `GET /recipes` - List recipes
- `POST /recipes` - Create recipe
- `GET /recipes/:id` - Get recipe details
- `PUT /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe
- `GET /recipes/search` - Search recipes

### Tags

- `GET /tags` - List all tags
- `GET /tags/:name/notes` - Get notes with tag
- `GET /tags/:name/recipes` - Get recipes with tag

### Files

- `POST /files/upload` - Upload file
- `GET /files/:id` - Download file
- `DELETE /files/:id` - Delete file

## Real-time Updates

WebSocket or Server-Sent Events for:

- New messages in channels/DMs
- Task updates
- User presence

## API Versioning

APIs are versioned in the URL path (`/api/v1/`). Breaking changes will increment
the version (`/api/v2/`).

## Rate Limiting

- **Authenticated**: 1000 requests per hour
- **Unauthenticated**: 100 requests per hour

## Swagger Documentation

Full API documentation available at `/api-docs` (Swagger UI).

---

**Last Updated**: 2026-01-27
