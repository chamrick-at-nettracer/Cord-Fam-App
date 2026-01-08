# First Day Walkthrough - Junior Developer Guide

Welcome! This is your step-by-step guide to get Cord-Fam-App running on your
first day.

## Step 1: Verify Prerequisites

Open your terminal and check what's installed:

```bash
node --version    # Need v20.x.x or higher
npm --version     # Need v10.x.x or higher
MySQL --version   # Need 8.0.x or higher
mongosh --version # Need 7.0.x or higher (or mongod --version)
git --version
```

### If Something is Missing

**Node.js not installed?**

- Download from: <https://nodejs.org/>
- Choose LTS version (20.x or higher)
- Install and restart terminal

**MySQL not installed?**

- macOS: `brew install MySQL`
- Linux: `sudo apt install MySQL-server` (Ubuntu/Debian)
- Windows: Download installer from <https://dev.mysql.com/downloads/mysql/>
- After install, start MySQL service

**MongoDB not installed?**

- macOS: `brew install MongoDB-community`
- Linux: Follow guide at <https://www.mongodb.com/docs/manual/installation/>
- Windows: Download from <https://www.mongodb.com/try/download/community>
- After install, start MongoDB service

---

## Step 2: Navigate to Project

```bash
cd /Users/cordhamrick/Repos/Cord-Fam-App
# Or wherever your project is located
```

Verify you're in the right place:

```bash
ls -la
# You should see: backend/, frontend/, docs/, scripts/, etc.
```

---

## Step 3: Install Root Dependencies

```bash
npm install
```

This installs tooling dependencies (Husky, lint-staged, etc.) used by git hooks.

**Expected**: Should complete without errors, may show funding messages (safe to
ignore).

---

## Step 4: Setup Databases

### 4a. Start MySQL

**macOS (Homebrew)**:

```bash
brew services start MySQL
# Or if already installed:
brew services list | grep MySQL
```

**Linux**:

```bash
sudo systemctl start MySQL
# Or:
sudo service MySQL start
```

**Windows**:

- Start MySQL from Services panel or MySQL Workbench

**Verify MySQL is running**:

```bash
MySQL -u root -p -e "SELECT 1;"
# Enter your MySQL root password when prompted
# Should return: 1
```

### 4b. Create MySQL Database

```bash
MySQL -u root -p < scripts/init-database.sql
```

**When prompted**, enter your MySQL root password.

**Verify database was created**:

```bash
MySQL -u root -p -e "SHOW DATABASES LIKE 'cordfam';"
```

You should see:

```text
+------------------+
| Database (cordfam)|
+------------------+
| cordfam          |
+------------------+
```

**Verify tables exist**:

```bash
MySQL -u root -p -e "USE cordfam; SHOW TABLES;"
```

You should see: `users`, `channels`, `channel_members`

### 4c. Start MongoDB

**macOS (Homebrew)**:

```bash
brew services start MongoDB-community
# Or:
brew services list | grep MongoDB
```

**Linux**:

```bash
sudo systemctl start mongod
# Or:
sudo service mongod start
```

**Windows**:

- Start MongoDB from Services panel

**Verify MongoDB is running**:

```bash
mongosh --eval "db.adminCommand('ping')"
# Or if mongosh not available:
mongo --eval "db.adminCommand('ping')"
```

**Expected**: `{ ok: 1 }`

**Note**: MongoDB will automatically create the `cordfam` database when the
backend first connects, so no manual setup needed.

---

## Step 5: Setup Backend

### 5a. Navigate to Backend Directory

```bash
cd backend
```

### 5b. Install Dependencies

```bash
npm install
```

**Expected**: Should install ~290 packages. Takes 1-2 minutes.

### 5c. Create Environment File

```bash
cp .env.example .env
```

### 5d. Edit Environment File

Open `.env` in your editor and update the MySQL password:

```bash
# On macOS/Linux:
nano .env
# Or use your preferred editor:
code .env  # VS Code
vim .env   # Vim
```

**Find this line**:

```env
MYSQL_PASSWORD=password
```

**Change it to your actual MySQL root password**:

```env
MYSQL_PASSWORD=your_actual_mysql_password
```

**Save and close** the file.

### 5e. Start Backend Server

```bash
npm run dev
```

**Expected Output**:

```text
[timestamp] INFO: MySQL connected
[timestamp] INFO: MongoDB connected
[timestamp] INFO: Server listening on http://0.0.0.0:3000
```

**✅ Backend is running!** Keep this terminal open.

**If you see errors**:

- **MySQL connection failed**: Check password in `.env`, verify MySQL is running
- **MongoDB connection failed**: Verify MongoDB is running, check `MONGODB_URI`
  in `.env`
- **Port 3000 in use**: Change `PORT` in `.env` or stop other service using port
  3000

### 5f. Verify Backend (in new terminal)

Open a **new terminal window** (keep backend running):

```bash
curl http://localhost:3000/health
```

**Expected**: `{"status":"ok","timestamp":"2026-01-27T..."}`

---

## Step 6: Setup Frontend

### 6a. Open New Terminal

**Important**: Keep backend terminal running! Open a **new terminal window**.

### 6b. Navigate to Frontend Directory

