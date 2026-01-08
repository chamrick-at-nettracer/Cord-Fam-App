# Quick Start Guide

## Prerequisites

- Node.js 20+ LTS
- MySQL 8+
- MongoDB 7+

## Setup Steps

### 1. Database Setup

#### MySQL

```bash
MySQL -u root -p < scripts/init-database.sql
```

#### MongoDB

MongoDB will create the database automatically on first connection.

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm install
npm run dev
```

Backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend/web
cp .env.example .env
# Edit .env if needed (default should work)
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## Testing the MVP

1. Open `http://localhost:5173` in your browser
2. Click "Register" to create an account
3. After registration, you'll be logged in
4. Click "New Channel" to create a channel
5. Type a message and press Enter to send
6. Open another browser/incognito window and register another user
7. Both users can see messages in the same channel!

## Troubleshooting

### Backend won't start

- Check MySQL and MongoDB are running
- Verify database credentials in `.env`
- Check ports 3000 is available

### Frontend won't connect to backend

- Verify backend is running on port 3000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Database connection errors

- Verify MySQL user has permissions
- Check MongoDB is running: `mongosh`
- Verify connection strings in `.env`

---

**Last Updated**: 2026-01-27
