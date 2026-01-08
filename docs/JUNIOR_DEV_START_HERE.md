# 👋 Junior Developer - Start Here

**Welcome to your first day!** This is your step-by-step guide to get
Cord-Fam-App running.

## 🎯 Your Goal

By the end of this guide, you'll have:

- ✅ Backend API running on `http://localhost:3000`
- ✅ Web app running on `http://localhost:5173`
- ✅ Registered a user and sent messages
- ✅ Ready to demo to your team!

---

## 📋 Step-by-Step Instructions

### Step 1: Check What's Installed (2 minutes)

Open your terminal and run:

```bash
node --version    # Need v20+ ✅
npm --version     # Need v10+ ✅
MySQL --version   # Need 8.0+ ✅
mongosh --eval "db.version()" # Need 7.0+ (MongoDB server version)
# Or: mongod --version
```

**If something is missing**, see the "Installing Missing Software" section at
the bottom.

---

### Step 2: Go to Project Folder (30 seconds)

```bash
cd /Users/cordhamrick/Repos/Cord-Fam-App
# Or wherever your project folder is
```

Verify you're in the right place:

```bash
ls
# Should see: backend/, frontend/, docs/, scripts/, etc.
```

---

### Step 3: Install Root Tools (1 minute)

```bash
npm install
```

This installs git hooks and tooling. Wait for it to finish.

---

### Step 4: Setup MySQL Database (3 minutes)

#### 4a. Make sure MySQL is running

**macOS**:

```bash
brew services start MySQL
# Check if running:
brew services list | grep MySQL
# Should show: MySQL  started  ...
```

**Note**: If you installed MySQL from the official installer (not Homebrew),
MySQL is already running. You can skip this step and go directly to Step 4b.

**If MySQL won't start** (bootstrap error):

```bash
# Try stopping and restarting:
brew services stop MySQL
brew services start MySQL

# Or check logs:
tail -f /opt/homebrew/var/MySQL/*.err

# Or start manually to see errors:
mysqld_safe --user=$(whoami) &
```

**Linux**:

```bash
sudo systemctl start MySQL
```

**Windows**: Start MySQL from Services panel

#### 4b. Create the database

```bash
MySQL -u root -p < scripts/init-database.sql
```

**When prompted**, type your MySQL root password and press Enter.

**Expected**: Should complete without errors.

#### 4c. Verify it worked

```bash
MySQL -u root -p -e "SHOW DATABASES LIKE 'cordfam';"
```

**Expected**: Should show `cordfam` database.

---

### Step 5: Setup MongoDB (2 minutes)

#### 5a. Make sure MongoDB is running

**macOS**:

```bash
brew services start MongoDB-community
```

**Linux**:

```bash
sudo systemctl start mongod
```

**Windows**: Start MongoDB from Services panel

#### 5b. Verify it's running

```bash
mongosh --eval "db.adminCommand('ping')"
```

**Expected**: Should return `{ ok: 1 }`