```bash
cd /Users/cordhamrick/Repos/Cord-Fam-App/frontend/web
```

### 6c. Install Dependencies

```bash
npm install
```

**Expected**: Should install ~340 packages. Takes 2-3 minutes.

### 6d. Create Environment File (if needed)

```bash
cp .env.example .env
```

**Check the file**:

```bash
cat .env
```

Should contain:

```text
VITE_API_URL=http://localhost:3000/api/v1
```

If backend is on different port/host, update this.

### 6e. Start Frontend Server

```bash
npm run dev
```

**Expected Output**:

```text
Vite v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**✅ Frontend is running!**

---

## Step 7: Test the Application

### 7a. Open Browser

Open your web browser and navigate to:

```yaml
http://localhost:5173
```

### 7b. Register First User

1. You should see a login page
2. Click **"Register"** link (or button)
3. Fill in the form:
   - **Email**: `test@example.com`
   - **Username**: `testuser`
   - **Password**: `password123` (minimum 6 characters)
   - **First Name**: (optional)
   - **Last Name**: (optional)
4. Click **"Register"** button

**Expected**: You should be automatically logged in and see the dashboard with a
sidebar.

### 7c. Create a Channel

1. In the sidebar, click **"New Channel"** button
2. Enter channel name: `general`
3. Optionally add a description
4. Click **"Create"** (or press Enter)

**Expected**: The channel should appear in the sidebar, and you should see the
channel view.

### 7d. Send a Message

1. With a channel selected, you should see a message input box at the bottom
2. Type a message: `Hello, world!`
3. Press **Enter** or click **"Send"**

**Expected**: Your message should appear in the message list above.

### 7e. Test Multi-User (Optional)

1. Open an **incognito/private browser window**
2. Navigate to `http://localhost:5173`
3. Register a second user:
   - Email: `test2@example.com`
   - Username: `testuser2`
   - Password: `password123`
4. Click **"New Channel"** and create a channel with the same name: `general`
5. Send a message from this user
6. Go back to your first browser window
7. **Refresh the page** (messages poll every 2 seconds, but refresh ensures you
   see it)

**Expected**: You should see messages from both users in the same channel.

---

## Step 8: Verify Everything Works

### Checklist

- [ ] Backend terminal shows no errors
- [ ] Frontend terminal shows no errors
- [ ] Can access `http://localhost:5173` in browser
- [ ] Can register a user
- [ ] Can login (logout and login again)
- [ ] Can create a channel
- [ ] Can send messages
- [ ] Messages appear in the channel
- [ ] No errors in browser console (F12 → Console tab)

---

## Common Issues & Solutions

### Backend Won't Start

**Error**: `MySQL connection failed`

**Solution**:

1. Verify MySQL is running: `MySQL -u root -p -e "SELECT 1;"`
2. Check `.env` file has correct password
3. Verify database exists: `MySQL -u root -p -e "SHOW DATABASES;"`

**Error**: `MongoDB connection failed`

**Solution**:

1. Verify MongoDB is running: `mongosh --eval "db.adminCommand('ping')"`
2. Check `MONGODB_URI` in `.env` is correct
3. Start MongoDB service if not running

**Error**: `Port 3000 already in use`

**Solution**:

```bash
# Find what's using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change PORT in .env
```

### Frontend Won't Connect

**Error**: `Network Error` in browser console

**Solution**:

1. Verify backend is running: `curl http://localhost:3000/health`
2. Check `VITE_API_URL` in `frontend/web/.env`
3. Check browser console for specific error

**Error**: `401 Unauthorized`

**Solution**: This is normal if not logged in. Register/login first.

### Database Issues

**MySQL**: `Access denied`

**Solution**:

- Verify password in `.env` matches your MySQL root password
- Test connection: `MySQL -u root -p` (enter password manually)

**MongoDB**: `Connection refused`

**Solution**:

- Start MongoDB service
- Verify it's running: `mongosh`

---

## Next Steps

Now that you have the MVP running:

1. **Explore the codebase**:
   - Backend: `backend/src/`
   - Frontend: `frontend/web/src/`

2. **Read the documentation**:
   - Architecture: `docs/tech-docs/ARCHITECTURE.md`
   - API Design: `docs/tech-docs/API_DESIGN.md`

3. **Check what's next**:
   - Progress: `docs/tasks/PROGRESS.md`
   - MVP Plan: `docs/tasks/MVP_PLAN.md`

4. **Start developing**:
   - Pick a task from `PROGRESS.md`
   - Create a feature branch
   - Make changes
   - Commit (hooks will auto-format/lint)

---

## Quick Reference

### Terminal Commands

**Backend** (Terminal 1):

```bash
cd backend
npm run dev
```

**Frontend** (Terminal 2):

```bash
cd frontend/web
npm run dev
```

### URLs

- **Frontend**: <http://localhost:5173>
- **Backend API**: <http://localhost:3000/api/v1>
- **Backend Health**: <http://localhost:3000/health>

### Stopping Servers

Press `Ctrl+C` in each terminal to stop the servers.

---

**Congratulations!** 🎉 You now have Cord-Fam-App running locally!

---

**Last Updated**: 2026-01-27
