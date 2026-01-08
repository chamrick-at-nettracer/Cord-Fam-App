# Testing the MVP

This guide walks you through testing the Minimum Viable Product (MVP) of
Cord-Fam-App.

## Prerequisites

Before testing, ensure you have:

1. ✅ **Databases running**: MySQL and MongoDB
2. ✅ **Backend running**: `http://localhost:3000`
3. ✅ **Frontend running**: `http://localhost:5173`

See [`GETTING_STARTED.md`](GETTING_STARTED.md) for setup instructions.

## Quick Test Checklist

### ✅ Backend Health Check

```bash
curl http://localhost:3000/health
```

**Expected**: `{"status":"ok","timestamp":"..."}`

### ✅ Frontend Loads

1. Open `http://localhost:5173` in browser
2. Should see login/register page
3. No console errors

### ✅ User Registration

1. Click "Register"
2. Fill in:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
3. Click "Register"
4. **Expected**: Automatically logged in, see dashboard

### ✅ Channel Creation

1. Click "New Channel" button
2. Enter name: `general`
3. Click "Create"
4. **Expected**: Channel appears in sidebar

### ✅ Message Sending

1. Click on a channel
2. Type message in input box
3. Press Enter or click "Send"
4. **Expected**: Message appears in message list

### ✅ Multi-User Test

1. Open incognito/private browser window (or different browser)
2. Navigate to `http://localhost:5173`
3. Register second user: `test2@example.com` / `testuser2`
4. **Expected**: Second user sees existing channels (e.g., "general" created by
   first user)
5. Click on the same channel that first user created
6. **Expected**: Second user is automatically added as member (auto-join for
   public channels)
7. Second user should see messages from first user
8. Send messages from both users
9. **Expected**: Messages appear for both users (refresh to see updates)

## Feature Testing

### Authentication

- [ ] Register new user
- [ ] Login with existing user
- [ ] Logout
- [ ] Protected routes redirect to login

### Channels

- [ ] Create channel
- [ ] View channel list
- [ ] Select channel
- [ ] View channel details

### Messages

- [ ] Send message
- [ ] View messages in channel
- [ ] Messages appear in correct channel
- [ ] Messages show user info
- [ ] Messages show timestamp

## API Testing (Optional)

### Test Registration

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "username": "apitest",
    "password": "password123"
  }'
```

**Expected**: JSON response with `user` and `token`

### Test Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "password123"
  }'
```

**Expected**: JSON response with `user` and `token`

### Test Channels (with auth token)

```bash
# Replace YOUR_TOKEN with token from login
curl http://localhost:3000/api/v1/channels \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected**: JSON array of channels

## Known Limitations (MVP)

These features are **not yet implemented**:

- ❌ Real-time updates (using polling instead)
- ❌ Message editing/deletion
- ❌ Direct messages
- ❌ File attachments
- ❌ User profiles
- ❌ Task management
- ❌ Notes/Recipes
- ❌ Android app

## Troubleshooting

### Backend Not Responding

- Check backend terminal for errors
- Verify databases are running
- Check `.env` configuration
- Check port 3000 is available

### Frontend Can't Connect

- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check browser console for errors
- Verify CORS is enabled (should be automatic)

### Database Errors

- Verify MySQL is running: `MySQL -u root -p`
- Verify MongoDB is running: `mongosh`
- Check database credentials in `.env`
- Verify database exists: `MySQL -u root -p -e "SHOW DATABASES;"`

## Success Criteria

MVP is working if:

- ✅ Can register users
- ✅ Can login
- ✅ Can create channels
- ✅ Can send messages
- ✅ Can view messages
- ✅ Multiple users can use same channel

---

**Last Updated**: 2026-01-27