**Check MongoDB server version** (to verify it's 7.0+):

```bash
mongosh --eval "db.version()"
# Or: mongod --version
```

**Expected**: Should show version like `8.2.3` or `7.0.x` (any 7.0+ is fine)

**Note**:

- `mongosh --version` shows the shell client version (not what we need)
- `mongosh --eval "db.version()"` or `mongod --version` shows the MongoDB server
  version (this is what matters)
- If you get "command not found", MongoDB might not be installed. See
  "Installing Missing Software" below.

---

### Step 6: Setup Backend (5 minutes)

#### 6a. Go to backend folder

```bash
cd backend
```

#### 6b. Install packages

```bash
npm install
```

**Wait**: This takes 1-2 minutes. You'll see lots of packages installing.

#### 6c. Create config file

```bash
cp .env.example .env
```

#### 6d. Edit the config file

You need to set your MySQL password. Open `.env` in any editor:

**macOS/Linux**:

```bash
nano .env
# Or:
code .env  # If you have VS Code
```

**Find this line**:

```text
MYSQL_PASSWORD=password
```

**Change it to your actual MySQL password**:

```text
MYSQL_PASSWORD=your_actual_password_here
```

**Save and exit**:

- Nano: Press `Ctrl+X`, then `Y`, then Enter
- VS Code: Just save (Cmd+S / Ctrl+S)

#### 6e. Start the backend

```bash
npm run dev
```

**✅ SUCCESS looks like**:

```text
[timestamp] INFO: MySQL connected
[timestamp] INFO: MongoDB connected
[timestamp] INFO: Server listening on http://0.0.0.0:3000
```

**❌ If you see errors**:

- **MySQL connection failed**: Check your password in `.env` file
- **MongoDB connection failed**: Make sure MongoDB is running
- **Port 3000 in use**: Something else is using that port

**Keep this terminal open!** The backend needs to keep running.

---

### Step 7: Setup Frontend (5 minutes)

**Open a NEW terminal window** (keep backend running in the first one!)

#### 7a. Go to frontend folder

```bash
cd /Users/cordhamrick/Repos/Cord-Fam-App/frontend/web
```

#### 7b. Install packages

```bash
npm install
```

**Wait**: This takes 2-3 minutes.

#### 7c. Create config file (if needed)

```bash
cp .env.example .env
```

**Check it**:

```bash
cat .env
```

Should say: `VITE_API_URL=http://localhost:3000/api/v1`

#### 7d. Start the frontend

```bash
npm run dev
```

**✅ SUCCESS looks like**:

```text
Vite v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

**Keep this terminal open too!**

---

### Step 8: Test the App! (5 minutes)

#### 8a. Open in browser

Open your web browser and go to:

```yaml
http://localhost:5173
```

#### 8b. Register a user

1. Click **"Register"** (or "Don't have an account? Register")
2. Fill in:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
3. Click **"Register"**

**Expected**: You should automatically be logged in and see a dashboard!

#### 8c. Create a channel

1. In the sidebar, click **"New Channel"**
2. Type: `general`
3. Click **"Create"** (or press Enter)

**Expected**: Channel appears in sidebar, and you see the channel view.

#### 8d. Send a message

1. Type a message in the input box at the bottom
2. Press **Enter** or click **"Send"**

**Expected**: Your message appears in the message list!

#### 8e. Test with two users (optional)

1. Open an **incognito/private browser window**
2. Go to `http://localhost:5173`
3. Register another user: `test2@example.com` / `testuser2`
4. Create a channel with the same name: `general`
5. Send messages from both browser windows
6. **Refresh** to see messages from the other user

---

## ✅ You're Done

If you can:

- ✅ See the dashboard
- ✅ Create channels
- ✅ Send messages
- ✅ See messages appear

**Congratulations!** 🎉 The MVP is working!

---

## 🐛 Troubleshooting

### Backend won't start

**"MySQL connection failed"**:

1. Check MySQL is running: `MySQL -u root -p` (should connect)
2. Check `.env` file has correct password
3. Verify database exists: `MySQL -u root -p -e "SHOW DATABASES;"`

**"MongoDB connection failed"**:

1. Check MongoDB is running: `mongosh`
2. Start it if needed: `brew services start MongoDB-community` (macOS)

**"Port 3000 already in use"**:

- Change `PORT=3001` in `.env` (then frontend `.env` needs
  `VITE_API_URL=http://localhost:3001/api/v1`)

### Frontend won't connect

**"Network Error"**:

1. Make sure backend is running (check Terminal 1)
2. Test backend: `curl http://localhost:3000/health`
3. Check browser console (F12) for specific error

**Blank page or errors**:

1. Check browser console (F12 → Console tab)
2. Make sure backend is running
3. Check `VITE_API_URL` in `frontend/web/.env`

### Can't create database

**"Access denied"**:

- Your MySQL password might be wrong
- Try: `MySQL -u root -p` and enter password manually
- If that works, use that same password in `.env`

---

## 📚 What's Next?

Now that it's working:

1. **Explore the code**:
   - Backend: `backend/src/`
   - Frontend: `frontend/web/src/`

2. **Read the docs**:
   - Full guide: `docs/GETTING_STARTED.md`
   - Backend: `docs/tech-docs/BACKEND_SETUP.md`
   - Frontend: `docs/tech-docs/WEB_FRONTEND_SETUP.md`

3. **Check tasks**:
   - `docs/tasks/PROGRESS.md` - What's being worked on

---

## 🔧 Installing Missing Software

### Install Node.js

1. Go to: <https://nodejs.org/>
2. Download LTS version (20.x or higher)
3. Install the .pkg/.exe file
4. Restart terminal
5. Verify: `node --version`

### Install MySQL

**macOS**:

```bash
brew install MySQL
brew services start MySQL
```

**Linux (Ubuntu/Debian)**:

```bash
sudo apt update
sudo apt install MySQL-server
sudo systemctl start MySQL
```

**Windows**: Download installer from <https://dev.mysql.com/downloads/mysql/>

### Install MongoDB

**macOS**:

```bash
brew tap MongoDB/brew
brew install MongoDB-community
brew services start MongoDB-community
```

**Linux**: Follow guide at <https://www.mongodb.com/docs/manual/installation/>

**Windows**: Download from <https://www.mongodb.com/try/download/community/>

---

## 💡 Quick Tips

- **Two terminals needed**: One for backend, one for frontend
- **Keep both running**: Don't close the terminals while testing
- **Check console**: Browser console (F12) shows helpful errors
- **Refresh helps**: If messages don't appear, refresh the page

---

**Questions?** Check:

- `docs/GETTING_STARTED.md` - Detailed guide
- `docs/TESTING_MVP.md` - Testing checklist
- `docs/tasks/QUICK_START.md` - Quick reference

---

**Good luck!** 🚀

---

**Last Updated**: 2026-01-27
