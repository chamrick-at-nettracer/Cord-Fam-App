# Setup Checklist - First Day

Use this checklist to verify your setup step-by-step.

## ✅ Prerequisites Check

- [ ] Node.js installed (`node --version` shows v20+)
- [ ] npm installed (`npm --version` shows v10+)
- [ ] MySQL installed (`MySQL --version` shows 8.0+)
- [ ] MongoDB installed (`mongosh --eval "db.version()"` shows 7.0+ or
      `mongod --version` shows 7.0+)

**Note**: `mongosh --version` shows the shell client version, not the server
version. Use `mongosh --eval "db.version()"` or `mongod --version` to check the
MongoDB server version.

- [ ] Git installed (`git --version`)

## ✅ Repository Setup

- [ ] Repository cloned/navigated to
- [ ] Root dependencies installed (`npm install` in root)
- [ ] No errors during installation

## ✅ Database Setup

### MySQL

- [ ] MySQL service is running
- [ ] Can connect: `MySQL -u root -p` (enters successfully)
- [ ] Database created: `MySQL -u root -p -e "SHOW DATABASES LIKE 'cordfam';"`
- [ ] Tables exist: `MySQL -u root -p -e "USE cordfam; SHOW TABLES;"`

### MongoDB

- [ ] MongoDB service is running
- [ ] Can connect: `mongosh --eval "db.adminCommand('ping')"` returns
      `{ ok: 1 }`

## ✅ Backend Setup

- [ ] Navigated to `backend/` directory
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created from `.env.example`
- [ ] `.env` file edited with correct MySQL password
- [ ] Backend starts: `npm run dev`
- [ ] See "MySQL connected" message
- [ ] See "MongoDB connected" message
- [ ] See "Server listening on <http://0.0.0.0:3000>" message
- [ ] Health check works: `curl http://localhost:3000/health`

## ✅ Frontend Setup

- [ ] Navigated to `frontend/web/` directory
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created (if needed)
- [ ] Frontend starts: `npm run dev`
- [ ] See "Local: <http://localhost:5173/>" message
- [ ] Can open `http://localhost:5173` in browser
- [ ] Login page loads (no console errors)

## ✅ Application Testing

- [ ] Can register a new user
- [ ] Registration succeeds and auto-logs in
- [ ] Dashboard appears after registration
- [ ] Can create a channel
- [ ] Channel appears in sidebar
- [ ] Can send a message
- [ ] Message appears in channel
- [ ] Can logout
- [ ] Can login again
- [ ] No errors in browser console

## ✅ Multi-User Test (Optional)

- [ ] Open incognito browser window
- [ ] Register second user
- [ ] Create/join same channel
- [ ] Send messages from both users
- [ ] Messages appear for both users

---

## Troubleshooting Notes

**If MySQL connection fails**:

- Check MySQL is running
- Verify password in `.env`
- Test connection manually: `MySQL -u root -p`

**If MongoDB connection fails**:

- Check MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Test connection: `mongosh`

**If backend won't start**:

- Check for port conflicts (port 3000)
- Verify all dependencies installed
- Check `.env` file exists and is configured

**If frontend won't connect**:

- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check browser console for errors

---

**Last Updated**: 2026-01-27
