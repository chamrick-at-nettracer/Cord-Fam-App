# Getting Started Guide

Welcome! This guide will help you get the Cord-Fam-App MVP running on your local
machine.

## Quick Links

- **Backend Setup**: [Backend Development Guide](#step-3-backend-setup)
- **Web Frontend Setup**:
  [Web Frontend Development Guide](#step-4-web-frontend-setup)
- **Android Setup**: [Android Development Guide](#step-6-android-setup) (Coming
  Soon)
- **Troubleshooting**: [Common Issues](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 20+ LTS ([Download](https://nodejs.org/))
- **MySQL**: 8.0+ ([Download](https://dev.mysql.com/downloads/mysql/))
- **MongoDB**: 7.0+ ([Download](https://www.mongodb.com/try/download/community))
- **Git**: Latest version ([Download](https://git-scm.com/downloads))
- **Code Editor**: VS Code recommended
  ([Download](https://code.visualstudio.com/))

### Verify Installations

```bash
node --version    # Should be v20.x.x or higher
npm --version     # Should be 10.x.x or higher
MySQL --version   # Should be 8.0.x or higher (MySQL)
mongosh --eval "db.version()" # Should be 7.0.x or higher (MongoDB server)
# Or: mongod --version
git --version
```

**Note**: `mongosh --version` shows the shell client version, not the MongoDB
server version. Use `mongosh --eval "db.version()"` or `mongod --version` to
check the server version.

---

## Step 1: Clone and Setup Repository

```bash
# Clone the repository
git clone <repository-url>
cd Cord-Fam-App

# Install root dependencies (for tooling)
npm install
```

---

## Step 2: Database Setup

### MySQL Setup

1. **Start MySQL** (if not already running):

   ```bash
   # macOS (Homebrew)
   brew services start MySQL

   # Linux
   sudo systemctl start MySQL

   # Windows
   # Start MySQL from Services or MySQL Workbench
   ```

2. **Create the database**:

   ```bash
   MySQL -u root -p < scripts/init-database.sql
   ```

   When prompted, enter your MySQL root password.

3. **Verify the database was created**:

   ```bash
   MySQL -u root -p -e "SHOW DATABASES LIKE 'cordfam';"
   ```

   You should see `cordfam` in the output.

### MongoDB Setup

1. **Start MongoDB** (if not already running):

   ```bash
   # macOS (Homebrew)
   brew services start MongoDB-community

   # Linux
   sudo systemctl start mongod

   # Windows
   # Start MongoDB from Services
   ```

2. **Verify MongoDB is running**:

   ```bash
   mongosh --eval "db.adminCommand('ping')"
   ```

   You should see `{ ok: 1 }`.

   **Note**: MongoDB will automatically create the `cordfam` database on first
   connection, so no manual setup is needed.

---

## Step 3: Backend Setup

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create environment file**:

   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** with your database credentials:

   ```env
   NODE_ENV=development
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=7d

   # MySQL Configuration
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DATABASE=cordfam
   MYSQL_USER=root
   MYSQL_PASSWORD=your_mysql_password

   # MongoDB Configuration
   MONGODB_URI=MongoDB://localhost:27017/cordfam

   # File Storage
   FILE_STORAGE_PATH=./storage
   ```

   **Important**: Replace `your_mysql_password` with your actual MySQL root
   password.

5. **Start the backend server**:

   ```bash
   npm run dev
   ```

   You should see output like:

   ```text
   [timestamp] INFO: MySQL connected
   [timestamp] INFO: MongoDB connected
   [timestamp] INFO: Server listening on http://0.0.0.0:3000
   ```

6. **Verify backend is running**:

   Open `http://localhost:3000/health` in your browser. You should see:

   ```json
   {
     "status": "ok",
     "timestamp": "2026-01-27T..."
   }
   ```

   **Backend is now running on `http://localhost:3000`**

---

## Step 4: Web Frontend Setup

### Web Frontend Setup

1. **Open a new terminal** (keep backend running in the first terminal)

2. **Navigate to frontend directory**:

   ```bash
   cd frontend/web
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create environment file** (if it doesn't exist):

   ```bash
   cp .env.example .env
   ```

   The default `.env` should work:

   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

   You should see output like:

   ```text
   Vite v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

6. **Open the app**:

   Open `http://localhost:5173` in your browser.

   **Frontend is now running on `http://localhost:5173`**

---

## Step 5: Test the MVP

### Testing the Application

1. **Register a new user**:
   - Open `http://localhost:5173`
   - Click "Register"
   - Fill in:
     - Email: `test@example.com`
     - Username: `testuser`
     - Password: `password123` (minimum 6 characters)
     - First Name (optional)
     - Last Name (optional)
   - Click "Register"
   - You should be automatically logged in and see the dashboard

2. **Create a channel**:
   - Click "New Channel" button in the sidebar
   - Enter channel name: `general`
   - Optionally add a description
   - Click "Create"
   - The channel should appear in the sidebar

3. **Send a message**:
   - Click on the channel you created
   - Type a message in the input box at the bottom
   - Press Enter or click "Send"
   - Your message should appear in the message list

4. **Test multi-user** (optional):
   - Open an incognito/private browser window
   - Navigate to `http://localhost:5173`
   - Register a second user with different email/username
   - Join the same channel
   - Send messages from both users
   - Messages should appear for both users (refresh to see updates)

---

## Step 6: Android Setup

### Android Development Setup

**Status**: Not yet implemented. Android app development will begin in a future
phase.

When ready, setup instructions will be available in:

- `frontend/android/README.md`
- `docs/tech-docs/ANDROID_SETUP.md`

---

## Development Workflow

### Running Both Backend and Frontend

You'll need **two terminal windows**:

**Terminal 1 - Backend**:

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:

```bash
cd frontend/web
npm run dev
```

### Making Changes

- **Backend**: Changes are automatically reloaded (using `tsx watch`)
- **Frontend**: Changes are hot-reloaded by Vite
- **Database**: Restart backend if you change database schema

### Stopping Servers

- Press `Ctrl+C` in each terminal to stop the servers

---

## Troubleshooting

### Backend Won't Start

**Error**: `MySQL connection failed`

- **Solution**: Verify MySQL is running and credentials in `.env` are correct
- **Check**: `MySQL -u root -p` should connect successfully
- **Verify**: Database `cordfam` exists: `MySQL -u root -p -e "SHOW DATABASES;"`

**Error**: `MongoDB connection failed`

- **Solution**: Verify MongoDB is running
- **Check**: `mongosh` should connect successfully
- **Verify**: `mongosh --eval "db.adminCommand('ping')"` returns `{ ok: 1 }`

**Error**: `Port 3000 already in use`

- **Solution**: Either stop the process using port 3000, or change `PORT` in
  `.env`
- **Find process**: `lsof -i :3000` (macOS/Linux) or
  `netstat -ano | findstr :3000` (Windows)

### Frontend Won't Connect to Backend

**Error**: `Network Error` or `CORS Error`

- **Solution**: Verify backend is running on `http://localhost:3000`
- **Check**: Open `http://localhost:3000/health` in browser
- **Verify**: `VITE_API_URL` in `frontend/web/.env` is
  `http://localhost:3000/api/v1`

**Error**: `401 Unauthorized`

- **Solution**: This is normal if you're not logged in. Register/login first.

### Database Issues

**MySQL**: `Access denied for user`

- **Solution**: Check `MYSQL_USER` and `MYSQL_PASSWORD` in `.env`
- **Fix**: Create user if needed:
  `CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';`

**MongoDB**: `Connection refused`

- **Solution**: Start MongoDB service
- **Check**: `mongosh` should connect

### Other Issues

**npm install fails**:

- **Solution**: Clear npm cache: `npm cache clean --force`
- **Try**: Delete `node_modules` and `package-lock.json`, then `npm install`

**TypeScript errors**:

- **Solution**: Run `npm run build` to see all errors
- **Check**: Ensure you're using Node.js 20+

---

## Next Steps

Once you have the MVP running:

1. **Explore the codebase**:
   - Backend: `backend/src/`
   - Frontend: `frontend/web/src/`
   - Documentation: `docs/tech-docs/`

2. **Read the documentation**:
   - Architecture: `docs/tech-docs/ARCHITECTURE.md`
   - API Design: `docs/tech-docs/API_DESIGN.md`
   - Development Guide: `docs/tech-docs/DEVELOPMENT.md`

3. **Check task list**:
   - Progress: `docs/tasks/PROGRESS.md`
   - MVP Plan: `docs/tasks/MVP_PLAN.md`

4. **Start developing**:
   - Pick a task from `PROGRESS.md`
   - Create a feature branch
   - Make changes
   - Test locally
   - Commit (hooks will auto-format/lint)

---

## Getting Help

- **Documentation**: Check `docs/tech-docs/` for detailed guides
- **Issues**: Check existing issues or create a new one
- **Code**: Read the code - it's well-documented!

---

**Last Updated**: 2026-01-27
